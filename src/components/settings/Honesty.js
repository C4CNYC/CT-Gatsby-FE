import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { FullWidthRow } from '../helpers';
import SectionHeader from './SectionHeader';
import HonestyPolicy from '../../resources/honesty-policy';

import './honesty.css';
import Button from '@material-ui/core/Button';
import { Card } from '@material-ui/core';

const propTypes = {
  isHonest: PropTypes.bool,
  policy: PropTypes.arrayOf(PropTypes.string),
  updateIsHonest: PropTypes.func.isRequired
};

class Honesty extends Component {
  handleAgreeClick = () => this.props.updateIsHonest({ isHonest: true });

  renderAgreeButton = () => (
    <Button  onClick={this.handleAgreeClick}>
      Agree
    </Button>
  );

  renderIsHonestAgreed = () => (
    <Button  className='disabled-agreed' disabled={true}>
      <p>You have accepted our Academic Honesty Policy.</p>
    </Button>
  );

  render() {
    const { isHonest } = this.props;

    return (
      <section className='honesty-policy'>
        <SectionHeader>Academic Honesty Policy</SectionHeader>
        <FullWidthRow>
          <Card className='honesty-panel'>
            <HonestyPolicy />
          </Card>
          <br />
          {isHonest ? this.renderIsHonestAgreed() : this.renderAgreeButton()}
        </FullWidthRow>
      </section>
    );
  }
}

Honesty.displayName = 'Honesty';
Honesty.propTypes = propTypes;

export default Honesty;
