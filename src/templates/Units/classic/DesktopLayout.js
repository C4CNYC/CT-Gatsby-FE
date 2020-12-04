import React, { Component } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import PropTypes from 'prop-types';

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
        <div className="login-signup-container">
          <Menu />
        </div>
      </ReflexContainer>
    );
  }
}

DesktopLayout.displayName = 'DesktopLayout';
DesktopLayout.propTypes = propTypes;

export default DesktopLayout;
