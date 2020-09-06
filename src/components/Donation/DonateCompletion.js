import React from 'react';
import PropTypes from 'prop-types';

import Spinner from 'react-spinkit';

import './Donation.css';
import Alert from '@material-ui/lab/Alert';
import Button from '@material-ui/core/Button';

const propTypes = {
  error: PropTypes.string,
  processing: PropTypes.bool,
  reset: PropTypes.func.isRequired,
  success: PropTypes.bool
};

function DonateCompletion({ processing, reset, success, error = null }) {
  /* eslint-disable no-nested-ternary */
  const style = processing ? 'info' : success ? 'success' : 'error';
  const heading = processing
    ? 'We are processing your donation.'
    : success
    ? 'Thank you for being a supporter.'
    : 'Something went wrong with your donation.';
  return (
    <Alert className='donation-completion'>
      <h4>
        <b>{heading}</b>
      </h4>
      <div className='donation-completion-body'>
        {processing && (
          <Spinner
            className='user-state-spinner'
            color='#0a0a23'
            fadeIn='none'
            name='line-scale'
          />
        )}
        {success && (
          <div>
            <p>
              Your donations will support free technology education for people
              all over the world.
            </p>
            <p>
              You can update your supporter status at any time from your
              settings page.
            </p>
          </div>
        )}
        {error && <p>{error}</p>}
      </div>
      <div className='donation-completion-buttons'>
        {error && (
          <div>
            <Button onClick={reset}>Try again</Button>
          </div>
        )}
      </div>
    </Alert>
  );
}

DonateCompletion.displayName = 'DonateCompletion';
DonateCompletion.propTypes = propTypes;

export default DonateCompletion;
