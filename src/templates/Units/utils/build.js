import { getTransformers } from '../reunit/transformers';
import { cssToHtml, jsToHtml, concatHtml } from '../reunit/builders.js';
import { unitTypes } from '../../../../utils/unitTypes';
import createWorker from './worker-executor';
import {
  createTestFramer,
  runTestInTestFrame,
  createMainFramer
} from './frame';

// the config files are created during the build, but not before linting
// eslint-disable-next-line import/no-unresolved
import { filename as runner } from '../../../../config/frame-runner';
// eslint-disable-next-line import/no-unresolved
import { filename as testEvaluator } from '../../../../config/test-evaluator';

const frameRunner = [
  {
    src: `/js/${runner}.js`
  }
];

const globalRequires = [
  {
    link:
      'https://cdnjs.cloudflare.com/' +
      'ajax/libs/normalize/4.2.0/normalize.min.css'
  }
];

const applyFunction = (fn) =>
  async function (file) {
    try {
      if (file.error) {
        return file;
      }
      const newFile = await fn.call(this, file);
      if (typeof newFile !== 'undefined') {
        return newFile;
      }
      return file;
    } catch (error) {
      return { ...file, error };
    }
  };

const composeFunctions = (...fns) =>
  fns.map(applyFunction).reduce((f, g) => (x) => f(x).then(g));

function buildSourceMap(files) {
  return files.reduce((sources, file) => {
    sources[file.name] = file.source || file.contents;
    return sources;
  }, {});
}

function checkFilesErrors(files) {
  const errors = files.filter(({ error }) => error).map(({ error }) => error);
  if (errors.length) {
    throw errors;
  }
  return files;
}

const buildFunctions = {
  [unitTypes.js]: buildJSUnit,
  [unitTypes.bonfire]: buildJSUnit,
  [unitTypes.html]: buildDOMUnit,
  [unitTypes.modern]: buildDOMUnit,
  [unitTypes.backend]: buildBackendUnit,
  [unitTypes.backEndProject]: buildBackendUnit
};

export function canBuildUnit(unitData) {
  const { unitType } = unitData;
  return buildFunctions.hasOwnProperty(unitType);
}

export async function buildUnit(unitData, options) {
  const { unitType } = unitData;
  let build = buildFunctions[unitType];
  if (build) {
    return build(unitData, options);
  }
  throw new Error(`Cannot build unit of type ${unitType}`);
}

const testRunners = {
  [unitTypes.js]: getJSTestRunner,
  [unitTypes.html]: getDOMTestRunner,
  [unitTypes.backend]: getDOMTestRunner
};
export function getTestRunner(buildData, { proxyLogger }, document) {
  const { unitType } = buildData;
  const testRunner = testRunners[unitType];
  if (testRunner) {
    return testRunner(buildData, proxyLogger, document);
  }
  throw new Error(`Cannot get test runner for unit type ${unitType}`);
}

function getJSTestRunner({ build, sources }, proxyLogger) {
  const code = sources && 'index' in sources ? sources['index'] : '';

  const testWorker = createWorker(testEvaluator, { terminateWorker: true });

  return (testString, testTimeout, firstTest = true) => {
    return testWorker
      .execute({ build, testString, code, sources, firstTest }, testTimeout)
      .on('LOG', proxyLogger).done;
  };
}

async function getDOMTestRunner(buildData, proxyLogger, document) {
  await new Promise((resolve) =>
    createTestFramer(document, resolve, proxyLogger)(buildData)
  );
  return (testString, testTimeout) =>
    runTestInTestFrame(document, testString, testTimeout);
}

export function buildDOMUnit({ files, required = [], template = '' }) {
  const finalRequires = [...globalRequires, ...required, ...frameRunner];
  const loadEnzyme = Object.keys(files).some((key) => files[key].ext === 'jsx');
  const toHtml = [jsToHtml, cssToHtml];
  const pipeLine = composeFunctions(...getTransformers(), ...toHtml);
  const finalFiles = Object.keys(files)
    .map((key) => files[key])
    .map(pipeLine);
  return Promise.all(finalFiles)
    .then(checkFilesErrors)
    .then((files) => ({
      unitType: unitTypes.html,
      build: concatHtml({ required: finalRequires, template, files }),
      sources: buildSourceMap(files),
      loadEnzyme
    }));
}

export function buildJSUnit({ files }, options) {
  const pipeLine = composeFunctions(...getTransformers(options));

  const finalFiles = Object.keys(files)
    .map((key) => files[key])
    .map(pipeLine);
  return Promise.all(finalFiles)
    .then(checkFilesErrors)
    .then((files) => ({
      unitType: unitTypes.js,
      build: files
        .reduce(
          (body, file) => [...body, file.head, file.contents, file.tail],
          []
        )
        .join('\n'),
      sources: buildSourceMap(files)
    }));
}

export function buildBackendUnit({ url }) {
  return {
    unitType: unitTypes.backend,
    build: concatHtml({ required: frameRunner }),
    sources: { url }
  };
}

export async function updatePreview(buildData, document, proxyLogger) {
  const { unitType } = buildData;

  if (unitType === unitTypes.html) {
    await new Promise((resolve) =>
      createMainFramer(document, resolve, proxyLogger)(buildData)
    );
  } else {
    throw new Error(`Cannot show preview for unit type ${unitType}`);
  }
}

export function unitHasPreview({ unitType }) {
  return unitType === unitTypes.html || unitType === unitTypes.modern;
}

export function isJavaScriptUnit({ unitType }) {
  return unitType === unitTypes.js || unitType === unitTypes.bonfire;
}

export function isLoopProtected(unitMeta) {
  return unitMeta.superBlock !== 'Coding Interview Prep';
}
