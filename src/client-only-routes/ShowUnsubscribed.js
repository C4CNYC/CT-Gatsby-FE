import React, { Fragment } from 'react';
import PropTypes from 'prop-types';

import Helmet from 'react-helmet';

import env from '../../config/env.json';
import FullWidthRow from '../components/helpers/FullWidthRow';
import { Spacer } from '../components/helpers';
import { Card } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

const { apiLocation } = env;

function ShowUnsubscribed({ unsubscribeId }) {
  return (
    <Fragment>
      <Helmet>
        <title>You have been unsubscribed | codetribe.com</title>
      </Helmet>
      <Grid>
        <main>
          <FullWidthRow>
            <Spacer size={2} />
            <Card className='text-center'>
              <Spacer />
              <h2>You have successfully been unsubscribed</h2>
              <p>Whatever you go on to, keep coding!</p>
            </Card>
          </FullWidthRow>
          {unsubscribeId ? (
            <FullWidthRow>
              <Button
                href={`${apiLocation}/internal/resubscribe/${unsubscribeId}`}
              >
                You can click here to resubscribe
              </Button>
            </FullWidthRow>
          ) : null}
          <Spacer size={2} />
        </main>
      </Grid>
    </Fragment>
  );
}

ShowUnsubscribed.displayName = 'ShowUnsubscribed';
ShowUnsubscribed.propTypes = {
  unsubscribeId: PropTypes.string
};

export default ShowUnsubscribed;
