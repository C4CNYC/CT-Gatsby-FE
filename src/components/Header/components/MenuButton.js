import React from 'react';
import PropTypes from 'prop-types';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

const MenuButton = props => (
  <IconButton size="small"
              color="secondary"
              aria-label="menu"
              aria-expanded={props.displayMenu}
              className={
                'toggle-button-nav' + (props.displayMenu ? ' reverse-toggle-color' : '')
              }
              onClick={props.onClick}
              ref={props.innerRef}
  >
    <MenuIcon />
  </IconButton>
);

MenuButton.displayName = 'MenuButton';
MenuButton.propTypes = {
  className: PropTypes.string,
  displayMenu: PropTypes.bool.isRequired,
  innerRef: PropTypes.object,
  onClick: PropTypes.func.isRequired
};

export default MenuButton;
