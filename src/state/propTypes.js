import PropTypes from 'prop-types';

const FileType = PropTypes.shape({
  key: PropTypes.string,
  ext: PropTypes.string,
  name: PropTypes.string,
  contents: PropTypes.string,
  head: PropTypes.string,
  tail: PropTypes.string
});

export const Block = PropTypes.shape({
  content: PropTypes.string,
  title: PropTypes.string,
  block: PropTypes.string,
  superBlock: PropTypes.string
});

export const UnitNode = PropTypes.shape({
  block: PropTypes.string,
  unitOrder: PropTypes.number,
  unitType: PropTypes.number,
  dashedName: PropTypes.string,
  // description: PropTypes.array,
  description: PropTypes.string,
  content: PropTypes.string,
  files: PropTypes.shape({
    indexhtml: FileType,
    indexjs: FileType
  }),
  fields: PropTypes.shape({
    slug: PropTypes.string,
    blockName: PropTypes.string
  }),
  forumTopicId: PropTypes.number,
  guideUrl: PropTypes.string,
  head: PropTypes.arrayOf(PropTypes.string),
  instructions: PropTypes.string,
  isBeta: PropTypes.bool,
  isComingSoon: PropTypes.bool,
  isLocked: PropTypes.bool,
  isPrivate: PropTypes.bool,
  isRequired: PropTypes.bool,
  name: PropTypes.string,
  order: PropTypes.number,
  required: PropTypes.arrayOf(
    PropTypes.shape({
      link: PropTypes.string,
      raw: PropTypes.string,
      src: PropTypes.string
    })
  ),
  superOrder: PropTypes.number,
  superBlock: PropTypes.string,
  tail: PropTypes.arrayOf(PropTypes.string),
  time: PropTypes.string,
  title: PropTypes.string,
  videoUrl: PropTypes.string
});

export const AllUnitNode = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: UnitNode
    })
  )
});

export const AllBlock = PropTypes.shape({
  edges: PropTypes.arrayOf(
    PropTypes.shape({
      node: Block
    })
  )
});
