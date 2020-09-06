const crypto = require('crypto');

function createBlockNode(block, reporter) {
  const contentDigest = crypto
    .createHash('md5')
    .update(JSON.stringify(block))
    .digest('hex');
  const internal = {
    contentDigest,
    type: 'BlockNode'
  };


  /* eslint-disable prefer-object-spread/prefer-object-spread */
  return JSON.parse(
    JSON.stringify(
      Object.assign(
        {},
        {
          id: block.id + ' >>>> BlockNode',
          children: [],
          parent: null,
          internal,
          sourceInstanceName: 'block'
        },
        block
      )
    )
  );
}

exports.createBlockNode = createBlockNode;
