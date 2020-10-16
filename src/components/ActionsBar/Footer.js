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
import FlashOnIcon from '@material-ui/icons/FlashOn';
import ZoomOutMapIcon from '@material-ui/icons/ZoomOutMap';
import FullscreenExitIcon from "@material-ui/icons/FullscreenExit";
import CropOriginalIcon from '@material-ui/icons/CropOriginal';
import PublishOutlinedIcon from '@material-ui/icons/PublishOutlined';
import SaveOutlinedIcon from '@material-ui/icons/SaveOutlined';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { featureNavigator, moveNavigatorAside } from "./../../utils/shared";
import FontSetter from "./FontSetter";
import CategoryFilter from "./CategoryFilter";
import { bindActionCreators } from 'redux';
import {
  fontSizeChange, fontSizeIncreaseSelector, isWideScreenSelector,
  navigatorPositionChange, navigatorPositionSelector,
  navigatorShapeChange, navigatorShapeSelector,
  scrollToTopStatusChange,
  wideScreenStatusChange,
} from '../../state';
import { createSelector } from 'reselect';
import { currentTabSelector, moveToTab, monacoeditorSelector } from "../../templates/Units/redux";
import { Button, Menu, MenuItem } from "@material-ui/core";

const styles = theme => ({
  footer: {
    position: "absolute",
    zIndex: 100,
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
    alignItems: "center",
    display: "none",
    [`@media (min-width: ${theme.mediaQueryTresholds.P}px)`]: {
      display: "flex",
    }
  },
  footerMobile: {
    display: "flex",
    [`@media (min-width: ${theme.mediaQueryTresholds.P}px)`]: {
      display: "none",
    }
  },
  hideQuickKeybar: {
    background: "transparent",
    justifyContent: "flex-end",
    "&::before": {
      borderTop: "none"
    }
  },
  group: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `calc(100% / 3)`,
    padding: "30px",
  },
  group1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `37%`,
    padding: "0 20px",
    height: "100%",
  },
  group2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `38%`,
    padding: "0 20px",
    height: "100%",
  },
  group3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `25%`,
    padding: "0 20px",
    height: "100%",
  },
  button: {
    color: theme.bars.colors.icon
  },
  span: {
    color: theme.bars.colors.icon,
    fontSize: '12px',
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  rightBorder: {
    borderRight: `1px solid ${theme.bars.colors.borderRight}`
  },
  keyBoardBar: {
    textAlign: "center",
    width: `calc(100% / 6)`
  }
});

class Footer extends React.Component {
  state = {
    fullscreen: false,
    open: false,
    anchorEl: null,
    isHideQuickKeyBar: false
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
  handleClickMore = (event) => {
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    }, () => this.focusOnEditor());
  };
  handleCloseMore = () => {
    if (!this.state.open) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  };
  hideQuickKeyBar = () => {
    this.setState({ isHideQuickKeyBar: true });
  }
  showQuickKeyBar = () => {
    this.setState({ isHideQuickKeyBar: false });
  }

  insertCharacter = (location, character) => {
    this.props.monacoEditor.executeEdits("", [{
      range: {
        startLineNumber: location.getPosition().lineNumber,
        startColumn: location.getPosition().column,
        endLineNumber: location.getPosition().lineNumber,
        endColumn: location.getPosition().column
      },
      text: character,
      forceMoveMarkers: true
    }]);
    this.focusOnEditor();
  }
  focusOnEditor() {
    this.props.monacoEditor.focus();
  }
  addQuickKey = (keytype) => {
    switch (keytype) {
      case "tab":
        this.insertCharacter(this.props.monacoEditor.getSelection(), '\t');
        break;
      case "back":
        this.insertCharacter(this.props.monacoEditor.getSelection(), '<');
        break;
      case "forward":
        this.insertCharacter(this.props.monacoEditor.getSelection(), '>');
        break;
      case "slash":
        this.insertCharacter(this.props.monacoEditor.getSelection(), '/');
        break;
      case "quote":
        this.insertCharacter(this.props.monacoEditor.getSelection(), '"');
        break;
      default:
        return;
    }

  }
  render() {
    const { classes, navigatorPosition, navigatorShape, isWideScreen, categories, currentTab } = this.props;
    const { anchorEl, open, isHideQuickKeyBar } = this.state;

    return (
      <>
        <div className={classes.footer}>
          <div className={classes.group1}>
            <span className={classes.span}>Lesson Structure Breadcrumbs</span>
          </div>
          <div className={classes.group2}>
            <Button variant="outlined" className={classes.button}>Back</Button>
            <Button variant="outlined" className={classes.button}>Next</Button>
          </div>
          <div className={classes.group3}>
            <div>
              <IconButton
                aria-label="Gallery"
                onClick={() => { }}
                title="Gallery">
                <CropOriginalIcon className={classes.button} />

              </IconButton>
              <span className={classes.span}>Gallery</span>
            </div>
            <div>
              <IconButton
                aria-label="Publish"
                onClick={() => { }}
                title="Publish">
                <PublishOutlinedIcon className={classes.button} />
              </IconButton>
              <span className={classes.span}>Publish</span>
            </div>
            <div>
              <IconButton
                aria-label="Save As"
                onClick={() => { }}
                title="Save As">
                <SaveOutlinedIcon className={classes.button} />
              </IconButton>
              <span className={classes.span}>Save As</span>
            </div>
          </div>
        </div>
        <div className={`${classes.footer} ${classes.footerMobile} ${isHideQuickKeyBar && currentTab === 1 && classes.hideQuickKeybar}`}>
          {currentTab === 0 && <>
            <div>
              <IconButton
                aria-label="flash"
                onClick={() => { }}
                title="flash"
                className={classes.button}
              >
                <FlashOnIcon />
              </IconButton>
              <span className={classes.span}>Lesson Structure Breadcrumbs</span>
            </div>
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
          </>}
          {currentTab === 1 && (!isHideQuickKeyBar ? <>
            <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
              <IconButton
                aria-label="tab"
                onClick={() => this.addQuickKey('tab')}
                title="tab"
                className={classes.button}
              >
                <span className={classes.span}>tab</span>
              </IconButton>
            </div>
            <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
              <IconButton
                aria-label="ArrowBack"
                onClick={() => this.addQuickKey('back')}
                title="ArrowBack"
                className={classes.button}
              >
                <ArrowBackIosOutlinedIcon />
              </IconButton>
            </div>
            <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
              <IconButton
                aria-label="ArrowForward"
                onClick={() => this.addQuickKey('forward')}
                title="ArrowForward"
                className={classes.button}
              >
                <ArrowForwardIosOutlinedIcon />
              </IconButton>
            </div>
            <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
              <IconButton
                aria-label="Slash"
                onClick={() => this.addQuickKey('slash')}
                title="Slash"
                className={classes.button}
              >
                <span className={classes.span} style={{ fontSize: "30px" }}>/</span>
              </IconButton>

            </div>
            <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
              <IconButton
                aria-label="Quote"
                onClick={() => this.addQuickKey('quote')}
                title="Quote"
                className={classes.button}
              >
                <FormatQuoteIcon />
              </IconButton>
            </div>
            <div className={classes.keyBoardBar}>
              <IconButton
                aria-label="More"
                onClick={this.handleClickMore}
                title="More"
                className={classes.button}
              >
                <MoreHorizIcon />
              </IconButton>
            </div>
            <Menu
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(open)}
              onClose={this.handleCloseMore}>
              <MenuItem
                onClick={e => {
                  this.hideQuickKeyBar();
                  this.handleCloseMore();
                  this.focusOnEditor();
                }}>
                <VisibilityOffIcon />
              </MenuItem>
            </Menu>
          </> :
            <IconButton
              aria-label="Keyboard Hide"
              onClick={() => {
                this.showQuickKeyBar();
                this.focusOnEditor();
              }}
              title="Keyboard Hide"
              className={classes.button}
            >
              <KeyboardHideIcon />
            </IconButton>)}
          {currentTab === 2 && <>
            <div>
              <IconButton
                aria-label="Gallery"
                onClick={() => { }}
                title="Gallery">
                <CropOriginalIcon className={classes.button} />
              </IconButton>
              <span className={classes.span}>Gallery</span>
            </div>
            <div>
              <IconButton
                aria-label="Publish"
                onClick={() => { }}
                title="Publish">
                <PublishOutlinedIcon className={classes.button} />
              </IconButton>
              <span className={classes.span}>Publish</span>
            </div>
            <div>
              <IconButton
                aria-label="Save As"
                onClick={() => { }}
                title="Save As">
                <SaveOutlinedIcon className={classes.button} />
              </IconButton>
              <span className={classes.span}>Save As</span>
            </div>
          </>}
        </div>
      </>
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
  currentTab: PropTypes.number,
  monacoEditor: PropTypes.object.isRequired,
  // categories: PropTypes.array.isRequired,
  // setCategoryFilter: PropTypes.func.isRequired,
  // categoryFilter: PropTypes.string.isRequired
};


const mapStateToProps = createSelector(
  isWideScreenSelector,
  navigatorPositionSelector,
  navigatorShapeSelector,
  fontSizeIncreaseSelector,
  currentTabSelector,
  monacoeditorSelector,
  (isWideScreen, navigatorPosition, navigatorShape, fontSizeIncrease, currentTab, monacoEditor) => ({
    isWideScreen,
    navigatorPosition,
    navigatorShape,
    fontSizeIncrease,
    currentTab,
    monacoEditor
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
