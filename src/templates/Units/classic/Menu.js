import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom'

import $ from 'jquery';

import Signup from '../components/signup.js';
import Login from '../components/login.js';
import Profile from '../components/profile.js';
import SessionReset from '../components/sessionReset.js';
import Logout from '../components/logout.js';
import * as Auth from '../components/authmanager.js';
import ChildCareIcon from '@material-ui/icons/ChildCare';
import EmojiPeopleIcon from '@material-ui/icons/EmojiPeople';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import MenuIcon from '@material-ui/icons/Menu';
import ExploreOutlinedIcon from '@material-ui/icons/ExploreOutlined';
import CardMembershipIcon from '@material-ui/icons/CardMembership';
import PhotoLibraryOutlinedIcon from '@material-ui/icons/PhotoLibraryOutlined';
import SettingsOutlinedIcon from '@material-ui/icons/SettingsOutlined';
import MonetizationOnOutlinedIcon from '@material-ui/icons/MonetizationOnOutlined';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavoriteBorderOutlinedIcon from '@material-ui/icons/FavoriteBorderOutlined';
export const Menu = () => {
  const [profile, setProfile] = useState({});
  useEffect(() => {
    if (Auth.islogged()) Auth.getProfile().then((profile) => {
      setProfile(profile)
    }).catch((err) => console.log("error ", err))
  })

  const showSignUp = () => {
    ReactDOM.render(<Signup />, document.querySelector('.hide-body-shadow'));
    $('.login-signup-container').css({ 'z-index': 0 });
  }
  const showSessionReset = () => {
    ReactDOM.render(<SessionReset />, document.querySelector('.hide-body-shadow'));
    $('.login-signup-container').css({ 'z-index': 0 });
  }
  const showLogin = () => {
    ReactDOM.render(<Login />, document.querySelector('.hide-body-shadow'));
    $('.login-signup-container').css({ 'z-index': 0 });
  }
  const closeMenu = () => {
    $('.login-signup-container').css({
      flex: '0.000468823 1 0%'
    }).removeClass('login-signup-panel-visible')
    $('.hide-body-shadow').remove();
  }
  const logout = () => {
    ReactDOM.render(<Logout />, document.querySelector('.hide-body-shadow'));
    $('.login-signup-container').css({ 'z-index': 0 });
  }
  const editProfile = () => {
    console.log(profile)
    ReactDOM.render(<Profile profile={profile} />, document.querySelector('.hide-body-shadow'));
    $('.login-signup-container').css({ 'z-index': 0 });
  }


  if (Auth.islogged()) {
    return (
      <div id="login-signup">
        <h2>HELLO {profile.firstname}</h2>
        <ul className="login-signup-menu">
          <li><a href="" onClick={() => { }}><ExploreOutlinedIcon className="login-signup-icon" /><div>What’s poppin’ ?<p>PROJECTS PAGE</p></div></a></li>
        </ul>
        <div className="cross-line">_________________</div>
        <ul className="login-signup-menu">
          <li><a href="" onClick={editProfile}><EmojiPeopleIcon className="login-signup-icon" /><div>Me, me, me<p>PROFILE</p></div></a></li>
          <li><a href="" onClick={() => { }}><CardMembershipIcon className="login-signup-icon" /><div>To get framed<p>CERTIFICATES</p></div></a></li>
          <li><a href="" onClick={() => { }}><PhotoLibraryOutlinedIcon className="login-signup-icon" /><div>Fun Stuff<p>GALLERY</p></div></a></li>
          <li><a href="" onClick={() => { }}><SettingsOutlinedIcon className="login-signup-icon" /><div>Stuff, stuff<p>SETTINGS</p></div></a></li>
          <li><a href="" onClick={() => { }}><MonetizationOnOutlinedIcon className="login-signup-icon" /><div>Money, money<p>BILLING</p></div></a></li>
          <li><a href="" onClick={logout}><ExitToAppIcon className="login-signup-icon" /><div>Get me out of here<p>LOG OUT</p></div></a></li>
          <li><a href="" onClick={() => { }}><FavoriteBorderOutlinedIcon className="login-signup-icon" />Need a hug?</a></li>
          <li><a href="" onClick={() => { }}><GroupAddOutlinedIcon className="login-signup-icon" />Invite Friends</a></li>
        </ul>
        <div id="close-button" onClick={closeMenu}>X</div>
      </div>
    )
  } else {
    return (
      <div id="login-signup">
        <h2>HELLO</h2>
        <ul className="login-signup-menu">
          <li><a href="" onClick={showSignUp}><ChildCareIcon className="login-signup-icon" /><div>I’m brand new<p>REGISTER</p></div></a></li>
          <li><a href="" onClick={showLogin}><EmojiPeopleIcon className="login-signup-icon" /><div>I’ve been here before<p>LOGIN</p></div></a></li>
        </ul>
        <div className="cross-line">_________________</div>
        <ul className="login-signup-menu">
          <li><a href="" onClick={() => { }}><GroupAddOutlinedIcon className="login-signup-icon" />Invite Friends</a></li>
        </ul>
        <div className="cross-line">_________________</div>
        <ul className="login-signup-menu">
          <li><a href="" onClick={() => { }}><MenuIcon className="login-signup-icon" />See the Menu</a></li>
        </ul>
        <div id="close-button" onClick={closeMenu}>X</div>
      </div>
    )
  }
}
export default Menu