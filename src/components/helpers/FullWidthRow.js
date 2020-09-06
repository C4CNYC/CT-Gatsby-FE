import React from 'react';
import PropTypes from 'prop-types';
import Grid from '@material-ui/core/Grid';

function FullWidthRow({ children, className }) {
  return (
    <Grid item={true} sm={8} xs={12}>
      {children}
    </Grid>
  );
}

FullWidthRow.displayName = 'FullWidthRow';
FullWidthRow.propTypes = {
  children: PropTypes.any,
  className: PropTypes.string
};

export default FullWidthRow;
