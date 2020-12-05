import { createAction, handleActions } from 'redux-actions';

import { createTypes } from '../../../../utils/stateManagement';

import { createPoly } from '../utils/polyvinyl';
import unitModalEpic from './unit-modal-epic';
import completionEpic from './completion-epic';
import codeLockEpic from './code-lock-epic';
import createQuestionEpic from './create-question-epic';
import codeStorageEpic from './code-storage-epic';

import { createExecuteUnitSaga } from './execute-unit-saga';
import { createCurrentUnitSaga } from './current-unit-saga';
import { unitTypes } from '../../../../utils/unitTypes';
import { completedUnitsSelector } from '../../../state';

export const ns = 'unit';
export const backendNS = 'backendUnit';

const initialState = {
  canFocusEditor: true,
  unitFiles: {},
  monacoEditor: null,
  validate: [],
  validateChecked: false,
  unitMeta: {
    superBlock: '',
    block: '',
    id: '',
    nextUnitPath: '/',
    prevUnitPath: '/',
    introPath: '',
    unitType: -1
  },
  unitTests: [],
  consoleOut: '',
  hasCompletedBlock: false,
  inAccessibilityMode: false,
  isCodeLocked: false,
  isBuildEnabled: true,
  modal: {
    completion: false,
    help: false,
    video: false,
    reset: false
  },
  projectFormValues: {},
  successMessage: 'Happy Coding!',
  currentSlidenumber: 0
};

export const types = createTypes(
  [
    'createFiles',
    'createQuestion',
    'initTests',
    'initConsole',
    'initLogs',
    'updateBackendFormValues',
    'updateConsole',
    'updateUnitMeta',
    'updateFile',
    'setMonacoEditor',
    'setValidate',
    'setValidateChecked',
    'setCurrentSlideNumber',
    'updateJSEnabled',
    'updateProjectFormValues',
    'updateSuccessMessage',
    'updateTests',
    'updateLogs',
    'cancelTests',

    'logsToConsole',

    'lockCode',
    'unlockCode',
    'disableBuildOnError',
    'storedCodeFound',
    'noStoredCodeFound',

    'closeModal',
    'openModal',

    'previewMounted',
    'unitMounted',
    'checkUnit',
    'executeUnit',
    'resetUnit',
    'submitUnit',

    'moveToTab',

    'setEditorFocusability',
    'setAccessibilityMode',

    'lastBlockChalSubmitted'
  ],
  ns
);

export const epics = [
  unitModalEpic,
  codeLockEpic,
  completionEpic,
  createQuestionEpic,
  codeStorageEpic
];

export const sagas = [
  ...createExecuteUnitSaga(types),
  ...createCurrentUnitSaga(types)
];

export const createFiles = createAction(types.createFiles, unitFiles =>
  Object.keys(unitFiles)
    .filter(key => unitFiles[key])
    .map(key => unitFiles[key])
    .reduce(
      (unitFiles, file) => ({
        ...unitFiles,
        [file.key]: {
          ...createPoly(file),
          seed: file.contents.slice(0)
        }
      }),
      {}
    )
);

export const createQuestion = createAction(types.createQuestion);
export const initTests = createAction(types.initTests);
export const updateTests = createAction(types.updateTests);
export const cancelTests = createAction(types.cancelTests);

export const initConsole = createAction(types.initConsole);
export const initLogs = createAction(types.initLogs);
export const updateBackendFormValues = createAction(
  types.updateBackendFormValues
);
export const updateUnitMeta = createAction(types.updateUnitMeta);
export const updateFile = createAction(types.updateFile);
export const setMonacoEditor = createAction(types.setMonacoEditor);
export const setValidate = createAction(types.setValidate)
export const setValidateChecked = createAction(types.setValidateChecked)
export const setCurrentSlideNumber = createAction(types.setCurrentSlideNumber)
export const updateConsole = createAction(types.updateConsole);
export const updateLogs = createAction(types.updateLogs);
export const updateJSEnabled = createAction(types.updateJSEnabled);
export const updateProjectFormValues = createAction(
  types.updateProjectFormValues
);
export const updateSuccessMessage = createAction(types.updateSuccessMessage);

export const logsToConsole = createAction(types.logsToConsole);

export const lockCode = createAction(types.lockCode);
export const unlockCode = createAction(types.unlockCode);
export const disableBuildOnError = createAction(types.disableBuildOnError);
export const storedCodeFound = createAction(types.storedCodeFound);
export const noStoredCodeFound = createAction(types.noStoredCodeFound);

export const closeModal = createAction(types.closeModal);
export const openModal = createAction(types.openModal);

export const previewMounted = createAction(types.previewMounted);
export const unitMounted = createAction(types.unitMounted);
export const checkUnit = createAction(types.checkUnit);
export const executeUnit = createAction(types.executeUnit);
export const resetUnit = createAction(types.resetUnit);
export const submitUnit = createAction(types.submitUnit);

export const moveToTab = createAction(types.moveToTab);

export const setEditorFocusability = createAction(types.setEditorFocusability);
export const setAccessibilityMode = createAction(types.setAccessibilityMode);

export const lastBlockChalSubmitted = createAction(
  types.lastBlockChalSubmitted
);

export const currentTabSelector = state => state[ns].currentTab;
export const unitFilesSelector = state => state[ns].unitFiles;
export const monacoeditorSelector = state => state[ns].monacoEditor;
export const validateSelector = state => state[ns].validate;
export const validateCheckedSelector = state => state[ns].validateChecked;
export const currentSlideNumberSelector = state => state[ns].currentSlidenumber;
export const unitMetaSelector = state => state[ns].unitMeta;
export const unitTestsSelector = state => state[ns].unitTests;
export const consoleOutputSelector = state => state[ns].consoleOut;
export const completedUnitsIds = state =>
  completedUnitsSelector(state).map(node => node.id);
export const isUnitCompletedSelector = state => {
  const completedUnits = completedUnitsSelector(state);
  const { id: currentUnitId } = unitMetaSelector(state);
  return completedUnits.some(({ id }) => id === currentUnitId);
};
export const isCodeLockedSelector = state => state[ns].isCodeLocked;
export const isCompletionModalOpenSelector = state =>
  state[ns].modal.completion;
export const isHelpModalOpenSelector = state => state[ns].modal.help;
export const isVideoModalOpenSelector = state => state[ns].modal.video;
export const isResetModalOpenSelector = state => state[ns].modal.reset;
export const isBuildEnabledSelector = state => state[ns].isBuildEnabled;
export const successMessageSelector = state => state[ns].successMessage;

export const backendFormValuesSelector = state =>
  state[ns].backendFormValues || {};
export const projectFormValuesSelector = state =>
  state[ns].projectFormValues || {};

export const unitDataSelector = state => {
  const { unitType } = unitMetaSelector(state);
  let unitData = { unitType };
  if (
    unitType === unitTypes.js ||
    unitType === unitTypes.bonfire
  ) {
    unitData = {
      ...unitData,
      files: unitFilesSelector(state)
    };
  } else if (unitType === unitTypes.backend) {
    const { solution: url = {} } = backendFormValuesSelector(state);
    unitData = {
      ...unitData,
      url
    };
  } else if (unitType === unitTypes.backEndProject) {
    const values = projectFormValuesSelector(state);
    const { solution: url } = values;
    unitData = {
      ...unitData,
      ...values,
      url
    };
  } else if (unitType === unitTypes.frontEndProject) {
    unitData = {
      ...unitData,
      ...projectFormValuesSelector(state)
    };
  } else if (
    unitType === unitTypes.html ||
    unitType === unitTypes.modern
  ) {
    const { required = [], template = '' } = unitMetaSelector(state);
    unitData = {
      ...unitData,
      files: unitFilesSelector(state),
      required,
      template
    };
  }
  return unitData;
};

export const canFocusEditorSelector = state => state[ns].canFocusEditor;
export const inAccessibilityModeSelector = state =>
  state[ns].inAccessibilityMode;

const MAX_LOGS_SIZE = 64 * 1024;

export const reducer = handleActions(
  {
    [types.createFiles]: (state, { payload }) => ({
      ...state,
      unitFiles: payload
    }),
    [types.updateFile]: (state, { payload: { key, editorValue } }) => ({
      ...state,
      unitFiles: {
        ...state.unitFiles,
        [key]: {
          ...state.unitFiles[key],
          contents: editorValue
        }
      }
    }),
    [types.setMonacoEditor]: (state, { payload }) => ({
      ...state,
      monacoEditor: payload
    }),
    [types.setValidate]: (state, { payload }) => ({
      ...state,
      validate: payload
    }),
    [types.setValidateChecked]: (state, { payload }) => ({
      ...state,
      validateChecked: payload
    }),
    [types.setCurrentSlideNumber]: (state, { payload }) => ({
      ...state,
      currentSlidenumber: payload
    }),
    [types.storedCodeFound]: (state, { payload }) => ({
      ...state,
      unitFiles: payload
    }),

    [types.initTests]: (state, { payload }) => ({
      ...state,
      unitTests: payload
    }),
    [types.updateTests]: (state, { payload }) => ({
      ...state,
      unitTests: payload
    }),

    [types.initConsole]: (state, { payload }) => ({
      ...state,
      consoleOut: payload
    }),
    [types.updateConsole]: (state, { payload }) => ({
      ...state,
      consoleOut: state.consoleOut + '\n' + payload
    }),
    [types.initLogs]: state => ({
      ...state,
      logsOut: ''
    }),
    [types.updateLogs]: (state, { payload }) => ({
      ...state,
      logsOut: (state.logsOut + '\n' + payload).slice(-MAX_LOGS_SIZE)
    }),
    [types.logsToConsole]: (state, { payload }) => ({
      ...state,
      consoleOut:
        state.consoleOut +
        (state.logsOut ? '\n' + payload + '\n' + state.logsOut : '')
    }),
    [types.updateUnitMeta]: (state, { payload }) => ({
      ...state,
      unitMeta: { ...payload }
    }),

    [types.resetUnit]: state => ({
      ...state,
      currentTab: 2,
      unitFiles: {
        ...Object.keys(state.unitFiles)
          .map(key => state.unitFiles[key])
          .reduce(
            (files, file) => ({
              ...files,
              [file.key]: {
                ...file,
                contents: file.seed.slice()
              }
            }),
            {}
          )
      },
      unitTests: state.unitTests.map(({ text, testString }) => ({
        text,
        testString
      })),
      consoleOut: ''
    }),
    [types.updateBackendFormValues]: (state, { payload }) => ({
      ...state,
      backendFormValues: payload
    }),
    [types.updateProjectFormValues]: (state, { payload }) => ({
      ...state,
      projectFormValues: payload
    }),

    [types.lockCode]: state => ({
      ...state,
      isCodeLocked: true
    }),
    [types.unlockCode]: state => ({
      ...state,
      isBuildEnabled: true,
      isCodeLocked: false
    }),
    [types.disableBuildOnError]: state => ({
      ...state,
      isBuildEnabled: false
    }),

    [types.updateSuccessMessage]: (state, { payload }) => ({
      ...state,
      successMessage: payload
    }),
    [types.closeModal]: (state, { payload }) => ({
      ...state,
      modal: {
        ...state.modal,
        [payload]: false
      }
    }),
    [types.openModal]: (state, { payload }) => ({
      ...state,
      modal: {
        ...state.modal,
        [payload]: true
      }
    }),
    [types.moveToTab]: (state, { payload }) => ({
      ...state,
      currentTab: payload
    }),
    [types.executeUnit]: state => ({
      ...state,
      currentTab: 1
    }),
    [types.setEditorFocusability]: (state, { payload }) => ({
      ...state,
      canFocusEditor: payload
    }),
    [types.setAccessibilityMode]: (state, { payload }) => ({
      ...state,
      inAccessibilityMode: payload
    })
  },
  initialState
);
