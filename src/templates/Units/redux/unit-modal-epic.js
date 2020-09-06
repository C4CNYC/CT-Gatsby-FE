import { ofType } from 'redux-observable';
import { switchMap } from 'rxjs/operators';
import { of, empty } from 'rxjs';

import { types, openModal } from './';

function unitModalEpic(action$) {
  return action$.pipe(
    ofType(types.updateTests),
    switchMap(({ payload: tests }) => {
      const unitComplete = tests.every(test => test.pass && !test.err);
      return unitComplete ? of(openModal('completion')) : empty();
    })
  );
}

export default unitModalEpic;
