import React, { Fragment, Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Loader } from '../../components/helpers';
import {
  userSelector,
  userFetchStateSelector,
  isSignedInSelector,
  tryToShowDonationModal
} from '../../state';
import createRedirect from '../../components/createRedirect';
import DonateModal from '../Donation/DonationModal';

import 'prismjs/themes/prism.css';
import './prism.css';
import './prism-night.css';
import 'react-reflex/styles.css';
import './learn.css';
import Main from '../Main';
import OfflineWarning from '../OfflineWarning';
import Flash from '../Flash';
import ActionsBar from '../ActionsBar/ActionsBar';
import InfoBar from '../InfoBar/InfoBar';
import Loading from '../common/Loading/Loading';
import muiTheme from '../../styles/theme';
import LayoutWrapper from '../LayoutWrapper/LayoutWrapper';
import WithInstantSearch from '../search/WithInstantSearch';
import SpringScrollbars from '../SpringScrollbars/SpringScrollbars';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
    main: {
        position: 'absolute',
        top: 0,
        left: 0,
        bottom: 0,
        width: '100%',
        animationName: 'main-entry',
        animationDuration: '.5s',
        [`@media (min-width: ${theme.mediaQueryTresholds.L}px)`]: {
            // width: `100vw`,
        },
        [`@media (max-width: ${theme.mediaQueryTresholds.L}px)`]: {
            top: '61px' // todo
        },
        '& > div': {
            height: '100%'
        }
        // '@media print': {
        //     position: 'relative',
        //     '& > div': {
        //         overflow: 'visible!important'
        //     },
        //     '& > div > div': {
        //         position: 'relative!important'
        //     }
        // }
    },
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
  tryToShowDonationModal
};

const RedirectAcceptPrivacyTerm = createRedirect('/accept-privacy-terms');

class LearnLayout extends Component {
  componentDidMount() {
    this.props.tryToShowDonationModal();
  }

  componentWillUnmount() {
    const metaTag = document.querySelector(`meta[name="robots"]`);
    if (metaTag) {
      metaTag.remove();
    }
  }

  render() {
    const {
      fetchState: { pending, complete },
      isSignedIn,
      user: { acceptedPrivacyTerms },
      children,
      classes
    } = this.props;

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
        {/*  <LayoutWrapper>*/}
            {/*<OfflineWarning isOnline={isOnline} isSignedIn={isSignedIn} />*/}
            {/*{hasMessage && flashMessage ? (*/}
            {/*    <Flash flashMessage={flashMessage} onClose={removeFlashMessage} />*/}
            {/*) : null}*/}

          {/*{children}*/}
              <main className={classes.main}>
                  {/*<SpringScrollbars>*/}
                      {children}
                  {/*</SpringScrollbars>*/}
              </main>
            <ActionsBar categories={[]} />
            {/*<InfoBar pages={[]} parts={[]} />*/}
          {/*</LayoutWrapper>*/}
        </WithInstantSearch>
        {/*<Main id='learn-app-wrapper'>{children}</Main>*/}
        {/*<DonateModal />*/}
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

export default withStyles(styles)(connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnLayout));
