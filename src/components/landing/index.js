import React, { Fragment } from 'react';
import { Grid, Card, CardContent, Box } from '@material-ui/core';
import Helmet from 'react-helmet';
import PropTypes from 'prop-types';
import { Link } from 'gatsby';
import { uniq } from 'lodash';
import { Spacer } from '../helpers';

import './landing.css';
import '../Map/map.css';
import Parallax from '../Parallax/Parallax';
import GridContainer from '../Grid/GridContainer';
import GridItem from '../Grid/GridItem';
import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx';
import withStyles from '@material-ui/core/styles/withStyles';
import Button from '../CustomButtons/Button';
import Main from '../Main';
import avatar from '../../assets/images/jika.png';

const propTypes = {
  edges: PropTypes.array
};

export const Landing = ({ edges }) => {
  // const superBlocks = uniq(edges.map(element => element.node.superBlock));
  const superBlocks = edges.map(element => element.node).filter(block => !block.superBlock);
  return (
    <Fragment>
      <Helmet>
        <title>Vocational Coding for Teens | Codetribe.com</title>
      </Helmet>
      {/* <main className='landing-page'>*/}
        <Main>
        {/* <div className="award">*/}
        {/*  <a*/}
        {/*    href="https://www.fastcompany.com/90329244/world-changing-ideas-2019-all-the-winners-finalists-and-honorable-mentions"*/}
        {/*    target="_blank">Awarded honorary "World-changing Idea" by Fast Company 2019</a>*/}
        {/* </div>*/}
        {/* <Parallax image={require("assets/images/homepage_header.jpg")}>*/}
        {/*  <div>*/}
        {/*    <GridContainer>*/}
        {/*      <GridItem xs={12} sm={12} md={6}>*/}
        {/*        <h1 className='big-heading text-center'>Welcome to Codetribe</h1>*/}
        {/*        <Spacer />*/}
        {/*        <h2 className='medium-heading text-center'>Learn to code.</h2>*/}
        {/*        <h2 className='medium-heading text-center'>Earn certifications.</h2>*/}
        {/*        <h2 className='medium-heading text-center'>*/}
        {/*          Vocational Coding in High Schools –Radical, offline, fun and*/}
        {/*          student-driven. Join us*/}
        {/*        </h2>*/}
        {/*        <br />*/}
        {/*        <Button*/}
        {/*          color="danger"*/}
        {/*          size="lg"*/}
        {/*          href="https://www.youtube.com/watch?v=dQw4w9WgXcQ"*/}
        {/*          target="_blank"*/}
        {/*          rel="noopener noreferrer"*/}
        {/*        >*/}
        {/*          Watch video*/}
        {/*        </Button>*/}
        {/*      </GridItem>*/}
        {/*    </GridContainer>*/}
        {/*  </div>*/}
        {/* </Parallax>*/}
        <Box px={3}>
          <Grid container={true} spacing={3}>
            <Grid item={true} m={6} xs={12}>
              <h2 className='medium-heading'>Welcome to the Codetribe Learn Platform!</h2>
            </Grid>
            <Grid item={true} m={6} xs={12}>
              <img alt='Little brown boys playing with magic thing' src={require('assets/images/homepage_header.jpg')} style={{width: '100%'}} />
            </Grid>
          </Grid>

          <h2 className='medium-heading'>Courses:</h2>
          <Grid container={true} spacing={3}>
            {superBlocks.map((superBlock, i) => (
              <Grid className={'superblock'} item={true} key={i} xs={6}>
                <Card>
                  <CardContent>
                    <Link to={superBlock.fields.slug}>
                      <img alt='' src={superBlock.image} style={{width: '100%'}} />
                      <h2 className='medium-heading'>{superBlock.title}</h2>
                    </Link>
                  </CardContent>
                </Card>
              </Grid>
            ))}
            <Grid className={'superblock'} item={true} xs={6}>
              <Card>
                <CardContent>
                  <Link to={'/learn'}>
                    <h2 className='medium-heading'>All Courses</h2>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
            <Spacer />
          </Grid>
        </Box>
        </Main>
      {/* </main>*/}
    </Fragment>
  );
};

Landing.displayName = 'Landing';
Landing.propTypes = propTypes;
export default withStyles(landingPageStyle)(Landing);
