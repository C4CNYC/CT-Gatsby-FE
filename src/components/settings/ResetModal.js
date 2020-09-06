import React from 'react';
import PropTypes from 'prop-types';

import { ButtonSpacer } from '../helpers';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

const propTypes = {
  onHide: PropTypes.func.isRequired,
  reset: PropTypes.func.isRequired,
  show: PropTypes.bool
};

function ResetModal(props) {
  const { show, onHide } = props;
  return null;
  // return (
  //   <Modal
  //     aria-labelledby='modal-title'
  //     autoFocus={true}
  //     backdrop={true}
  //
  //     className='text-center'
  //     keyboard={true}
  //     onHide={onHide}
  //     show={show}
  //   >
  //     <Modal.Header closeButton={true}>
  //       <Modal.Title id='modal-title'>Reset My Progress</Modal.Title>
  //     </Modal.Header>
  //     <Modal.Body>
  //       <p>
  //         This will really delete all of your progress, points, completed
  //         units, our records of your projects, any certifications you have,
  //         everything.
  //       </p>
  //       <p>
  //         We won't be able to recover any of it for you later, even if you
  //         change your mind.
  //       </p>
  //       <hr />
  //       <Button
  //
  //         className='btn-invert'
  //         onClick={props.onHide}
  //         type='button'
  //       >
  //         Nevermind, I don't want to delete all of my progress
  //       </Button>
  //       <ButtonSpacer />
  //       <Button
  //
  //         className='btn-danger'
  //         onClick={props.reset}
  //         type='button'
  //       >
  //         Reset everything. I want to start from the beginning
  //       </Button>
  //     </Modal.Body>
  //     <Modal.Footer>
  //       <Button onClick={props.onHide}>Close</Button>
  //     </Modal.Footer>
  //   </Modal>
  // );
}

ResetModal.displayName = 'ResetModal';
ResetModal.propTypes = propTypes;

export default ResetModal;
