import React from 'react';
import PropTypes from 'prop-types';

import { TransitionGroup, CSSTransition } from 'react-transition-group';

import './flash.css';
import Alert from '@material-ui/lab/Alert';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { makeStyles } from '@material-ui/core/styles';
import Collapse from '@material-ui/core/Collapse';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

function Flash({ flashMessage, onClose }) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(true);
  const { type, message, id } = flashMessage;

  // TODO
  return null;
  // {/*<TransitionGroup>*/}
  // {/*<CSSTransition classNames='flash-message' key={id} timeout={500}>*/}
  // {/*</CSSTransition>*/}
  // {/*</TransitionGroup>*/}

  return (
        <div className={classes.root}>
          <Collapse in={open}>
        <Alert
          className='flash-message'
          severity={type}
          variant='filled'
          action={
            <IconButton
              aria-label="close"
              color="inherit"
              size="small"
              onClick={() => {
                setOpen(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
        >
          {message}
        </Alert>
          </Collapse>
        </div>

  );
}

Flash.displayName = 'FlashMessages';
Flash.propTypes = {
  flashMessage: PropTypes.shape({
    id: PropTypes.string,
    type: PropTypes.string,
    message: PropTypes.string
  }),
  onClose: PropTypes.func.isRequired
};

export default Flash;
