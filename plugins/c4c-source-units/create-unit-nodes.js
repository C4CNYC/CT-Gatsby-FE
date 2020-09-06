const crypto = require('crypto');

function createUnitNode(unit, reporter) {
  // if (typeof unit.description[0] !== 'string') {
  //   reporter.warn(`
  //
  //   ${unit.title} has a description that will break things!
  //
  //   `);
  // }
  const contentDigest = crypto
    .createHash('md5')
    .update(JSON.stringify(unit))
    .digest('hex');

  const internal = {
    contentDigest,
    type: 'UnitNode'
  };

  /* eslint-disable prefer-object-spread/prefer-object-spread */
  return JSON.parse(
    JSON.stringify(
      Object.assign(
        {},
        {
          id: unit.id + ' >>>> UnitNode',
          children: [],
          parent: null,
          internal,
          sourceInstanceName: 'unit'
        },
        unit
      )
    )
  );
}

exports.createUnitNode = createUnitNode;
