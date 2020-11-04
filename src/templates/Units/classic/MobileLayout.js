import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';
import withStyles from "@material-ui/core/styles/withStyles";
import ToolPanel from '../components/Tool-Panel';
import { createStructuredSelector } from 'reselect';
import { currentTabSelector, moveToTab, validateSelector } from '../redux';
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
import Switch from '@material-ui/core/Switch';
import CircularProgress from '@material-ui/core/CircularProgress';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import CloseIcon from '@material-ui/icons/Close';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import Paper from '@material-ui/core/Paper';
// import Swiper from 'react-id-swiper';
// import 'swiper/css/swiper.css';
import SwipeableViews from 'react-swipeable-views';
import IconButton from "@material-ui/core/IconButton";
import { Grid, Menu, MenuItem } from '@material-ui/core';
import { validate } from 'uuid';

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
  progress: {
    color: "#76dc37",
    position: "absolute",
    right: "22px",
    top: "76px",
    zIndex: 1,
    "&::before": {
      content: `""`,
      position: "absolute",
      background: "#46748e",
      width: "18px",
      height: "18px",
      left: "3px",
      top: "3px",
      borderRadius: "50%",
    }
  },
  panelContainer: {
    borderRadius: "20px",
    position: "absolute",
    right: "10px",
    top: "56px",
    width: 'calc(100% - 20px)',
    // height: '300px',
    border: '3px solid #43d4dd',
    zIndex: 1,
    background: "white"
  },
  gridParent: {
    // height: "calc(100% + 9px)",

  },
  leftGridItem: {
    display: "flex",
    background: '#43d4dd',
    // height: "100%",
    borderRadius: "20px",
    alignItems: "center",
    justifyContent: "center",
    color: "#216a6f",
    width: "40px"

  },
  checkGridItem: {
    color: "#43d4dd",
    justifyContent: "space-between",
    padding: "10px 0 20px",

  },
  rightGridItem: {
    padding: "10px!important",
    color: "black",
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 40px)",
    fontWeight: "bold",
    padding: "10px 20px 20px",

  },
  compressedPanelContainer: {
    borderRadius: "20px",
    position: "absolute",
    right: "10px",
    top: "56px",
    width: '40px',
    border: '3px solid #43d4dd',
    zIndex: 1,
    background: "white",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    minHeight: "251px",
    flexDirection: "column",
    opacity: 0.5
  },
});

const CheckerSwitch = withStyles((theme) => ({
  root: {
    width: 42,
    height: 26,
    padding: 0,
    margin: theme.spacing(1),
  },
  switchBase: {
    padding: 1,
    '&$checked': {
      transform: 'translateX(16px)',
      color: theme.palette.common.white,
      '& + $track': {
        backgroundColor: '#43d4dd',
        opacity: 1,
        border: 'none',
      },
    },
    '&$focusVisible $thumb': {
      color: '#43d4dd',
      border: '6px solid #fff',
    },
  },
  thumb: {
    width: 24,
    height: 24,
    backgroundImage: `url("${require("../img/icons/checker.png")}")`,
    backgroundPosition: "center",
    backgroundSize: "cover"
  },
  track: {
    borderRadius: 26 / 2,
    border: `1px solid ${theme.palette.grey[400]}`,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  checked: {},
  focusVisible: {},
}))(({ classes, ...props }) => {
  return (
    <Switch
      focusVisibleClassName={classes.focusVisible}
      disableRipple
      classes={{
        root: classes.root,
        switchBase: classes.switchBase,
        thumb: classes.thumb,
        track: classes.track,
        checked: classes.checked,
      }}
      {...props}
    />
  );
});
const PlaskChecker = () => {
  return <img src={require("../img/icons/plask.png")} alt="plask" style={{ width: "25px", height: "25px" }} />
}
const mapStateToProps = createStructuredSelector({
  currentTab: currentTabSelector,
  validate: validateSelector,
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      moveToTab
    },
    dispatch
  );

const propTypes = {
  currentTab: PropTypes.number,
  validate: PropTypes.array,
  editor: PropTypes.element,
  guideUrl: PropTypes.string,
  hasPreview: PropTypes.bool,
  instructions: PropTypes.element,
  moveToTab: PropTypes.func,
  preview: PropTypes.element,
  testOutput: PropTypes.element,
  videoUrl: PropTypes.string
};


class MobileLayout extends Component {

  state = {
    index: 0,
    openTutor: false,
    anchorEl: null,
    checkedChecker: false,
    showTutorPanel: false,
    compressedTutorPanel: false
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
    console.log(event.target.checked);
    this.setState({
      checkedChecker: event.target.checked
    })
  }

  handleTutorPanel = () => {
    this.setState({ showTutorPanel: !this.state.showTutorPanel })
  }

  handleCompressedTutorPanel = () => {
    this.setState({ compressedTutorPanel: !this.state.compressedTutorPanel })
  }

  calculatePercentOfChecked = () => {
    const { validate } = this.props
    return 100 * validate.reduce((s, v) =>
      v.checked ? s + 1 : s
      , 0) / validate.length
  }

  render() {
    const { index, anchorEl, openTutor, checkedChecker, showTutorPanel,
      compressedTutorPanel } = this.state;
    const {
      currentTab,
      moveToTab,
      instructions,
      editor,
      testOutput,
      hasPreview,
      preview,
      guideUrl,
      videoUrl,
      classes,
      validate
    } = this.props;

    return (
      <Fragment>

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
                onClick={() => { }}
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
                            checked={checkedChecker}
                            name="checkedChecker"
                          />
                        </Grid>
                      </Grid>
                    </MenuItem>
                  </>}
                </Menu></>}
            </div>
            {currentTab === 1 && checkedChecker && !showTutorPanel && <div >
              <CircularProgress
                className={classes.progress}
                variant="static"
                value={this.calculatePercentOfChecked()}
                size={24}
                thickness={6}
                onClick={this.handleTutorPanel} />
            </div>}
            {currentTab === 1 && checkedChecker && showTutorPanel && (compressedTutorPanel ? <div
              className={classes.compressedPanelContainer}
              onClick={this.handleCompressedTutorPanel}
            >
              <CloseIcon
                onClick={this.handleTutorPanel}
                style={{ color: "#808080" }}
              />
              {validate.map((v) => v.checked ? <CheckCircleOutlineIcon style={{ color: "black" }} /> : <PlaskChecker />)}

            </div> :
              <div className={classes.panelContainer}>
                <Grid container spacing={1} className={classes.gridParent}>
                  <div className={classes.leftGridItem} onClick={this.handleCompressedTutorPanel}>
                    <ArrowForwardIosIcon />
                  </div>
                  <div className={classes.rightGridItem}>
                    <Grid container item xs={12} className={classes.checkGridItem}>
                      <Grid item>
                        <Typography>CHECKER</Typography>
                      </Grid>
                      <Grid item style={{ color: "#808080" }}>
                        <CloseIcon
                          onClick={this.handleTutorPanel}
                        />
                      </Grid>
                    </Grid>
                    <Grid container>
                      {validate.map((v) => <Grid container item xs={12} spacing={1} >
                        <Grid item >
                          {v.checked ? <CheckCircleOutlineIcon /> : <PlaskChecker />}
                        </Grid>
                        <Grid item xs>
                          <Typography>{v.text}</Typography>
                        </Grid>
                      </Grid>)}
                    </Grid>
                  </div>
                </Grid>
              </div>)}
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
      </Fragment>
    );
  }
}

MobileLayout.displayName = 'MobileLayout';
MobileLayout.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(MobileLayout));
