import { all } from 'redux-saga/effects';

import errorSagas from './error-saga';
import { sagas as appSagas } from './';
import { sagas as unitSagas } from '../templates/Units/redux';
import { sagas as settingsSagas } from './settings';

export default function* rootSaga() {
  yield all([...errorSagas, ...appSagas, ...unitSagas, ...settingsSagas]);
}
