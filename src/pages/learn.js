import React, { useEffect } from 'react';
import { Router as LRouter } from '@reach/router';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { dasherize } from '../../utils/slugs';
import { Slide } from '../components/learn/slide';
import { Main } from '../components/learn/main';
import { Unit } from '../components/learn/unit';
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
import { Box } from '@material-ui/core';

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

export const LearnPage = (
  props
  // {
  //   location: { hash = '', state = '' },
  //   isSignedIn,
  //   navigate,
  //   navigatorPositionChange,
  //   navigatorShapeChange,
  //   fetchState: { pending, complete },
  //   user: { name = '', username = '' },
  //   data: {
  //     unitNode: {
  //       fields: { slug }
  //     },
  //     allUnitNode: { edges },
  //     allBlockNode: { edges: blockEdges }
  //   }
  // }
) => {
  // const hashValue = hashValueSelector(state, hash);

  // useEffect(() => {
  //   navigatorShapeChange('open');
  //   navigatorPositionChange('is-featured');

  //   // returned function will be called on component unmount
  //   return () => {
  //     navigatorShapeChange('open');
  //     navigatorPositionChange('is-aside');
  //   };
  // });

  return (
    <>
      <Helmet title='Learn | codetribe.com' />
      <LRouter>
        <Slide path='learn-new/:unitId/:lessonId/slides' />
        <Slide path='learn-new/:unitId/:lessonId' />
        <Unit path='learn-new/:unitId' />
        <Main path='learn-new' />
      </LRouter>
    </>
  );
};

LearnPage.displayName = 'LearnPage';
LearnPage.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(LearnPage);

// export const query = graphql`
//   #  isRequired
//   query FirstUnit {
//     unitNode(order: { eq: 0 }, unitOrder: { eq: 0 }) {
//       fields {
//         slug
//       }
//     }
//     allUnitNode(sort: { fields: [superOrder, order, unitOrder] }) {
//       edges {
//         node {
//           fields {
//             slug
//             blockName
//           }
//           id
//           block
//           title
//           superBlock
//           dashedName
//         }
//       }
//     }
//     allBlockNode {
//       edges {
//         node {
//           title
//           content
//           image
//           #          block
//           fields {
//             slug
//           }
//         }
//       }
//     }
//   }
// `;
