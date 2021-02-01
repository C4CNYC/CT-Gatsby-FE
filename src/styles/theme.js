import { createMuiTheme } from '@material-ui/core/styles';
// import Color from 'color';

import colors from './colors';
import globals from './globals';

const theme = createMuiTheme({
  overrides: {
    MuiCssBaseline: {
      '@global': globals
    },
    MuiPaper: {
      root: {
        backgroundColor: colors.white
      }
    }
  },
  base: {
    colors: {
      background: colors.white,
      text: colors.black,
      link: colors.gray,
      linkHover: colors.lightBlue,
      // linkHover: Color(colors.gray).lighten(0.1).string(),
      accent: colors.pink,
      lines: colors.lightBlue
    },
    sizes: {
      linesMargin: '20px'
    },
    fonts: {
      unstyledFamily: 'Arial',
      styledFamily: 'Montserrat',
      styledFonts: '300,400,600'
    }
  },
  info: {
    colors: {
      text: colors.black,
      background: colors.white,
      socialIcons: colors.gray,
      socialIconsHover: colors.lightBlue,
      menuLink: colors.gray,
      menuLinkHover: colors.lightBlue
    },
    sizes: {
      width: 320,
      headerHeight: 170
    },
    fonts: {
      boxTitleSize: 1.3,
      boxTitleSizeM: 1.5,
      boxTitleSizeL: 1.7
    }
  },
  navigator: {
    colors: {
      background: colors.white,
      postsListItemLink: colors.gray,
      postsListItemLinkHover: colors.lightBlue,
      postsHeader: colors.gray
    },
    sizes: {
      closedHeight: 80,
      postsListItemH1Font: 1.3,
      postsListItemH2Font: 1.1,
      fontIncraseForM: 1.15,
      fontIncraseForL: 1.3
    }
  },
  main: {
    colors: {
      background: colors.white,
      title: colors.black,
      subTitle: colors.black,
      meta: colors.black,
      content: colors.black,
      footer: colors.black,
      contentHeading: colors.black,
      blockquoteFrame: colors.dark,
      link: colors.lightBlue,
      linkHover: colors.blue,
      fbCommentsColorscheme: 'dark'
    },
    sizes: {
      articleMaxWidth: '50em'
    },
    fonts: {
      title: {
        size: 1.9,
        sizeM: 2.5,
        sizeL: 2.7,
        weight: 600,
        lineHeight: 1.1
      },
      subTitle: {
        size: 1.5,
        sizeM: 1.8,
        sizeL: 1.95,
        weight: 300,
        lineHeight: 1.1
      },
      meta: {
        size: 0.9,
        weight: 600
      },
      content: {
        size: 1.0,
        sizeM: 1.15,
        sizeL: 1.1,
        lineHeight: 1.6
      },
      contentHeading: {
        h2Size: 1.5,
        h3Size: 1.3,
        weight: 600,
        lineHeight: 1.3
      },
      footer: {
        size: 1,
        lineHeight: 1.4
      }
    }
  },
  footer: {
    colors: {
      text: colors.black,
      // text: Color(colors.gray).lighten(0.5).string(),
      link: colors.gray,
      linkHover: colors.lightBlue
      // linkHover: Color(colors.accent).lighten(0.2).string()
    },
    fonts: {
      footnote: {
        size: 0.8,
        lineHeight: 1.4
      }
    }
  },
  bars: {
    colors: {
      background: colors.white,
      icon: colors.black,
      text: colors.black,
      borderRight: colors.gray
    },
    sizes: {
      actionsBar: 60,
      infoBar: 60
    }
  },
  mediaQueryTresholds: {
    M: 600,
    P: 768,
    L: 1024
  },
  palette: {
    primary: {
      main: colors.lightBlue
    },
    secondary: {
      main: colors.black
    },
    type: 'dark',
    action: {
      hover: 'rgba(0, 0, 0, 0.01)'
    },
    background: {
      default: colors.background
    }
  },
  typography: {
    fontFamily: 'Montserrat, sans-serif',
    fontSize: 16
  }
});

export default theme;
