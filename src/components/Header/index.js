import React from 'react';
import Helmet from 'react-helmet';

// import stripeObserver from './stripeIframesFix';
// import UniversalNav from './components/UniversalNav';

// import './header.css';
import classNames from "classnames";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Hidden from '@material-ui/core/Hidden';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import Button from '@material-ui/core/Button';
import MenuIcon from '@material-ui/icons/Menu';

import headerStyle from "assets/jss/material-kit-react/components/headerStyle.jsx";
import withStyles from '@material-ui/core/styles/withStyles';


export class Header extends React.Component {
  constructor(props) {
    super(props);
    // this.state = {
    //   displayMenu: false
    // };
    this.menuButtonRef = React.createRef();
    this.searchBarRef = React.createRef();
    // this.handleClickOutside = this.handleClickOutside.bind(this);
    // this.toggleDisplayMenu = this.toggleDisplayMenu.bind(this);

    this.state = {
      mobileOpen: false
    };
    this.handleDrawerToggle = this.handleDrawerToggle.bind(this);
    this.headerColorChange = this.headerColorChange.bind(this);
  }

  handleDrawerToggle() {
    this.setState({ mobileOpen: !this.state.mobileOpen });
  }
  componentDidMount() {
    if (this.props.changeColorOnScroll) {
      window.addEventListener("scroll", this.headerColorChange);
    }
  }
  headerColorChange() {
    const { classes, color, changeColorOnScroll } = this.props;
    const windowsScrollTop = typeof window !== 'undefined' && window.pageYOffset;
    if (windowsScrollTop > changeColorOnScroll.height) {
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[changeColorOnScroll.color]);
    } else {
      document.body
        .getElementsByTagName("header")[0]
        .classList.add(classes[color]);
      document.body
        .getElementsByTagName("header")[0]
        .classList.remove(classes[changeColorOnScroll.color]);
    }
  }
  componentWillUnmount() {
    if (this.props.changeColorOnScroll) {
      typeof window !== 'undefined' && window.removeEventListener("scroll", this.headerColorChange);
    }
  }

  // componentDidMount() {
  //   document.addEventListener('click', this.handleClickOutside);
  //
  //   // Remove stacking Stripe iframes with each navigation
  //   // after visiting /donate
  //   stripeObserver();
  // }
  //
  // componentWillUnmount() {
  //   document.removeEventListener('click', this.handleClickOutside);
  // }
  //
  // handleClickOutside(event) {
  //   if (
  //     this.state.displayMenu &&
  //     this.menuButtonRef.current &&
  //     !this.menuButtonRef.current.contains(event.target) &&
  //     this.searchBarRef.current &&
  //     !this.searchBarRef.current.contains(event.target)
  //   ) {
  //     this.toggleDisplayMenu();
  //   }
  // }
  //
  // toggleDisplayMenu() {
  //   this.setState(({ displayMenu }) => ({ displayMenu: !displayMenu }));
  // }

  render() {
    const {
      classes,
      color,
      rightLinks,
      leftLinks,
      brand,
      fixed,
      absolute
    } = this.props;
    const appBarClasses = classNames({
      [classes.appBar]: true,
      [classes[color]]: color,
      [classes.absolute]: absolute,
      [classes.fixed]: fixed
    });
    const brandComponent = <Button className={classes.title}>{brand}</Button>;
    return (
      <AppBar className={appBarClasses}>
        <Toolbar className={classes.container}>
          {leftLinks !== undefined ? brandComponent : null}
          <div className={classes.flex}>
            {leftLinks !== undefined ? (
              <Hidden smDown implementation="css">
                {leftLinks}
              </Hidden>
            ) : (
              brandComponent
            )}
          </div>
          <Hidden smDown implementation="css">
            {rightLinks}
          </Hidden>
          <Hidden mdUp>
            <IconButton
              aria-label="open drawer"
              onClick={this.handleDrawerToggle}
            >
              <MenuIcon />
            </IconButton>
          </Hidden>
        </Toolbar>
        <Hidden mdUp implementation="css">
          <Drawer
            variant="temporary"
            anchor={"right"}
            open={this.state.mobileOpen}
            classes={{
              paper: classes.drawerPaper
            }}
            onClose={this.handleDrawerToggle}
          >
            <div className={classes.appResponsive}>
              {leftLinks}
              {rightLinks}
            </div>
          </Drawer>
        </Hidden>
      </AppBar>
    );
  }
}

Header.displayName = 'Header';
// export default Header;
export default withStyles(headerStyle)(Header);
