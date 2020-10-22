import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from '@material-ui/core/styles';
import theme from '../../src/styles/theme';

import React, { Fragment, Component, lazy, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { createSelector } from 'reselect';
import Helmet from 'react-helmet';
import fontawesome from '@fortawesome/fontawesome';

import {
    fetchUser,
    isSignedInSelector,
    onlineStatusChange,
    isOnlineSelector,
    userSelector,
    executeGA,
    isWideScreenSelector,
    wideScreenStatusChange,
    navigatorPositionChange,
    navigatorShapeChange, navigatorPositionSelector, navigatorShapeSelector, fontSizeIncreaseSelector, fontSizeChange
} from '../../src/state';
import { flashMessageSelector, removeFlashMessage } from '../../src/components/Flash/redux';

import { isBrowser } from '../../utils';

import OfflineWarning from '../../src/components/OfflineWarning';
import Flash from '../../src/components/Flash';
// preload common fonts
// // eslint-disable-next-line max-len
// import montserratRegularURL from '../../../static/fonts/montserrat/montserrat-v14-latin-regular.woff';
// // eslint-disable-next-line max-len
// import montserratBoldURL from '../../../static/fonts/montserrat/montserrat-v14-latin-700.woff';
// // eslint-disable-next-line max-len
// import montserratItalicURL from '../../../static/fonts/montserrat/montserrat-v14-latin-italic.woff';
// // eslint-disable-next-line max-len
// import montserratBoldItalicURL from '../../../static/fonts/montserrat/montserrat-v14-latin-700italic.woff';

import { isWideScreen, timeoutThrottlerHandler } from '../../src/utils/helpers';

import withStyles from '@material-ui/core/styles/withStyles';
import Navigator from '../../src/components/Navigator/Navigator';
import InfoBar from '../../src/components/InfoBar/InfoBar';
import LayoutWrapper from '../../src/components/LayoutWrapper/LayoutWrapper';

fontawesome.config = {
    autoAddCss: false
};

const metaKeywords = [
    'javascript',
    'js',
    'website',
    'web',
    'development',
    'free',
    'code',
    'camp',
    'course',
    'courses',
    'html',
    'css',
    'react',
    'redux',
    'api',
    'front',
    'back',
    'end',
    'learn',
    'tutorial',
    'programming'
];

const propTypes = {
    children: PropTypes.node.isRequired,
    executeGA: PropTypes.func,
    fetchUser: PropTypes.func.isRequired,
    flashMessage: PropTypes.shape({
        id: PropTypes.string,
        type: PropTypes.string,
        message: PropTypes.string
    }),
    hasMessage: PropTypes.bool,
    isOnline: PropTypes.bool.isRequired,
    isSignedIn: PropTypes.bool,
    onlineStatusChange: PropTypes.func.isRequired,
    pathname: PropTypes.string,
    removeFlashMessage: PropTypes.func.isRequired,
    showFooter: PropTypes.bool,
    transparentHeader: PropTypes.bool,
    theme: PropTypes.string,
    useTheme: PropTypes.bool,
    isWideScreen: PropTypes.bool.isRequired,
    wideScreenStatusChange: PropTypes.func.isRequired,
    fontSizeIncrease: PropTypes.any.isRequired,
    fontSizeChange: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
    isSignedInSelector,
    flashMessageSelector,
    isOnlineSelector,
    userSelector,
    isWideScreenSelector,
    navigatorPositionSelector,
    navigatorShapeSelector,
    fontSizeIncreaseSelector,
    (isSignedIn, flashMessage, isOnline, user, isWideScreen, navigatorPosition, navigatorShape, fontSizeIncrease) => ({
        isSignedIn,
        flashMessage,
        hasMessage: !!flashMessage.message,
        isOnline,
        theme: user.theme,
        isWideScreen,
        navigatorPosition,
        navigatorShape,
        fontSizeIncrease
    })
);

const mapDispatchToProps = dispatch =>
    bindActionCreators(
        { fetchUser, removeFlashMessage, onlineStatusChange, executeGA, wideScreenStatusChange, navigatorPositionChange, navigatorShapeChange, fontSizeChange },
        dispatch
    );

class TopLayout extends Component {
    timeouts = {};
    categories = [];
    data = {};

    componentDidMount() {
        const { isSignedIn, fetchUser, pathname, executeGA } = this.props;
        if (!isSignedIn) {
            fetchUser();
        }
        executeGA({ type: 'page', data: pathname });

        window.addEventListener('online', this.updateOnlineStatus);
        window.addEventListener('offline', this.updateOnlineStatus);

        this.updateWideScreenStatus();
        if (typeof window !== 'undefined') {
            window.addEventListener('resize', this.resizeThrottler, false);
        }
    }

    componentDidUpdate(prevProps) {
        const { pathname, executeGA } = this.props;
        const { pathname: prevPathname } = prevProps;
        if (pathname !== prevPathname) {
            executeGA({ type: 'page', data: pathname });
        }
    }

    componentWillUnmount() {
        window.removeEventListener('online', this.updateOnlineStatus);
        window.removeEventListener('offline', this.updateOnlineStatus);

        if (typeof localStorage !== 'undefined') {
            const inLocal = +localStorage.getItem('font-size-increase');

            const inStore = this.props.fontSizeIncrease;

            if (inLocal && inLocal !== inStore && inLocal >= 1 && inLocal <= 1.5) {
                this.props.setFontSizeIncrease(inLocal);
            }
        }
    }

    resizeHandler = () => {
        this.props.wideScreenStatusChange(isWideScreen());
    };

    resizeThrottler = () => {
        return timeoutThrottlerHandler(this.timeouts, 'resize', 500, this.resizeHandler);
    };

    updateOnlineStatus = () => {
        const { onlineStatusChange } = this.props;
        const isOnline =
            isBrowser() && 'navigator' in window ? window.navigator.onLine : null;
        return typeof isOnline === 'boolean' ? onlineStatusChange(isOnline) : null;
    };

    updateWideScreenStatus = () => {
        const isWideScreenBool = isWideScreen();
        const { wideScreenStatusChange } = this.props;
        return typeof isWideScreenBool === 'boolean' ? wideScreenStatusChange(isWideScreenBool) : null;
    };

    render() {
        const { classes, ...rest } = this.props;
        const {
            children,
            hasMessage,
            flashMessage,
            isOnline,
            isSignedIn,
            removeFlashMessage,
            // showFooter = true,
            // transparentHeader = false,
            // theme = 'night',
            // useTheme = true,
            // isWideScreen,
            // navigatorShape,
            // navigatorPosition
        } = this.props;
        return (
            <Fragment>
                <Helmet
                    // bodyAttributes={{
                    //   class: useTheme
                    //     ? `${theme === 'default' ? 'light-palette' : 'dark-palette'}`
                    //     : 'light-palette'
                    // }}
                    meta={[
                        {
                            name: 'description',
                            content:
                                'Learn to code with free online courses, programming ' +
                                'projects, and interview preparation for developer jobs.'
                        },
                        {
                            name: 'viewport',
                            content:
                                'minimum-scale=1, initial-scale=1, width=device-width'
                        },
                        { name: 'keywords', content: metaKeywords.join(', ') }
                    ]}
                >
                    <link
                        href='https://fonts.googleapis.com/css?family=Montserrat:400,500,700&display=swap'
                        rel='stylesheet'
                    />
                    {/* <link*/}
                    {/*  as='font'*/}
                    {/*  crossOrigin='anonymous'*/}
                    {/*  href={montserratRegularURL}*/}
                    {/*  rel='preload'*/}
                    {/*  type='font/woff'*/}
                    {/* />*/}
                    {/* <link*/}
                    {/*  as='font'*/}
                    {/*  crossOrigin='anonymous'*/}
                    {/*  href={montserratBoldURL}*/}
                    {/*  rel='preload'*/}
                    {/*  type='font/woff'*/}
                    {/* />*/}
                    {/* <link*/}
                    {/*  as='font'*/}
                    {/*  crossOrigin='anonymous'*/}
                    {/*  href={montserratItalicURL}*/}
                    {/*  rel='preload'*/}
                    {/*  type='font/woff'*/}
                    {/* />*/}
                    {/* <link*/}
                    {/*  as='font'*/}
                    {/*  crossOrigin='anonymous'*/}
                    {/*  href={montserratBoldItalicURL}*/}
                    {/*  rel='preload'*/}
                    {/*  type='font/woff'*/}
                    {/* />*/}
                    <style>{fontawesome.dom.css()}</style>
                </Helmet>
                <ThemeProvider theme={theme}>
                    {/* CssBaseline kickstart an elegant, consistent, and simple baseline to build upon. */}
                    <CssBaseline />

                    <OfflineWarning isOnline={isOnline} isSignedIn={isSignedIn} />
                    {hasMessage && flashMessage ? (
                        <Flash flashMessage={flashMessage} onClose={removeFlashMessage} />
                    ) : null}
                    <Navigator />
                    <InfoBar pages={[]} parts={[]} />
                    {children}
                </ThemeProvider>
            </Fragment>
        );
    }
}

TopLayout.displayName = 'TopLayout';
TopLayout.propTypes = propTypes;

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TopLayout);
