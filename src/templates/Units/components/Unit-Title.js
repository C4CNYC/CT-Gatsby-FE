import React from 'react';
import PropTypes from 'prop-types';

import './unit-title.css';
import GreenPass from '../../../assets/icons/GreenPass';

const propTypes = {
  children: PropTypes.string,
  isCompleted: PropTypes.bool
};

function UnitTitle({ children, isCompleted }) {
  return (
    <h5 className='text-center unit-title'>
      {children || 'Happy Coding!'}
      {isCompleted ? (
        <GreenPass
          style={{ height: '15px', width: '15px', marginLeft: '5px' }}
        />
      ) : null}
    </h5>
  );
}

UnitTitle.displayName = 'UnitTitle';
UnitTitle.propTypes = propTypes;

export default UnitTitle;
