import React, { Component, Fragment } from 'react';
import { ReflexContainer, ReflexSplitter, ReflexElement } from 'react-reflex';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import ToolPanel from '../components/Tool-Panel';
import { createStructuredSelector } from 'reselect';
import { currentTabSelector, moveToTab, validateSelector, setValidateChecked, validateCheckedSelector } from '../redux';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import CodeIcon from '@material-ui/icons/Code';
import MenuIcon from '@material-ui/icons/Menu';
import TimerIcon from '@material-ui/icons/Timer';
import FolderOpenIcon from '@material-ui/icons/FolderOpen';
import FaceIcon from '@material-ui/icons/Face';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import SwipeableViews from 'react-swipeable-views';
import IconButton from "@material-ui/core/IconButton";
import { Grid, Menu, MenuItem } from '@material-ui/core';
import { CheckerSwitch } from '../components/CheckerSwitch';
import MainMenu from './Menu'
import Signup from '../components/signup.js';
import Login from '../components/login.js';
function TabPanel(props) {
  const { children, index, ...other } = props;

  return (
    <Typography
      aria-labelledby={`simple-tab-${index}`}
      component='div'
      // hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      role='tabpanel'
      {...other}
    >
      {/*{value === index && <Card p={3}>{children}</Card>}*/}
      {<Card p={3}>{children}</Card>}
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const styles = theme => ({
  tabRow: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
    // width: `calc(100% / 3)`
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
});



const mapStateToProps = createStructuredSelector({
  currentTab: currentTabSelector,
  validate: validateSelector,
  validateChecked: validateCheckedSelector
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      moveToTab,
      setValidateChecked
    },
    dispatch
  );

const propTypes = {
  currentTab: PropTypes.number,
  validate: PropTypes.array,
  editor: PropTypes.element,
  guideUrl: PropTypes.string,
  hasPreview: PropTypes.bool,
  validateChecked: PropTypes.bool,
  instructions: PropTypes.element,
  moveToTab: PropTypes.func,
  setValidateChecked: PropTypes.func,
  preview: PropTypes.element,
  testOutput: PropTypes.element,
  videoUrl: PropTypes.string
};


class MobileLayout extends Component {

  state = {
    index: 0,
    openTutor: false,
    anchorEl: null,

  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
    this.props.moveToTab(value);
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
    this.props.moveToTab(index);
  };

  componentDidMount() {
    if (this.props.currentTab !== 1) this.props.moveToTab(1);
  }
  handleTutorMenu = (event) => {
    this.setState({
      openTutor: !this.state.openTutor,
      anchorEl: event.currentTarget
    })
  }

  handleCloseTutorMenu = () => {
    if (!this.state.openTutor) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ openTutor: false });
    });
  };

  handleCheckerSwitch = (event) => {
    this.props.setValidateChecked(event.target.checked)
  }

  handleMainMenu = () => {
    this.setState((state) => ({ isShowMainMenu: !state.isShowMainMenu }))
  }
  handleSignUp = () => {
    this.handleMainMenu()
    this.setState((state) => ({ isShowSignUp: !state.isShowSignUp }))
  }
  handleSignIn = () => {
    this.handleMainMenu()
    this.setState((state) => ({ isShowSignIn: !state.isShowSignIn }))
  }
  render() {
    const {
      index,
      anchorEl,
      openTutor,
      isShowMainMenu,
      isShowSignUp,
      isShowSignIn
    } = this.state;
    const {
      instructions,
      editor,
      hasPreview,
      preview,
      guideUrl,
      videoUrl,
      classes,
      validateChecked
    } = this.props;

    return (
      <Fragment >
        <div className="hide-body-shadow" style={{ height: 0 }}></div>
        {isShowMainMenu && <MainMenu className="login-signup-container" isMobile close={this.handleMainMenu} handleSignIn={this.handleSignIn} handleSignUp={this.handleSignUp} />}
        {isShowSignUp && <Signup isMobile handleSignIn={this.handleSignIn} handleSignUp={this.handleSignUp} />}
        {isShowSignIn && <Login isMobile handleSignIn={this.handleSignIn} handleSignUp={this.handleSignUp} />}
        <div style={{ flexGrow: 1, width: '100%', }}>
          <AppBar position="static" color={'transparent'}>
            <div className={classes.tabRow}>
              {(index === 2 || index === 0) && <IconButton
                aria-label="timmer"
                onClick={() => { }}
                title="timmer"
                className={classes.button}
              >
                <TimerIcon />
              </IconButton>}

              {index === 1 && <IconButton
                aria-label="Back to home"
                onClick={() => { }}
                title="Back to home"
                className={classes.button}
              >
                <FolderOpenIcon />
              </IconButton>}
              <Tabs
                id='unit-page-tabs'
                value={index}
                onChange={this.handleChange}
                variant="fullWidth"
                indicatorColor="primary"
                textColor="primary"
                aria-label="lesson tabs">
                <Tab icon={<AssignmentIcon />} aria-label="Lesson" {...a11yProps(0)} />
                <Tab icon={<CodeIcon />} aria-label="Code"  {...a11yProps(1)} />
                {/*<Tab icon={<SpellcheckIcon />} aria-label="Tests"  {...a11yProps(2)} />*/}
                {hasPreview && (
                  <Tab icon={<VideoLabelIcon />} aria-label="Preview"  {...a11yProps(2)} />
                )}
              </Tabs>
              {(index === 2 || index === 0) && <IconButton
                aria-label="Menu"
                onClick={this.handleMainMenu}
                title="Menu"
                className={classes.button}
              >
                <MenuIcon />
              </IconButton>}
              {index === 1 && <>
                <IconButton
                  aria-label="person"
                  onClick={this.handleTutorMenu}
                  title="person"
                  className={classes.button}
                >
                  <FaceIcon />
                </IconButton>
                <Menu
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(openTutor)}
                  onClose={this.handleCloseTutorMenu}>
                  {openTutor && <>
                    <MenuItem>
                      <Grid container spacing={1} style={{ alignItems: "center" }}>
                        <Grid item>
                          <CheckCircleOutlineIcon />
                        </Grid>
                        <Grid item>
                          <span className={classes.span} style={{ fontSize: "20px" }}>Checker</span>
                        </Grid>
                        <Grid item>
                          <CheckerSwitch
                            onChange={this.handleCheckerSwitch}
                            checked={validateChecked}
                            name="checkedChecker"
                          />
                        </Grid>
                      </Grid>
                    </MenuItem>
                  </>}
                </Menu></>}
            </div>

          </AppBar>
          <SwipeableViews displaySameSlide index={index} onChangeIndex={this.handleChangeIndex}>
            <TabPanel index={0}>
              {instructions}
            </TabPanel>
            <TabPanel index={1} >
              {editor}
            </TabPanel>
            {/* <TabPanel value={value} index={2}>
             {testOutput}
             </TabPanel> */}
            {hasPreview && (
              <TabPanel index={2} >
                {preview}
              </TabPanel>
            )}
          </SwipeableViews>

        </div>
        <ToolPanel guideUrl={guideUrl} isMobile={true} videoUrl={videoUrl} />
      </Fragment >
    );
  }
}

MobileLayout.displayName = 'MobileLayout';
MobileLayout.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MobileLayout));
