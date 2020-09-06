var { buildBlocks } = require('./utils/buildBlocks');
var { buildUnits } = require('./utils/buildUnits');

async function test() {
  var blocks = await buildBlocks();
  var units = await buildUnits();

  var asdfasdf = blocks;
}

test();
