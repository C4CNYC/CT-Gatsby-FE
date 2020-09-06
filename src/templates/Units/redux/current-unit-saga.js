import { put, select, call, takeEvery } from 'redux-saga/effects';
import store from 'store';

import {
  isSignedInSelector,
  updateComplete,
  updateFailed,
  allowBlockDonationRequests
} from '../../../state';

import { post } from '../../../utils/ajax';

import { randomCompliment } from '../utils/get-words';
import { updateSuccessMessage } from './';

export const CURRENT_UNIT_KEY = 'currentUnitId';

export function* currentUnitSaga({ payload: id }) {
  store.set(CURRENT_UNIT_KEY, id);
  const isSignedIn = yield select(isSignedInSelector);
  if (isSignedIn) {
    const update = {
      endpoint: '/update-my-current-unit',
      payload: {
        currentUnitId: id
      }
    };
    try {
      yield call(post, update.endpoint, update.payload);
      yield put(updateComplete());
    } catch {
      yield put(updateFailed(update));
    }
  }
}

export function* updateSuccessMessageSaga() {
  yield put(updateSuccessMessage(randomCompliment()));
}

export function* allowBlockDonationRequestsSaga() {
  yield put(allowBlockDonationRequests());
}

export function createCurrentUnitSaga(types) {
  return [
    takeEvery(types.unitMounted, currentUnitSaga),
    takeEvery(types.unitMounted, updateSuccessMessageSaga),
    takeEvery(types.lastBlockChalSubmitted, allowBlockDonationRequestsSaga)
  ];
}
