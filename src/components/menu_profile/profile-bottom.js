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

export class Profile_Bottom extends Component {
    state = {
        edit: false,
        firstname: '',
        firstnames: '',
        lastname: '',
        lastnames: '',
        email: '',
        emails: '',
        country: '',
        countrys: '',
        phone: '',
        phones: '',
        schoolname: '',
        schoolnames: '',
        city: '',
        citys: ''
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
            app = firebase.initializeApp(firebaseConfig);

        const certRef = firebase.database().ref('user_profile');
        certRef.on('value', (snapshot) => {
            let cert = snapshot.val();

            var newState = {
                edit: false,
                firstname: cert['e19cdj6143ec8']['firstname'],
                firstnames: '',
                lastname: cert['e19cdj6143ec8']['lastname'],
                lastnames: '',
                email: cert['e19cdj6143ec8']['email'],
                emails: '',
                country: cert['e19cdj6143ec8']['country'],
                countrys: '',
                phone: cert['e19cdj6143ec8']['phone'],
                phones: '',
                schoolname: cert['e19cdj6143ec8']['schoolname'],
                schoolnames: '',
                city: cert['e19cdj6143ec8']['city'],
                citys: ''
            };

            this.setState(newState);
        });

    }

    editValue = () => {
        this.setState({
            firstnames: this.state.firstname,
            lastnames: this.state.lastname,
            emails: this.state.email,
            countrys: this.state.country,
            phones: this.state.phone,
            schoolnames: this.state.schoolname,
            citys: this.state.city,
            edit: true
        });
    };
    save = () => {
        const certRef = firebase.database().ref('user_profile');
        certRef.child('e19cdj6143ec8').update({
            firstname: this.state.firstname,
            lastname: this.state.lastname,
            email: this.state.email,
            country: this.state.country,
            phone: this.state.phone,
            schoolname: this.state.schoolname,
            city: this.state.city,
        });
        this.setState({
            edit: false
        });
    };
    cancel = () => {
        this.setState({
            firstname: this.state.firstnames,
            lastname: this.state.lastnames,
            email: this.state.emails,
            country: this.state.countrys,
            phone: this.state.phones,
            schoolname: this.state.schoolnames,
            city: this.state.citys,
            edit: false
        });
    };
    handlefirstnameChange = (event) => {
        const target = event.target;
        this.setState({
            firstname: target.value
        });
    };
    handlelastnameChange = (event) => {
        const target = event.target;
        this.setState({
            lastname: target.value
        });
    };
    handleemailChange = (event) => {
        const target = event.target;
        this.setState({
            email: target.value
        });
    };
    handlecountryChange = (event) => {
        const target = event.target;
        this.setState({
            country: target.value
        });
    };
    handlephoneChange = (event) => {
        const target = event.target;
        this.setState({
            phone: target.value
        });
    };
    handleschoolnameChange = (event) => {
        const target = event.target;
        this.setState({
            schoolname: target.value
        });
    };
    handlecityChange = (event) => {
        const target = event.target;
        this.setState({
            city: target.value
        });
    };
    render() {
        return (
            <div>
                <div id='bottom_top'>
                    <p id='public_title'>
                        This part is private. It is NOT public.
                    </p>
                    <div id='circle_lock'>
                        <div id='circle_lock_icon'>
                            <div className='lock_icon'>
                                <LockIcon className='lockicon' width='24' height='24'></LockIcon>
                            </div>
                        </div>
                    </div>
                    <div id='bottom_edit_icon'>
                        {this.state.edit == false && <EditIcon onClick={this.editValue}></EditIcon>}
                    </div>
                </div>
                <div id='bottom_bar'>
                    <div className='bottom-title-body'>
                        <p className='title'>FIRST NAME</p>
                        <input
                            type='text'
                            name='firstname'
                            className='input-class'
                            disabled={!this.state.edit}
                            value={this.state.firstname}
                            onChange={this.handlefirstnameChange}
                        />
                    </div>
                    <div className='bottom-title-body'>
                        <p className='title'>LAST NAME</p>
                        <input
                            type='text'
                            name='lastname'
                            className='input-class'
                            disabled={!this.state.edit}
                            value={this.state.lastname}
                            onChange={this.handlelastnameChange}
                        />
                    </div>
                    <div className='bottom-title-body'>
                        <p className='title'>EMAIL(Optional)</p>
                        <input
                            type='email'
                            name='email'
                            className='input-class'
                            disabled={!this.state.edit}
                            value={this.state.email}
                            onChange={this.handleemailChange}
                        />
                    </div>
                    <div className='bottom-title-body'>
                        <p className='title'>COUNTRY</p>
                        <input
                            type='text'
                            name='country'
                            className='input-class'
                            disabled={!this.state.edit}
                            value={this.state.country}
                            onChange={this.handlecountryChange}
                        />
                    </div>
                    <div className='bottom-title-body'>
                        <p className='title'>PHONE (Optional)</p>
                        <input
                            type='text'
                            name='phone'
                            className='input-class'
                            disabled={!this.state.edit}
                            value={this.state.phone}
                            onChange={this.handlephoneChange}
                        />
                    </div>
                    <div className='bottom-title-body'>
                        <p className='title'>SCHOOL NAME</p>
                        <input
                            type='text'
                            name='schoolname'
                            className='input-class'
                            disabled={!this.state.edit}
                            value={this.state.schoolname}
                            onChange={this.handleschoolnameChange}
                        />
                    </div>
                    <div className='bottom-title-body'>
                        <p className='title'>CITY</p>
                        <input
                            type='text'
                            name='cityname'
                            className='input-class'
                            disabled={!this.state.edit}
                            value={this.state.city}
                            onChange={this.handlecityChange}
                        />
                    </div>
                    {this.state.edit == true && <Button onClick={this.save} className='btn-modal'>Save</Button>}
                    {this.state.edit == true && <Button onClick={this.cancel} className='btn-modal'>Cancel</Button>}
                </div>
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
)(withStyles(styles)(Profile_Bottom));
