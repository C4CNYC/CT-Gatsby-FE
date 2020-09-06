import React from 'react';
import PropTypes from 'prop-types';
import { Link, Spacer, Loader, FullWidthRow } from '../helpers';

import { apiLocation } from '../../../config/env.json';

import './intro.css';
import Grid from '@material-ui/core/Grid';

const propTypes = {
  complete: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  name: PropTypes.string,
  navigate: PropTypes.func,
  pending: PropTypes.bool,
  slug: PropTypes.string,
  username: PropTypes.string
};

function Intro({
  isSignedIn,
  username,
  name,
  navigate,
  pending,
  complete,
  slug
}) {
  if (pending && !complete) {
    return (
      <>
        <Spacer />
        <Loader />
        <Spacer />
      </>
    );
  } else if (isSignedIn) {
    return (
      <>
        <Grid item={true}>
          <Grid item={true} sm={10}  xs={12}>
            <Spacer />
            <h1 className='text-center big-heading'>
              {name ? `Welcome back, ${name}.` : `Welcome to codetribe.com`}
            </h1>
            <Spacer />
          </Grid>
        </Grid>
        <FullWidthRow className='button-group'>
          <Link
            className='btn btn-lg btn-primary btn-block'
            to={`/${username}`}
          >
            View my Portfolio
          </Link>
          <Link className='btn btn-lg btn-primary btn-block' to='/settings'>
            Update my account settings
          </Link>
        </FullWidthRow>
        <Spacer />
        <Grid item={true}>
          <Grid item={true} sm={10}  xs={12}>
            <Spacer />
            <h4>
              If you are new here, we recommend you{' '}
              <Link to={slug}>start at the beginning</Link>.
            </h4>
          </Grid>
        </Grid>
      </>
    );
  } else {
    return (
      <>
        <Grid item={true}>
          <Grid item={true} sm={10}  xs={12}>
            <Spacer />
            <h1 className='big-heading text-center'>Welcome to codetribe.com</h1>
            <Spacer />
            <h2 className='medium-heading'>Learn to code.</h2>
            <h2 className='medium-heading'>Build projects.</h2>
            <h2 className='medium-heading'>Earn certifications.</h2>
          </Grid>
          <Grid item={true} sm={10}  xs={12}>
            <button
              className={'btn-cta-big signup-btn btn-cta center-block'}
              onClick={() => {
                navigate(`${apiLocation}/signin`);
              }}
            >
              Sign in to save your progress
            </button>
          </Grid>
        </Grid>
        <Spacer />
      </>
    );
  }
}

Intro.propTypes = propTypes;
Intro.displayName = 'Intro';

export default Intro;
