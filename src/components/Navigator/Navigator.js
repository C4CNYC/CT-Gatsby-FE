import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import withStyles from "@material-ui/core/styles/withStyles";
import { forceCheck } from "react-lazyload";

import { moveNavigatorAside } from "./../../utils/shared";
import List from "./List";
import { createSelector } from 'reselect';
import {
  executeGA,
  fetchUser, fontSizeChange,
  fontSizeIncreaseSelector,
  isOnlineSelector,
  isSignedInSelector,
  isWideScreenSelector, navigatorPositionChange, navigatorShapeChange,
  navigatorPositionSelector, navigatorShapeSelector, onlineStatusChange,
  userSelector, wideScreenStatusChange
} from '../../state';
import { flashMessageSelector, removeFlashMessage } from '../Flash/redux';
import { bindActionCreators } from 'redux';

const styles = theme => ({
  navigator: {
    transform: "translate3d(0, 0, 0)",
    willChange: "left, top, bottom, width",
    background: theme.navigator.colors.background,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100vh",
    [`overflow-y`]: 'auto',
    [`overflow-x`]: 'hidden',
    transitionTimingFunction: "ease",
    transition: "left .9s",
    width: "100%",
    [`@media (max-width: ${theme.mediaQueryTresholds.L - 1}px)`]: {
      "&.is-aside": {
        left: "-100%"
      },
      "&.is-featured": {
        left: 0
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      "&.is-featured": {
        transition: "left .9s",
        width: `calc(100vw - ${theme.info.sizes.width}px - ${theme.bars.sizes.actionsBar}px)`,
        left: `${theme.info.sizes.width}px`,
        top: 0
      },
      "&.is-aside": {
        transition: "none, bottom 0.5s",
        left: 0,
        width: `${theme.info.sizes.width - 1}px`,
        zIndex: 1,
        top: "auto",
        "&.closed": {
          bottom: `calc(-100% + 100px + ${theme.navigator.sizes.closedHeight}px)`,
          height: `calc(100% - 100px)`
        },
        "&.open": {
          bottom: 0,
          height: `calc(100% - 100px)`
        },
        "&::after": {
          content: `""`,
          position: "absolute",
          top: 0,
          left: theme.base.sizes.linesMargin,
          right: theme.base.sizes.linesMargin,
          height: 0,
          borderTop: `1px solid ${theme.base.colors.lines}`
        }
      },
      "&.moving-aside": {
        transition: "left 0.9s",
        left: `calc(-100vw + ${2 * theme.info.sizes.width + 60}px)`,
        width: `calc(100vw - ${theme.info.sizes.width}px - 60px)`,
        top: 0
      },
      "&.resizing-aside": {
        transition: "none",
        width: `${theme.info.sizes.width - 1}px`,
        top: "auto",
        left: 0,
        "&.closed": {
          bottom: `calc(-100% + 100px)`,
          height: `calc(100% - 100px)`
        },
        "&.open": {
          bottom: `calc(-100% + 100px)`,
          height: `calc(100% - 100px)`
        }
      },
      "&.moving-featured": {
        transition: "bottom .3s",

        bottom: "-100%",
        top: "auto",
        left: 0,
        zIndex: 1,
        width: `${theme.info.sizes.width - 1}px`
      },
      "&.resizing-featured": {
        transition: "none",
        top: 0,
        bottom: "auto",
        left: `calc(-100vw + ${2 * theme.info.sizes.width + 60}px)`,
        width: `calc(100vw - ${theme.info.sizes.width}px - 60px)`
      }
    }
  }
});

class Navigator extends React.Component {
  linkOnClick = moveNavigatorAside.bind(this);

  expandOnClick = e => {
    this.props.navigatorShapeChange("open");
    setTimeout(forceCheck, 600);
  };

  removefilterOnClick = e => {
    this.props.setCategoryFilter("all pages");
  };

  render() {
    const { classes, children, navigatorPosition, navigatorShape, categoryFilter } = this.props;

    return (
      <nav
        className={`${classes.navigator} ${navigatorPosition ? navigatorPosition : ""} ${
          navigatorShape ? navigatorShape : ""
        } `}
      >
        {this.props.children.length && (
          <List
            children={children}
            navigatorPosition={navigatorPosition}
            navigatorShape={navigatorShape}
            linkOnClick={this.linkOnClick}
            expandOnClick={this.expandOnClick}
            categoryFilter={categoryFilter}
            removeFilter={this.removefilterOnClick}
          />
        )}
      </nav>
    );
  }
}

Navigator.propTypes = {
  children: PropTypes.object.isRequired,
  classes: PropTypes.object.isRequired,
  navigatorPosition: PropTypes.string.isRequired,
  navigatorShape: PropTypes.string.isRequired,
  navigatorPositionChange: PropTypes.func.isRequired,
  navigatorShapeChange: PropTypes.func.isRequired,
  isWideScreen: PropTypes.bool.isRequired,
  wideScreenStatusChange: PropTypes.func.isRequired,
  fontSizeIncrease: PropTypes.any.isRequired,
  fontSizeChange: PropTypes.func.isRequired

  // categoryFilter: PropTypes.string.isRequired,
  // setCategoryFilter: PropTypes.func.isRequired
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
    { wideScreenStatusChange, navigatorPositionChange, navigatorShapeChange, fontSizeChange },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(Navigator));
