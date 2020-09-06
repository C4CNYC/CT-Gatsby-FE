var fetchAll = require('node-canvas-api/src/internal/fetchAll');
var buildOptions = require('node-canvas-api/src/internal/util');

require('dotenv').config();

const canvasDomain = process.env.CANVAS_API_DOMAIN;

/**
 * Retrieves all courses in a courseId
 * @param {Number} courseId the course id.
 * @param {Array} options an array of options to include.
 * @return {Promise} A promise that resolves to a Course object: https://canvas.instructure.com/doc/api/courses.html#Course
*/

function getAllModulesInCourse(courseId, ...options) {
  return fetchAll(canvasDomain + `/courses/${courseId}/modules?` + buildOptions(options));
}
module.exports = getAllModulesInCourse;
