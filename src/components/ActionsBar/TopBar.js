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
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FaceIcon from '@material-ui/icons/Face';
import TimerIcon from '@material-ui/icons/Timer';
import MenuIcon from '@material-ui/icons/Menu';
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
  topBar: {
    position: "absolute",
    zIndex: 101,
    background: theme.bars.colors.background,
    left: 0,
    // top: `calc(100vh - ${theme.bars.sizes.actionsBar}px)`,
    flexDirection: "row",
    padding: `0 ${theme.base.sizes.linesMargin}`,
    justifyContent: "space-between",
    height: `${theme.bars.sizes.actionsBar}px`,
    width: "100%",
    "&::after": {
      content: `""`,
      position: "absolute",
      left: theme.base.sizes.linesMargin,
      right: theme.base.sizes.linesMargin,
      height: 0,
      bottom: 0,
      borderTop: `1px solid ${theme.base.colors.lines}`
    },
    display: "none",
    [`@media (min-width: ${theme.mediaQueryTresholds.P}px)`]: {
      display: "flex"
    }
  },
  group: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `calc(100% / 3)`
  },
  button: {
    color: theme.bars.colors.icon
  }
});

class TopBar extends React.Component {
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
      <div className={classes.topBar}>
        <div className={classes.group}>

          {/*{((isWideScreen && navigatorShape === "open") || navigatorPosition !== "is-aside") && (*/}
          {/*  <CategoryFilter categories={categories} filterCategory={this.categoryFilterOnClick} />*/}
          {/*)}*/}
          <IconButton
            aria-label="flash"
            onClick={() => { }}
            title="flash"
            className={classes.button}
          >
            <FlashOnIcon />
          </IconButton>
          {screenfull.isEnabled && (
            <IconButton
              aria-label="Fullscreen"
              onClick={this.fullscreenOnClick}
              title="Fullscreen mode"
              className={classes.button}
            >
              {this.state.fullscreen ? <FullscreenExitIcon /> : <ZoomOutMapIcon />}
            </IconButton>
          )}
        </div>
        <div className={classes.group}>
          <IconButton
            aria-label="Back to home"
            onClick={this.homeOnClick}
            title="Back to home"
            className={classes.button}
          >
            <FolderOpenIcon />
          </IconButton>
          <IconButton
            aria-label="person"
            onClick={() => { }}
            title="person"
            className={classes.button}
          >
            <FaceIcon />
          </IconButton>

          {/* {navigatorPosition === "is-aside" && <FontSetter increaseFont={this.fontSetterOnClick} />} */}
        </div>
        <div className={classes.group}>
          {/* <IconButton
            aria-label="Search"
            onClick={this.searchOnClick}
            component={Link}
            data-shape="closed"
            to="/search/"
            title="Search"
            className={classes.button}
          >
            <SearchIcon className={classes.button} />
          </IconButton> */}
          <IconButton
            aria-label="timmer"
            onClick={() => { }}
            title="timmer"
            className={classes.button}
          >
            <TimerIcon />
          </IconButton>
          <IconButton
            aria-label="Menu"
            onClick={() => { }}
            title="Menu"
            className={classes.button}
          >
            <MenuIcon />
          </IconButton>
          {/* 
          <IconButton aria-label="Back to top" onClick={this.arrowUpOnClick} title="Scroll to top">
            <ArrowUpwardIcon className={classes.button} />
          </IconButton> */}
        </div>
      </div>
    );
  }
}

TopBar.propTypes = {
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
)(withStyles(styles)(TopBar));
