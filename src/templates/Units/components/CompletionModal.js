import React, { Component } from 'react';
import PropTypes from 'prop-types';
import noop from 'lodash/noop';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';

import { useStaticQuery, graphql } from 'gatsby';

import Login from '../../../components/Header/components/Login';
import CompletionModalBody from './CompletionModalBody';
import { dasherize } from '../../../..//utils/slugs';

import './completion-modal.css';

import {
  closeModal,
  submitUnit,
  completedUnitsIds,
  isCompletionModalOpenSelector,
  successMessageSelector,
  unitFilesSelector,
  unitMetaSelector,
  lastBlockChalSubmitted
} from '../redux';

import { isSignedInSelector, executeGA } from '../../../state';
import Modal from '@material-ui/core/Modal';
import Button from '@material-ui/core/Button';

import { makeStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles(theme => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

const mapStateToProps = createSelector(
  unitFilesSelector,
  unitMetaSelector,
  completedUnitsIds,
  isCompletionModalOpenSelector,
  isSignedInSelector,
  successMessageSelector,
  (
    files,
    { title, id },
    completedUnitsIds,
    isOpen,
    isSignedIn,
    message
  ) => ({
    files,
    title,
    id,
    completedUnitsIds,
    isOpen,
    isSignedIn,
    message
  })
);

const mapDispatchToProps = function(dispatch) {
  const dispatchers = {
    close: () => dispatch(closeModal('completion')),
    submitUnit: () => {
      dispatch(submitUnit());
    },
    lastBlockChalSubmitted: () => {
      dispatch(lastBlockChalSubmitted());
    },
    executeGA
  };
  return () => dispatchers;
};

const propTypes = {
  blockName: PropTypes.string,
  close: PropTypes.func.isRequired,
  completedUnitsIds: PropTypes.array,
  currentBlockIds: PropTypes.array,
  executeGA: PropTypes.func,
  files: PropTypes.object.isRequired,
  id: PropTypes.string,
  isOpen: PropTypes.bool,
  isSignedIn: PropTypes.bool.isRequired,
  lastBlockChalSubmitted: PropTypes.func,
  message: PropTypes.string,
  submitUnit: PropTypes.func.isRequired,
  title: PropTypes.string
};

export function getCompletedPercent(
  completedUnitsIds = [],
  currentBlockIds = [],
  currentUnitId
) {
  completedUnitsIds = completedUnitsIds.includes(currentUnitId)
    ? completedUnitsIds
    : [...completedUnitsIds, currentUnitId];

  const completedUnitsInBlock = completedUnitsIds.filter(id => {
    return currentBlockIds.includes(id);
  });

  const completedPercent = Math.round(
    (completedUnitsInBlock.length / currentBlockIds.length) * 100
  );

  return completedPercent > 100 ? 100 : completedPercent;
}

export class CompletionModalInner extends Component {
  constructor(props) {
    super(props);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleKeypress = this.handleKeypress.bind(this);
  }

  state = {
    downloadURL: null,
    completedPercent: 0
  };

  static getDerivedStateFromProps(props, state) {
    const { files, isOpen } = props;
    if (!isOpen) {
      return null;
    }
    const { downloadURL } = state;
    if (downloadURL) {
      URL.revokeObjectURL(downloadURL);
    }
    let newURL = null;
    if (Object.keys(files).length) {
      const filesForDownload = Object.keys(files)
        .map(key => files[key])
        .reduce((allFiles, { path, contents }) => {
          const beforeText = `** start of ${path} **\n\n`;
          const afterText = `\n\n** end of ${path} **\n\n`;
          allFiles +=
            files.length > 1 ? beforeText + contents + afterText : contents;
          return allFiles;
        }, '');
      const blob = new Blob([filesForDownload], {
        type: 'text/json'
      });
      newURL = URL.createObjectURL(blob);
    }

    const { completedUnitsIds, currentBlockIds, id, isSignedIn } = props;
    let completedPercent = isSignedIn
      ? getCompletedPercent(completedUnitsIds, currentBlockIds, id)
      : 0;
    return { downloadURL: newURL, completedPercent: completedPercent };
  }

  handleKeypress(e) {
    if (e.keyCode === 13 && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      // Since Hotkeys also listens to Ctrl + Enter we have to stop this event
      // getting to it.
      e.stopPropagation();
      this.handleSubmit();
    }
  }

  handleSubmit() {
    this.props.submitUnit();
    this.checkBlockCompletion();
  }

  // check block completion for donation
  checkBlockCompletion() {
    if (
      this.state.completedPercent === 100 &&
      !this.props.completedUnitsIds.includes(this.props.id)
    ) {
      this.props.lastBlockChalSubmitted();
    }
  }

  componentWillUnmount() {
    if (this.state.downloadURL) {
      URL.revokeObjectURL(this.state.downloadURL);
    }
    this.props.close();
  }

  render() {
    const {
      blockName = '',
      close,
      isOpen,
      message,
      title,
      isSignedIn
    } = this.props;

    const { completedPercent } = this.state;

    if (isOpen) {
      executeGA({ type: 'modal', data: '/completion-modal' });
    }
    const dashedName = dasherize(title);

    // const handleOpen = () => {
    //   setOpen(true);
    // };
    //
    // const handleClose = () => {
    //   setOpen(false);
    // };

    return (
      // + classes.modal
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          className={'unit-success-modal '}
          open={isOpen}
          onClose={close}
          onKeyDown={isOpen ? this.handleKeypress : noop}
          closeAfterTransition
          BackdropComponent={Backdrop}
          BackdropProps={{
            timeout: 500,
          }}
        >
          <Fade in={isOpen}>
            {/*className={classes.paper}*/}
            <Paper>
              <div className='unit-list-header fcc-modal'>
                <h2 className='completion-message'
                  id="transition-modal-title">{message}</h2>
              </div>
              <div className='completion-modal-body transition-modal-description'>
                <CompletionModalBody
                  blockName={blockName}
                  completedPercent={completedPercent}
                />
              </div>
              <div>
                {isSignedIn ? null : (
                  <Login
                    className='btn-cta'
                  >
                    Sign in to save your progress
                  </Login>
                )}
                <Button onClick={this.handleSubmit} color='primary'>
                  Next
                  {/*<span className='hidden-xs'>(Ctrl + Enter)</span>*/}
                </Button>
                {/*{this.state.downloadURL ? (*/}
                {/*  <Button*/}
                {/*    className='btn-invert'*/}
                {/*    download={`${dashedName}.txt`}*/}
                {/*    href={this.state.downloadURL}*/}
                {/*  >*/}
                {/*    Download my solution*/}
                {/*  </Button>*/}
                {/*) : null}*/}
              </div>
            </Paper>
          </Fade>
        </Modal>
    );
  }
}

CompletionModalInner.propTypes = propTypes;

const useCurrentBlockIds = blockName => {
  const {
    allUnitNode: { edges }
  } = useStaticQuery(graphql`
    query getCurrentBlockNodes {
      allUnitNode(sort: { fields: [superOrder, order, unitOrder] }) {
        edges {
          node {
            fields {
              blockName
            }
            id
          }
        }
      }
    }
  `);

  const currentBlockIds = edges
    .filter(edge => edge.node.fields.blockName === blockName)
    .map(edge => edge.node.id);
  return currentBlockIds;
};

const CompletionModal = props => {
  const currentBlockIds = useCurrentBlockIds(props.blockName || '');
  return <CompletionModalInner currentBlockIds={currentBlockIds} {...props} />;
};

CompletionModal.displayName = 'CompletionModal';
CompletionModal.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CompletionModal);
