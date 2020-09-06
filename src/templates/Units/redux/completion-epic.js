import { of, empty } from 'rxjs';
import {
  switchMap,
  retry,
  catchError,
  concat,
  filter,
  tap
} from 'rxjs/operators';
import { ofType } from 'redux-observable';
import { navigate } from 'gatsby';

import {
  backendFormValuesSelector,
  projectFormValuesSelector,
  types,
  unitMetaSelector,
  unitTestsSelector,
  closeModal,
  unitFilesSelector,
  updateProjectFormValues
} from './';
import {
  userSelector,
  isSignedInSelector,
  submitComplete,
  updateComplete,
  updateFailed
} from '../../../state';

import postUpdate$ from '../utils/postUpdate$';
import { unitTypes, submitTypes } from '../../../../utils/unitTypes';

function postUnit(update, username) {
  const saveUnit = postUpdate$(update).pipe(
    retry(3),
    switchMap(({ points }) =>
      of(
        submitComplete({
          username,
          points,
          ...update.payload
        }),
        updateComplete()
      )
    ),
    catchError(() => of(updateFailed(update)))
  );
  return saveUnit;
}

function submitModern(type, state) {
  const tests = unitTestsSelector(state);
  if (tests.length > 0 && tests.every(test => test.pass && !test.err)) {
    if (type === types.checkUnit) {
      return of({ type: 'this was a check unit' });
    }

    if (type === types.submitUnit) {
      const { id } = unitMetaSelector(state);
      const files = unitFilesSelector(state);
      const { username } = userSelector(state);
      const unitInfo = {
        id,
        files
      };
      const update = {
        endpoint: '/modern-unit-completed',
        payload: unitInfo
      };
      return postUnit(update, username);
    }
  }
  return empty();
}

function submitProject(type, state) {
  if (type === types.checkUnit) {
    return empty();
  }

  const { solution, githubLink } = projectFormValuesSelector(state);
  const { id, unitType } = unitMetaSelector(state);
  const { username } = userSelector(state);
  const unitInfo = { id, unitType, solution };
  if (unitType === unitTypes.backEndProject) {
    unitInfo.githubLink = githubLink;
  }

  const update = {
    endpoint: '/project-completed',
    payload: unitInfo
  };
  return postUnit(update, username).pipe(
    concat(of(updateProjectFormValues({})))
  );
}

function submitBackendUnit(type, state) {
  const tests = unitTestsSelector(state);
  if (tests.length > 0 && tests.every(test => test.pass && !test.err)) {
    if (type === types.submitUnit) {
      const { id } = unitMetaSelector(state);
      const { username } = userSelector(state);
      const {
        solution: { value: solution }
      } = backendFormValuesSelector(state);
      const unitInfo = { id, solution };

      const update = {
        endpoint: '/backend-unit-completed',
        payload: unitInfo
      };
      return postUnit(update, username);
    }
  }
  return empty();
}

const submitters = {
  tests: submitModern,
  backend: submitBackendUnit,
  'project.frontEnd': submitProject,
  'project.backEnd': submitProject
};

export default function completionEpic(action$, state$) {
  return action$.pipe(
    ofType(types.submitUnit),
    switchMap(({ type }) => {
      const state = state$.value;
      const meta = unitMetaSelector(state);
      const { nextUnitPath, introPath, unitType } = meta;
      const closeUnitModal = of(closeModal('completion'));

      let submitter = () => of({ type: 'no-user-signed-in' });
      if (
        !(unitType in submitTypes) ||
        !(submitTypes[unitType] in submitters)
      ) {
        throw new Error(
          'Unable to find the correct submit function for unitType ' +
            unitType
        );
      }
      if (isSignedInSelector(state)) {
        submitter = submitters[submitTypes[unitType]];
      }

      return submitter(type, state).pipe(
        tap(() => navigate(introPath ? introPath : nextUnitPath)),
        concat(closeUnitModal),
        filter(Boolean)
      );
    })
  );
}
