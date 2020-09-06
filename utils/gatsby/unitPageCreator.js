const path = require('path');
const { dasherize } = require('../..//utils/slugs');

const { viewTypes } = require('../unitTypes');

const backend = path.resolve(
  __dirname,
  '../../src/templates/Units/projects/backend/Show.js'
);
const classic = path.resolve(
  __dirname,
  '../../src/templates/Units/classic/Show.js'
);
const frontend = path.resolve(
  __dirname,
  '../../src/templates/Units/projects/frontend/Show.js'
);
const intro = path.resolve(
  __dirname,
  '../../src/templates/Introduction/Intro.js'
);
const superBlockIntro = path.resolve(
  __dirname,
  '../../src/templates/Introduction/SuperBlockIntro.js'
);

const views = {
  backend,
  classic,
  modern: classic,
  frontend
  // quiz: Quiz
};

const getNextUnitPath = (node, index, nodeArray) => {
  const next = nodeArray[index + 1];
  return next ? next.node.fields.slug : '/learn';
};

const getPrevUnitPath = (node, index, nodeArray) => {
  const prev = nodeArray[index - 1];
  return prev ? prev.node.fields.slug : '/learn';
};

const getTemplateComponent = unitType => views[viewTypes[unitType]];

const getIntroIfRequired = (node, index, nodeArray) => {
  const next = nodeArray[index + 1];
  const isEndOfBlock = next && next.node.unitOrder === 0;
  let nextSuperBlock = '';
  let nextBlock = '';
  if (next) {
    const { superBlock, block } = next.node;
    nextSuperBlock = superBlock;
    nextBlock = block;
  }
  return isEndOfBlock
    ? `/learn/${dasherize(nextSuperBlock)}/${dasherize(nextBlock)}`
    : '';
};

exports.createUnitPages = createPage => ({ node }, index, thisArray) => {
  const {
    superBlock,
    block,
    fields: { slug },
    required = [],
    template,
    unitType,
    id
  } = node;
  if (unitType === 7) {
    return null;
  }

  return createPage({
    path: slug,
    component: getTemplateComponent(unitType),
    context: {
      unitMeta: {
        superBlock,
        block: block,
        introPath: getIntroIfRequired(node, index, thisArray),
        template,
        required,
        nextUnitPath: getNextUnitPath(node, index, thisArray),
        prevUnitPath: getPrevUnitPath(node, index, thisArray),
        id
      },
      slug
    }
  });
};

exports.createBlockIntroPages = createPage => edge => {
  const {
    fields: {
      slug,
    }
  } = edge.node;

  return createPage({
    path: slug,
    component: intro,
    context: {
      block: slug,
      slug
    }
  });
};

exports.createSuperBlockIntroPages = createPage => edge => {
  const {
    fields: {
      slug,
    }
  } = edge.node;

  return createPage({
    path: slug,
    component: superBlockIntro,
    context: {
      superBlock: slug,
      slug
    }
  });
};
