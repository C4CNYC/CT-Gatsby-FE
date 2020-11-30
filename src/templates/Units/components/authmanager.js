import React from 'react';
import ReactDOM from 'react-dom'
import * as slider from './slider_program.js';
// import firebase from '../../../utils/firebase.js';
const $ = require("jquery");
var i, j, k;
var app;
var Auth;
var firebase;
if (typeof window != 'undefined') {
    firebase = require('firebase');
    const firebaseConfig = {
        apiKey: "AIzaSyAtq7Gql0b6IqhKL5Loi1YZ9U7PXIWNgQg",
        authDomain: "ct-gatsby-fe.firebaseapp.com",
        databaseURL: "https://ct-gatsby-fe.firebaseio.com",
        projectId: "ct-gatsby-fe",
        storageBucket: "ct-gatsby-fe.appspot.com",
        messagingSenderId: "745697149367",
        appId: "1:745697149367:web:4079e0f2c85c8c92646832",
        measurementId: "G-62MYN5DBME"
    };
    app = firebase.initializeApp(firebaseConfig);
    Auth = firebase.auth();
}


// global functions
export function islogged() {
    if (Auth.currentUser != null) {
        return true;
    } else {
        return false;
    }
}

export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires=" + d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
    var name = cname + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') {
            c = c.substring(1);
        }
        if (c.indexOf(name) == 0) {
            return c.substring(name.length, c.length);
        }
    }
    return "";
}

export function checkCookie() {
    var user = getCookie("username");
    if (user != "") {
        alert("Welcome again " + user);
    } else {
        user = prompt("Please enter your name:", "");
        if (user != "" && user != null) {
            setCookie("username", user, 365);
        }
    }
}

export function firebaseInsert(state, data) {
    firebase.database().ref(state).set(data).then();
}
export function firebaseUpdate(state, data) {
    firebase.database().ref(state).update(data);
}
export function firebaseGet(state, callback) {
    var data;
    firebase.database().ref(state).once('value', function (snapshot) {
        data = snapshot.val();
        callback(data);
    });
}
export function firebaseRemove(state) {
    firebase.database().ref(state).remove();
}
export function firebaseCheck(state, callback) {
    var isex;
    firebase.database().ref(state).on('value', function (snapshot) {
        callback(snapshot.exists());
    });
}
export function getForm(identifier) {
    var elem = $(identifier);
    var result = [];
    for (i = 0; i < elem.length; i++) {
        result.push(elem.eq(i));
    }
    return result;
}
export function validateForm(elements) {
    elements = getForm(elements);
    var result = true;
    for (i = 0; i < elements.length; i++) {
        var element = $(elements[i]);
        if (element.val().toString().length == 0) {
            element.css({
                border: '1px solid #28a745'
            })
            if (result) {
                result = false;
            }
        } else if (element.val().length > 0) {
            element.css({
                border: '1px solid #2288fd'
            })
        }
    }
    return result;
}
export function getValue(identifier) {
    identifier = getForm(identifier);
    var result = []
    for (i = 0; i < identifier.length; i++) {
        var element = identifier[i];
        result.push(element.val());
    }
    return result;
}
export function checkUser(info, callback) {
    firebaseCheck('Users/profile/' + info.join('').toLowerCase().replace(' ', ''), callback);
}
export function clearShadow() {
    ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
    $('.login-signup-container').css({ 'z-index': 2000 });
}
export function setUser(userid, userfirstname) {
    setCookie('userid', userid, 365);
    setCookie('isauthenticate', true, 365);
    setCookie('user_firstname', userfirstname, 365);
}

export function getProfile() {
    var elem = $('#profilePanel input[type="text"], #profilePanel select, #profilePanel textarea');
    var items = ['firstname', 'lastname', 'day', 'month', 'year', 'nickname', 'country', 'grade', 'dreamjob', 'schoolname', 'email', 'mobilernumber'];
    firebaseGet('Users/profile/' + currentUserId(), (data) => {
        for (i = 0; i < elem.length; i++) {
            elem.eq(i).val(data[items[i]]);
        }
    });
}
export function currentUserId() {
    return Auth.currentUser.email.toString().replace('@codejika.org', '');
}
export function Logged() {
    if (islogged()) {
        $('#button-login, #button-register').css({ display: 'none' });
        $('#button-edit, #button-logout').css({ display: 'flex' });
    } else {
        $('#button-login, #button-register').css({ display: 'flex' });
        $('#button-edit, #button-logout').css({ display: 'none' });
    }
}

export function logout() {
    setCookie('isauthenticate', false, 365);
    setCookie('userid', '');
    setCookie('user_firstname', '');
    signOut();
    location.reload();
}
export function save_slide_number(id) {
    if (islogged()) {
        firebaseInsert('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentslidenumber/', {
            slideid: id
        });
        localStorage.setItem('5minuteswebsitecurrentslidenumber', id);
    } else {
        localStorage.setItem('5minuteswebsitecurrentslidenumber', id);
    }
}
export function retrieve_slide_number() {
    change((user) => {
        if (user) {
            firebaseGet('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentslidenumber/', (data) => {
                if (data != null) {
                    slider.fix_slider(data.slideid);
                }
            })
        } else {
            if (localStorage.getItem('5minuteswebsitecurrentslidenumber') == null) {
                localStorage.setItem('5minuteswebsitecurrentslidenumber', 0);
                slider.fix_slider(localStorage.getItem('5minuteswebsitecurrentslidenumber'));
            } else {
                slider.fix_slider(localStorage.getItem('5minuteswebsitecurrentslidenumber'));
            }

        }
    })
}



export function saveSlider(id) {
    if (islogged()) {
        firebaseInsert('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/' + id, {
            lessonid: id,
            complete: true
        })
        if (localStorage.getItem('5miunteswebsiteslider') == null) {
            localStorage.setItem('5miunteswebsiteslider', JSON.stringify({}));
        }
        var result = JSON.parse(localStorage.getItem('5miunteswebsiteslider'));
        result['slider_' + id] = {
            lessonid: id,
            complete: true
        }
        localStorage.setItem('5miunteswebsiteslider', JSON.stringify(result));
    } else {
        if (localStorage.getItem('5miunteswebsiteslider') == null) {
            localStorage.setItem('5miunteswebsiteslider', JSON.stringify({}));
        }
        var result = JSON.parse(localStorage.getItem('5miunteswebsiteslider'));
        result['slider_' + id] = {
            lessonid: id,
            complete: true
        }
        localStorage.setItem('5miunteswebsiteslider', JSON.stringify(result));
    }
}

export function retrieveSlider() {
    if (islogged()) {
        firebaseGet('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/', (data) => {
            if (data != null && data != undefined) {
                for (const key of Object.keys(data)) {
                    if (data[key].complete == true) {
                        slider.show_result(data[key].lessonid);
                    }
                }
            }
        })
    } else {
        var data = JSON.parse(localStorage.getItem('5miunteswebsiteslider'));
        if (data != null && data != undefined) {
            for (const key of Object.keys(data)) {
                if (data[key].complete == true) {
                    slider.show_result(data[key].lessonid);
                }
            }
        }
    }
}
export function change(func) {
    if (Auth)
        Auth.onAuthStateChanged(func);
}


export function savCode(code_text) {
    if (islogged()) {
        firebaseInsert('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentcodeconsole', {
            code: code_text
        });
        localStorage.setItem('5minuteswebsitecurrentcodeconsole', code_text);
    } else {
        localStorage.setItem('5minuteswebsitecurrentcodeconsole', code_text);
    }
}
export function getCode(callback) {
    if (islogged()) {
        firebaseGet('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentcodeconsole', (codes) => {
            if (codes != null) {
                callback(codes.code);
            }
        });
    } else {
        callback(localStorage.getItem('5minuteswebsitecurrentcodeconsole'));
    }
}

export function createUser(userid, userpass) {
    const promise = Auth.createUserWithEmailAndPassword(userid, userpass);
    promise.catch(e => alert(e.message));
}
export function signIn(userid, userpass) {
    const promise = Auth.signInWithEmailAndPassword(userid, userpass);
    promise.catch(e => alert(e.message));
}
export function signOut() {
    if (islogged()) {
        Auth.signOut();
    }
}

// change((user)=>{
//     if(user){     
//         var url = window.location.href + '?' + btoa(currentUserId());    
//         window.history.pushState({path: url}, '', url);
//         alert(window.location.href)
//     }
// })


//operational functions
if (typeof window != 'undefined') {
    $(document).ready(() => {

        var checklog = setInterval(() => {
            if ($('.login-signup-container, #button-login, #button-register, #button-edit, #button-logout, #slider, .slider-card').length > 0) {
                clearInterval(checklog);
            }
        }, 500);
        var rtrv = setInterval(() => {
            if ($('.slider-card').length > 0) {
                retrieveSlider();
                clearInterval(rtrv);
            }
        }, 500);
    })
}
export function combine() {
    change((user) => {
        if (user) {
            //insert slides
            if (typeof localStorage.getItem('5miunteswebsiteslider') != null) {
                var data = JSON.parse(localStorage.getItem('5miunteswebsiteslider'));
                if (data != null) {
                    for (const key of Object.keys(data)) {
                        if (data[key].complete == true) {
                            firebaseInsert('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/' + data[key].lessonid, {
                                complete: true,
                                lessonid: data[key].lessonid
                            });
                        }
                    }
                }
            }
            //isert codes
            firebaseGet('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentcodeconsole', (data) => {
                if (data == null && localStorage.getItem('5minuteswebsitecurrentcodeconsole') != null) {
                    firebaseInsert('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentcodeconsole', {
                        code: localStorage.getItem('5minuteswebsitecurrentcodeconsole')
                    })
                }
            })
            //insert current slide number
            firebaseGet('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentslidenumber', (data) => {
                if (data == null && localStorage.getItem('5minuteswebsitecurrentslidenumber') != null) {
                    firebaseInsert('Users/profile/' + currentUserId() + '/lessons/5minuteswebsite/currentslidenumber', {
                        slideid: localStorage.getItem('5minuteswebsitecurrentslidenumber')
                    })
                    slider.fix_slider(localStorage.getItem('5minuteswebsitecurrentslidenumber'));
                }
            })
        }

    })
}
change((user) => {
    if (user) {
        combine()
    }
})