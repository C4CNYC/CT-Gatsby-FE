import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function BlockSaveButton(props) {
  return (
    <Button  {...props} type='submit'>
      {props.children || 'Save'}
    </Button>
  );
}

BlockSaveButton.displayName = 'BlockSaveButton';
BlockSaveButton.propTypes = {
  children: PropTypes.any
};

export default BlockSaveButton;
