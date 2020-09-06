import React from 'react';
import PropTypes from 'prop-types';
import Button from '@material-ui/core/Button';

function BlockSaveButton({ children, ...restProps }) {
  return (
    <Button  type='submit' {...restProps}>
      {children || 'Save'}
    </Button>
  );
}

BlockSaveButton.displayName = 'BlockSaveButton';
BlockSaveButton.propTypes = {
  children: PropTypes.any
};

export default BlockSaveButton;
