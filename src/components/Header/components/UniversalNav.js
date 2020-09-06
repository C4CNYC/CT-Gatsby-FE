import React from 'react';
import PropTypes from 'prop-types';

import { Link } from '../../helpers';
import NavLogo from './NavLogo';
import SearchBar from '../../search/searchBar/SearchBar';
import MenuButton from './MenuButton';
import NavLinks from './NavLinks';
import './universalNav.css';

import { isSignedInSelector, executeGA } from '../../../state';
import Login from './Login';

import { createSelector } from 'reselect';

const mapStateToProps = createSelector(
  isSignedInSelector,
  isSignedIn => ({
    isSignedIn
  })
);

export const UniversalNav = ({
  isSignedIn,
  displayMenu,
  toggleDisplayMenu,
  menuButtonRef,
  searchBarRef
}) => (
  <nav
    className={'universal-nav nav-padding' + (displayMenu ? ' expand-nav' : '')}
    id='universal-nav'
  >
    <div
      className={'universal-nav-left' + (displayMenu ? ' display-flex' : '')}
    >
      {/* <SearchBar innerRef={searchBarRef} /> */}
    </div>
    <div className='universal-nav-middle'>
      <Link id='universal-nav-logo' to='/learn'>
        <NavLogo />
        <span className='sr-only'>codetribe.com</span>
      </Link>
    </div>
    <div className='universal-nav-right main-nav'>
      <NavLinks displayMenu={displayMenu} isSignedIn={isSignedIn} />
    </div>
    <MenuButton
      displayMenu={displayMenu}
      innerRef={menuButtonRef}
      onClick={toggleDisplayMenu}
    />
  </nav>
);

UniversalNav.displayName = 'UniversalNav';
export default UniversalNav;

UniversalNav.propTypes = {
  displayMenu: PropTypes.bool,
  isSignedIn: PropTypes.bool,
  menuButtonRef: PropTypes.object,
  searchBarRef: PropTypes.object,
  toggleDisplayMenu: PropTypes.func
};
