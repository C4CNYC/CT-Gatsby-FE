const _ = require('lodash');
const fetch = require('node-fetch');

const { cctApiLocation, cctApiToken, locale } = require('../config/env.json');

exports.getCourse = async (id) =>  {
  const courseUrl = `${cctApiLocation}/courses/${id}/edit`;
  const headers = {
    Authorization: `Bearer ${cctApiToken}`
  };

  return fetch(courseUrl, {
    headers
  })
    .then(response => response.json());
}

exports.getLecture = async (id) =>  {
  const lectureUrl = `${cctApiLocation}/lecture/${id}`;
  const headers = {
    Authorization: `Bearer ${cctApiToken}`
  };

  return fetch(lectureUrl, {
    headers
  })
  .then(response => response.json());
}

exports.getUnit = async (id) =>  {
  const unitUrl = `${cctApiLocation}/units/${id}`;
  const headers = {
    Authorization: `Bearer ${cctApiToken}`
  };

  return fetch(unitUrl, {
    headers
  })
  .then(response => {
    return response.json();
  }).catch(response => null);
}

