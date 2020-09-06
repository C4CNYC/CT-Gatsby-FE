import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import './tool-panel.css';
import { openModal, executeUnit } from '../redux';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      executeUnit,
      openHelpModal: () => openModal('help'),
      openVideoModal: () => openModal('video'),
      openResetModal: () => openModal('reset')
    },
    dispatch
  );

const propTypes = {
  executeUnit: PropTypes.func.isRequired,
  guideUrl: PropTypes.string,
  isMobile: PropTypes.bool,
  openHelpModal: PropTypes.func.isRequired,
  openResetModal: PropTypes.func.isRequired,
  openVideoModal: PropTypes.func.isRequired,
  videoUrl: PropTypes.string
};

function ToolPanel({
  executeUnit,
  isMobile,
  openHelpModal,
  openVideoModal,
  openResetModal,
  guideUrl,
  videoUrl
}) {
  return (
    <Fragment>
      <div
        className={`tool-panel-group button-group ${
          isMobile ? 'tool-panel-group-mobile' : ''
        }`}
      >
        {/*<Button  onClick={executeUnit}>*/}
        {/*  {isMobile ? 'Run' : 'Run the Tests'}*/}
        {/*</Button>*/}
        <Button  className='btn-invert' onClick={openResetModal}>
          {isMobile ? 'Reset' : 'Reset All Code'}
        </Button>
        <Menu
          open={false}
          className='btn-invert'
          id='get-help-dropdown'
          title={isMobile ? 'Help' : 'Get Help'}
        >
          {guideUrl ? (
            <MenuItem className='btn-invert' href={guideUrl} target='_blank'>
              {'Get a Hint'}
            </MenuItem>
          ) : null}
          {videoUrl ? (
            <MenuItem className='btn-invert' onClick={openVideoModal}>
              {'Watch a video'}
            </MenuItem>
          ) : null}
          <MenuItem className='btn-invert' onClick={openHelpModal}>
            {'Ask for help'}
          </MenuItem>
        </Menu>
      </div>
    </Fragment>
  );
}

ToolPanel.displayName = 'ToolPanel';
ToolPanel.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolPanel);
