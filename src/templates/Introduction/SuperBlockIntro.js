import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { graphql, Link } from 'gatsby';

import FullWidthRow from '../../components/helpers/FullWidthRow';
import { Block } from '../../state/propTypes';
import { Box, Card, CardContent, Grid } from '@material-ui/core';
import LearnLayout from '../../components/layouts/Learn';
import Map from '../../components/Map';
import { Spacer } from '../../components/helpers';

const propTypes = {
  data: PropTypes.shape({
    block: Block
  })
};

function SuperBlockIntroductionPage({
                                      data: {
                                        allBlockNode,
                                        blockNode
                                      }
                                    }) {
  const {
    content,
    title,
    image
  } = blockNode;
  return (
    <LearnLayout>
      <Helmet>
        <title>{title} | codetribe.com</title>
      </Helmet>
      <Grid className='intro-layout-container' container={true}>
        <Grid container={true} xs={12}>
          <Grid item={true}>
            <img alt='' src={image} style={{width: '100%'}} />
          </Grid>
          <Grid item={true}>
            <h1
              className='intro-layout'
              dangerouslySetInnerHTML={{ __html: title }}
            />
          </Grid>
        </Grid>
        <FullWidthRow>
          <div
            className='intro-layout'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </FullWidthRow>
        <Grid container={true} spacing={3}>
        {allBlockNode.edges.map((block, i) => (
          <Grid className={'superblock'} item={true} key={i} xs={6}>
            <Card>
              <CardContent>
                <Link to={block.node.fields.slug}>
                  <img alt='' src={block.node.image} style={{width: '100%'}} />
                  <h2 className='medium-heading'>{block.node.title}</h2>
                </Link>
              </CardContent>
            </Card>
          </Grid>
        ))}
        <Spacer />
      </Grid>
      </Grid>
    </LearnLayout>
  );
}

SuperBlockIntroductionPage.displayName = 'SuperBlockIntroductionPage';
SuperBlockIntroductionPage.propTypes = propTypes;

export default SuperBlockIntroductionPage;

export const query = graphql`
  query SuperBlockIntroPageBySlug($slug: String!) {
    blockNode(fields: { slug: { eq: $slug } }) {
      title
      content
      image
    },
    allBlockNode(
#      filter: { superBlock: { eq: $slug } }
      sort: { fields: [order] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          title
          content
          image
        }
      }
    }
  }
`;
