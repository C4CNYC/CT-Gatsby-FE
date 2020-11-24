import React from 'react'
import ReactDOM from 'react-dom'
import './loginSignupPanel.css';
import $ from 'jquery';
import happyrobot from './img/robot_avatar_happy.png'
import * as Auth from './authmanager.js';
export const Aftersignup = () => (

    <div id="aftersignupPanel" style={{
        height: '400px',
        minWidth: '400px',
        backgroundColor: 'white',
        marginTop: '10px',
        padding: '15px',
        textAlign: 'center',
        justifyContent: 'center'
    }}>

        <div style={{
            display: "flex",
            justifyContent: "center",
            position: 'relative'
        }}>
            <h2 style={{ color: 'black', fontSize: '20px', flex: 0.8 }}>WELCOME! <div style={{ fontSize: "16px", }}>WE’RE SO EXCITED.</div></h2>
            <div style={{
                position: 'absolute',
                right: 0,
                top: '9px',
                cursor: 'pointer',
                color: 'gray',
                padding: '5px',
                fontSize: '25px',
                fontWeight: 'bold',
            }} className="clear-login-panel"
                onClick={() => Auth.clearShadow()}>X</div>
        </div>
        <div className="input-box" >
            <label style={{
                fontSize: '16px',
                width: '60%',
                margin: '10px auto'
            }}>Wanna add your email now so we can send you your certificate?</label>
        </div>

        <div className="input-box">
            <input type="text" name="email" id="email" placeholder="Email" />
        </div>

        <div style={{ color: '#364954', cursor: 'pointer', margin: '5px', marginTop: '20px', fontSize: '11px' }} onClick={() => { }}>I AGREE TO THE  <a href="">TERMS AND CONDITIONS.</a></div>
        <div className="input-box">
            <button style={{ backgroundColor: '#A6A6A6', marginTop: '20px', width: '100%', flex: 0.3 }} onClick={() => {
                ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
                ReactDOM.render(<Signupsuccessfull />, document.querySelector('.hide-body-shadow'));
            }}>LATER</button>
            <button style={{ backgroundColor: '#43D4DD', marginTop: '20px', width: '100%', flex: 0.6 }} onClick={() => {
                var info = Auth.getValue('#aftersignupPanel input[type="text"]');
                Auth.firebaseUpdate('Users/profile/' + Auth.currentUserId(), {
                    email: info[0] || Auth.currentUserId() + "@codetribe.org",
                });
                ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
                ReactDOM.render(<Signupsuccessfull />, document.querySelector('.hide-body-shadow'));
            }}>LET’S DO IT.</button>
        </div>
        <div style={{ color: '#364954', cursor: 'pointer', margin: '5px', marginTop: '20px', fontSize: '11px' }} >We will never sell your information. </div>

    </div>


)

export const Signupsuccessfull = () => (
    <div id="signupsuccessPanel" className="bottom-arrow" style={{
        height: '200px',
        width: '400px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop: '10px',
        padding: '15px',
        textAlign: 'center',
        position: 'relative',
    }}>
        <h2 style={{ color: 'black', fontSize: '20px', margin: '15px' }}>SIGNUP SUCCESSFULL</h2>
        <span style={{ color: 'black', margin: '8px' }}>Welcome aboard {Auth.getCookie('user_firstname')}</span><br /><br />
        <div className="input-box">
            <button style={{ backgroundColor: '#ff6a00' }} onClick={() => {
                location.reload();
            }}>OK</button>
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
            <img src={happyrobot} alt="" style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                left: '-50%',
            }} />
        </div>
    </div>
)

export const Signupfailed = (props) => (
    <div id="loginsuccessPanel" className="bottom-arrow" style={{
        height: '200px',
        width: '400px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop: '10px',
        padding: '15px',
        textAlign: 'center',
        position: 'relative',
    }}>
        <h2 style={{ color: 'black', fontSize: '20px', margin: '15px' }}>SIGNUP FAILED</h2>
        <span style={{ color: 'black', margin: '8px' }}>{props.message}</span><br /><br />
        <div className="input-box">
            <button style={{ backgroundColor: '#ff6a00' }} onClick={() => {
                ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
                $('.login-signup-container').css({ 'z-index': 2000 });
            }}>OK</button>
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
            <img src={happyrobot} alt="" style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                left: '-50%',
            }} />
        </div>
    </div>
)
export const Loginsuccessfull = () => (
    <div id="loginsuccessPanel" className="bottom-arrow" style={{
        height: '200px',
        width: '400px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop: '10px',
        padding: '15px',
        textAlign: 'center',
        position: 'relative',
    }}>
        <h2 style={{ color: 'black', fontSize: '20px', margin: '15px' }}>LOGIN SUCCESSFULL</h2>
        <span style={{ color: 'black', margin: '8px' }}>Welcome back {Auth.getCookie('user_firstname')}</span><br /><br />
        <div className="input-box">
            <button style={{ backgroundColor: '#ff6a00' }} onClick={() => {
                location.reload();
            }}>OK</button>
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
            <img src={happyrobot} alt="" style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                left: '-50%',
            }} />
        </div>
    </div>
)


export const Loginfailed = (props) => (
    <div id="loginsuccessPanel" className="bottom-arrow" style={{
        height: '200px',
        width: '400px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        marginTop: '10px',
        padding: '15px',
        textAlign: 'center',
        position: 'relative',
    }}>
        <h2 style={{ color: 'black', fontSize: '20px', margin: '15px' }}>LOGIN FAILED</h2>
        <span style={{ color: 'black', margin: '8px' }}>{props.message}</span><br /><br />
        <div className="input-box">
            <button style={{ backgroundColor: '#ff6a00' }} onClick={() => {
                ReactDOM.unmountComponentAtNode(document.querySelector('.hide-body-shadow'));
                $('.login-signup-container').css({ 'z-index': 2000 });
            }}>OK</button>
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
            <img src={happyrobot} alt="" style={{
                height: '100%',
                width: '100%',
                position: 'relative',
                left: '-50%',
            }} />
        </div>
    </div>
)