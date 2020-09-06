import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import { connect } from 'react-redux';

import ToolPanel from '../components/Tool-Panel';
import { createStructuredSelector } from 'reselect';
import { currentTabSelector, moveToTab } from '../redux';
import { bindActionCreators } from 'redux';
import AppBar from '@material-ui/core/AppBar';
import Card from '@material-ui/core/Card';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import VideoLabelIcon from '@material-ui/icons/VideoLabel';
import CodeIcon from '@material-ui/icons/Code';
import SpellcheckIcon from '@material-ui/icons/Spellcheck';
import Paper from '@material-ui/core/Paper';
// import Swiper from 'react-id-swiper';
// import 'swiper/css/swiper.css';
import SwipeableViews from 'react-swipeable-views';

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
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    width: '100%',
    backgroundColor: theme.palette.background.paper,
  },
}));

const mapStateToProps = createStructuredSelector({
  currentTab: currentTabSelector
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
  };

  handleChange = (event, value) => {
    this.setState({
      index: value,
    });
  };

  handleChangeIndex = index => {
    this.setState({
      index,
    });
  };

  componentDidMount() {
    if (this.props.currentTab !== 1) this.props.moveToTab(1);
  }
  render() {

    const { index } = this.state;

    const {
      currentTab,
      moveToTab,
      instructions,
      editor,
      testOutput,
      hasPreview,
      preview,
      guideUrl,
      videoUrl
    } = this.props;

    return (
      <Fragment>
        <div style={{flexGrow: 1, width: '100%',}}>
          <AppBar position="static" color={'transparent'}>
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
          </AppBar>
          <SwipeableViews  index={index} onChangeIndex={this.handleChangeIndex}>
            <TabPanel index={0}>
              {instructions}
            </TabPanel>
            <TabPanel index={1}>
              {editor}
            </TabPanel>
            {/*<TabPanel value={value} index={2}>*/}
            {/*  {testOutput}*/}
            {/*</TabPanel>*/}
            {hasPreview && (
              <TabPanel index={2}>
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
)(MobileLayout);
