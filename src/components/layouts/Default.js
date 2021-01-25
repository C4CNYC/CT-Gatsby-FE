import React, { Fragment, Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Helmet from 'react-helmet';

import {
  isWideScreenSelector,
  wideScreenStatusChange,
  navigatorPositionChange,
  navigatorShapeChange,
  navigatorPositionSelector,
  navigatorShapeSelector
} from '../../state';

import muiTheme from '../../styles/theme';

import Loading from '../common/Loading/';
import Navigator from '../Navigator/';
import InfoBar from '../InfoBar/';
import LayoutWrapper from '../LayoutWrapper/';

import { isWideScreen, timeoutThrottlerHandler } from '../../utils/helpers';

import withStyles from '@material-ui/core/styles/withStyles';
import SpringScrollbars from '../SpringScrollbars/SpringScrollbars';
import WithInstantSearch from '../search/WithInstantSearch';

const styles = (theme) => ({
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    animationName: 'main-entry',
    animationDuration: '.5s',
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      width: `calc(100vw - ${theme.info.sizes.width}px)`,
      left: `${theme.info.sizes.width}px`
    },
    [`@media (max-width: ${theme.mediaQueryTresholds.L}px)`]: {
      top: '61px' // todo
    },
    '@media print': {
      position: 'relative',
      '& > div': {
        overflow: 'visible!important'
      },
      '& > div > div': {
        position: 'relative!important'
      }
    }
  },
  article: {
    maxWidth: theme.main.sizes.maxWidth,
    margin: '0 auto',
    padding: `calc(1.5rem + ${theme.info.sizes.height}px) 1.8rem 1.5rem 1.5rem`,
    '& strong, & b': {
      letterSpacing: '-.02em',
      fontWeight: 600
    },
    '& a': {
      fontWeight: 600,
      letterSpacing: '-.02em',
      textShadow: `
         2px  2px ${theme.main.colors.background},
        -2px  2px ${theme.main.colors.background},
        -2px -2px ${theme.main.colors.background},
        -2px  2px ${theme.main.colors.background},
        -2px  0   ${theme.main.colors.background},
         2px  0   ${theme.main.colors.background}
      `,
      display: 'inline-block',
      textDecoration: 'none',
      transition: '0.3s',
      '&:hover': {
        color: theme.base.colors.linkHover
      }
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {
      padding: `calc(2.5rem + ${theme.info.sizes.height}px) 3.5rem 2.5rem`
    },
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      padding: '3.5rem'
    }
  },
  '@keyframes main-entry': {
    '0%': {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    '100%': {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
});

const InfoBox = lazy(() => import('../InfoBox/'));

const propTypes = {
  children: PropTypes.node.isRequired,
  pathname: PropTypes.string.isRequired,
  showFooter: PropTypes.bool,
  transparentHeader: PropTypes.bool,
  isWideScreen: PropTypes.bool.isRequired,
  wideScreenStatusChange: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  isWideScreenSelector,
  navigatorPositionSelector,
  navigatorShapeSelector,
  (isWideScreen, navigatorPosition, navigatorShape) => ({
    isWideScreen,
    navigatorPosition,
    navigatorShape
  })
);

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    { wideScreenStatusChange, navigatorPositionChange, navigatorShapeChange },
    dispatch
  );

class DefaultLayout extends Component {
  timeouts = {};
  categories = [];
  data = {};

  componentDidMount() {
    this.updateWideScreenStatus();
  }

  componentDidUpdate(prevProps) {}

  componentWillUnmount() {}

  updateWideScreenStatus = () => {
    const isWideScreenBool = isWideScreen();
    const { wideScreenStatusChange } = this.props;
    return typeof isWideScreenBool === 'boolean'
      ? wideScreenStatusChange(isWideScreenBool)
      : null;
  };

  render() {
    const { classes, ...rest } = this.props;
    const {
      children,
      isWideScreen,
      navigatorShape,
      navigatorPosition
    } = this.props;
    return (
      <Fragment>
        <Helmet
          meta={[
            {
              name: 'description',
              content:
                'Learn to code with free online courses, programming ' +
                'projects, and interview preparation for developer jobs.'
            }
          ]}
        />
        {/* <WithInstantSearch> */}
        <LayoutWrapper>
          <main className={classes.main}>
            <SpringScrollbars>{children}</SpringScrollbars>
          </main>

          {/* {showFooter && <Footer />}*/}
          {/*<Navigator children={children} />*/}
          {isWideScreen && (
            <Suspense
              fallback={
                <Loading
                  afterRight={true}
                  overrides={{
                    width: `${muiTheme.info.sizes.width}px`,
                    height: '100vh',
                    right: 'auto'
                  }}
                />
              }
            >
              {/* <InfoBox pages={data.pages.edges} parts={data.parts.edges} />*/}
              <InfoBox pages={[]} parts={[]} />
            </Suspense>
          )}
        </LayoutWrapper>
        {/* <Header*/}
        {/*  brand="Material Kit React"*/}
        {/*  rightLinks={<HeaderLinks />}*/}
        {/*  fixed*/}
        {/*  color={transparentHeader ? 'transparent' : 'black'}*/}
        {/*  changeColorOnScroll={{*/}
        {/*    height: 400,*/}
        {/*    color: "black"*/}
        {/*  }}*/}
        {/*  {...rest}*/}
        {/* />*/}
        {/* </WithInstantSearch> */}
      </Fragment>
    );
  }
}

DefaultLayout.displayName = 'DefaultLayout';
DefaultLayout.propTypes = propTypes;

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(DefaultLayout)
);
