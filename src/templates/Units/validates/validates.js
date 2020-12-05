const $ = require("jquery");
import * as __helpers from '../utils/curriculum-helpers.js'

export const validateItems = [
  {
    group: 1,
    index: 0,
    sliderID: 0,
    text: "Type <h1> in the code editor.",
    isValid: (code) => $("#validate-html h1").length > 0
  },
  {
    group: 1,
    index: 1,
    sliderID: 10,
    text: 'Type your name between tags',
    isValid: (code) => code.match(/<\/h1>/g) && code.match(/<\/h1>/g).length === code.match(/<h1>/g).length && (/(\s)+/gi).test($("#validate-html h1").text())
  },
  {
    group: 1,
    index: 2,
    sliderID: 14,
    text: 'Type <body> above <h1> tags',
    isValid: (code) => code.match(/<body(.*)>/)
  },
  {
    group: 1,
    index: 3,
    sliderID: 14,
    text: 'Add style=" " inside the <body> tag. Before the > symbol',
    isValid: (code) => code.match(/<body [\\s\\r\\n]*style[\\s\\r\\n]*=[\\s\\r\\n]*\"[\s\0-9\a-z\:\;\#]*\"[\\s\\r\\n]*>[\\s\\r\\n]*(.*)/)
  },
]