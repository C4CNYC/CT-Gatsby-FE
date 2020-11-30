import React, { Component } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
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
import { Button } from '@material-ui/core';
import EditIcon from '!svg-react-loader!../../assets/images/svg-icons/editicon.svg?name=EditIcon';
import HomeIcons from '@material-ui/icons/HomeOutlined';
import Modal from 'react-modal';
const styles = (theme) => ({
});

var firebase;
var iframe_code, iframe_emoji;

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
        width: '100%',
        margin: '70px auto',
        padding: 0,
        border: 0,
        zIndex: 9999
    }
};

export class Profile_Top extends Component {
    constructor(props) {
        super(props);
        this.state = {
            modalOpens: false,
            code: '',
            codes: '',
            emoji: '',
            emojis: ''
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
            app = firebase.initializeApp(firebaseConfig);

        const certRef = firebase.database().ref('user_profile');

        certRef.on('value', (snapshot) => {
            let cert = snapshot.val();

            var newState = {
                modalOpens: false,
                code: cert['e19cdj6143ec8']['code'],
                codes: '',
                emoji: cert['e19cdj6143ec8']['emoji'],
                emojis: ''
            };
            iframe_code = document.getElementById('profile_top_iframe').contentWindow.document;
            iframe_code.open();
            iframe_code.write(cert['e19cdj6143ec8']['code']);
            iframe_code.close();

            iframe_emoji = document.getElementById('profile_top_emoji_iframe').contentWindow.document;
            iframe_emoji.open();
            iframe_emoji.write('<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></head><body style="text-align:center"><i class="fa" style="font-size:60px;margin-top:10px;">' + cert['e19cdj6143ec8']['emoji'] + '</i></body></html>');
            iframe_emoji.close();

            this.setState(newState);
        });

        // certRef.child('e19cdj6143ec8').update({
        //     emoji: '&#xf015;'
        // });

    }

    openaboutModal = () => {
        this.setState({
            codes: this.state.code,
            emojis: this.state.emoji,
            modalOpens: true
        });
    };
    closeaboutModal = () => {
        this.setState({
            modalOpens: false
        });
    };
    handlecode = (event) => {
        const target = event.target;
        this.setState({
            code: target.value
        });
    };
    handleemojiChange = (event) => {
        const target = event.target;
        this.setState({
            emoji: target.value
        });
    };
    saveabout = () => {
        const certRef = firebase.database().ref('user_profile');
        certRef.child('e19cdj6143ec8').update({
            code: this.state.code,
            emoji: this.state.emoji
        });

        iframe_code.open();
        iframe_code.write(this.state.code);
        iframe_code.close();

        iframe_emoji.open();
        iframe_emoji.write('<html><head><link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></head><body style="text-align:center"><i class="fa" style="font-size:70px;margin-left:5px;">' + this.state.emoji + '</i></body></html>');
        iframe_emoji.close();

        this.setState({
            modalOpens: false
        });
    };
    aboutcancel = () => {
        this.setState({
            code: this.state.codes,
            emoji: this.state.emojis,
            modalOpens: false
        });
    };
    render() {
        return (
            <div>
                {/* <div id='profile_top' className='row'>
                    <div id='topbar_left'></div>
                    <div id='topbar_right' className='col d-flex'></div>
                    <div id='happy_title'>
                        <p id='happy_text'>HAPPINESS</p>
                    </div>
                </div> */}
                <iframe id="profile_top_iframe" style={{ width: '100%' }}></iframe>
                <div style={{ height: 0, backgroundColor: 'white' }}>
                    <div id='circle_home'>
                        <div id='edit_icon'>
                            <EditIcon onClick={this.openaboutModal} style={{ top: 15 }}></EditIcon>
                        </div>
                        <div id='circle_home_icon'>
                            {/* <div className='home-icons' /> */}
                            {/* <HomeIcons className='home-icons'></HomeIcons> */}
                            <iframe id="profile_top_emoji_iframe" style={{ width: '100%', height: '100%', border: 'none' }}></iframe>
                        </div>
                    </div>
                </div>
                <Modal
                    isOpen={this.state.modalOpens}
                    onRequestClose={this.closeaboutModal}
                    style={modalStyles}
                    contentLabel='Modal'
                >
                    <div id='modal_private'>
                        <div className='row'>
                            <p style={{ color: 'black' }}>
                                <h5>PERSONALIZE</h5>
                                <br />
                                <h6>HEADER:</h6>
                                Add your own mini-website to your header.
                                <br />
                                <br />
                                TIP: Not sure what I mean? Do the <a href="#" style={{ color: 'blue' }}>5-Minute-Website</a> and paste it in here.
                            </p>
                        </div>
                        <textarea
                            name='about_me'
                            id='about_me'
                            className='txtarea'
                            rows='12'
                            value={this.state.code}
                            onChange={this.handlecode}
                            style={{ fontSize: '12px' }}
                        />
                        <div className='row'>
                            <p style={{ color: 'black' }}>
                                <h5>AVATAR:</h5>
                                Add an emoji or character by adding the code.
                                <br />
                                <br />
                                TIP: For example #128512; is a big smile emoji. <br />
                                Lear more <a href="#" style={{ color: 'blue' }}>here</a>.
                            </p>
                        </div>
                        <input
                            type='text'
                            name='emoji'
                            className='input-class'
                            value={this.state.emoji}
                            onChange={this.handleemojiChange}
                            style={{ fontSize: '12px' }}
                        />
                        <Button
                            onClick={this.saveabout}
                            className='btn-modal'
                            style={{ marginTop: '20px' }}
                        >
                            Save
                        </Button>
                        <Button
                            onClick={this.aboutcancel}
                            className='btn-modal'
                            style={{ marginTop: '20px' }}
                        >
                            Cancel
                        </Button>
                    </div>
                </Modal>
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
)(withStyles(styles)(Profile_Top));
