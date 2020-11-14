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
import * as Auth from '../components/authmanager.js';
import Menu from './Menu.js';

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
          <Menu />
        </ReflexElement>
      </ReflexContainer>
    );
  }
}

DesktopLayout.displayName = 'DesktopLayout';
DesktopLayout.propTypes = propTypes;

export default DesktopLayout;
