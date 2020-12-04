import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import {
    hardGoTo as navigate,
    isSignedInSelector,
    navigatorPositionChange,
    navigatorPositionSelector,
    navigatorShapeChange,
    navigatorShapeSelector,
    userFetchStateSelector,
    userSelector
} from '../../state';
import EditIcon from '!svg-react-loader!../../assets/images/svg-icons/editicon.svg?name=EditIcon';
import HomeIcons from '@material-ui/icons/HomeOutlined';
import LockIcon from '@material-ui/icons/Lock';

import Modal from 'react-modal';

// import firebase from '../../utils/firebase.js';

var firebase;

const styles = (theme) => ({});

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.58)'
    },
    content: {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        width: '75%',
        margin: '32px auto',
        padding: 0,
        border: 0,
        zIndex: 9999
    }
};

export class Profile_Middle extends Component {
    constructor(props) {
        super(props);
        this.state = {
            edit: false,
            aboutme: '',
            aboutmes: '',
            reason: '',
            reasons: '',
            username: '',
            usernames: ''
        };
    };

    componentDidMount() {

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
        if (!firebase.apps.length)
            firebase.initializeApp(firebaseConfig);

        const certRef = firebase.database().ref('user_profile');
        certRef.on('value', (snapshot) => {
            let cert = snapshot.val();

            var newState = {
                edit: false,
                aboutme: cert['e19cdj6143ec8']['about'],
                aboutmes: '',
                reason: cert['e19cdj6143ec8']['reason'],
                reasons: '',
                username: cert['e19cdj6143ec8']['username'],
                usernames: '',
            };

            this.setState(newState);
        });

        // certRef.child('e19cdj6143ec8').update({
        //     about: 'student',
        //     reason: 'hobby',
        //     username: 'John',
        // });


    }

    editValue = () => {
        this.setState({
            edit: true,
            aboutmes: this.state.aboutme,
            reasons: this.state.reason,
            usernames: this.state.username,
        });
    };
    handleaboutme = (event) => {
        const target = event.target;
        this.setState({
            aboutme: target.value
        });
    };
    handleusername = (event) => {
        const target = event.target;
        this.setState({
            username: target.value
        });
    };
    handlereasonChange = (event) => {
        const target = event.target;
        this.setState({
            reason: target.value
        });
    };
    saveabout = () => {
        const certRef = firebase.database().ref('user_profile');

        certRef.child('e19cdj6143ec8').update({
            about: this.state.aboutme,
            reason: this.state.reason,
            username: this.state.username,
        });

        this.setState({
            edit: false
        });
    };
    aboutcancel = () => {
        this.setState({
            edit: false,
            aboutme: this.state.aboutmes,
            reason: this.state.reasons,
            username: this.state.usernames,
        });
    };
    render() {
        return (
            <div id='profile_middle'>
                <div className='row title-body d-flex justify-content-between'>
                    <p className='title' style={{ marginLeft: 0 }}>USERNAME:</p>
                    <div className='edit_icon'>
                        {this.state.edit == false && <EditIcon onClick={this.editValue}></EditIcon>}
                    </div>
                    <input
                        type='text'
                        name='username'
                        className='input-class'
                        disabled={!this.state.edit}
                        value={this.state.username}
                        onChange={this.handleusername}
                        style={{ marginBottom: 20 }}
                    />
                    {/* <p className='title-data' style={{ color: 'red', fontSize: '20px' }}>@typetips</p> */}
                </div>
                <div className='row title-body'>
                    <p className='title' style={{ marginLeft: 0 }}>POINTS:</p>
                    <p className='title-data' style={{ marginLeft: 0 }}>145</p>
                </div>
                <div className='row title-body'>
                    <p className='title' style={{ marginLeft: 0 }}>JOINED:</p>
                    <p className='title-data' style={{ marginLeft: 0 }}>May 2020</p>
                </div>
                <div className='row d-flex justify-content-between'>
                    <p className='title' style={{ marginLeft: 0 }}>ABOUT ME</p>
                </div>
                <textarea
                    name='about_me'
                    id='about_me'
                    className='txtarea'
                    rows='3'
                    disabled={!this.state.edit}
                    value={this.state.aboutme}
                    onChange={this.handleaboutme}
                />
                <div className='row title-body'>
                    <p className='title' style={{ marginLeft: 0 }}>COUNTRY:</p>
                    <p className='title-data' style={{ marginLeft: 0 }}>France</p>
                </div>
                <div className='row'>
                    <p className='title' style={{ marginLeft: 0 }}>WHY I’M LEARNING CODING?</p>
                </div>
                <textarea
                    name='reason'
                    id='reason'
                    className='txtarea'
                    rows='2'
                    disabled={!this.state.edit}
                    value={this.state.reason}
                    onChange={this.handlereasonChange}
                />
                {this.state.edit == true && <Button onClick={this.aboutcancel} className='btn-modal-cancel'>Cancel</Button>}
                {this.state.edit == true && <Button onClick={this.saveabout} className='btn-modal'>Save</Button>}
            </div>
        );
    }
}
const mapDispatchToProps = {
    navigate,
    navigatorPositionChange,
    navigatorShapeChange
};
const mapStateToProps = createSelector(
    userFetchStateSelector,
    isSignedInSelector,
    userSelector,
    navigatorPositionSelector,
    navigatorShapeSelector,
    (fetchState, isSignedIn, user, navigatorPosition, navigatorShape) => ({
        fetchState,
        isSignedIn,
        user,
        navigatorPosition,
        navigatorShape
    })
);
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(Profile_Middle));
