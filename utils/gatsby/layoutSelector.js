import React from 'react';
import PropTypes from 'prop-types';

import {
  CertificationLayout,
  DefaultLayout,
  LearnLayout
} from '../../src/components/layouts';
import FourOhFourPage from '../../src/pages/404';

export default function layoutSelector({ element, props }) {
  const {
    location: { pathname }
  } = props;
  if (!pathname || pathname === '/') {
    return <DefaultLayout pathname={pathname} transparentHeader={true}>{element}</DefaultLayout>;
  }
  if (element.type === FourOhFourPage) {
    return <DefaultLayout pathname={pathname}>{element}</DefaultLayout>;
  }
  if (/^\/certification(\/.*)*/.test(pathname)) {
    return (
      <CertificationLayout pathname={pathname}>{element}</CertificationLayout>
    );
  }
  if (/^\/guide(\/.*)*/.test(pathname)) {
    console.log('Hitting guide for some reason. Need a redirect.');
  }
  if (/^\/learn\/.*\/.*\/.*/.test(pathname)) {
    return (
      <LearnLayout pathname={pathname} showFooter={false}>
        {element}
      </LearnLayout>
    );
  }
  if (/^\/donation(\/.*)*|^\/donate(\/.*)*/.test(pathname)) {
    return (
      <DefaultLayout pathname={pathname} useTheme={false}>
        {element}
      </DefaultLayout>
    );
  }
  return <DefaultLayout pathname={pathname}>{element}</DefaultLayout>;
}

layoutSelector.propTypes = {
  element: PropTypes.any,
  location: PropTypes.objectOf({ pathname: PropTypes.string }),
  props: PropTypes.any
};
