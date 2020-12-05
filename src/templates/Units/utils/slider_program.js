const $ = require("jquery");
import * as Auth from '../utils/authmanager.js';


const { validateItems } = require('../validates/validates');

export function validate_test(code, slide) {
  // if (!code) return;
  $("#validate-html").html(code)
  let currentSliderValItems = validateItems.filter(e => e.sliderID === slide);

  let returnValidateItems = Object.assign([], currentSliderValItems)
  currentSliderValItems.forEach((v, i) => {
    if (v.isValid(code)) {
      returnValidateItems[i].checked = true;
      Auth.saveSlider(returnValidateItems[i].sliderID)
    } else {
      returnValidateItems[i].checked = false;
    }
  })
  return returnValidateItems;
}

