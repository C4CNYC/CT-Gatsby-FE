import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { apiLocation } from '../../../config/env.json';

import { hardGoTo } from '../../state';

const currentUnitApi = '/units/current-unit';

const propTypes = {
  children: PropTypes.any,
  hardGoTo: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators({ hardGoTo }, dispatch);

const createClickHandler = hardGoTo => e => {
  e.preventDefault();
  return hardGoTo(`${apiLocation}${currentUnitApi}`);
};

function CurrentUnitLink({ children, hardGoTo }) {
  return (
    <a
      className='btn-cta-big btn btn-primary btn-block'
      href={currentUnitApi}
      onClick={createClickHandler(hardGoTo)}
    >
      {children}
    </a>
  );
}

CurrentUnitLink.displayName = 'CurrentUnitLink';
CurrentUnitLink.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentUnitLink);
