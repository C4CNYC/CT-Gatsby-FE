import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

function SlimWidthRow({ children, ...restProps }) {
  return (
    <Grid item={true} {...restProps}>
      <Grid item={true} md={6} mdOffset={3} sm={12}>
        {children}
      </Grid>
    </Grid>
  );
}

SlimWidthRow.displayName = 'SlimWidthRow';
SlimWidthRow.propTypes = {
  children: PropTypes.any
};

export default SlimWidthRow;
