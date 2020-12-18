const _ = require('lodash');
const fetch = require('node-fetch');

const { cctApiLocation, cctApiToken, locale } = require('../config/env.json');

exports.getCourse = async (id) => {
  const courseUrl = `${cctApiLocation}/courses/${id}/edit`;
  const headers = {
    Authorization: `Bearer ${cctApiToken}`
  };

  return fetch(courseUrl, {
    headers
  })
    .then(response => {
      return response.json()
    });
}

exports.getLecture = async (id) => {
  // const lectureUrl = `${cctApiLocation}/lecture/${id}`;
  // const headers = {
  //   Authorization: `Bearer ${cctApiToken}`
  // };

  // return fetch(lectureUrl, {
  //   headers
  // })
  //   .then(response => {
  //     return response.json()
  //   });

  // todo static code
  return {
    units: [
      {
        visible: true,
        __t: 'free-text',
        _id: '5ec16ca8c79c2201181e931d',
        name: 'What is Lorem Ipsum?',
        description: '...',
        markdown: '# What is Lorem Ipsum?\n' +
          "**Lorem Ipsum** is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        _course: '5ec16ca8c79c2201181e930b',
        createdAt: '2020-05-17T16:56:08.531Z',
        updatedAt: '2020-05-17T16:56:08.531Z',
        chatRoom: '5ec16ca8c79c2201181e931e',
        __v: 0,
        progressData: null,
        id: '5ec16ca8c79c2201181e931d'
      },
      {
        visible: true,
        __t: 'free-text',
        _id: '5ec16ca8c79c2201181e9333',
        name: 'Why do we use it?',
        description: '...',
        markdown: '# Why do we use it?\n' +
          "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web page editors now use Lorem Ipsum as their default model text, and a search for 'lorem ipsum' will uncover many web sites still in their infancy. Various versions have evolved over the years, sometimes by accident, sometimes on purpose (injected humour and the like).",
        _course: '5ec16ca8c79c2201181e930b',
        createdAt: '2020-05-17T16:56:08.616Z',
        updatedAt: '2020-05-17T16:56:08.616Z',
        chatRoom: '5ec16ca8c79c2201181e9334',
        __v: 0,
        progressData: null,
        id: '5ec16ca8c79c2201181e9333'
      },
      {
        visible: true,
        __t: 'free-text',
        _id: '5ec16ca8c79c2201181e9342',
        name: 'Where does it come from?',
        description: '...',
        markdown: '# Where does it come from?\n' +
          'Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old. Richard McClintock, a Latin professor at Hampden-Sydney College in Virginia, looked up one of the more obscure Latin words, consectetur, from a Lorem Ipsum passage, and going through the cites of the word in classical literature, discovered the undoubtable source. Lorem Ipsum comes from sections 1.10.32 and 1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good and Evil) by Cicero, written in 45 BC. This book is a treatise on the theory of ethics, very popular during the Renaissance. The first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes from a line in section 1.10.32.\n' +
          '\n' +
          'The standard chunk of Lorem Ipsum used since the 1500s is reproduced below for those interested. Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum" by Cicero are also reproduced in their exact original form, accompanied by English versions from the 1914 translation by H. Rackham.',
        _course: '5ec16ca8c79c2201181e930b',
        createdAt: '2020-05-17T16:56:08.661Z',
        updatedAt: '2020-05-17T16:56:08.661Z',
        chatRoom: '5ec16ca8c79c2201181e9343',
        __v: 0,
        progressData: null,
        id: '5ec16ca8c79c2201181e9342'
      },
      {
        visible: true,
        __t: 'free-text',
        _id: '5ec16ca8c79c2201181e934f',
        name: 'Where can I get some?',
        description: '...',
        markdown: '# Where can I get some?\n' +
          "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable. If you are going to use a passage of Lorem Ipsum, you need to be sure there isn't anything embarrassing hidden in the middle of text. All the Lorem Ipsum generators on the Internet tend to repeat predefined chunks as necessary, making this the first true generator on the Internet. It uses a dictionary of over 200 Latin words, combined with a handful of model sentence structures, to generate Lorem Ipsum which looks reasonable. The generated Lorem Ipsum is therefore always free from repetition, injected humour, or non-characteristic words etc.",
        _course: '5ec16ca8c79c2201181e930b',
        createdAt: '2020-05-17T16:56:08.698Z',
        updatedAt: '2020-05-17T16:56:08.698Z',
        chatRoom: '5ec16ca8c79c2201181e9351',
        __v: 0,
        progressData: null,
        id: '5ec16ca8c79c2201181e934f'
      },
      {
        visible: true,
        __t: 'dynamic',
        _id: '5ed54f458f14d200075fc481',
        _course: '5ec16ca8c79c2201181e930b',
        progressable: false,
        weight: 0,
        template: {
          "fields": [
            {
              "handle": "test_field",
              "name": "Test Field",
              "description": "asdfasdf",
              "_type": "text"
            },
            {
              "handle": "testarea_field",
              "name": "asdf",
              "_type": "textarea"
            }
          ],
          "teachers": [

          ],
          "_id": "5ed54dfb8f14d200075fc47f",
          "name": "test content",
          "_type": "handlebars_bootstrap",
          "templateAdmin": "5ec16ca8c79c2201181e92de",
          "createdAt": "2020-06-01T18:50:35.350Z",
          "updatedAt": "2020-06-01T18:51:16.557Z",
          "__v": 0,
          "content": `"<section class=\"fdb-block fp-active\" data-block-type=\"contents\" data-id=\"1\">\n  <div class=\"container\">\n    <div class=\"row align-items-center\">\n      <div class=\"col-12 col-md-6 mb-4 mb-md-0\">\n        <img alt=\"image\" class=\"img-fluid\" src=\"https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs//draws/smile.svg\">\n      </div>\n      <div class=\"col-12 col-md-6 col-lg-5 ml-md-auto text-left\">\n        <h1><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ test_field }}</span>&nbsp;</h1>\n        <p class=\"lead\"><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ testarea_field }}</span>&nbsp;</p>\n        <p><a class=\"btn btn-secondary mt-4\" href=\"https://www.froala.com\">Download</a></p>\n      </div>\n   
</div>\n  </div>\n</section><p data-f-id=\"pbf\" style=\"text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;\">Powered by <a href=\"https://www.froala.com/wysiwyg-editor?pb=1\" title=\"Froala Editor\">Froala Editor</a></p>"`,
          "hasAccessKey": false
        },
        fields: {
          "test_field": {
            "de": "asdf",
            "en": "yxcv"
          },
          "testarea_field": {
            "de": "yxcv",
            "en": "gsfgsfg"
          }
        },
        name: 'AJ Template Test',
        description: 'This is cool',
        unitCreator: {
          "profile": {
            "firstName": "Dago",
            "lastName": "Adminman"
          },
          "role": "student",
          "lastVisitedCourses": [

          ],
          "isActive": false,
          "_id": "5ec16ca8c79c2201181e92de",
          "updatedAt": "2020-12-16T11:04:43.701Z",
          "id": "5ec16ca8c79c2201181e92de"
        },
        createdAt: '2020-06-01T18:56:05.529Z',
        updatedAt: '2020-06-11T10:21:10.495Z',
        chatRoom: '5ed54f458f14d200075fc482',
        __v: 0,
        progressData: null,
        id: '5ed54f458f14d200075fc481'
      },
      {
        visible: true,
        __t: 'dynamic',
        _id: '5ed54f6c8f14d200075fc493',
        _course: '5ec16ca8c79c2201181e930b',
        progressable: false,
        weight: 0,
        template: {
          "fields": [
            {
              "handle": "test_field",
              "name": "Test Field",
              "description": "asdfasdf",
              "_type": "text"
            },
            {
              "handle": "testarea_field",
              "name": "asdf",
              "_type": "textarea"
            }
          ],
          "teachers": [

          ],
          "_id": "5ed54dfb8f14d200075fc47f",
          "name": "test content",
          "_type": "handlebars_bootstrap",
          "templateAdmin": "5ec16ca8c79c2201181e92de",
          "createdAt": "2020-06-01T18:50:35.350Z",
          "updatedAt": "2020-06-01T18:51:16.557Z",
          "__v": 0,
          "content": `"<section class=\"fdb-block fp-active\" data-block-type=\"contents\" data-id=\"1\">\n  <div class=\"container\">\n    <div class=\"row align-items-center\">\n      <div class=\"col-12 col-md-6 mb-4 mb-md-0\">\n  
    <img alt=\"image\" class=\"img-fluid\" src=\"https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs//draws/smile.svg\">\n      </div>\n      <div class=\"col-12 
col-md-6 col-lg-5 ml-md-auto text-left\">\n        <h1><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ test_field }}</span>&nbsp;</h1>\n    
  <p class=\"lead\"><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ testarea_field }}</span>&nbsp;</p>\n        <p><a class=\"btn btn-secondary mt-4\" href=\"https://www.froala.com\">Download</a></p>\n      </div>\n    </div>\n  </div>\n</section><p data-f-id=\"pbf\" style=\"text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;\">Powered by <a href=\"https://www.froala.com/wysiwyg-editor?pb=1\" title=\"Froala Editor\">Froala Editor</a></p>"`,
          "hasAccessKey": false
        },
        fields: {
          "test_field": "asdfasdfasdf",
          "testarea_field": "asdfyxcvyxcvasdfasdf\nasdf\nasd\nf\nasdf\n"
        },
        name: 'asdfyxcv',
        unitCreator: {
          "profile": {
            "firstName": "Dago",
            "lastName": "Adminman"
          },
          "role": "student",
          "lastVisitedCourses": [

          ],
          "isActive": false,
          "_id": "5ec16ca8c79c2201181e92de",
          "updatedAt": "2020-12-16T11:04:43.705Z",
          "id": "5ec16ca8c79c2201181e92de"
        },
        createdAt: '2020-06-01T18:56:44.268Z',
        updatedAt: '2020-06-11T19:34:05.489Z',
        chatRoom: '5ed54f6c8f14d200075fc494',
        __v: 0,
        progressData: null,
        id: '5ed54f6c8f14d200075fc493'
      },
      {
        visible: true,
        __t: 'dynamic',
        _id: '5ee2873a50448d0007735c8d',
        _course: '5ec16ca8c79c2201181e930b',
        progressable: false,
        weight: 0,
        description: 'AJ & Gabie Fun Template Creations',
        template: {
          "fields": [
            {
              "handle": "test_field",
              "name": "Test Field",
              "description": "asdfasdf",
              "_type": "text"
            },
            {
              "handle": "testarea_field",
              "name": "asdf",
              "_type": "textarea"
            }
          ],
          "teachers": [

          ],
          "_id": "5ee2873a50448d0007735c8c",
          "name": "Unit \"AJ_Gabe\": Copy of \"test content\"",
          "_type": "handlebars_bootstrap",
          "templateAdmin": "5ec16ca8c79c2201181e92de",
          "content": `"<section class=\"fdb-block fp-active\" data-block-type=\"contents\" data-id=\"1\"><div class=\"container\"><div class=\"row align-items-center\"><div class=\"col-12 col-md-6 mb-4 mb-md-0\"><img src=\"blob:https://dashboard.codejika.org/513a6992-074f-44e6-ba8a-d6bf4a106f5d\" style=\"width: 300px;\" class=\"fr-fic fr-dib\"><img alt=\"image\" class=\"img-fluid fr-fic fr-dii\" src=\"https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs//draws/smile.svg\"></div><div class=\"col-12 col-md-6 col-lg-5 ml-md-auto text-left\"><h1><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ test_field }}</span>&nbsp;</h1><p class=\"lead\"><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ testarea_field }}</span>&nbsp;</p><p><a class=\"btn btn-secondary mt-4 fr-green fr-strong\" href=\"https://www.froala.com\" rel=\"noopener noreferrer\" target=\"_blank\">Download- Gobbidee Gack [AJ]</a></p></div></div></div></section><p data-f-id=\"pbf\" style=\"text-align: center; font-size: 14px; 
margin-top: 30px; opacity: 0.65; font-family: sans-serif;\">Powered by <a href=\"https://www.froala.com/wysiwyg-editor?pb=1\" title=\"Froala Editor\">Froala Editor</a></p>"`,
          "parent": "5ed54dfb8f14d200075fc47f",
          "createdAt": "2020-06-11T19:34:18.256Z",
          "updatedAt": "2020-06-11T19:41:48.748Z",
          "__v": 0,
          "hasAccessKey": false
        },
        name: 'AJ_Gabe',
        unitCreator: {
          "profile": {
            "firstName": "Dago",
            "lastName": "Adminman"
          },
          "role": "student",
          "lastVisitedCourses": [

          ],
          "isActive": false,
          "_id": "5ec16ca8c79c2201181e92de",
          "updatedAt": "2020-12-16T11:04:43.704Z",
          "id": "5ec16ca8c79c2201181e92de"
        },
        createdAt: '2020-06-11T19:34:18.259Z',
        updatedAt: '2020-06-11T19:37:40.782Z',
        chatRoom: '5ee2873a50448d0007735c8e',
        __v: 0,
        progressData: null,
        id: '5ee2873a50448d0007735c8d'
      },
      {
        visible: true,
        __t: 'dynamic',
        _id: '5f4b988cbb12b80007c105c7',
        name: {
          "en": "Time to learn about basic HTML tags, son"
        },
        _course: '5ec16ca8c79c2201181e930b',
        progressable: false,
        weight: 0,
        template: {
          "fields": [
            {
              "handle": "test_field",
              "name": "Test Field",
              "description": "asdfasdf",
              "_type": "text"
            },
            {
              "handle": "testarea_field",
              "name": "asdf",
              "_type": "textarea"
            }
          ],
          "teachers": [

          ],
          "_id": "5f4b988cbb12b80007c105c6",
          "name": "Unit \"[object Object]\": Copy of \"test content\"",
          "_type": "handlebars_bootstrap",
          "templateAdmin": "5ec16ca8c79c2201181e92de",
          "content": "<section class=\"fdb-block fp-active\" data-block-type=\"contents\" data-id=\"1\">\n  <div class=\"container\">\n    <div class=\"row align-items-center\">\n      <div class=\"col-12 col-md-6 mb-4 mb-md-0\">\n        <img alt=\"image\" class=\"img-fluid\" src=\"https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs//draws/smile.svg\">\n      </div>\n      <div class=\"col-12 col-md-6 col-lg-5 ml-md-auto text-left\">\n        <h1><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ test_field }}</span>&nbsp;</h1>\n        <p class=\"lead\"><span class=\"atwho-inserted\" contenteditable=\"false\" data-atwho-at-query=\"{\">{{ testarea_field }}</span>&nbsp;</p>\n        <p><a class=\"btn btn-secondary mt-4\" href=\"https://www.froala.com\">Download</a></p>\n      </div>\n    </div>\n  </div>\n</section><p data-f-id=\"pbf\" style=\"text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;\">Powered by <a href=\"https://www.froala.com/wysiwyg-editor?pb=1\" title=\"Froala Editor\">Froala Editor</a></p>",
          "parent": "5ed54dfb8f14d200075fc47f",
          "createdAt": "2020-08-30T12:16:12.333Z",
          "updatedAt": "2020-08-30T14:53:39.807Z",
          "__v": 0,
          "hasAccessKey": false
        },
        fields: {
          "test_field": {
            "en": "there we go"
          },
          "testarea_field": {
            "en": "content proof of concept FTW"
          }
        },
        unitCreator: {
          "profile": {
            "firstName": "Dago",
            "lastName": "Adminman"
          },
          "role": "student",
          "lastVisitedCourses": [

          ],
          "isActive": false,
          "_id": "5ec16ca8c79c2201181e92de",
          "updatedAt": "2020-12-16T11:04:43.703Z",
          "id": "5ec16ca8c79c2201181e92de"
        },
        createdAt: '2020-08-30T12:16:12.335Z',
        updatedAt: '2020-08-30T17:14:23.183Z',
        chatRoom: '5f4b988cbb12b80007c105c8',
        __v: 0,
        progressData: null,
        id: '5f4b988cbb12b80007c105c7'
      }
    ],
    _id: '5ec16ca8c79c2201181e930d',
    name: { de: 'fffff', en: 'get gud' },
    description: { en: '<p>english desc</p>' },
    createdAt: '2020-05-17T16:56:08.468Z',
    updatedAt: '2020-08-30T16:13:11.286Z',
    __v: 8,
    image: {
      _bsontype: 'ObjectID',
      id: {
        '0': 95,
        '1': 75,
        '2': 208,
        '3': 23,
        '4': 187,
        '5': 18,
        '6': 184,
        '7': 0,
        '8': 7,
        '9': 193,
        '10': 11,
        '11': 158
      }
    }
  }
}

exports.getUnit = async (id) => {
  // const unitUrl = `${cctApiLocation}/units/${id}`;
  // const headers = {
  //   Authorization: `Bearer ${cctApiToken}`
  // };

  // return fetch(unitUrl, {
  //   headers
  // })
  //   .then(response => {
  //     return response.json();
  //   }).catch(response => null);

  // todo static code
  return {
    visible: true,
    __t: 'dynamic',
    _id: '5f4b988cbb12b80007c105c7',
    name: { en: 'Time to learn about basic HTML tags, son' },
    _course: '5ec16ca8c79c2201181e930b',
    progressable: false,
    weight: 0,
    template: {
      fields: [{ "handle": "test_field", "name": "Test Field", "description": "asdfasdf", "_type": "text" }, { "handle": "testarea_field", "name": "asdf", "_type": "textarea" }],
      teachers: [],
      _id: '5f4b988cbb12b80007c105c6',
      name: 'Unit "[object Object]": Copy of "test content"',
      _type: 'handlebars_bootstrap',
      templateAdmin: '5ec16ca8c79c2201181e92de',
      content: '<section class="fdb-block fp-active" data-block-type="contents" data-id="1">\n' +
        '  <div class="container">\n' +
        '    <div class="row align-items-center">\n' +
        '      <div class="col-12 col-md-6 mb-4 mb-md-0">\n' +
        '        <img alt="image" class="img-fluid" src="https://cdn.jsdelivr.net/gh/froala/design-blocks@master/dist/imgs//draws/smile.svg">\n' +
        '      </div>\n' +
        '      <div class="col-12 col-md-6 col-lg-5 ml-md-auto text-left">\n' +
        '        <h1><span class="atwho-inserted" contenteditable="false" data-atwho-at-query="{">{{ test_field }}</span>&nbsp;</h1>\n' +
        '        <p class="lead"><span class="atwho-inserted" contenteditable="false" data-atwho-at-query="{">{{ testarea_field }}</span>&nbsp;</p>\n' +
        '        <p><a class="btn btn-secondary mt-4" href="https://www.froala.com">Download</a></p>\n' +
        '      </div>\n' +
        '    </div>\n' +
        '  </div>\n' +
        '</section><p data-f-id="pbf" style="text-align: center; font-size: 14px; margin-top: 30px; opacity: 0.65; font-family: sans-serif;">Powered by <a href="https://www.froala.com/wysiwyg-editor?pb=1" title="Froala Editor">Froala Editor</a></p>',
      parent: '5ed54dfb8f14d200075fc47f',
      createdAt: '2020-08-30T12:16:12.333Z',
      updatedAt: '2020-08-30T14:53:39.807Z',
      __v: 0,
      hasAccessKey: false
    },
    fields: {
      test_field: { en: 'there we go' },
      testarea_field: { en: 'content proof of concept FTW' }
    },
    unitCreator: {
      profile: { firstName: 'Dago', lastName: 'Adminman' },
      role: 'admin',
      lastVisitedCourses: [
        '5ec16ca8c79c2201181e9310',
        '5f5b810fbb12b80007c10dd1',
        '5ec16ca8c79c2201181e9317',
        '5ec16ca8c79c2201181e9312',
        '5ec16ca8c79c2201181e930b',
        '5f2b26f122415100089e9faa'
      ],
      isActive: true,
      _id: '5ec16ca8c79c2201181e92de',
      email: 'admin@test.local',
      updatedAt: '2020-09-23T20:10:50.428Z',
      createdAt: '2020-05-17T16:56:08.027Z',
      __v: 0,
      id: '5ec16ca8c79c2201181e92de'
    },
    createdAt: '2020-08-30T12:16:12.335Z',
    updatedAt: '2020-08-30T17:14:23.183Z',
    chatRoom: '5f4b988cbb12b80007c105c8',
    __v: 0,
    progressData: null,
    id: '5f4b988cbb12b80007c105c7'
  }
}

