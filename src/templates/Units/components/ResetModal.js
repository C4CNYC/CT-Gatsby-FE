import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { isResetModalOpenSelector, closeModal, resetUnit } from '../redux';
import { executeGA } from '../../../state';

import './reset-modal.css';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const propTypes = {
  close: PropTypes.func.isRequired,
  executeGA: PropTypes.func,
  isOpen: PropTypes.bool.isRequired,
  reset: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  isResetModalOpenSelector,
  isOpen => ({
    isOpen
  })
);

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      close: () => closeModal('reset'),
      executeGA,
      reset: () => resetUnit()
    },
    dispatch
  );

function withActions(...fns) {
  return () => fns.forEach(fn => fn());
}

function ResetModal({ reset, close, isOpen }) {
  if (isOpen) {
    executeGA({ type: 'modal', data: '/reset-modal' });
  }
  return (
    <Modal
      animation={false}
      dialogClassName='reset-modal'
      keyboard={true}
      onHide={close}
      open={isOpen}
    >
      <Modal.Header className='reset-modal-header' closeButton={true}>
        <Modal.Title className='text-center'>Reset this lesson?</Modal.Title>
      </Modal.Header>
      <Modal.Body className='reset-modal-body'>
        <div className='text-center'>
          <p>
            Are you sure you wish to reset this lesson? The editors and tests
            will be reset.
          </p>
          <p>
            <em>This cannot be undone</em>.
          </p>
        </div>
      </Modal.Body>
      <Modal.Footer className='reset-modal-footer'>
        <Button  onClick={withActions(reset, close)}>
          Reset this Lesson
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

ResetModal.displayName = 'ResetModal';
ResetModal.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ResetModal);
