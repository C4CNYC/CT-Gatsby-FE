import React, { useEffect } from 'react';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { dasherize } from '../../utils/slugs';
import Profile_Top from '../components/menu_profile/profile-top';
import Profile_Middle from '../components/menu_profile/profile-middle';
import Profile_Bottom from '../components/menu_profile/profile-bottom';
import {
    hardGoTo as navigate,
    isSignedInSelector,
    navigatorPositionChange,
    navigatorPositionSelector,
    navigatorShapeChange,
    navigatorShapeSelector,
    userFetchStateSelector,
    userSelector
} from '../state';
import { AllBlock, AllUnitNode, UnitNode } from '../state/propTypes';
import Grid from '@material-ui/core/Grid';
import { Box, Button } from '@material-ui/core';
// import HomeIcons from '../assets/images/svg-icons/home-icon.svg?name=HomeIcons';
import EditIcon from '!svg-react-loader!../assets/images/svg-icons/editicon.svg?name=EditIcon';
import HomeIcons from '@material-ui/icons/HomeOutlined';
import LockIcon from '@material-ui/icons/Lock';
// import LockIcon from '!svg-react-loader!../assets/images/svg-icons/lock-icon.svg?name=LockIcon';
import Modal from 'react-modal';

import './profile.css';
import 'bootstrap/dist/css/bootstrap.min.css';

Modal.setAppElement(`#___gatsby`);

const mapStateToProps = createSelector(
    userFetchStateSelector,
    isSignedInSelector,
    userSelector,
    navigatorPositionSelector,
    navigatorShapeSelector,
    (fetchState, isSignedIn, user, navigatorPosition, navigatorShape) => ({
        fetchState,
        isSignedIn,
        user,
        navigatorPosition,
        navigatorShape
    })
);

const propTypes = {
    data: PropTypes.shape({
        unitNode: UnitNode,
        allUnitNode: AllUnitNode,
        allBlockNode: AllBlock
    }),
    fetchState: PropTypes.shape({
        pending: PropTypes.bool,
        complete: PropTypes.bool,
        errored: PropTypes.bool
    }),
    hash: PropTypes.string,
    isSignedIn: PropTypes.bool,
    location: PropTypes.object,
    navigate: PropTypes.func.isRequired,
    navigatorPosition: PropTypes.string.isRequired,
    navigatorShape: PropTypes.string.isRequired,
    navigatorShapeChange: PropTypes.func.isRequired,
    navigatorPositionChange: PropTypes.func.isRequired,
    state: PropTypes.object,
    user: PropTypes.shape({
        name: PropTypes.string,
        username: PropTypes.string
    })
};

const modalStyles = {
    overlay: {
        backgroundColor: 'rgba(0, 0, 0, 0.58)'
    },
    content: {
        position: 'relative',
        top: 'auto',
        left: 'auto',
        right: 'auto',
        bottom: 'auto',
        width: '75%',
        margin: '32px auto',
        padding: 0,
        border: 0,
        zIndex: 9999
    }
};

// choose between the state from landing page and hash from url.

const hashValueSelector = (state, hash) => {
    if (state && state.superBlock) {
        return dasherize(state.superBlock);
    } else if (hash) {
        return hash.substr(1);
    } else {
        return null;
    }
};
const mapDispatchToProps = {
    navigate,
    navigatorPositionChange,
    navigatorShapeChange
};

// const mapDispatchToProps = dispatch =>
//     bindActionCreators(
//         { navigatorPositionChange, navigatorShapeChange },
//         dispatch
//     );

export const ProfilePage = ({
    location: { hash = '', state = '' },
    isSignedIn,
    navigate,
    navigatorPositionChange,
    navigatorShapeChange,
    fetchState: { pending, complete },
    user: { name = '', username = '' },
    data: {
        unitNode: {
            fields: { slug }
        },
        allUnitNode: { edges },
        allBlockNode: { edges: blockEdges }
    }
}) => {
    const hashValue = hashValueSelector(state, hash);

    useEffect(() => {
        navigatorShapeChange('open');
        navigatorPositionChange('is-featured');

        // returned function will be called on component unmount
        return () => {
            navigatorShapeChange('open');
            navigatorPositionChange('is-aside');
        };
    });

    return (
        // <LearnLayout>
        <>
            <Helmet title='Profile | codetribe.com' />
            <Box style={{ backgroundColor: '#f3f3f3' }}>
                <Profile_Top></Profile_Top>
                <div className='row' style={{ marginTop: '30px' }}>
                    <div className='pt-2 col-md-6 col-sm-12 col-xs-12' id='content'>
                        <Profile_Middle></Profile_Middle>
                    </div>
                    <div className='pt-2 col-md-6 col-sm-12 col-xs-12' id='content1' style={{ marginTop: '30px' }}>
                        <Profile_Bottom></Profile_Bottom>
                    </div>
                </div>
            </Box>
        </>
        // </LearnLayout>
    );
};

ProfilePage.displayName = 'ProfilePage';
ProfilePage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(ProfilePage);
export const query = graphql`
    #  isRequired
    query SecondUnit {
        unitNode(order: { eq: 0 }, unitOrder: { eq: 0 }) {
            fields {
                slug
            }
        }
        allUnitNode(sort: { fields: [superOrder, order, unitOrder] }) {
            edges {
                node {
                    fields {
                        slug
                        blockName
                    }
                    id
                    block
                    title
                    superBlock
                    dashedName
                }
            }
        }
        allBlockNode {
            edges {
                node {
                    title
                    content
                    image
                    #          block
                    fields {
                        slug
                    }
                }
            }
        }
    }
`;
