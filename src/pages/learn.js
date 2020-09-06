import React from 'react';

import PropTypes from 'prop-types';
import { createSelector } from 'reselect';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';

import LearnLayout from '../components/layouts/Learn';
import { dasherize } from '../..//utils/slugs';
import Map from '../components/Map';
import Intro from '../components/Intro';
import {
  userFetchStateSelector,
  isSignedInSelector,
  userSelector,
  hardGoTo as navigate
} from '../state';
import {
  UnitNode,
  AllUnitNode,
  AllBlock
} from '../state/propTypes';
import Grid from '@material-ui/core/Grid';
import { Box } from '@material-ui/core';

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
  state: PropTypes.object,
  user: PropTypes.shape({
    name: PropTypes.string,
    username: PropTypes.string
  })
};

// choose between the state from landing page and hash from url.
const hashValueSelector = (state, hash) => {
  if (state && state.superBlock) return dasherize(state.superBlock);
  else if (hash) return hash.substr(1);
  else return null;
};
const mapDispatchToProps = {
  navigate
};

export const LearnPage = ({
  location: { hash = '', state = '' },
  isSignedIn,
  navigate,
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
  return (
    <LearnLayout>
      <Helmet title='Learn | codetribe.com' />
      <Box p={1}>
        <Grid>
        {/*<Intro*/}
        {/*  complete={complete}*/}
        {/*  isSignedIn={isSignedIn}*/}
        {/*  name={name}*/}
        {/*  navigate={navigate}*/}
        {/*  pending={pending}*/}
        {/*  slug={slug}*/}
        {/*  username={username}*/}
        {/*/>*/}
        <Map
          hash={hashValue}
          blockNodes={blockEdges.map(({ node }) => node)}
          isSignedIn={isSignedIn}
          nodes={edges
            .map(({ node }) => node)
            .filter(({ isPrivate }) => !isPrivate)}
        />
      </Grid>
      </Box>
    </LearnLayout>
  );
};

LearnPage.displayName = 'LearnPage';
LearnPage.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LearnPage);

export const query = graphql`
#  isRequired
  query FirstUnit {
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
