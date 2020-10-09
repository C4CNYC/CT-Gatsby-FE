import React from "react";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import IconButton from "@material-ui/core/IconButton";

import Link from "gatsby-link";
import { connect } from "react-redux";
import * as screenfull from "screenfull";


import HomeIcon from "@material-ui/icons/Home";
import SearchIcon from "@material-ui/icons/Search";
import ArrowUpwardIcon from "@material-ui/icons/ArrowUpward";
import FullscreenIcon from "@material-ui/icons/Fullscreen";
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";

import { featureNavigator, moveNavigatorAside } from "./../../utils/shared";
import FontSetter from "./FontSetter";
import CategoryFilter from "./CategoryFilter";
import { bindActionCreators } from 'redux';
import {
  fontSizeChange, fontSizeIncreaseSelector, isWideScreenSelector,
  navigatorPositionChange, navigatorPositionSelector,
  navigatorShapeChange, navigatorShapeSelector,
  scrollToTopStatusChange,
  wideScreenStatusChange
} from '../../state';
import { createSelector } from 'reselect';

const styles = theme => ({
  footer: {
    position: "absolute",
    zIndex: 200,
    background: theme.bars.colors.background,
    left: 0,
    //top: `calc(100vh - ${theme.bars.sizes.actionsBar}px)`,
    bottom: 0,
    flexDirection: "row",
    padding: `0 ${theme.base.sizes.linesMargin}`,
    justifyContent: "space-between",
    height: `${theme.bars.sizes.actionsBar}px`,
    width: "100%",
    "&::before": {
      content: `""`,
      position: "absolute",
      left: theme.base.sizes.linesMargin,
      right: theme.base.sizes.linesMargin,
      height: 0,
      top: 0,
      borderTop: `1px solid ${theme.base.colors.lines}`
    },
    display: "flex",
    [`@media (min-width: ${theme.mediaQueryTresholds.P}px)`]: {
      display: "none",
    }
  },
  group: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
  },
  button: {
    color: theme.bars.colors.icon
  }
});

class Footer extends React.Component {
  state = {
    fullscreen: false
  };

  componentDidMount() {
    if (screenfull.isEnabled) {
      screenfull.on("change", () => {
        this.setState({
          fullscreen: screenfull.isFullscreen
        });
      });
    }
  }

  homeOnClick = featureNavigator.bind(this);
  searchOnClick = moveNavigatorAside.bind(this);

  fullscreenOnClick = () => {
    if (screenfull.isEnabled) {
      screenfull.toggle();
    }
  };

  arrowUpOnClick = () => {
    this.props.scrollToTopStatusChange(true);
  };

  fontSetterOnClick = val => {
    this.props.fontSizeChange(val);

    if (typeof localStorage !== "undefined") {
      localStorage.setItem("font-size-increase", val);
    }
  };

  categoryFilterOnClick = val => {
    this.props.setCategoryFilter(val);
  };

  render() {
    const { classes, navigatorPosition, navigatorShape, isWideScreen, categories } = this.props;

    return (
      <div className={classes.footer}>
        <track-preview></track-preview>
        <div id="app-action-timeline">
          <a href="http://localhost:8080/"
            className="back mdc-button mdc-button--outlined mdc-custom-outline mdc-custom-min-width"><span
              className="mdc-button__label">&lt; Back</span></a>
          <div id="complete-step-container">
            <button id="complete-step"
              className="mdc-button mdc-button--secondary mdc-button--raised mdc-custom-min-width"
              disabled="disabled">Next
            </button>
          </div>
        </div>
        <div className="help-container">
          <challenge-reminder course="programming"></challenge-reminder>
          <div tooltip data-gravity="e"
            title="Report bugs/suggestions to Jad (course creator).">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
              viewBox="0 0 24 24" fill="#A7A7A7"
              className="help">
              <path fill="none" d="M0 0h24v24H0z" />
              <path
                d="M11 18h2v-2h-2v2zm1-16C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm0-14c-2.21 0-4 1.79-4 4h2c0-1.1.9-2 2-2s2 .9 2 2c0 2-3 1.75-3 5h2c0-2.25 3-2.5 3-5 0-2.21-1.79-4-4-4z" />
            </svg>
          </div>
        </div>
        <div className={classes.group}>
          <IconButton
            aria-label="Back to home"
            onClick={this.homeOnClick}
            title="Back to home"
            className={classes.button}
          >
            <HomeIcon />
          </IconButton>
          {/*{((isWideScreen && navigatorShape === "open") || navigatorPosition !== "is-aside") && (*/}
          {/*  <CategoryFilter categories={categories} filterCategory={this.categoryFilterOnClick} />*/}
          {/*)}*/}
          <IconButton
            aria-label="Search"
            onClick={this.searchOnClick}
            component={Link}
            data-shape="closed"
            to="/search/"
            title="Search"
            className={classes.button}
          >
            <SearchIcon className={classes.button} />
          </IconButton>
        </div>
        <div className={classes.group}>
          {navigatorPosition === "is-aside" && <FontSetter increaseFont={this.fontSetterOnClick} />}
          {screenfull.isEnabled && (
            <IconButton
              aria-label="Fullscreen"
              onClick={this.fullscreenOnClick}
              title="Fullscreen mode"
              className={classes.button}
            >
              {this.state.fullscreen ? <FullscreenExitIcon /> : <FullscreenIcon />}
            </IconButton>
          )}
          <IconButton aria-label="Back to top" onClick={this.arrowUpOnClick} title="Scroll to top">
            <ArrowUpwardIcon className={classes.button} />
          </IconButton>
        </div>
      </div>
    );
  }
}

Footer.propTypes = {
  classes: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  scrollToTopStatusChange: PropTypes.func.isRequired,
  fontSizeChange: PropTypes.func.isRequired,
  // categories: PropTypes.array.isRequired,
  // setCategoryFilter: PropTypes.func.isRequired,
  // categoryFilter: PropTypes.string.isRequired
};


const mapStateToProps = createSelector(
  isWideScreenSelector,
  navigatorPositionSelector,
  navigatorShapeSelector,
  fontSizeIncreaseSelector,
  (isWideScreen, navigatorPosition, navigatorShape, fontSizeIncrease) => ({
    isWideScreen,
    navigatorPosition,
    navigatorShape,
    fontSizeIncrease,
  })
);


const mapDispatchToProps = dispatch =>
  bindActionCreators(
    { wideScreenStatusChange, navigatorPositionChange, navigatorShapeChange, fontSizeChange, scrollToTopStatusChange },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Footer));
