import React, { Component, Suspense } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import KeyboardHideIcon from '@material-ui/icons/KeyboardHide';
import CloseIcon from '@material-ui/icons/Close';
import {
  canFocusEditorSelector,
  executeUnit,
  inAccessibilityModeSelector,
  setEditorFocusability,
  setAccessibilityMode,
  updateFile,
  setMonacoEditor,
  setValidate,
  validateSelector,
  validateCheckedSelector
} from '../redux';
import { userSelector, isDonationModalOpenSelector } from '../../../state';
import { Loader } from '../../../components/helpers';
import { CircularProgress, Grid, IconButton, Typography } from '@material-ui/core';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import * as slider from '../components/slider_program.js';
import * as Auth from '../components/authmanager.js';
import $ from 'jquery';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import { withStyles } from '@material-ui/styles';
import { calculatePercentOfChecked } from '../utils/helpers';
var codeconsole;

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
  updateFile: PropTypes.func.isRequired,
  setMonacoEditor: PropTypes.func.isRequired,
  settingValidate: PropTypes.func.isRequired,
  validateChecked: PropTypes.bool.isRequired,
  validate: PropTypes.array.isRequired,
};

const mapStateToProps = createSelector(
  canFocusEditorSelector,
  inAccessibilityModeSelector,
  isDonationModalOpenSelector,
  userSelector,
  validateCheckedSelector,
  validateSelector,
  (canFocus, accessibilityMode, open, { theme = 'night' }, validateChecked, validate) => ({
    canFocus: open ? false : canFocus,
    inAccessibilityMode: accessibilityMode,
    theme,
    validateChecked,
    validate
  })
);

const mapDispatchToProps = {
  setEditorFocusability,
  setAccessibilityMode,
  executeUnit,
  updateFile,
  setMonacoEditor,
  settingValidate: setValidate
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

var lineNumberPos = [], lineNumbers, perminantData = [];
var lineNumberElementFromID = 0, lineNumberFromID = 0, lineNumberElementToID = 0, lineNumberToID = 0, clock = 1, is_mobile;

const styles = theme => ({
  progress: {
    color: "#76dc37",
    position: "absolute",
    right: "22px",
    top: "27px",
    zIndex: 1,
    "&::before": {
      content: `""`,
      position: "absolute",
      background: "#46748e",
      width: "18px",
      height: "18px",
      left: "3px",
      top: "3px",
      borderRadius: "50%",
    }
  },
  panelContainer: {
    borderRadius: "20px",
    position: "absolute",
    right: "10px",
    top: "7px",
    width: 'calc(100% - 20px)',
    // height: '300px',
    border: '3px solid #43d4dd',
    zIndex: 1,
    background: "white"
  },
  gridParent: {
    // height: "calc(100% + 9px)",

  },
  leftGridItem: {
    display: "flex",
    background: '#43d4dd',
    // height: "100%",
    borderRadius: "20px",
    alignItems: "center",
    // justifyContent: "center",
    flexDirection: "column",
    color: "#216a6f",
    width: "40px"

  },
  checkGridItem: {
    color: "#43d4dd",
    justifyContent: "space-between",
    padding: "10px 0 20px",

  },
  arrowIcon: {
    padding: "10px 0 20px",
    justifyContent: "center",
    alignItems: "center"
  },
  iconsContainer: {
    justifyContent: "center",
  },
  rightGridItem: {
    padding: "10px!important",
    color: "black",
    display: "flex",
    flexDirection: "column",
    width: "calc(100% - 40px)",
    fontWeight: "bold",
    padding: "10px 20px 20px",

  },
  compressedPanelContainer: {
    borderRadius: "20px",
    position: "absolute",
    right: "10px",
    top: "7px",
    width: '40px',
    border: '3px solid #43d4dd',
    zIndex: 1,
    background: "white",
    justifyContent: "space-around",
    alignItems: "center",
    display: "flex",
    minHeight: "251px",
    flexDirection: "column",
    opacity: 0.5
  },
  checkerText: {
    fontSize: "14px"
  }
});
const PlaskChecker = () => {
  return <img src={require("../img/icons/plask.png")} alt="plask" style={{ width: "25px", height: "25px" }} />
}
class Editor extends Component {

  constructor(...props) {
    super(...props);
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

    this.state = {
      currentCode: this.props.contents,
      showTutorPanel: false,
      compressedTutorPanel: false,
    };

    this._editor = null;
    this.focusOnEditor = this.focusOnEditor.bind(this);
  }

  componentDidMount() {
    this.validatesFunc(this.state.currentCode);
    // Auth.getCode((codes) => {
    //   if (typeof codes != 'null' && typeof codes != 'undefined') {
    //     this.validatesFunc(codes);
    //   }
    // });

  }
  editorWillMount = monaco => {
    defineMonacoThemes(monaco);
  };

  editorDidMount = (editor, monaco) => {
    // detect mobile responsive or normal
    is_mobile = (window.innerWidth <= 600) && (window.innerHeight <= 800);

    this.interval = setInterval(() => {
      // get elements data after all elements are loaded
      clock = clock - 1;
      var pos, per;
      if (document.getElementsByClassName('margin-view-overlays')[0] != null && clock < 0) {
        var i, j = 0;
        lineNumbers = document.getElementsByClassName('margin-view-overlays')[0];

        // get all line number elements position with index for drag-drop event handler 
        pos = [];
        per = [];
        for (i = 0; i < lineNumbers.children.length; i++) {
          var line = lineNumbers.children[i];
          if (lineNumbers.children[i].children.length > 0) {
            j = j + 1;
            var position = line.children.length == 1 ? line.children[0].getBoundingClientRect() : line.children[1].getBoundingClientRect();
            pos.push(position)
            per.push(j);
          }
        }
        // init line number position array with beginning element's position
        // init perminant array with first status
        lineNumberPos = pos;
        perminantData = per;

        // normal case
        if (!is_mobile) {
          document.getElementsByClassName('margin')[0].addEventListener("mousedown", function (element) {
            // update line number elements position data with current updated element
            pos = [];
            for (i = 0; i < lineNumbers.children.length; i++) {
              var line = lineNumbers.children[i];
              if (lineNumbers.children[i].children.length > 0) {
                j = j + 1;
                var position = line.children.length == 1 ? line.children[0].getBoundingClientRect() : line.children[1].getBoundingClientRect();
                pos.push(position)
              }
            }
            // init line number position array with beginning element's position
            lineNumberPos = pos;

            // get clicked element code editor ID
            var posX = element.clientX, posY = element.clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height)
                lineNumberFromID = i;
            }

            // get clicked element line number element ID
            j = 0;
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                if (j == lineNumberFromID)
                  lineNumberElementFromID = i;
                j = j + 1;
              }
            }
          })

          document.getElementsByClassName('margin')[0].addEventListener("mouseup", (element) => {
            // get dropped element code editor ID
            var posX = element.clientX, posY = element.clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height)
                lineNumberToID = i;
            }

            // get dropped element line number element ID
            j = 0;
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                if (j == lineNumberToID)
                  lineNumberElementToID = i;
                j = j + 1;
              }
            }

            // get current code's command array data
            var codeData = this.state.currentCode;
            var codeLines = codeData.split(/\r?\n/);

            // make new code's command array after drag-drop with clicked command
            var newCodeData = "";
            var newPerminantData = [];
            if (lineNumberFromID == lineNumberToID)
              newCodeData = codeData;
            else {
              // make new from->to drag-droped code content and perminantData            
              if (lineNumberFromID < lineNumberToID) {
                for (i = 0; i < lineNumberFromID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID + 1; i <= lineNumberToID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                newCodeData = newCodeData + codeLines[lineNumberFromID] + '\n';
                newPerminantData.push(perminantData[lineNumberFromID]);
                for (i = lineNumberToID + 1; i < codeLines.length; i++) {
                  if (i != codeLines.length - 1)
                    newCodeData = newCodeData + codeLines[i] + '\n';
                  else
                    newCodeData = newCodeData + codeLines[i];
                  newPerminantData.push(perminantData[i]);
                }
              }

              else {
                for (i = 0; i <= lineNumberToID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                newCodeData = newCodeData + codeLines[lineNumberFromID] + '\n';
                newPerminantData.push(perminantData[lineNumberFromID]);
                for (i = lineNumberToID + 1; i < lineNumberFromID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID + 1; i < codeLines.length; i++) {
                  if (i != codeLines.length - 1)
                    newCodeData = newCodeData + codeLines[i] + '\n';
                  else
                    newCodeData = newCodeData + codeLines[i];
                  newPerminantData.push(perminantData[i]);
                }
              }

              // set upgraded content and perminantData and reload the page
              perminantData = newPerminantData;
              this.setState({ currentCode: newCodeData });
              this.forceUpdate();
            }
          })
        }

        // mobile responsive case
        else {
          document.getElementsByClassName('margin')[0].addEventListener("touchstart", function (element) {
            // update line number elements position data with current updated element
            pos = [];
            for (i = 0; i < lineNumbers.children.length; i++) {
              var line = lineNumbers.children[i];
              if (lineNumbers.children[i].children.length > 0) {
                j = j + 1;
                var position = line.children.length == 1 ? line.children[0].getBoundingClientRect() : line.children[1].getBoundingClientRect();
                pos.push(position)
              }
            }
            // init line number position array with beginning element's position
            lineNumberPos = pos;

            // get clicked element code editor ID
            var posX = element.changedTouches[0].clientX, posY = element.changedTouches[0].clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height)
                lineNumberFromID = i;
            }

            // get clicked element line number element ID
            j = 0;
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                if (j == lineNumberFromID)
                  lineNumberElementFromID = i;
                j = j + 1;
              }
            }
          })

          document.getElementsByClassName('margin')[0].addEventListener("touchend", (element) => {
            // get dropped element code editor ID
            var posX = element.changedTouches[0].clientX, posY = element.changedTouches[0].clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height)
                lineNumberToID = i;
            }

            // get dropped element line number element ID
            j = 0;
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                if (j == lineNumberToID)
                  lineNumberElementToID = i;
                j = j + 1;
              }
            }

            // get current code's command array data
            var codeData = this.state.currentCode;
            var codeLines = codeData.split(/\r?\n/);

            // make new code's command array after drag-drop with clicked command
            var newCodeData = "";
            var newPerminantData = [];
            if (lineNumberFromID == lineNumberToID)
              newCodeData = codeData;
            else {
              // make new from->to drag-droped code content and perminantData            
              if (lineNumberFromID < lineNumberToID) {
                for (i = 0; i < lineNumberFromID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID + 1; i <= lineNumberToID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                newCodeData = newCodeData + codeLines[lineNumberFromID] + '\n';
                newPerminantData.push(perminantData[lineNumberFromID]);
                for (i = lineNumberToID + 1; i < codeLines.length; i++) {
                  if (i != codeLines.length - 1)
                    newCodeData = newCodeData + codeLines[i] + '\n';
                  else
                    newCodeData = newCodeData + codeLines[i];
                  newPerminantData.push(perminantData[i]);
                }
              }

              else {
                for (i = 0; i <= lineNumberToID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                newCodeData = newCodeData + codeLines[lineNumberFromID] + '\n';
                newPerminantData.push(perminantData[lineNumberFromID]);
                for (i = lineNumberToID + 1; i < lineNumberFromID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID + 1; i < codeLines.length; i++) {
                  if (i != codeLines.length - 1)
                    newCodeData = newCodeData + codeLines[i] + '\n';
                  else
                    newCodeData = newCodeData + codeLines[i];
                  newPerminantData.push(perminantData[i]);
                }
              }

              // set upgraded content and perminantData and reload the page
              perminantData = newPerminantData;
              this.setState({ currentCode: newCodeData });
              this.forceUpdate();
            }
          })
        }


        clearInterval(this.interval)
      }
    }, 1000);
    const { setMonacoEditor } = this.props;
    this._editor = editor;

    setMonacoEditor(editor)

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
    // Auth.getCode((codes) => {
    //   if (typeof codes != 'null' && typeof codes != 'undefined') {
    //     this._editor.setValue(codes);
    //   }
    // });
  };

  componentWillUnmount() {
    clearInterval(this.interval);
  }

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
    updateFile({ key: fileKey, editorValue });
    this.props.executeUnit();
    // slider.validate_function(editorValue);
    this.validatesFunc(editorValue)
    // Auth.savCode(editorValue);
  };

  validatesFunc = (context) => {
    const { settingValidate } = this.props;
    var validatedItems = slider.validate_test(context);
    if (validatedItems.length) {
      settingValidate(validatedItems)
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.dimensions !== prevProps.dimensions && this._editor) {
      this._editor.layout();
    }
  }

  handleTutorPanel = () => {
    this.setState({ showTutorPanel: !this.state.showTutorPanel })
  }

  handleCompressedTutorPanel = () => {
    this.setState({ compressedTutorPanel: !this.state.compressedTutorPanel })
  }


  render() {
    const { classes, contents, ext, theme, fileKey, validateChecked, validate } = this.props;
    const {
      showTutorPanel,
      compressedTutorPanel,
    } = this.state
    const editorTheme = theme === 'night' ? 'vs-dark-custom' : 'vs-custom';
    console.log("validate", validate)
    return (
      <Suspense fallback={<Loader timeout={600} />} >
        <div style={{ position: 'relative' }}>
          {validateChecked && !showTutorPanel && <div >
            <CircularProgress
              className={classes.progress}
              variant="static"
              value={calculatePercentOfChecked(validate)}
              size={24}
              thickness={6}
              onClick={this.handleTutorPanel} />
          </div>}
          {validateChecked && showTutorPanel && (compressedTutorPanel ? <div
            className={classes.compressedPanelContainer}
            onClick={this.handleCompressedTutorPanel}
          >
            <CloseIcon
              onClick={this.handleTutorPanel}
              style={{ color: "#808080" }}
            />
            {validate.map((v) => v.checked ? <CheckCircleOutlineIcon style={{ color: "black" }} /> : <PlaskChecker />)}

          </div> :
            <div className={classes.panelContainer}>
              <Grid container spacing={1} className={classes.gridParent}>
                <div className={classes.leftGridItem} onClick={this.handleCompressedTutorPanel}>
                  <Grid container item xs={12} className={classes.arrowIcon}>
                    <Grid item>
                      <ArrowForwardIosIcon />
                    </Grid>
                  </Grid>
                  {validate.map((v) => <Grid container item xs={12} spacing={1} className={classes.iconsContainer} >
                    <Grid item >
                      {v.checked ? <CheckCircleOutlineIcon /> : <PlaskChecker />}
                    </Grid>
                  </Grid>)}

                </div>
                <div className={classes.rightGridItem}>
                  <Grid container item xs={12} className={classes.checkGridItem}>
                    <Grid item>
                      <Typography>CHECKER</Typography>
                    </Grid>
                    <Grid item style={{ color: "#808080" }}>
                      <CloseIcon
                        onClick={this.handleTutorPanel}
                      />
                    </Grid>
                  </Grid>
                  <Grid container>
                    {validate.map((v) => <Grid container item xs={12} spacing={1} >
                      <Grid item xs>
                        <Typography className={classes.checkerText}>{v.text}</Typography>
                      </Grid>
                    </Grid>)}
                  </Grid>
                </div>
              </Grid>
            </div>)}
        </div>
        <MonacoEditor
          editorDidMount={this.editorDidMount}
          editorWillMount={this.editorWillMount}
          key={`${editorTheme}-${fileKey}`}
          language={modeMap[ext]}
          onChange={this.onChange}
          options={this.options}
          value={this.state.currentCode}
          theme={editorTheme}
          automaticLayout={true}
          height="100%"
        />
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
