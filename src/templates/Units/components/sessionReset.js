import React from 'react'
import ReactDOM from 'react-dom'
import './loginSignupPanel.css';
import $ from 'jquery';
import robot from './img/robot_avatar_scared.png'
import * as Auth from '../utils/authmanager.js';


const login = () => (
    <div id="resetPanel" className="bottom-arrow" style={{
        height: '200px',
        minWidth: '400px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop: '200px',
        padding: '15px',
        textAlign: 'center',
        position: 'relative'
    }}>
        <h2 style={{ color: 'black', fontSize: '20px' }}>ARE YOU SURE YOU WANT TO RESET<br />THIS LESSON?</h2>
        <div className="input-box">
            <button style={{ backgroundColor: '#777' }} onClick={() => {
                Auth.clearShadow();
            }}>HMMM, MAYBE NOT</button>
            <button style={{ backgroundColor: '#ff6a00' }} onClick={() => {
                if (Auth.islogged()) {
                    Auth.firebaseRemove('Users/profile/' + Auth.currentUserId() + '/lessons/5minuteswesbite/');
                } else {
                    localStorage.setItem('slider', '');
                }
                location.reload();
            }}>YES</button>
        </div><br /><br />
        <div style={{
            position: 'absolute',
            top: '5px',
            right: '10px',
            cursor: 'pointer',
            color: 'gray',
            padding: '5px',
            fontSize: '25px',
            fontWeight: 'bold'
        }} className="clear-login-panel"
            onClick={() => {
                ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
                $('.login-signup-container').css({ 'z-index': 2000 });
            }}>X</div>
        <div style={{
            height: '150px',
            width: '150px',
            position: 'absolute',
            top: '105%',
            left: '50%',
        }}>
            <img src={robot} alt="" style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                left: '-50%',
            }} />
        </div>
    </div>
)
export default login