import React, { Fragment } from 'react';
import { Grid, Card, CardContent, Box } from '@material-ui/core';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { Spacer } from '../helpers';

import './landing.css';
import '../Map/map.css';
// import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
const propTypes = {
  edges: PropTypes.array
};

const landingPageStyle = (theme) => ({
  card: {
    backgroundColor: theme.base.colors.background,
    color: theme.base.colors.text,
    border: `4px solid ${theme.base.colors.lines}`
  }
});

export const Landing = ({ edges, classes }) => {
  // const superBlocks = uniq(edges.map(element => element.node.superBlock));
  const superBlocks = edges
    .map((element) => element.node)
    .filter((block) => !block.superBlock);
  // const superBlocks = projects.map(element => element.node).filter(block => !block.superBlock);
  //
  console.log('landing classes', classes);
  return (
    <Fragment>
      <Helmet>
        <title>Vocational Coding for Teens | Codetribe.com</title>
      </Helmet>
      <Box px={3}>
        <Grid container={true} spacing={3}>
          <Grid item={true} m={6} xs={12}>
            <h2 className='medium-heading'>
              Welcome to the Codetribe Learn Platform!
            </h2>
          </Grid>
          <Grid item={true} m={6} xs={12}>
            <img
              alt='Little brown boys playing with magic thing'
              src={require('assets/images/homepage_header.jpg')}
              style={{ width: '100%' }}
            />
          </Grid>
        </Grid>

        <h2 className='medium-heading'>Latest Updates:</h2>
        <Grid container={true} spacing={3}>
          {superBlocks.map((superBlock, i) => (
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
                  <Link to={superBlock.fields.slug}>
                    <img
                      alt=''
                      src={superBlock.image}
                      style={{ width: '100%' }}
                    />
                    <h2 className='medium-heading'>{superBlock.title}</h2>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Spacer />
        </Grid>
      </Box>
    </Fragment>
  );
};

Landing.displayName = 'Landing';
Landing.propTypes = propTypes;
export default withStyles(landingPageStyle)(Landing);
