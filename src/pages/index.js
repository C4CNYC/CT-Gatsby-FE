import React from 'react';
import PropTypes from 'prop-types';
import { graphql } from 'gatsby';

import Landing from '../components/landing';
import { AllBlock, AllUnitNode } from '../state/propTypes';

export const IndexPage = ({
  data: {
    // allUnitNode: { edges }
    allBlockNode: { edges }
  }
}) => {
  return <Landing edges={edges} />;
};

const propTypes = {
  data: PropTypes.shape({
    allUnitNode: AllUnitNode,
    allBlockNode: AllBlock
  })
};

IndexPage.propTypes = propTypes;
IndexPage.displayName = 'IndexPage';

export default IndexPage;

export const query = graphql`
  query challNodes {
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
    },
    allBlockNode(sort: { fields: [superOrder, order] }) {
      edges {
        node {
          fields {
            slug
          }
          id
          title
          content
          excerpt
          image
          dashedName
          superBlock
        }
      }
    }
  }
`;
