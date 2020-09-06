import { combineReducers } from 'redux';

import { reducer as app, ns as appNameSpace } from './index';
import {
  reducer as flash,
  ns as flashNameSpace
} from '../components/Flash/redux';
import { reducer as settings, ns as settingsNameSpace } from './settings';
import {
  reducer as curriculumMap,
  ns as curriculumMapNameSpace
} from '../components/Map/redux';
import {
  reducer as unit,
  ns as unitNameSpace
} from '../templates/Units/redux';
import {
  reducer as search,
  ns as searchNameSpace
} from '../components/search/redux';

export default combineReducers({
  [appNameSpace]: app,
  [unitNameSpace]: unit,
  [curriculumMapNameSpace]: curriculumMap,
  [flashNameSpace]: flash,
  [searchNameSpace]: search,
  [settingsNameSpace]: settings
});
