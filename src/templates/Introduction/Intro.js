import React from 'react';
import PropTypes from 'prop-types';
import { Link, graphql } from 'gatsby';
import Helmet from 'react-helmet';
import { Grid } from '@material-ui/core';

import LearnLayout from '../../components/layouts/Learn';
import FullWidthRow from '../../components/helpers/FullWidthRow';
import ButtonSpacer from '../../components/helpers/ButtonSpacer';
import { Block, AllUnitNode } from '../../state/propTypes';

import './intro.css';

const propTypes = {
  data: PropTypes.shape({
    blockNode: Block,
    allUnitNode: AllUnitNode
  })
};

function renderMenuItems({ edges = [] }) {
  return edges
    .map(({ node }) => node)
    .map(({ title, fields: { slug } }) => (
      <Link key={'intro-' + slug} to={slug}>
        {title}
      </Link>
    ));
}

function IntroductionPage({ data: { blockNode, allUnitNode } }) {
  const {
    content,
    title,
    image
  } = blockNode;
  const firstLesson = allUnitNode && allUnitNode.edges[0] && allUnitNode.edges[0].node;
  const firstLessonPath = firstLesson
    ? firstLesson.fields.slug
    : '/strange-place';
  return (
    <LearnLayout>
      <Helmet>
        <title>{title} | codetribe.com</title>
      </Helmet>
      <Grid className='intro-layout-container'>
        <Grid item={true} sm={4} xs={6}>
          <img alt='' src={image} style={{width: '100%'}} />
        </Grid>
        <Grid item={true} sm={4} xs={6}>
          <h1
            className='intro-layout'
            dangerouslySetInnerHTML={{ __html: title }}
          />
        </Grid>
        <FullWidthRow>
          <div
            className='intro-layout'
            dangerouslySetInnerHTML={{ __html: content }}
          />
        </FullWidthRow>
        <FullWidthRow>
          <Link
            className='btn btn-lg btn-primary btn-block'
            to={firstLessonPath}
          >
            Go to the first lesson
          </Link>
          <ButtonSpacer />
          <Link className='btn btn-lg btn-primary btn-block' to='/learn'>
            View the curriculum
          </Link>
          <ButtonSpacer />
          <hr />
        </FullWidthRow>
        <FullWidthRow>
          <h2 className='intro-toc-title'>Upcoming Lessons</h2>
          <div className='intro-toc'>
            {allUnitNode ? renderMenuItems(allUnitNode) : null}
          </div>
        </FullWidthRow>
      </Grid>
    </LearnLayout>
  );
}

IntroductionPage.displayName = 'IntroductionPage';
IntroductionPage.propTypes = propTypes;

export default IntroductionPage;

export const query = graphql`
  query IntroPageBySlug($slug: String!) {
    blockNode(fields: { slug: { eq: $slug } }) {
      title
      content
      image
    }
    allUnitNode(
#      filter: { block: { eq: $block } }
      sort: { fields: [superOrder, order, unitOrder] }
    ) {
      edges {
        node {
          fields {
            slug
          }
          title
        }
      }
    }
  }
`;
