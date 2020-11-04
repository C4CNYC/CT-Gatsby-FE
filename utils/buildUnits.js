const _ = require('lodash');
const Handlebars = require("handlebars");
const url = require('fast-url-parser')

const { dasherize, nameify } = require('..//utils/slugs');
const { locale } = require('../config/env.json');
const { blockNameify } = require('./blockNameify');
const { getCourses } = require('./getCanvasCourses');
const { buildBlocks } = require('./buildBlocks');
const { getLecture, getUnit } = require('./cctApi');
const { cctApiLocation } = require('../config/env.json');

exports.buildUnits = async function buildUnits() {

  // return (await Promise.all((await getCourses())
  // 	.map((course, order) => {
  // 		return {
  // 			...course,
  // 			order
  // 		};
  // 	})
  // 	.reduce((modules, course) => {
  // 		const currentModules = _.flatten(course.modules).map((module, order) => {
  // 			return {
  // 				...module,
  // 				course,
  // 				order
  // 			};
  // 		});
  // 		return modules.concat(currentModules);
  // 	}, [])
  // 	// .filter(module => !module.isPrivate)

  return (await Promise.all(
    (await buildBlocks({
      withCanvasModuleItems: true
    }))
      .filter(block => block.superBlock) // only use sub-blocks aka canvas modules
      .map(block => (block.items || []).map(async (item, order) => await prepareCanvasModuleItemForFrontend({
        ...item,
        block,
        order
      })))
      .reduce((accu, current) => accu.concat(current), [])
  )).reduce((accu, current) => accu.concat(_.flatten(current)), []);
};

async function prepareCanvasModuleItemForFrontend(canvasModuleItem) {

  let externalUrl;
  let urlParts;
  let cctUrlParts;

  // eslint-disable-next-line default-case
  switch (canvasModuleItem.type) {
    // if canvas lti external tool
    case 'ExternalTool':
      externalUrl = canvasModuleItem.external_url;
      break;

    // if canvas lti external tool assignment
    case 'Assignment':
      externalUrl = canvasModuleItem.assignment_data.external_tool_tag_attributes.url;
      break;
  }

  if (externalUrl) {
    urlParts = url.parse(externalUrl);
    cctUrlParts = url.parse(cctApiLocation);

    // if content creation tool (cct)
    if (urlParts.hostname === cctUrlParts.hostname) {
      return await prepareCCTUnitOrUnitGroupForFrontend(canvasModuleItem, urlParts);
    }
  }

  // todo
  return [];

}

async function prepareCCTUnitOrUnitGroupForFrontend(canvasModuleItem, urlParts) {

  const params = new URLSearchParams(urlParts.search)
  const queries = {}
  for (const [key, value] of params) { queries[key] = value }

  let resourceId = queries.resourceId;
  let resourceType = queries.resourceType;
  let unitArr = [];

  switch (resourceType) {
    case 'lecture':
      let lecture = await getLecture(resourceId);
      unitArr = lecture.units.map(cctUnit => prepareCanvasCCTUnitForFrontend(canvasModuleItem, cctUnit, true));
      break;

    case 'unit':
      let cctUnit = await getUnit(resourceId);
      if (cctUnit) {
        unitArr = [
          prepareCanvasCCTUnitForFrontend(canvasModuleItem, cctUnit)
        ];
      }
      break;
  }

  return unitArr;
}

function prepareCanvasCCTUnitForFrontend(canvasModuleItem, cctUnit = null, bundled = false) {

  let description;

  // if is rich-content type
  if (cctUnit && cctUnit.__t === 'dynamic') {
    if (cctUnit.template) {
      if (cctUnit.fields) {
        const templateFieldValues = cctUnit.fields;
        for (let field in templateFieldValues) {
          templateFieldValues[field] = templateFieldValues[field]['en']; // only english for the moment
        }
        description = Handlebars.compile(cctUnit.template.content)(templateFieldValues);
      } else {
        description = cctUnit.template.content;
      }
    }
  }

  // let title = bundled ? cctUnit.name : canvasModuleItem.title;
  let title = cctUnit.name['en'];
  let id = bundled ? cctUnit._id : canvasModuleItem.id;

  return {
    id: id + '',
    canvasId: id + '',
    title: title,
    description: description,
    type: cctUnit ? cctUnit.__t : 'default',
    name: nameify(title),
    dashedName: dasherize(title),
    slug: `/learn/${canvasModuleItem.block.superBlock}/${canvasModuleItem.block.dashedName}/${dasherize(title)}`,
    block: canvasModuleItem.block.dashedName,
    superBlock: canvasModuleItem.block.superBlock,
    superOrder: canvasModuleItem.block.superOrder,
    order: canvasModuleItem.order,
    unitOrder: canvasModuleItem.order,
    isPrivate: canvasModuleItem.isPrivate,
    required: canvasModuleItem.required,
    unitType: 0, // html
    template: '',
    forumTopicId: 0,
    tests: [
      {
        text: 'Your app should have an <code>input</code> element of type <code>text</code>',
        testString: 'assert($("input[type=text]").length > 0);'
      },
      {
        text: "Your page should have an image element.",
        testString: 'assert($("img").length);'
      }
    ],
    instructions: 'instructions go here',
    files: {
      indexhtml: {
        key: 'html',
        ext: 'html',
        name: 'index',
        contents: '<h2>CatPhotoApp</h2>\n' +
          '<main>\n' +
          '  <p>Click here to view more <a href="#">cat photos</a>.</p>\n' +
          '\n' +
          '\n' +
          '  <p>Things cats love:</p>\n' +
          '  <ul>\n' +
          '    <li>cat nip</li>\n' +
          '    <li>laser pointers</li>\n' +
          '    <li>lasagna</li>\n' +
          '  </ul>\n' +
          '  <p>Top 3 things cats hate:</p>\n' +
          '  <ol>\n' +
          '    <li>flea treatment</li>\n' +
          '    <li>thunder</li>\n' +
          '    <li>other cats</li>\n' +
          '  </ol>\n' +
          '\n' +
          '\n' +
          '</main>',
        head: '',
        tail: ''
      },
      // indexjs: 'indexjs'
    },
    videoUrl: ''
  };


}
