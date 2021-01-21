import { put, call, takeEvery } from 'redux-saga/effects';

import { setLessonData } from './index';
import { getLesson } from '../../../learn/lessons/getLesson';

export function* getLessonSaga({ payload }) {
  const lesson = yield call(getLesson, payload);
  yield put(setLessonData(lesson));
}

export function createLessonSaga(types) {
  console.log('lesson saga created');
  return [takeEvery(types.setLesson, getLessonSaga)];
}
