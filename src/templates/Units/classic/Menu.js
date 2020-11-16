import React from 'react';
import ReactDOM from 'react-dom'

import FaceIcon from '@material-ui/icons/Face';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBookReader } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserAlt } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

import Signup from '../components/signup.js';
import Login from '../components/login.js';
import Profile from '../components/profile.js';
import SessionReset from '../components/sessionReset.js';
import Logout from '../components/logout.js';
import * as Auth from '../components/authmanager.js';

export const Menu = () => {

  if (Auth.islogged()) {
    return (
      <div id="login-signup">
        <h2>HELLO</h2>
        <h4>MENU</h4>
        <ul className="login-signup-menu">
          <li><a href=""><FontAwesomeIcon icon={faHome} className="login-signup-icon" />HOMEPAGE</a></li>
          <li><a href=""><FontAwesomeIcon icon={faBookReader} className="login-signup-icon" />Explore Projects</a></li>
          <li><a href="" onClick={() => {
            ReactDOM.render(<SessionReset />, document.querySelector('.hide-body-shadow'));
            $('.login-signup-container').css({ 'z-index': 0 });
          }}><FontAwesomeIcon icon={faUndo} className="login-signup-icon" />Reset Current Lesson</a></li>
          <li><a href=""><FontAwesomeIcon icon={faImages} className="login-signup-icon" /> Code Gallery</a></li>
        </ul>
        <h4>MY PROFILE</h4>
        <ul className="login-signup-menu">
          <li id="button-edit"><a href="" onClick={() => {
            ReactDOM.render(<Profile />, document.querySelector('.hide-body-shadow'));
            $('.login-signup-container').css({ 'z-index': 0 });
            Auth.getProfile();
          }}> <FontAwesomeIcon icon={faUserAlt} className="login-signup-icon" />Edit my profile</a></li>
          <li><a href=""><FaceIcon className="login-signup-icon" />Instrcutor<span className="pest-button">Robot</span><span className="dark-gray-button">Lego</span></a></li>
          <li id="button-logout"><a href="" onClick={() => {
            ReactDOM.render(<Logout />, document.querySelector('.hide-body-shadow'));
            $('.login-signup-container').css({ 'z-index': 0 });
          }}><FontAwesomeIcon icon={faSignInAlt} className="login-signup-icon" />Logout</a></li>
        </ul>
        <label style={{ color: 'black', cursor: 'pointer' }}>View as mobile</label>
        <div id="close-button" onClick={() => {
          $('.login-signup-container').css({
            flex: '0.000468823 1 0%'
          }).removeClass('login-signup-panel-visible')
          $('.hide-body-shadow').remove();
        }}>X</div>
      </div>
    )
  } else {
    return (
      <div id="login-signup">
        <h2>HELLO</h2>
        <h4>MENU</h4>
        <ul className="login-signup-menu">
          <li><a href=""><FontAwesomeIcon icon={faHome} className="login-signup-icon" />HOMEPAGE</a></li>
          <li><a href=""><FontAwesomeIcon icon={faBookReader} className="login-signup-icon" />Explore Projects</a></li>
          <li><a href="" onClick={() => {
            ReactDOM.render(<SessionReset />, document.querySelector('.hide-body-shadow'));
            $('.login-signup-container').css({ 'z-index': 0 });
          }}><FontAwesomeIcon icon={faUndo} className="login-signup-icon" />Reset Current Lesson</a></li>
          <li><a href=""><FontAwesomeIcon icon={faImages} className="login-signup-icon" /> Code Gallery</a></li>
        </ul>
        <h4>MY PROFILE</h4>
        <ul className="login-signup-menu">
          <li className="same-row" id="button-login"><a href="" onClick={
            () => {
              ReactDOM.render(<Login />, document.querySelector('.hide-body-shadow'));
              $('.login-signup-container').css({ 'z-index': 0 });
            }
          }><FontAwesomeIcon icon={faSignInAlt} className="login-signup-icon" />Login</a></li>
          <li className="same-row" id="button-register"><a href="" onClick={
            () => {
              ReactDOM.render(<Signup />, document.querySelector('.hide-body-shadow'));
              $('.login-signup-container').css({ 'z-index': 0 });
            }
          }><FontAwesomeIcon icon={faSignInAlt} className="login-signup-icon" />Register</a></li>
          <li><a href=""><FaceIcon className="login-signup-icon" />Instrcutor<span className="pest-button">Robot</span><span className="dark-gray-button">Lego</span></a></li>
        </ul>
        <label style={{ color: 'black', cursor: 'pointer' }}>View as mobile</label>
        <div id="close-button" onClick={() => {
          $('.login-signup-container').css({
            flex: '0.000468823 1 0%'
          }).removeClass('login-signup-panel-visible')
          $('.hide-body-shadow').remove();
        }}>X</div>
      </div>
    )
  }
}
export default Menu