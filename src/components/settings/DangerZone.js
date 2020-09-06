import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import { FullWidthRow, ButtonSpacer, Spacer } from '../helpers';
import { deleteAccount, resetProgress } from '../../state/settings';
import DeleteModal from './DeleteModal';
import ResetModal from './ResetModal';

import './danger-zone.css';
import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';

const propTypes = {
  deleteAccount: PropTypes.func.isRequired,
  resetProgress: PropTypes.func.isRequired
};

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      deleteAccount,
      resetProgress
    },
    dispatch
  );

class DangerZone extends Component {
  constructor(props) {
    super(props);
    this.state = {
      reset: false,
      delete: false
    };
  }

  toggleResetModal = () => {
    return this.setState(state => ({
      ...state,
      reset: !state.reset
    }));
  };

  toggleDeleteModal = () => {
    return this.setState(state => ({
      ...state,
      delete: !state.delete
    }));
  };

  render() {
    const { deleteAccount, resetProgress } = this.props;
    return (
      <div className='danger-zone text-center'>
        <FullWidthRow>
          <Card >
            <Card.Heading>Danger Zone</Card.Heading>
            <Spacer />
            <p>Please be careful. Changes in this section are permanent.</p>
            <FullWidthRow>
              <Button

                className='btn-danger'
                onClick={() => this.toggleResetModal()}
                type='button'
              >
                Reset all of my progress
              </Button>
              <ButtonSpacer />
              <Button

                className='btn-danger'
                onClick={() => this.toggleDeleteModal()}
                type='button'
              >
                Delete my account
              </Button>
              <Spacer />
            </FullWidthRow>
          </Card>

          <ResetModal
            onHide={() => this.toggleResetModal()}
            reset={resetProgress}
            show={this.state.reset}
          />
          <DeleteModal
            delete={deleteAccount}
            onHide={() => this.toggleDeleteModal()}
            show={this.state.delete}
          />
        </FullWidthRow>
      </div>
    );
  }
}

DangerZone.displayName = 'DangerZone';
DangerZone.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(DangerZone);
