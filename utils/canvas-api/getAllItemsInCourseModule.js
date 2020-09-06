var fetchAll = require('node-canvas-api/src/internal/fetchAll');

var buildOptions = require('node-canvas-api/src/internal/util');

require('dotenv').config();

const canvasDomain = process.env.CANVAS_API_DOMAIN;

/**
 * Retrieves all courses in a courseId
 * @param {Number} courseId the course id.
 * @param {Number} moduleId the module id.
 * @param {Array} options an array of options to include.
 * @return {Promise} A promise that resolves to a Course object: https://canvas.instructure.com/doc/api/courses.html#Course
*/

function getAllItemsInCourseModule(courseId, moduleId, ...options) {
  return fetchAll(canvasDomain + `/courses/${courseId}/modules/${moduleId}/items?` + buildOptions(options));
}
module.exports = getAllItemsInCourseModule;
