const _ = require('lodash');
const Handlebars = require('handlebars');

const { dasherize, nameify } = require('../utils/slugs');
const { blockNameify } = require('./blockNameify');
const { getCourses } = require('./getCanvasCourses');
const { getCourse, getLecture } = require('./cctApi');
const { cctApiLocation, locale } = require('../config/env.json');
const url = require('fast-url-parser');


exports.buildBlocks = async (options = {
  withCanvasModuleItems: false
}) => (await getCourses())
  // .filter(course => {
  //     return course.name == 'Canvas Vincente Course';
  // })
  .map((course, order) => {
    return {
      ...course,
      order
    };
  })
  .reduce(async (blocks, course) => {
    const superBlock = await prepareForFrontend(course);
    const modules = await Promise.all(
      _.flatten(course.modules)
        .map(async (m, order) => (
          await prepareForFrontend({
            ...m,
            superBlock,
            order
          }, options.withCanvasModuleItems)
        ))
    );

    blocks = await Promise.resolve(blocks);
    return blocks.concat([
      superBlock,
      ...modules
    ]);
  }, []);
// .filter(block => !block.isPrivate);

const prepareForFrontend = async (block, withCanvasModuleItems) => {
  block.content = '';
  block.excerpt = '';
  block.title = block.name;

  // if is superblock aka canvas course and has a "main" module for custom content
  // OR if is sub-block aka canvas module
  if (block.mainModule || block.superBlock) {
    const content = await prepareCanvasModuleForFrontend(block.mainModule || block, withCanvasModuleItems);

    if (content) {
      if (content.name) {
        block.title = content.name;
      }

      if (content.description) {
        block.content = content.description;
        block.excerpt = content.description; // todo
      }

      if (content.image) {
        block.image = content.image;
      }

    }
  }

  const frontendBlock = {
    id: (block.superBlock ? 'm' : 'c') + '_' + block.id + '',
    canvasId: block.id + '',
    title: nameify(block.title),
    excerpt: block.excerpt,
    // todo convert markdown to html if content is markdown type
    content: block.content,
    type: block.superBlock ? 'lesson' : 'course',
    image: block.image ? block.image : 'https://dashboard.codejika.org/assets/img/course-header-image.jpg',
    dashedName: dasherize(block.title),
    slug: block.superBlock ? `/learn/${block.superBlock.dashedName}/${dasherize(block.title)}` : `/learn/${dasherize(block.title)}`,
    superBlock: block.superBlock ? block.superBlock.dashedName : null,
    superOrder: block.superBlock ? block.superBlock.order : null,
    order: block.order,
    blockOrder: block.order,
    isPrivate: block.isPrivate,
    blockType: 0,
    forumTopicId: 0
  };

  if (withCanvasModuleItems) {
    frontendBlock.items = block.items && block.items.length ? block.items.slice(1) : [];
  }

  return frontendBlock;

};

async function prepareCanvasModuleForFrontend(m) {

  if (!m || !m.items.length) {
    return;
  }

  // const canvasContentItem = m.items.find(m => m.title.toLowerCase() === 'main');
  const canvasContentItem = m.items[0]; // just get first item for now

  if (!canvasContentItem) {
    return;
  }

  switch (canvasContentItem.type) {

    // if just a basic canvas page
    case 'Page':
      return {
        // don't use page title, use module name
        // name: canvasContentItem.title,
        description: canvasContentItem.body
      };
      break;

    // if canvas lti external tool
    case 'ExternalTool':
      const externalUrl = canvasContentItem.external_url;
      if (externalUrl) {
        let urlParts = url.parse(externalUrl);
        let cctUrlParts = url.parse(cctApiLocation);

        // if content creation tool (cct)
        if (urlParts.hostname === cctUrlParts.hostname) {
          return await prepareCanvasModuleCCTContentForFrontend(canvasContentItem, urlParts);
        }
      }
      break;

  }

}

async function prepareCanvasModuleCCTContentForFrontend(canvasContentItem, urlParts) {

  const params = new URLSearchParams(urlParts.search);
  const queries = {};
  for (const [key, value] of params) { queries[key] = value; }

  let resourceId = queries.resourceId;
  let resourceType = queries.resourceType;

  switch (resourceType) {
    case 'course':
      return prepareCanvasModuleCCTCourseContentForFrontend(await getCourse(resourceId));
      break;
    case 'lecture':
      return prepareCanvasModuleCCTLectureContentForFrontend(await getLecture(resourceId));
  }
}

function prepareCanvasModuleCCTCourseContentForFrontend(cCTCourse) {

  return {
    name: cCTCourse.name['en'],
    description: cCTCourse.description['en'],
    // slug: cCTCourse.slug ? cCTCourse.slug['en'] : null,
    image: cCTCourse.image && cCTCourse.image.breakpoints && cCTCourse.image.breakpoints.length ? cctApiLocation + '/' + cCTCourse.image.breakpoints[0].pathToRetinaImage : null
  };
}

function prepareCanvasModuleCCTLectureContentForFrontend(cCTCourse) {

  return {
    name: cCTCourse.name['en'],
    description: cCTCourse.description['en'],
    // slug: cCTCourse.slug ? cCTCourse.slug['en'] : null,
    image: cCTCourse.image && cCTCourse.image.breakpoints && cCTCourse.image.breakpoints.length ? cctApiLocation + '/' + cCTCourse.image.breakpoints[0].pathToRetinaImage : null
  };
}

