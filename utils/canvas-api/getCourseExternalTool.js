var fetch = require('node-canvas-api/src/internal/fetch');

var buildOptions = require('node-canvas-api/src/internal/util');

require('dotenv').config();

const canvasDomain = process.env.CANVAS_API_DOMAIN;

/**
 * Retrieves single course assignment
 * @param {Number} courseId the course id.
 * @param {Number} externalToolId the external tool id.
 * @param {Array} options an array of options to include.
 * @return {Promise} A promise that resolves to a Course object: https://canvas.instructure.com/doc/api/courses.html#Course
*/

function getCourseExternalTool(courseId, externalToolId, ...options) {
  return fetch(canvasDomain + `/courses/${courseId}/external_tools/${externalToolId}?` + buildOptions(options));
}
module.exports = getCourseExternalTool;
