import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { previewMounted } from '../redux';
import LockIcon from '@material-ui/icons/Lock';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import './preview.css';

const mainId = 'fcc-main-frame';

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      previewMounted
    },
    dispatch
  );

const propTypes = {
  className: PropTypes.string,
  disableIframe: PropTypes.bool,
  previewMounted: PropTypes.func.isRequired
};

class Preview extends Component {
  constructor(...props) {
    super(...props);

    this.state = {
      iframeStatus: props.disableIframe
    };
  }

  componentDidMount() {
    this.props.previewMounted();
  }

  componentDidUpdate(prevProps) {
    if (this.props.disableIframe !== prevProps.disableIframe) {
      // eslint-disable-next-line react/no-did-update-set-state
      this.handleIframeStatus()
    }
  }

  handleIframeStatus = () => {
    this.setState((state) => ({ iframeStatus: !state.iframeStatus }));
  }
  render() {
    const { iframeStatus } = this.state
    const iframeToggle = iframeStatus ? 'disable' : 'enable';
    return (
      <div style={{ position: 'relative' }}>
        {iframeStatus ? <LockIcon className={'lock-icon'} fontSize="large" onClick={this.handleIframeStatus} /> :
          <LockOpenIcon className={'lock-icon'} fontSize="large" onClick={this.handleIframeStatus} />}
        <div className={`unit-preview ${iframeToggle}-iframe`}>
          <iframe
            className={'unit-preview-frame'}
            id={mainId}
            title='Unit Preview'
          />
        </div>
      </div>
    );
  }
}

Preview.displayName = 'Preview';
Preview.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(Preview);
