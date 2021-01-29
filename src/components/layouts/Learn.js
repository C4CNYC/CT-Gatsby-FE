import React, { Fragment, Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect, useDispatch } from 'react-redux';
import { Helmet } from 'react-helmet';
import {
  userSelector,
  userFetchStateSelector,
  isSignedInSelector,
  tryToShowDonationModal
} from '../../state';

import 'prismjs/themes/prism.css';
import './prism.css';
import './prism-night.css';
import 'react-reflex/styles.css';
import './learn.css';
import WithInstantSearch from '../search/WithInstantSearch';
import withStyles from '@material-ui/core/styles/withStyles';
import TopBar from '../ActionsBar/TopBar';
import Footer from '../ActionsBar/Footer';
import { setLesson } from '../../templates/Units/redux';

const styles = (theme) => ({
  main: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: '100%',
    animationName: 'main-entry',
    animationDuration: '.5s',
    top: '61px',
    [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
      // width: `100vw`,
    },
    [`@media (max-width: ${theme.mediaQueryTresholds.L}px)`]: {
      top: '5px' // todo
    },
    '& > div': {
      height: '100%'
    }
    // '@keyframes main-entry': {
    //     '0%': {
    //         opacity: 0,
    //         transform: 'translateY(20px)'
    //     },
    //     '100%': {
    //         opacity: 1,
    //         transform: 'translateY(0)'
    //     }
    // }
  }
});

const mapStateToProps = createSelector(
  userFetchStateSelector,
  isSignedInSelector,
  userSelector,
  (fetchState, isSignedIn, user) => ({
    fetchState,
    isSignedIn,
    user
  })
);

const mapDispatchToProps = {
  tryToShowDonationModal,
  setLesson
};

class LearnLayout extends Component {
  componentDidMount() {
    this.props.tryToShowDonationModal();

    const lesson = this.props.pathname.split('/').slice(-1)[0];
    this.props.setLesson(lesson);
  }

  componentWillUnmount() {
    const metaTag = document.querySelector(`meta[name="robots"]`);
    if (metaTag) {
      metaTag.remove();
    }
  }

  render() {
    const { children, classes } = this.props;

    // if (pending && !complete) {
    //   return <Loader fullScreen={true} />;
    // }
    //
    // if (isSignedIn && !acceptedPrivacyTerms) {
    //   return <RedirectAcceptPrivacyTerm />;
    // }

    return (
      <Fragment>
        <Helmet>
          <meta content='noindex' name='robots' />
        </Helmet>
        <WithInstantSearch>
          <TopBar categories={[]} />
          <main className={classes.main}>{children}</main>
          <Footer categories={[]} />
        </WithInstantSearch>
      </Fragment>
    );
  }
}

LearnLayout.displayName = 'LearnLayout';
LearnLayout.propTypes = {
  children: PropTypes.any,
  fetchState: PropTypes.shape({
    pending: PropTypes.bool,
    complete: PropTypes.bool,
    errored: PropTypes.bool
  }),
  isSignedIn: PropTypes.bool,
  tryToShowDonationModal: PropTypes.func.isRequired,
  user: PropTypes.shape({
    acceptedPrivacyTerms: PropTypes.bool
  })
};

export default withStyles(styles)(
  connect(mapStateToProps, mapDispatchToProps)(LearnLayout)
);
