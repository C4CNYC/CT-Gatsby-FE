import { combineEpics } from 'redux-observable';

import { epics as appEpics } from './';
import { epics as unitEpics } from '../templates/Units/redux';

const rootEpic = combineEpics(...appEpics, ...unitEpics);

export default rootEpic;
