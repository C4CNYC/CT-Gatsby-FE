import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import IconButton from '@material-ui/core/IconButton';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import classNames from 'classnames';
import Link from 'gatsby-link';
import PropTypes from 'prop-types';
import React from 'react';
import { Manager, Popper, Reference, Target } from "react-popper";
import withStyles from "@material-ui/core/styles/withStyles";
import FilterListIcon from "@material-ui/icons/FilterList";
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

const styles = theme => ({
  topMenu: {
    float: "right",
    margin: "5px 10px 0 0",
    [`@media (min-width: ${theme.mediaQueryTresholds.M}px)`]: {}
  },
  open: {
    color: theme.bars.colors.icon
  },
  popperClose: {
    pointerEvents: "none"
  }
});

class TopMenu extends React.Component {
  state = {
    anchorEl: null,
    open: false
  };

  componentWillUnmount() {
    clearTimeout(this.timeout);
  }

  handleClick = (event) => {
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    });
  };

  handleClose = () => {
    if (!this.state.open) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  };

  render() {
    const { classes, pages } = this.props;
    const { anchorEl, open } = this.state;

    return (
      <nav className={classes.topMenu}>
        <div>
          <IconButton
            aria-label="More"
            aria-owns={anchorEl ? "long-menu" : null}
            aria-haspopup="true"
            onClick={this.handleClick}
            className={classes.open}
          >
            <MoreVertIcon />
          </IconButton>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={Boolean(open)}
            onClose={this.handleClose}
          >
            {open && <> <MenuItem
              onClick={e => {
                this.props.homeLinkOnClick(e);
                this.handleClose();
              }}
            >
              Home
            </MenuItem>
              {pages.map((page, i) => {
                const { fields, frontmatter } = page.node;

                return (
                  <Link key={fields.slug} to={fields.slug} style={{ display: "block" }}>
                    <MenuItem
                      onClick={e => {
                        this.props.pageLinkOnClick(e);
                        this.handleClose();
                      }}
                    >
                      {frontmatter.menuTitle ? frontmatter.menuTitle : frontmatter.title}
                    </MenuItem>
                  </Link>
                );
              })}
              <Link to="/learn/" style={{ display: "block" }}>
                <MenuItem
                  onClick={e => {
                    this.props.pageLinkOnClick(e);
                    this.handleClose();
                  }}
                >
                  Learn
              </MenuItem>
              </Link>
              <Link to="/about/" style={{ display: "block" }}>
                <MenuItem
                  onClick={e => {
                    this.props.pageLinkOnClick(e);
                    this.handleClose();
                  }}
                >
                  About
              </MenuItem>
              </Link>
              <Link to="/contact/" style={{ display: "block" }}>
                <MenuItem
                  onClick={e => {
                    this.props.pageLinkOnClick(e);
                    this.handleClose();
                  }}
                >
                  Contact
              </MenuItem>
              </Link>
              <Link to="/profile/" style={{ display: "block" }}>
                <MenuItem
                  onClick={e => {
                    this.props.pageLinkOnClick(e);
                    this.handleClose();
                  }}
                >
                  Profile
              </MenuItem>
              </Link>
            </>}
          </Menu>
        </div>
      </nav>
    );
  }
}

TopMenu.propTypes = {
  pages: PropTypes.array.isRequired,
  classes: PropTypes.object.isRequired,
  pageLinkOnClick: PropTypes.func.isRequired,
  homeLinkOnClick: PropTypes.func.isRequired
};

export default withStyles(styles)(TopMenu);
