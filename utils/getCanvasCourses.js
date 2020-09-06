const _ = require('lodash');
const fetch = require('node-fetch');

const {canvasApiLocation, canvasApiToken, locale} = require('../config/env.json');

const {getAllCoursesInAccount} = require('node-canvas-api');
const getAllModulesInCourse = require('./canvas-api/getAllModsInCourse');
const getAllItemsInCourseModule = require('./canvas-api/getAllItemsInCourseModule');
const getCourseAssignment = require('./canvas-api/getCourseAssignment');
const getCoursePage = require('./canvas-api/getCoursePage');
const getCourseExternalTool = require('./canvas-api/getCourseExternalTool');

exports.getCourses = async() => {
  return getAllCoursesInAccount(1) // first argument is Canvas account ID
    .then(async courses => {
      await Promise.all(courses.map(course => getAllModulesInCourse(course.id)
        .then(async modules => {
          const populatedModules = await Promise.all(modules.map(m => getAllItemsInCourseModule(course.id, m.id).then(async items => {
            m.items = await Promise.all(items.map( item => {
              if (item.type === 'Assignment') {
                return getCourseAssignment(course.id, item.content_id).then(assignment => {
                    return {
                      ...item,
                      assignment_data: assignment
                    };
                  }
                );
              }
              if (item.type === 'Page') {
                return getCoursePage(course.id, item.page_url).then(page => {
                    return {
                      ...item,
                      ...page
                    };
                  }
                );
              }
              return new Promise((resolve, reject) => {
                resolve(item);
              });
            }));
            return m;
          })));

          course.mainModule = populatedModules.find(m => m.name.toLowerCase() === 'main');
          course.modules = populatedModules.filter(m => m.name.toLowerCase() !== 'main');
        })));
      return courses;
    });
};
