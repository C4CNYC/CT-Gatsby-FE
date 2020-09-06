var fetch = require('node-canvas-api/src/internal/fetch');

var buildOptions = require('node-canvas-api/src/internal/util');

require('dotenv').config();

const canvasDomain = process.env.CANVAS_API_DOMAIN;

/**
 * Retrieves single course assignment
 * @param {Number} courseId the course id.
 * @param {Number} assignmentId the assigbnment id.
 * @param {Array} options an array of options to include.
 * @return {Promise} A promise that resolves to a Course object: https://canvas.instructure.com/doc/api/courses.html#Course
*/

function getCourseAssignment(courseId, assignmentId, ...options) {
  return fetch(canvasDomain + `/courses/${courseId}/assignments/${assignmentId}?` + buildOptions(options));
}
module.exports = getCourseAssignment;
