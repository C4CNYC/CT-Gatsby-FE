import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import ArrowBackIosOutlinedIcon from '@material-ui/icons/ArrowBackIosOutlined';
import ArrowForwardIosOutlinedIcon from '@material-ui/icons/ArrowForwardIosOutlined';
import FormatQuoteIcon from '@material-ui/icons/FormatQuote';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import {
  canFocusEditorSelector,
  executeUnit,
  inAccessibilityModeSelector,
  setEditorFocusability,
  setAccessibilityMode,
  updateFile
} from '../redux';
import { userSelector, isDonationModalOpenSelector } from '../../../state';
import { Loader } from '../../../components/helpers';
import { IconButton } from '@material-ui/core';
import { withStyles } from '@material-ui/styles';
import { Menu, MenuItem } from "@material-ui/core";
const MonacoEditor = React.lazy(() => import('react-monaco-editor'));

const propTypes = {
  canFocus: PropTypes.bool,
  containerRef: PropTypes.any.isRequired,
  contents: PropTypes.string,
  dimensions: PropTypes.object,
  executeUnit: PropTypes.func.isRequired,
  ext: PropTypes.string,
  fileKey: PropTypes.string,
  inAccessibilityMode: PropTypes.bool.isRequired,
  setAccessibilityMode: PropTypes.func.isRequired,
  setEditorFocusability: PropTypes.func,
  theme: PropTypes.string,
  updateFile: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  canFocusEditorSelector,
  inAccessibilityModeSelector,
  isDonationModalOpenSelector,
  userSelector,
  (canFocus, accessibilityMode, open, { theme = 'night' }) => ({
    canFocus: open ? false : canFocus,
    inAccessibilityMode: accessibilityMode,
    theme
  })
);

const mapDispatchToProps = {
  setEditorFocusability,
  setAccessibilityMode,
  executeUnit,
  updateFile
};

const modeMap = {
  css: 'css',
  html: 'html',
  js: 'javascript',
  jsx: 'javascript'
};

var monacoThemesDefined = false;
const defineMonacoThemes = monaco => {
  if (monacoThemesDefined) {
    return;
  }
  monacoThemesDefined = true;
  const yellowColor = 'FFFF00';
  const lightBlueColor = '9CDCFE';
  const darkBlueColor = '00107E';
  monaco.editor.defineTheme('vs-dark-custom', {
    base: 'vs-dark',
    inherit: true,
    colors: {
      'editor.background': '#2a2a40'
    },
    rules: [
      { token: 'delimiter.js', foreground: lightBlueColor },
      { token: 'delimiter.parenthesis.js', foreground: yellowColor },
      { token: 'delimiter.array.js', foreground: yellowColor },
      { token: 'delimiter.bracket.js', foreground: yellowColor }
    ]
  });
  monaco.editor.defineTheme('vs-custom', {
    base: 'vs',
    inherit: true,
    rules: [{ token: 'identifier.js', foreground: darkBlueColor }]
  });
};


const styles = theme => ({
  footer: {
    position: "absolute",
    zIndex: 100,
    background: theme.bars.colors.background,
    left: 0,
    //top: `calc(100vh - ${theme.bars.sizes.actionsBar}px)`,
    bottom: 0,
    flexDirection: "row",
    padding: `0 ${theme.base.sizes.linesMargin}`,
    justifyContent: "space-between",
    height: `${theme.bars.sizes.actionsBar}px`,
    width: "100%",
    "&::before": {
      content: `""`,
      position: "absolute",
      left: theme.base.sizes.linesMargin,
      right: theme.base.sizes.linesMargin,
      height: 0,
      top: 0,
      borderTop: `1px solid ${theme.base.colors.lines}`
    },
    alignItems: "center",
    display: "none",
    [`@media (min-width: ${theme.mediaQueryTresholds.P}px)`]: {
      display: "flex",
    }
  },
  footerMobile: {
    display: "flex",
    [`@media (min-width: ${theme.mediaQueryTresholds.P}px)`]: {
      display: "none",
    }
  },
  hideQuickKeybar: {
    background: "transparent",
    justifyContent: "flex-end",
    "&::before": {
      borderTop: "none"
    }
  },
  group: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `calc(100% / 3)`,
    padding: "30px",
  },
  group1: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `37%`,
    padding: "0 20px",
    height: "100%",
  },
  group2: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `38%`,
    padding: "0 20px",
    height: "100%",
  },
  group3: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: `25%`,
    padding: "0 20px",
    height: "100%",
  },
  button: {
    color: theme.bars.colors.icon
  },
  span: {
    color: theme.bars.colors.icon,
    fontSize: '12px',
    textTransform: "uppercase",
    fontWeight: "bold",
  },
  rightBorder: {
    borderRight: `1px solid ${theme.bars.colors.borderRight}`
  },
  keyBoardBar: {
    textAlign: "center",
    width: `calc(100% / 6)`
  }
});

class Editor extends Component {
  state = {
    codeContent: "",
    open: false,
    anchorEl: null,
    isHideQuickKeyBar: false
  }

  constructor(...props) {
    super(...props);

    this.state = {
      codeContent: Object.assign({}, ...props).contents
    }
    this.options = {
      fontSize: '18px',
      scrollBeyondLastLine: false,
      selectionHighlight: false,
      overviewRulerBorder: false,
      hideCursorInOverviewRuler: true,
      renderIndentGuides: false,
      minimap: {
        enabled: false
      },
      selectOnLineNumbers: true,
      wordWrap: 'on',
      scrollbar: {
        horizontal: 'hidden',
        vertical: 'visible',
        verticalHasArrows: false,
        useShadows: false,
        verticalScrollbarSize: 5
      },
      parameterHints: {
        enabled: false
      },

    };

    this._editor = null;
    this._monaco = null;
    this.focusOnEditor = this.focusOnEditor.bind(this);
  }


  editorWillMount = monaco => {
    defineMonacoThemes(monaco);
  };

  editorDidMount = (editor, monaco) => {

    this._editor = editor;
    this._monaco = monaco;
    this._editor.updateOptions({
      accessibilitySupport: this.props.inAccessibilityMode ? 'on' : 'auto'
    });
    // Users who are using screen readers should not have to move focus from
    // the editor to the description every time they open a unit.
    if (this.props.canFocus && !this.props.inAccessibilityMode) {
      this._editor.focus();
    } else this.focusOnHotkeys();
    this._editor.addAction({
      id: 'execute-unit',
      label: 'Run tests',
      keybindings: [
        /* eslint-disable no-bitwise */
        monaco.KeyMod.chord(monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter)
      ],
      run: this.props.executeUnit
    });
    this._editor.addAction({
      id: 'leave-editor',
      label: 'Leave editor',
      keybindings: [monaco.KeyCode.Escape],
      run: () => {
        this.focusOnHotkeys();
        this.props.setEditorFocusability(false);
      }
    });
    this._editor.addAction({
      id: 'toggle-accessibility',
      label: 'Toggle Accessibility Mode',
      keybindings: [monaco.KeyMod.CtrlCmd | monaco.KeyCode.F1],
      run: () => {
        const currentAccessibility = this.props.inAccessibilityMode;
        // The store needs to be updated first, as onDidChangeConfiguration is
        // called before updateOptions returns
        this.props.setAccessibilityMode(!currentAccessibility);
        this._editor.updateOptions({
          accessibilitySupport: currentAccessibility ? 'auto' : 'on'
        });
      }
    });
    this._editor.onDidFocusEditorWidget(() =>
      this.props.setEditorFocusability(true)
    );
    // This is to persist changes caused by the accessibility tooltip.
    // Unfortunately it relies on Monaco's implementation details
    this._editor.onDidChangeConfiguration(() => {
      if (
        this._editor.getRawOptions().accessibilitySupport === 2 &&
        !this.props.inAccessibilityMode
      ) {
        this.props.setAccessibilityMode(true);
      }
    });
  };

  focusOnHotkeys() {
    if (this.props.containerRef.current) {
      this.props.containerRef.current.focus();
    }
  }

  focusOnEditor() {
    this._editor.focus();
  }

  onChange = editorValue => {
    const { updateFile, fileKey } = this.props;
    this.setState({ codeContent: editorValue })
    updateFile({ key: fileKey, editorValue });
    this.props.executeUnit();
  };

  insertCharacter = (location, character) => {
    const { updateFile, fileKey, executeUnit } = this.props;
    const { codeContent } = this.state;
    String.prototype.splice = function (idx, rem, str) {
      return this.slice(0, idx) + str + this.slice(idx + Math.abs(rem));
    };
    var linedString = codeContent.split("\n");
    linedString[location.positionLineNumber - 1] = linedString[location.positionLineNumber - 1].splice(location.positionColumn - 1, 0, character);
    const insertedString = linedString.join('\n');
    // this.setState({ codeContent: insertedString });
    updateFile({ key: fileKey, editorValue: insertedString });
    executeUnit();
    this._editor.executeEdits("", [{
      range: {
        startLineNumber: location.getPosition().lineNumber,
        startColumn: location.getPosition().column,
        endLineNumber: location.getPosition().lineNumber,
        endColumn: location.getPosition().column
      },
      text: character,
      forceMoveMarkers: true
    }]);
    this.focusOnEditor();
  }
  componentDidUpdate(prevProps) {
    if (this.props.dimensions !== prevProps.dimensions && this._editor) {
      this._editor.layout();
    }
  }

  handleClickMore = (event) => {
    this.setState({
      open: !this.state.open,
      anchorEl: event.currentTarget
    });
  };
  handleCloseMore = () => {
    if (!this.state.open) {
      return;
    }

    this.timeout = setTimeout(() => {
      this.setState({ open: false });
    });
  };
  hideQuickKeyBar = () => {
    this.setState({ isHideQuickKeyBar: true });
  }
  showQuickKeyBar = () => {
    this.setState({ isHideQuickKeyBar: false });
  }
  addQuickKey = (keytype) => {

    switch (keytype) {
      case "tab":
        this.insertCharacter(this._editor.getSelection(), '\t');
        break;
      case "back":
        this.insertCharacter(this._editor.getSelection(), '<');
        break;
      case "forward":
        this.insertCharacter(this._editor.getSelection(), '>');
        break;
      case "slash":
        this.insertCharacter(this._editor.getSelection(), '/');
        break;
      case "quote":
        this.insertCharacter(this._editor.getSelection(), '"');
        break;
      default:
        return;
    }

  }
  render() {
    const { contents, ext, theme, fileKey, classes } = this.props;
    const { codeContent, anchorEl, open, isHideQuickKeyBar } = this.state
    const editorTheme = theme === 'night' ? 'vs-dark-custom' : 'vs-custom';
    return (
      <Suspense fallback={<Loader timeout={600} />} style={{ background: 'red' }}>
        <div style={{ position: "relative", width: '100%', height: 'calc(100% - 40px)' }}>
          <MonacoEditor
            editorDidMount={this.editorDidMount}
            editorWillMount={this.editorWillMount}
            key={`${editorTheme}-${fileKey}`}
            language={modeMap[ext]}
            onChange={this.onChange}
            options={this.options}
            theme={editorTheme}
            value={codeContent}
            automaticLayout={true}
            height="100%"
          />
          <div className={`${classes.footer} ${classes.footerMobile} ${isHideQuickKeyBar && classes.hideQuickKeybar}`}>
            {!isHideQuickKeyBar ? <>
              <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
                <IconButton
                  aria-label="tab"
                  onClick={() => this.addQuickKey('tab')}
                  title="tab"
                  className={classes.button}
                >
                  <span className={classes.span}>tab</span>
                </IconButton>
              </div>
              <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
                <IconButton
                  aria-label="ArrowBack"
                  onClick={() => this.addQuickKey('back')}
                  title="ArrowBack"
                  className={classes.button}
                >
                  <ArrowBackIosOutlinedIcon />
                </IconButton>
              </div>
              <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
                <IconButton
                  aria-label="ArrowForward"
                  onClick={() => this.addQuickKey('forward')}
                  title="ArrowForward"
                  className={classes.button}
                >
                  <ArrowForwardIosOutlinedIcon />
                </IconButton>
              </div>
              <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
                <IconButton
                  aria-label="Slash"
                  onClick={() => this.addQuickKey('slash')}
                  title="Slash"
                  className={classes.button}
                >
                  <span className={classes.span} style={{ fontSize: "30px" }}>/</span>
                </IconButton>

              </div>
              <div className={`${classes.keyBoardBar} ${classes.rightBorder}`}>
                <IconButton
                  aria-label="Quote"
                  onClick={() => this.addQuickKey('quote')}
                  title="Quote"
                  className={classes.button}
                >
                  <FormatQuoteIcon />
                </IconButton>
              </div>
              <div className={classes.keyBoardBar}>
                <IconButton
                  aria-label="More"
                  onClick={this.handleClickMore}
                  title="More"
                  className={classes.button}
                >
                  <MoreHorizIcon />
                </IconButton>
              </div>
              <Menu
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(open)}
                onClose={this.handleCloseMore}>
                <MenuItem
                  onClick={e => {
                    this.hideQuickKeyBar();
                    this.handleCloseMore();
                  }}>
                  <VisibilityOffIcon />
                </MenuItem>
              </Menu>
            </> : <IconButton
              aria-label="Keyboard Hide"
              onClick={this.showQuickKeyBar}
              title="Keyboard Hide"
              className={classes.button}
            >
                <KeyboardHideIcon />
              </IconButton>}
          </div>
        </div>
      </Suspense>
    );
  }
}

Editor.displayName = 'Editor';
Editor.propTypes = propTypes;

// NOTE: withRef gets replaced by forwardRef in react-state 6,
// https://github.com/reduxjs/react-redux/releases/tag/v6.0.0
export default connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  { withRef: true }
)(withStyles(styles)(Editor));

