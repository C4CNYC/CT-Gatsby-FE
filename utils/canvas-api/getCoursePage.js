var fetch = require('node-canvas-api/src/internal/fetch');

var buildOptions = require('node-canvas-api/src/internal/util');

require('dotenv').config();

const canvasDomain = process.env.CANVAS_API_DOMAIN;

/**
 * Retrieves single course page
 * @param {Number} courseId the course id.
 * @param {String} pageUrl the page url.
 * @param {Array} options an array of options to include.
 * @return {Promise} A promise that resolves to a Course object: https://canvas.instructure.com/doc/api/courses.html#Course
*/

function getCoursePage(courseId, pageUrl, ...options) {
  return fetch(canvasDomain + `/courses/${courseId}/pages/${pageUrl}?` + buildOptions(options));
}
module.exports = getCoursePage;
