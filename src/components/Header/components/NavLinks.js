import React from 'react';
import { Link } from '../../helpers';

import PropTypes from 'prop-types';
import Login from './Login';

const propTypes = {
  displayMenu: PropTypes.bool,
  isSignedIn: PropTypes.bool
};

function NavLinks({ displayMenu, isSignedIn }) {
  return (
    <div className='main-nav-group'>
      <ul
        className={'nav-list' + (displayMenu ? ' display-flex' : '')}
        role='menu'
      >
        {/*<li className='nav-news' role='menuitem'>*/}
        {/*  <Link external={true} sameTab={true} to='/news'>*/}
        {/*    news*/}
        {/*  </Link>*/}
        {/*</li>*/}
        <li className='nav-forum' role='menuitem'>
          <Link external={true} sameTab={true} to='/forum'>
            forum
          </Link>
        </li>
        <li className='nav-projects' role='menuitem'>
          <Link to='/learn'>learn</Link>
        </li>
        {isSignedIn ? null : (
          <li className='nav-projects' role='menuitem'>
            <Login


              className='btn-cta'
            >
              Sign in
            </Login>
          </li>
        )}
      </ul>
    </div>
  );
}

NavLinks.propTypes = propTypes;
NavLinks.displayName = 'NavLinks';
export default NavLinks;
