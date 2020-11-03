// import theme from './theme';

import colors from './colors';

export default {

  /*
    BEGiNNIG OF CUTSOM GLOBAL STYLE
   */

  // html: {
  //   boxSizing: 'border-box',
  //   '-webkit-text-size-adjust': '100%',
  //   '-moz-text-size-adjust': 'none',
  //   '-ms-text-size-adjust': '100%',
  //   fontFamily: theme.base.fonts.unstyledFamily,
  //   lineHeight: '1.15',
  //   textSizeAdjust: '100%'
  // },
  // 'html.wf-active': {
  //   fontFamily: theme.base.fonts.styledFamily
  // },
  // '*, *:before, *:after': {
  //   boxSizing: 'inherit'
  // },
  noscript: {
    background: '#d00',
    color: '#fff',
    position: 'absolute',
    top: '50%',
    left: '50%',
    zIndex: 1000,
    transform: 'translate(-50%, -50%)',
    padding: '1.5rem 2.5rem',
    fontWeight: 400,
    borderRadius: '2px',
    boxShadow: '0 0 10px 52px rgba(255,255,255,.8)'
  },
  body: {
    margin: 0,
    // background: theme.base.colors.background,
    overflow: "hidden",
    '-webkit-tap-highlight-color': 'rgba(0,0,0,.05)'
  },
  // wrapper: {},
  // main: {
  //   position: 'relative'
  // },
  // 'h1, h2, h3': {
  //   fontWeight: 300
  // },
  a: {
    //   color: 'green',
    // background: 'transparent',
    // textDecorationSkip: 'objects',
    // fontWeight: 'bold',
    // textDecoration: 'none',
    // transition: '0.3s'

    color: colors.bright,
    '&:hover': {
      color: colors.accent
    }
  },
  // 'input:-webkit-autofill': {
  //   '-webkit-box-shadow': '0 0 0 50px white inset'
  // },
  // ":not(pre) > code[class*='language-']": {
  //   background: '#eee',
  //   color: '#666',
  //   textShadow: 'none',
  //   padding: '1px 5px',
  //   borderRadius: '2px'
  // }
  div: {
    margin: "initial"
  }
};
