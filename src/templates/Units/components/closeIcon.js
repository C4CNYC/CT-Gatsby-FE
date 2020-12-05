import React from 'react'
import CloseIcon from '@material-ui/icons/Close';
export default (props) => <div style={{
  position: 'absolute',
  right: 0,
  top: '12px',
  cursor: 'pointer',
  color: 'gray',
}} className="clear-login-panel"
  onClick={props.handleClose}><CloseIcon fontSize="large" /></div>