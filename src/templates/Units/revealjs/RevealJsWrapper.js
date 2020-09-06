import React, { PureComponent } from "react";
import {
  defaultConfig,
  requireAndInitializeRevealJs,
  requireBaseRevealCss
} from "./WrapperUtils";
import PropTypes from 'prop-types';

const propTypes = {
  revealJsConfig: PropTypes.object,
  importBaseRevealJsCss: PropTypes.bool,
  initializeAfterMount: PropTypes.bool
};

export default class RevealJsWrapper extends PureComponent {
  static defaultProps = {
    importBaseRevealJsCss: true,
    initializeAfterMount: true
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const { revealJsConfig, initializeAfterMount } = this.props;

    if (initializeAfterMount) {
      requireAndInitializeRevealJs({
        ...defaultConfig,
        ...revealJsConfig
      });
    }
  }

  render() {
    const { children, importBaseRevealJsCss } = this.props;

    importBaseRevealJsCss && requireBaseRevealCss();

    return <>{children}</>;
  }
}

RevealJsWrapper.displayName = 'RevealJsWrapper';
RevealJsWrapper.propTypes = propTypes;
