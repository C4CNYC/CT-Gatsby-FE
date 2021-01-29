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
import withStyles from '@material-ui/core/styles/withStyles';
import lessons from '../../../utils/lessons';
const propTypes = {
  data: PropTypes.shape({
    block: Block
  })
};

const styles = (theme) => ({
  title: {
    color: theme.base.colors.text
  },
  card: {
    backgroundColor: theme.base.colors.background,
    color: theme.base.colors.text,
    border: `4px solid ${theme.base.colors.lines}`
  }
});

function SuperBlockIntroductionPage({
  classes,
  data: { allBlockNode, blockNode }
}) {
  const { content, title, image } = blockNode;
  return (
    <>
      <Helmet>
        <title>{title} | codetribe.com</title>
      </Helmet>
      <Box p={3}>
        <Grid className='intro-layout-container' container={true} spacing={3}>
          <Grid container={true}>
            <Grid item={true}>
              <img alt='' src={image} style={{ width: '100%' }} />
            </Grid>
            <Grid item={true}>
              <h1
                className={classes.title}
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Grid>
          </Grid>
          <FullWidthRow>
            <div
              className='intro-layout'
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <p>
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
              dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
              ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
              dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
              ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
              dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor{' '}
            </p>
          </FullWidthRow>
        </Grid>
      </Box>
      <Box p={3}>
        <FullWidthRow>
          <h2>Lessons:</h2>
        </FullWidthRow>
        <Grid container={true} spacing={3}>
          {lessons.edges.map((block, i) => (
            <Grid
              className={'superblock'}
              item={true}
              key={i}
              sm={12}
              md={6}
              lg={4}
            >
              <Card className={classes.card}>
                <CardContent>
                  <Link to={block.node.fields.slug}>
                    <img
                      alt=''
                      src={block.node.image}
                      style={{ width: '100%' }}
                    />
                    <h2 className='medium-heading'>{block.node.title}</h2>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Spacer />
        </Grid>
      </Box>
    </>
  );
}

SuperBlockIntroductionPage.displayName = 'SuperBlockIntroductionPage';
SuperBlockIntroductionPage.propTypes = propTypes;

export default withStyles(styles)(SuperBlockIntroductionPage);

export const query = graphql`
  query SuperBlockIntroPageBySlug($slug: String!) {
    blockNode(fields: { slug: { eq: $slug } }) {
      title
      content
      image
    }
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
