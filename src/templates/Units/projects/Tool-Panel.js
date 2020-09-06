import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { openModal } from '../redux';

import './tool-panel.css';
import Button from '@material-ui/core/Button';

const mapStateToProps = () => ({});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      openHelpModal: () => openModal('help')
    },
    dispatch
  );

const propTypes = {
  guideUrl: PropTypes.string,
  openHelpModal: PropTypes.func.isRequired
};

export class ToolPanel extends Component {
  render() {
    const { guideUrl, openHelpModal } = this.props;
    return (
      <div className='tool-panel-group project-tool-panel'>
        {guideUrl && (
          <Button

            className='btn-invert'
            href={guideUrl}
            target='_blank'
          >
            Get a hint
          </Button>
        )}
        <Button  className='btn-invert' onClick={openHelpModal}>
          Ask for help
        </Button>
      </div>
    );
  }
}

ToolPanel.displayName = 'ProjectToolPanel';
ToolPanel.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ToolPanel);
