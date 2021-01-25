import React from 'react';
import { Grid, Card, CardContent, Box } from '@material-ui/core';
import { Link } from 'gatsby';
import Helmet from 'react-helmet';
import landingPageStyle from 'assets/jss/material-kit-react/views/landingPage.jsx';
import withStyles from '@material-ui/core/styles/withStyles';

import { Spacer } from '../helpers';
import './landing.css';
import '../Map/map.css';
import { unit_data } from '../../learn/data/units_data';

export const Main = ({ mainId }) => {
  console.log('main props id', mainId);
  return (
    <>
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
          {unit_data.map((unit, i) => (
            <Grid className={'superblock'} item={true} key={i} xs={6}>
              <Card>
                <CardContent>
                  <Link to={`${unit.link}`}>
                    <img alt='' src={unit.image} style={{ width: '100%' }} />
                    <h2 className='medium-heading'>{unit.title}</h2>
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
};

Main.displayName = 'Landing';
export default withStyles(landingPageStyle)(Main);
