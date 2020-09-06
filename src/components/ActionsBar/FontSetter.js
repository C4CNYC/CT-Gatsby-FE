import withStyles from "@material-ui/core/styles/withStyles";
import PropTypes from "prop-types";
import React from "react";

//import { MenuItem, MenuList } from "@material-ui/core/Menu";
import { Manager, Target, Popper, Reference } from "react-popper";
import ClickAwayListener from "@material-ui/core/ClickAwayListener";
import Grow from "@material-ui/core/Grow";
import Paper from "@material-ui/core/Paper";
import classNames from "classnames";
import MenuItem from "@material-ui/core/MenuItem";
import MenuList from "@material-ui/core/MenuList";
import IconButton from "@material-ui/core/IconButton";
import FormatSizeIcon from "@material-ui/icons/FormatSize";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import Link from "gatsby-link";

const styles = theme => ({
  fontSizeSetter: {
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {}
  },
  open: {
    color: theme.bars.colors.icon
  },
  popperClose: {
    pointerEvents: "none"
  }
});

class FontSetter extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleClick = () => {
    this.setState({ open: !this.state.open });
  };

  handleClose = () => {
    if (!this.state.open) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  };

  handleSetting = e => {
    const val = e.target.innerText.replace("%", "");
    const factor = +val / 100;
    this.props.increaseFont(factor);
    this.handleClose();
  };

  render() {
    const { classes } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <nav className={classes.fontSizeSetter}>
        <Manager>
          <Reference>
            {({ ref }) => (
              <IconButton
              aria-label="Increase font size"
              aria-owns={anchorEl ? "long-menu" : null}
              aria-haspopup="true"
              onClick={this.handleClick}
              title="Change font size"
              className={classes.open}
              ref={ref}
              >
              <FormatSizeIcon />
              </IconButton>
            )}

          </Reference>
          <Popper
            placement="bottom-end"
            eventsEnabled={open}
            className={classNames({ [classes.popperClose]: !open })}
          >
            {({ ref, style, placement, arrowProps }) => (
              <div  ref={ref} style={style} data-placement={placement}>
              <ClickAwayListener onClickAway={this.handleClose}>
                <Grow in={open} id="font-menu-list" style={{ transformOrigin: "0 0 0" }}>
                  <Paper>
                    <MenuList role="menu">
                      <MenuItem onClick={this.handleSetting}>150%</MenuItem>
                      <MenuItem onClick={this.handleSetting}>125%</MenuItem>
                      <MenuItem onClick={this.handleSetting}>100%</MenuItem>
                    </MenuList>
                  </Paper>
                </Grow>
              </ClickAwayListener>
              </div>
            )}

          </Popper>
        </Manager>
      </nav>
    );
  }
}

FontSetter.propTypes = {
  classes: PropTypes.object.isRequired,
  increaseFont: PropTypes.func.isRequired
};

export default withStyles(styles)(FontSetter);
