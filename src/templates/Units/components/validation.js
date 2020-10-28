const $ = require('jquery');

function get_console_text() {
    var result = '', elem = $('.view-lines span[class*="mtk"]');
    for (i = 0; i < elem.length; i++) {
        result += elem.eq(i).text();
    }
    return result;
}

if (typeof document != 'undefined') {
    $(document).ready(() => {
        if ($(window).width() < 768) {
            setInterval(() => {
                var console_text = get_console_text();
                if (console_text.length != clength) {
                    mobile_check_validation();
                }
                if ($('.button-unlocked').length != card_length) {
                    for (i = 0; i < validation_id.length; i++) {
                        if (validation_id[i] && $('.button-unlocked').eq(i).css('display') == 'none') {
                            mobile_show_result(i + 1);
                        }
                    }
                }
            }, 2000);
        }
    });

}

function mobile_show_result(id) {
    validation_id[id - 1] = true;
    $('.button-locked').eq(id - 1).css({ display: 'none' });
    $('.button-unlocked').eq(id - 1).css({ display: 'block' });
}
var validation_id = [false, false, false, false, false, false];
var clength = 0, card_length = 0;
function mobile_check_validation() {
    var console_text = get_console_text();
    if (console_text.match(/<h1(.*)>/) != null && validation_id[0] != true) {
        mobile_show_result(1);
    }
    if (console_text.match(/<h1>[\\s\\r\\n]*(.*)[\\s\\r\\n]*<\/h1>/) != null && validation_id[1] != true) {
        mobile_show_result(2);
    }
    if (console_text.match(/<body(.*)>/) != null && validation_id[2] != true) {
        mobile_show_result(3);
    }
    if (console_text.match(/<body(.?)style=(.?)"(.?)"(.?)>/) != null && validation_id[3] != true) {
        mobile_show_result(4);
    }
    if (console_text.match(/<body(.?)style=(.?)"(.?)background:(.?)pink|red;"(.?)>/) != null && validation_id[4] != true) {
        mobile_show_result(5);
    }
    if (console_text.match(/body(.*)background:[\s\r\n]*(?!pink;)[a-z]/) != null && validation_id[5] != true) {
        mobile_show_result(6);
    }
}
