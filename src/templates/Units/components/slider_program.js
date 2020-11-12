const { css } = require("jquery");
const $ = require("jquery");
const { assert, AssertionError } = require('chai');
const { divide, result } = require("lodash");
import React, { Profiler } from 'react';
import * as Auth from './authmanager.js';
import * as __helpers from './curriculum-helpers.js'
var i, j, k;
var challange_element_pest = '<div class="slider-card challange pest"><div class="row"><h2>challange</h2></div><div class="row"><hr/></div><div class="row excerpt">Excerpt</div><div class="row"><hr/></div><div class="row"><div class="success-next-button"></div><div class="row bottom-description"></div><div class="row top-label"></div></div>';
var challange_element = '<div class="slider-card challange"><div class="row header"><h2>challange</h2><div class="row top-label"></div><hr/></div><div class="row excerpt"></div><div class="row"><hr/></div><div class="row"><div class="success-next-button"></div><div class="row bottom-description"></div>';
var image_element = '<div class="slider-card img"><div><img src=""/></div></div>';
var image_button_element = '<div class="slider-card img-button"><div class="row"><img src=""/></div><div class="row"></div></div>';
var check_svg = '<svg class="svg-inline--fa fa-check fa-w-16" aria-hidden="true" focusable="false" data-prefix="fa" data-icon="check" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" data-fa-i2svg=""><path fill="currentColor" d="M173.898 439.404l-166.4-166.4c-9.997-9.997-9.997-26.206 0-36.204l36.203-36.204c9.997-9.998 26.207-9.998 36.204 0L192 312.69 432.095 72.596c9.997-9.997 26.207-9.997 36.204 0l36.203 36.204c9.997 9.997 9.997 26.206 0 36.204l-294.4 294.401c-9.998 9.997-26.207 9.997-36.204-.001z"></path></svg>';
var validation_array = [false, false, false, false, false, false, false, false, false, false, false, false, false];
var card = [
  ['A', 'CHALLANGE', 'Hi.... 👋<br/><span>Type <xmp><h1></xmp> in the editor below</span>', 'DESCRIPTION: Add <strong><xmp class="plain-text"><h1></xmp></strong>', 'step 1 of 2'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide2.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide3.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide4.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide5.PNG'],
  ['A', 'CHALLANGE', 'Type <strong>your name</strong> and a <xmp class="plain-text"><h1></xmp> closing tag.<br><xmp><h1> Joey Green </h1></xmp>', 'TIP: Notice the closing tag has / in it.', 'step 2 of 2'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide7.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide8.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide9.PNG'],
  ['A', 'CHALLANGE', 'Add a <xmp class="plain-text"><body></xmp> tag.<br><xmp><body>\n<h1> Joey Green </h1></xmp>', 'TIP: <xmp class="plain-text"><body></xmp> Needs to be on top, so push the <xmp class="plain-text"><h1></xmp> down to line 2.', 'step 1 of 3'],
  ['A', 'CHALLANGE', 'Add a <xmp class="plain-text">style=""</xmp> inside the <xmp class="plain-text"><body></xmp> tag.<br>Before the <xmp class="plain-text">></xmp> symbol.<br><xmp><body style=" ">\n<h1> Joey Green </h1></xmp>', 'TIP: No spaces between style, = & " .', 'step 2 of 3'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide12.PNG'],
  ['A', 'CHALLANGE', 'Add a <xmp class="plain-text">background: pink;</xmp> inside the "quotes". Before the <xmp class="plain-text">></xmp> symbol.<br><xmp><body style="background: pink;">\n<h1> Joey Green </h1></xmp>', 'TIP: There\'s a colon (:) and a semicolon (;) at the end.', 'step 3 of 3'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide14.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide15.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide16.PNG'],
  ['A', 'CHALLANGE', 'Change <xmp class="plain-text">pink</xmp> to red or any other color you like.<br><xmp><body style="backgorund: red;">\n<h1> Joey Green </h1></xmp>', 'TIP: There\'s a colon (:) and a semicolon (;) at the end.', 'step 3 of 3'],
  ['C', [c_header('great work!'), c_sub_header('Click below to download your Hour of Code certificate'), c_button('Get Certificate 😎', '#')], ''],
  ['C', [c_sub_header_normal('What would you like to do?'), c_line_break(), c_button('advanced bonus section', '#'), c_button('start project 1', '#'), c_button('project page', '#')], ''],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide19.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide20.PNG'],
  ['D', 'CHALLANGE', 'Insert this inside the  <xmp class="plain-text"><h1></xmp> tag:<br><xmp class="plain-text">style="font-size: 100px;"</xmp><br><xmp><body style="background: pink;">\n<h1 style="font-size: 100px;"> Joey Green </h1></xmp>', '<strong>This section of code:</strong> Increases the size of the text.', 'bonus: 1 of 3'],
  ['D', 'CHALLANGE', 'Add this style to change text color:<br> <xmp class="plain-text">color: blue; style="font-size: 100px;"</xmp><br><xmp><body style="background: pink;">\n<h1 style="font-size 100px; color: blue;"> Joey Green </h1></xmp>', '<span style="color: red;">TIP: </span>Keep they styling between the "quotes".', 'bonus: 2 of 3'],
  ['D', 'CHALLANGE', 'Finally, center your text with this:<br> <xmp class="plain-text">text-align: center;</xmp><br><xmp><body style="background: pink;">\n<h1 style="font-size: 100px; color: blue; text-align:\n center;"> Joey Green </h1></xmp>', '<span style="color: red;">TIP: </span>Keep they styling between the "quotes".', 'bonus: 3 of 3'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide24.PNG'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide25.PNG'],
  ['D', 'CHALLANGE', 'Replace the background color from "red" to linear-gradient()<br><xmp><body style="background: linear-gradient();"></xmp>', '<strong>This section of code: </strong>Creates a beautiful mixture of colors.', 'bonus: 1 of 2'],
  ['D', 'CHALLANGE', 'Insert a cool diagonal separation(<span style="color: blue;">110deg,</span>) and some<br>beautiful colors:<br><span style="color: blue;">yellow 40%, pink 40% </span>linear-gardient()<xmp><body style="background: linear-gradient(110 deg, yellow 40%, pink 40%);"></xmp>', 'Don\'t add any spaces unless shown.', 'bonus: 2 of 2'],
  ['B', 'https://codejika.com/learn/lessons/INTRO-5MIN-D-V004/img/Slide28.PNG'],
  ['A', 'CHALLANGE', 'Try changing <xmp class="plain-text">110 deg</xmp> to 90 or 0.', '', 'play: 1 of 2'],
  ['A', 'CHALLANGE', 'Try playing with the colors of the linear-gradient.', '', 'play: 2 of 2'],
  ['C', [c_sub_header_normal('What would you like to do?'), c_line_break(), c_button('share to gallery', '#'), c_button('start project 1', '#')], ''],
];

var current_slide = 0;

function c_header(text) {
  return '<h2 class="c-header">' + text + '</h2>';
}
function c_sub_header(text) {
  return '<h2 class="c-sub-header">' + text + '</h2>';
}
function c_button(text, link) {
  return '<div class="c-button"><a href="' + link + '">' + text + '</a></div>';
}
function c_sub_header_normal(text) {
  return '<h2 class="c-sub-header normal-text">' + text + '</h2>';
}
function c_line_break() {
  return '<br>';
}

var slider, size;

export function next() {
  size = $('.slider-card').width();
  current_slide++;
  $('#slider').animate({ scrollLeft: (size * current_slide) + 1 }, 300);
  current_slide_status();
}
export function previous() {
  size = $('.slider-card').width();
  current_slide--;
  $('#slider').animate({ scrollLeft: (size * current_slide) + 1 }, 300);
  current_slide_status();
}

export function current_slide_status() {
  var count;
  if (current_slide == null) {
    count = 0;
  } else {
    var count = parseInt(current_slide) + 1;
  }
  // alert(count)
  $('#slide-count').text('Slide ' + count + ' of ' + $('.slider-card').length);
  if (current_slide > 0 && current_slide != card.length - 1) {
    $('#next').text('Next >');
    $('#previous').text('< Previous');
  }
  if (current_slide == 0) {
    $('#next').text('Start Slideshow');
    $('#previous').text('');
  }
  if (current_slide == card.length - 1) {
    $('#next').text('');
    $('#previous').text('< Previous');
  }
  //progress
  var current_progress = (100 / card.length) * (current_slide + 1);
  $('.progress-value').css({ width: current_progress + '%' });
  if ($('.slider-card').eq(current_slide).contents().find('.success-next-button').length > 0 && current_slide > 0) {
    if ($('.slider-card').eq(current_slide).contents().find('.didit').length > 0) {
      $('#next').css({ display: 'inline-block' });
    } else {
      $('#next').css({ display: 'none' });
    }
  } else {
    $('#next').css({ display: 'inline-block' });
  }
}

export function get_current_slide_number() {
  return current_slide;
}
function insert_cards() {
  //insert cards  
  for (i = 0; i < card.length; i++) {
    if (card[i][0] == 'A') {
      card[i].push(i, false);
    } else if (card[i][0] == 'D') {
      card[i].push(i, false);
    }
  }
  //pagination bar
  current_slide_status();




  slider = $('#slider');

  $('.reflex-splitter').eq(0).mouseup(() => {
    size = $('.slider-card').width();
    slider.animate({ scrollLeft: (size * current_slide) + 1 }, 300)
  });
  $('.success-next-button').click(() => next());
}

export function slider_changed() {
  if ($('#slider').length > 0) {
    // let size = $('.slider-card').width();  
    // $('#slider').animate({scrollLeft: (size*current_slide)+1}, 0)
    // current_slide_status();
    Auth.retrieve_slide_number()
    insert_cards();
  }
}

export function fix_slider(id) {
  current_slide = id;
  let size = $('.slider-card').width();
  $('#slider').animate({ scrollLeft: (size * current_slide) + 1 }, 0)
  current_slide_status();
}
export function show_result(result_id) {
  if (card[result_id][card[result_id].length - 1] == false) {
    $('#check' + result_id).show();
    card[result_id][card[result_id].length - 1] = true;
    $('#check' + result_id).html(check_svg).css({ 'background-color': '#00A921', 'border': 'none' });
    $('#btn' + result_id).text('i did it 🙂').css({ 'background-color': '#68c300' }).addClass('didit');
    Auth.saveSlider(result_id)
    current_slide_status();
  }
}

function is_showed(id) {
  if (!card[id][card[id].length - 1]) {
    return false;
  } else {
    return true;
  }
}

const validateItems = [
  {
    group: 1,
    index: 0,
    text: "Your page should have an image element.",
  },
  {
    group: 1,
    index: 1,
    text: 'Your image should have a "src" attribute that points to the kitten image.'
  },
  {
    group: 1,
    index: 2,
    text: `Your image element's "alt" attribute should not be empty.`
  },
]

export function validate_test(code) {
  $("#validate-html").html(code)

  if ($("#validate-html img").length) {
    validateItems[0].checked = true;
  } else {
    validateItems[0].checked = false;
  }

  if (/^https:\/\/bit\.ly\/fcc-relaxing-cat$/i.test($("#validate-html img").attr("src"))) {
    validateItems[1].checked = true;
  } else {
    validateItems[1].checked = false;
  }

  if ($("#validate-html img").attr("alt") && $("#validate-html img").attr("alt").length && /<img\S*alt=(['"])(?!\1|>)\S+\1\S*\/?>/.test(__helpers.removeWhiteSpace(code))) {
    validateItems[2].checked = true;
  } else {
    validateItems[2].checked = false;
  }

  // if (getElement("form").children("button").length > 0) {
  //   validateItems[3].checked = true;
  // } else {
  //   validateItems[3].checked = false;
  // }

  return validateItems;
}
export function validate_function(content) {
  var console_text = content;
  if (console_text.match(/<img>/) != null) {
    show_result(0);
  }
  if (console_text.match(/<h1>\w{1,}<\/h1>/) != null) {
    show_result(5);
  }
  if (console_text.match(/<body>/) != null) {
    show_result(9);
  }
  if (console_text.match(/<body(.*)style=(.?)"(.*)"(.*)>/) != null) {
    show_result(10);
  }
  if (console_text.match(/<body(.*)style=(.?)"(.*)background:(.?)pink;"(.*)>/) != null) {
    show_result(12);
  }
  if (console_text.match(/<body(.*)background(.?):(.?)(#(?:[0-9a-f]{2}){2,4}|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)|black|silver|gray|whitesmoke|maroon|red|purple|fuchsia|green|lime|olivedrab|yellow|navy|blue|teal|aquamarine|orange|aliceblue|antiquewhite|aqua|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|goldenrod|gold|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavenderblush|lavender|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olive|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|plum|powderblue|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato|turquoise|violet|wheat|white|yellowgreen|rebeccapurple)(.*);(.*)"/) != null) {
    show_result(16);
  }
  if (console_text.match(/<h1(.*)style(.?)=(.?)"font-size:(.*)100px(.?);(.*)"(.*)>/) != null) {
    show_result(21);
  } if (console_text.match(/<h1(.*)style(.?)=(.?)"(.*)color:(.?)blue(.?);(.*)"(.*)>/)) {
    show_result(22);
  }
  if (console_text.match(/<h1(.*)style(.?)=(.?)"(.*)text-align(.?):(.?)center(.?);(.*)"(.*)>/) != null) {
    show_result(23);
  }
  if (console_text.match(/<body(.*)style(.?)=(.?)"(.*)background:(.?)linear-gradient\(\)(.?);(.*)"(.*)>/) != null) {
    show_result(26);
  }
  if (console_text.match(/<body(.*)style(.*)=(.*)"background:(.*)linear-gradient(.*)\((.*)110(.*)deg(.*),(.*)yellow(.*)40%(.*),(.*)pink(.*)40%(.*)\);(.*)"(.*)>/) != null) {
    show_result(27);
  }
  if (is_showed(27) && console_text.match(/<body(.*)style(.*)=(.*)"background:(.*)linear-gradient(.*)\([\s\r\n]*(90|0)(.?)deg(.*),(.*)yellow(.*)40%(.*),(.*)pink(.*)40%(.*)\);(.*)"(.*)>/) != null) {
    show_result(29);
  }
  if (console_text.match(/<body(.*)style(.?)=(.?)"(.*)background:(.?)linear-gradient(.*)\(((.*)([0-9])(.?)deg(.*),(.*)((#(?:[0-9a-f]{ 2 }){ 2,4 }|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[d\.]+%?\)|\b(black|silver|gray|whitesmoke|maroon|red|purple|fuchsia|green|lime|olivedrab|navy|teal|aquamarine|orange|aliceblue|antiquewhite|aqua|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|goldenrod|gold|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavenderblush|lavender|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olive|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato|turquoise|violet|wheat|white|yellowgreen|rebeccapurple)\b))(.*)([0-9])(.?)%(.*),(.*)((#(?:[0-9a-f]{ 2 }){ 2,4 }|(#[0-9a-f]{3})|(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[d\.]+%?\)|\b(black|silver|gray|whitesmoke|maroon|red|purple|fuchsia|green|lime|olivedrab|navy|teal|aquamarine|orange|aliceblue|antiquewhite|aqua|azure|beige|bisque|blanchedalmond|blueviolet|brown|burlywood|cadetblue|chartreuse|chocolate|coral|cornflowerblue|cornsilk|crimson|darkblue|darkcyan|darkgoldenrod|darkgray|darkgreen|darkgrey|darkkhaki|darkmagenta|darkolivegreen|darkorange|darkorchid|darkred|darksalmon|darkseagreen|darkslateblue|darkslategray|darkslategrey|darkturquoise|darkviolet|deeppink|deepskyblue|dimgray|dimgrey|dodgerblue|firebrick|floralwhite|forestgreen|gainsboro|ghostwhite|goldenrod|gold|greenyellow|grey|honeydew|hotpink|indianred|indigo|ivory|khaki|lavenderblush|lavender|lawngreen|lemonchiffon|lightblue|lightcoral|lightcyan|lightgoldenrodyellow|lightgray|lightgreen|lightgrey|lightpink|lightsalmon|lightseagreen|lightskyblue|lightslategray|lightslategrey|lightsteelblue|lightyellow|limegreen|linen|mediumaquamarine|mediumblue|mediumorchid|mediumpurple|mediumseagreen|mediumslateblue|mediumspringgreen|mediumturquoise|mediumvioletred|midnightblue|mintcream|mistyrose|moccasin|navajowhite|oldlace|olive|orangered|orchid|palegoldenrod|palegreen|paleturquoise|palevioletred|papayawhip|peachpuff|peru|pink|plum|powderblue|rosybrown|royalblue|saddlebrown|salmon|sandybrown|seagreen|seashell|sienna|skyblue|slateblue|slategray|slategrey|snow|springgreen|steelblue|tan|thistle|tomato|turquoise|violet|wheat|white|yellowgreen|rebeccapurple)\b))(.*)([0-9])%(.*))\);(.*)"(.*)>/) != null) {
    show_result(30);
  }


}


if (typeof window != 'undefined') {
  $(document).ready(() => {
    $(window).resize(() => {
      let size = $('.slider-card').width();
      $('#slider').animate({ scrollLeft: (size * current_slide) + 1 }, 0)
    })
  })
}