/* eslint-disable max-len */
import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { Spacer } from '../helpers';
import { blockNameify } from '../../../utils/blockNameify';
import Heart from '../../assets/icons/Heart';
import Cup from '../../assets/icons/Cup';
import MinimalDonateForm from './MinimalDonateForm';

import { makeStyles } from '@material-ui/core/styles';

import {
  closeDonationModal,
  isDonationModalOpenSelector,
  isBlockDonationModalSelector,
  executeGA
} from '../../state';

import { unitMetaSelector } from '../../templates/Units/redux';

import './Donation.css';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const mapStateToProps = createSelector(
  isDonationModalOpenSelector,
  unitMetaSelector,
  isBlockDonationModalSelector,
  (show, { block }, isBlockDonation) => ({
    show,
    block,
    isBlockDonation
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      closeDonationModal,
      executeGA
    },
    dispatch
  );

const propTypes = {
  activeDonors: PropTypes.number,
  block: PropTypes.string,
  closeDonationModal: PropTypes.func.isRequired,
  executeGA: PropTypes.func,
  isBlockDonation: PropTypes.bool,
  show: PropTypes.bool
};

function DonateModal({
  show,
  block,
  isBlockDonation,
  closeDonationModal,
  executeGA
}) {
  const [closeLabel, setCloseLabel] = React.useState(false);
  const handleProcessing = (duration, amount) => {
    executeGA({
      type: 'event',
      data: {
        category: 'donation',
        action: 'Modal strip form submission',
        label: duration,
        value: amount
      }
    });
    setCloseLabel(true);
  };

  if (show) {
    executeGA({ type: 'modal', data: '/donation-modal' });
    executeGA({
      type: 'event',
      data: {
        category: 'Donation',
        action: `Displayed ${
          isBlockDonation ? 'block' : 'progress'
        } donation modal`,
        nonInteraction: true
      }
    });
  }

  const donationText = (
    <b>
      Become a supporter and help us create even more learning resources for
      you.
    </b>
  );
  const blockDonationText = (
    <div className='block-modal-text'>
      <div className='donation-icon-container'>
        <Cup className='donation-icon' />
      </div>
      {!closeLabel &&
        (<b>Nicely done. You just completed {blockNameify(block)}. </b>,
        { donationText })}
    </div>
  );

  const progressDonationText = (
    <div className='text-center progress-modal-text'>
      <div className='donation-icon-container'>
        <Heart className='donation-icon' />
      </div>
      {!closeLabel && { donationText }}
    </div>
  );

  function rand() {
    return Math.round(Math.random() * 20) - 10;
  }

  function getModalStyle() {
    const top = 50 + rand();
    const left = 50 + rand();

    return {
      top: `${top}%`,
      left: `${left}%`,
      transform: `translate(-${top}%, -${left}%)`
    };
  }

  const useStyles = makeStyles(theme => ({
    paper: {
      position: 'absolute',
      width: 400,
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3)
    }
  }));

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);

  return (
    <Modal  className='donation-modal' show={show}>
      <div className={classes.paper} style={modalStyle}>
        {isBlockDonation ? blockDonationText : progressDonationText}
        <Spacer />
        <MinimalDonateForm handleProcessing={handleProcessing} />
        <Spacer />
        <Button
          className='btn-link'
          onClick={closeDonationModal}
          tabIndex='0'
        >
          {closeLabel ? 'Close' : 'Ask me later'}
        </Button>
      </div>
    </Modal>
  );
}

DonateModal.displayName = 'DonateModal';
DonateModal.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DonateModal);
