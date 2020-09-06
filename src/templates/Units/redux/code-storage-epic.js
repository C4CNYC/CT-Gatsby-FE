import { of } from 'rxjs';
import { filter, switchMap, tap, ignoreElements } from 'rxjs/operators';
import { combineEpics, ofType } from 'redux-observable';
import store from 'store';

import {
  types,
  storedCodeFound,
  noStoredCodeFound,
  isCodeLockedSelector,
  unitFilesSelector,
  unitMetaSelector
} from './';

import { types as appTypes } from '../../../state';

import { setContent, isPoly } from '../utils/polyvinyl';

const legacyPrefixes = [
  'Bonfire: ',
  'Waypoint: ',
  'Zipline: ',
  'Basejump: ',
  'Checkpoint: '
];
const legacyPostfix = 'Val';

function getCode(id) {
  const code = store.get(id);
  return code ? code : null;
}

function getLegacyCode(legacy) {
  const key = legacy + legacyPostfix;
  let code = null;
  const maybeCode = store.get(key);
  if (maybeCode) {
    code = '' + maybeCode;
    store.remove(key);
    return code;
  }
  return legacyPrefixes.reduce((code, prefix) => {
    if (code) {
      return code;
    }
    return store.get(prefix + key);
  }, null);
}

function legacyToFile(code, files, key) {
  if (isFilesAllPoly(files)) {
    return { [key]: setContent(code, files[key]) };
  }
  return false;
}

function isFilesAllPoly(files) {
  return Object.keys(files)
    .map(key => files[key])
    .every(file => isPoly(file));
}

function clearCodeEpic(action$, state$) {
  return action$.pipe(
    ofType(appTypes.submitComplete, types.resetUnit),
    tap(() => {
      const { id } = unitMetaSelector(state$.value);
      store.remove(id);
    }),
    ignoreElements()
  );
}

function saveCodeEpic(action$, state$) {
  return action$.pipe(
    ofType(types.executeUnit),
    // do not save unit if code is locked
    filter(() => !isCodeLockedSelector(state$.value)),
    tap(() => {
      const state = state$.value;
      const { id } = unitMetaSelector(state);
      const files = unitFilesSelector(state);
      store.set(id, files);
    }),
    ignoreElements()
  );
}

function loadCodeEpic(action$, state$) {
  return action$.pipe(
    ofType(types.unitMounted),
    filter(() => {
      const files = unitFilesSelector(state$.value);
      return Object.keys(files).length > 0;
    }),
    switchMap(({ payload: id }) => {
      let finalFiles;
      const state = state$.value;
      const unit = unitMetaSelector(state);
      const files = unitFilesSelector(state);
      const fileKeys = Object.keys(files);
      const invalidForLegacy = fileKeys.length > 1;
      const { title: legacyKey } = unit;

      const codeFound = getCode(id);
      if (codeFound && isFilesAllPoly(codeFound)) {
        finalFiles = {
          ...fileKeys
            .map(key => files[key])
            .reduce(
              (files, file) => ({
                ...files,
                [file.key]: {
                  ...file,
                  contents: codeFound[file.key]
                    ? codeFound[file.key].contents
                    : file.contents
                }
              }),
              {}
            )
        };
      } else {
        const legacyCode = getLegacyCode(legacyKey);
        if (legacyCode && !invalidForLegacy) {
          finalFiles = legacyToFile(legacyCode, files, fileKeys[0]);
        }
      }
      if (finalFiles) {
        return of(storedCodeFound(finalFiles));
      }
      return of(noStoredCodeFound());
    })
  );
}

export default combineEpics(saveCodeEpic, loadCodeEpic, clearCodeEpic);
