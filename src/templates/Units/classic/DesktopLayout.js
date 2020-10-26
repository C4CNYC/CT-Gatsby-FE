import React, { Component } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import PropTypes from 'prop-types';
import SpringScrollbars from '../../../components/SpringScrollbars';
import '../components/loginSignupPanel.css';
import FaceIcon from '@material-ui/icons/Face';

import ReactDOM from 'react-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHome } from '@fortawesome/free-solid-svg-icons'
import { faBookReader } from '@fortawesome/free-solid-svg-icons'
import { faUndo } from '@fortawesome/free-solid-svg-icons'
import { faImages } from '@fortawesome/free-solid-svg-icons'
import { faSignInAlt } from '@fortawesome/free-solid-svg-icons'
import { faUserCircle } from '@fortawesome/free-solid-svg-icons'
import $ from 'jquery';

import Signup from '../components/signup.js';
import Login from '../components/login.js';
import Profile from '../components/profile.js';
import SessionReset from '../components/sessionReset.js';
import Logout from '../components/logout.js';

const propTypes = {
  unitFile: PropTypes.shape({
    key: PropTypes.string
  }),
  editor: PropTypes.element,
  hasPreview: PropTypes.bool,
  instructions: PropTypes.element,
  preview: PropTypes.element,
  resizeProps: PropTypes.shape({
    onStopResize: PropTypes.func,
    onResize: PropTypes.func
  }),
  testOutput: PropTypes.element
};

class DesktopLayout extends Component {
  render() {
    const {
      resizeProps,
      instructions,
      unitFile,
      editor,
      testOutput,
      hasPreview,
      preview
    } = this.props;
    return (
      <ReflexContainer className='desktop-layout' orientation='vertical'>
        <ReflexElement flex={1} {...resizeProps}>
           {instructions}
        </ReflexElement>
        <ReflexSplitter propagate={true} {...resizeProps} />
        <ReflexElement flex={1} {...resizeProps}>
          {unitFile && (
            <ReflexContainer key={unitFile.key} orientation='horizontal'>
              <ReflexElement
                flex={1}
                propagateDimensions={true}
                renderOnResize={true}
                renderOnResizeRate={20}
                {...resizeProps}
              >
                {editor}
              </ReflexElement>
              {/*<ReflexSplitter propagate={true} {...resizeProps} />*/}
              {/*<ReflexElement*/}
              {/*  flex={0.25}*/}
              {/*  propagateDimensions={true}*/}
              {/*  renderOnResize={true}*/}
              {/*  renderOnResizeRate={20}*/}
              {/*  {...resizeProps}*/}
              {/*>*/}
              {/*  {testOutput}*/}
              {/*</ReflexElement>*/}
            </ReflexContainer>
          )}
        </ReflexElement>
        {hasPreview && <ReflexSplitter propagate={true} {...resizeProps} />}
        {hasPreview && (
          <ReflexElement flex={0.7} {...resizeProps}>
            {preview}
          </ReflexElement>
        )}
        <ReflexElement className="login-signup-container">
           <div id="login-signup">
             <h2>HELLO</h2>
             <h4>MENU</h4>
                <ul className="login-signup-menu">
                  <li><a href=""><FontAwesomeIcon icon={faHome} className="login-signup-icon"/>HOMEPAGE</a></li>
                  <li><a href=""><FontAwesomeIcon icon={faBookReader} className="login-signup-icon"/>Explore Projects</a></li>
                  <li><a href="" onClick={()=>{
                    ReactDOM.render(<SessionReset/>, document.querySelector('.hide-body-shadow'));
                    $('.login-signup-container').css({'z-index': 0});
                  }}><FontAwesomeIcon icon={faUndo} className="login-signup-icon"/>Reset Current Lesson</a></li>
                  <li><a href=""><FontAwesomeIcon icon={faImages} className="login-signup-icon"/> Code Gallery</a></li>                  
                </ul>       
                <h4>MY PROFILE</h4>
                <ul className="login-signup-menu">                 
                  <li className="same-row"><a href="" onClick={
                    ()=>{
                    ReactDOM.render(<Login />, document.querySelector('.hide-body-shadow'));                      
                    $('.login-signup-container').css({'z-index': 0});
                  }
                  }><FontAwesomeIcon icon={faSignInAlt} className="login-signup-icon"/>Login</a></li>
                  <li className="same-row"><a href="" onClick={
                    ()=>{
                      ReactDOM.render(<Signup />, document.querySelector('.hide-body-shadow'));                      
                      $('.login-signup-container').css({'z-index': 0});
                    }
                  }><FontAwesomeIcon icon={faSignInAlt} className="login-signup-icon"/>Register</a></li>
                  <li><a href="" onClick={()=>{
                    ReactDOM.render(<Profile />, document.querySelector('.hide-body-shadow'));
                    $('.login-signup-container').css({'z-index': 0});
                  }}> <FontAwesomeIcon icon={faUserCircle} className="login-signup-icon"/>Edit my profile</a></li>
                  <li><a href=""><FaceIcon className="login-signup-icon" />Instrcutor<span className="pest-button">Robot</span><span className="dark-gray-button">Lego</span></a></li>
                  <li><a href="" onClick={()=>{
                      ReactDOM.render(<Logout />, document.querySelector('.hide-body-shadow'));                      
                      $('.login-signup-container').css({'z-index': 0});
                  }}><FontAwesomeIcon icon={faSignInAlt} className="login-signup-icon"/>Logout</a></li>
                </ul>
                <div id="close-button" onClick={()=>{                       
                    $('.login-signup-container').css({
                      flex: '0.000468823 1 0%'
                    }).removeClass('login-signup-panel-visible')
                    $('.hide-body-shadow').remove();
                }}>X</div>
           </div>
        </ReflexElement>
      </ReflexContainer>
    );
  }
}

DesktopLayout.displayName = 'DesktopLayout';
DesktopLayout.propTypes = propTypes;

export default DesktopLayout;
