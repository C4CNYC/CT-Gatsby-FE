import React from 'react';
import $ from 'jquery';

// global functions
export function setCookie(cname, cvalue, exdays) {
    var d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    var expires = "expires="+d.toUTCString();
    document.cookie = cname + "=" + cvalue + ";" + expires + ";path=/";
}

export function getCookie(cname) {
var name = cname + "=";
var ca = document.cookie.split(';');
for(var i = 0; i < ca.length; i++) {
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

export function firebaseInsert(state ,data){
    firebase.database().ref(state).set(data);
}
export function firebaseUpdate(state ,data){
    firebase.database().ref(state).update(data);
}
export function firebaseGet(state){
    var data;
    firebase.database().ref(state).on('value', function(snapshot){
       data = snapshot.val();
    });
    return data;
}
export function firebaseRemove(state){
    firebase.database().ref(state).remove();
}
// $(document).ready(()=>alert('Document is ready'));
export function test(){
    alert('Document is ready')
}