import { takeEvery, call, put } from 'redux-saga/effects';

import { putUpdateLegacyCert } from '../../utils/ajax';
import { submitComplete } from '../';
import { createFlashMessage } from '../../components/Flash/redux';
import reallyWeirdErrorMessage from '../../utils/reallyWeirdErrorMessage';
import { updateLegacyCertError } from './';

function* updateLegacyCertSaga({
  payload: { superBlock, unitsToUpdate }
}) {
  // shape the body of the http call so it is consumable by api
  const body = {
    projects: {
      [superBlock]: unitsToUpdate
    }
  };
  // shape to update completed units in state store
  let reduxShape = [];
  for (let obj in unitsToUpdate) {
    if (unitsToUpdate.hasOwnProperty(obj)) {
      reduxShape.push({ id: obj, solution: unitsToUpdate[obj] });
    }
  }

  try {
    const { data: response } = yield call(putUpdateLegacyCert, body);
    yield put(submitComplete({ challArray: reduxShape }));
    yield put(createFlashMessage(response));
  } catch (e) {
    yield put(updateLegacyCertError(e));
    yield put(createFlashMessage(reallyWeirdErrorMessage));
  }
}

export function createUpdateLegacyCertSaga(types) {
  return [takeEvery(types.updateLegacyCert, updateLegacyCertSaga)];
}
