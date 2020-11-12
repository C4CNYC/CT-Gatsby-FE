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

var lineNumberPos = [], lineNumberID = [], lineNumberIDDrag = [], lineNumbers, perminantData = [];
var lineNumberElementFromID = 0, lineNumberFromID = 0, lineNumberFromIDEnd = 0, lineNumberElementToID = 0, lineNumberToID = 0, lineNumberToIDEnd = 0;
var clock = 1, is_mobile, clicked = false;

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
    padding: "10px 0 5px",

  },
  arrowIcon: {
    padding: "10px 0 5px",
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
      validate: []

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
      var pos, per, ind;
      if (document.getElementsByClassName('margin-view-overlays')[0] != null && clock < 0) {
        var i, j = 0;
        lineNumbers = document.getElementsByClassName('margin-view-overlays')[0];

        // get all line number elements position with index for drag-drop event handler 
        pos = [];
        per = [];
        ind = [];
        for (i = 0; i < lineNumbers.children.length; i++) {
          var line = lineNumbers.children[i];
          if (lineNumbers.children[i].children.length > 0) {
            j = j + 1;
            var position = line.children.length == 1 ? line.children[0].getBoundingClientRect() : line.children[1].getBoundingClientRect();
            var index = line.children.length == 1 ? line.children[0].innerHTML : line.children[1].innerHTML;
            pos.push(position)
            ind.push(index);
            per.push(j);
          }
        }
        // init line number position array with beginning element's position
        lineNumberPos = pos;
        // init line number index array with the real index even collapsed state
        lineNumberID = ind;
        // init perminant array with first status
        perminantData = per;

        // normal case
        if (!is_mobile) {
          // drag start event handler
          document.getElementsByClassName('margin')[0].addEventListener("mousedown", function (element) {
            clicked = true;
            lineNumbers = document.getElementsByClassName('margin-view-overlays')[0];
            // update line number elements position data with current updated element
            pos = [];
            ind = [];
            for (i = 0; i < lineNumbers.children.length; i++) {
              var line = lineNumbers.children[i];
              if (lineNumbers.children[i].children.length > 0) {
                j = j + 1;
                var position = line.children.length == 1 ? line.children[0].getBoundingClientRect() : line.children[1].getBoundingClientRect();
                var index = line.children.length == 1 ? line.children[0].innerHTML : line.children[1].innerHTML;
                pos.push(position);
                ind.push(index);
              }
            }
            // init line number position array with beginning element's position
            lineNumberPos = pos;
            // init line number index normal array and dragging array with the real index even collapsed state
            lineNumberID = lineNumberIDDrag = ind;

            console.log(lineNumberPos)

            // get clicked element code editor ID
            var posX = element.clientX, posY = element.clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height) {
                lineNumberFromID = lineNumberID[i] - 1;
                if (i != lineNumberPos.length - 1)
                  lineNumberFromIDEnd = lineNumberID[i + 1] - 1;
                else
                  lineNumberFromIDEnd = lineNumberFromID;
              }
            }

            console.log(lineNumberFromID, lineNumberFromIDEnd)

            // get clicked element line number element ID
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                var line = lineNumbers.children[i];
                var index = line.children.length == 1 ? line.children[0].innerHTML : line.children[1].innerHTML;
                if (index == lineNumberFromID)
                  lineNumberElementFromID = i;
              }
            }
          })

          // dragging event handler
          document.getElementsByClassName('margin')[0].addEventListener("mousemove", (element) => {
            if (clicked == true) {
              // make dragging effect with line number index
              var posX = element.clientX, posY = element.clientY;
              j = 0;
              for (i = 0; i < lineNumbers.children.length; i++) {
                var line = lineNumbers.children[i];
                if (lineNumbers.children[i].children.length > 0) {
                  console.log(lineNumberIDDrag[j])
                  line.children.length == 1 ? line.children[0].innerHTML = lineNumberIDDrag[j] : line.children[1].innerHTML = lineNumberIDDrag[j];
                  var position = line.children.length == 1 ? line.children[0].getBoundingClientRect() : line.children[1].getBoundingClientRect();
                  if (posX >= position.x && posX <= position.x + position.width && posY >= position.y && posY <= position.y + position.height)
                    line.children.length == 1 ? line.children[0].innerHTML = lineNumberFromID + 1 : line.children[1].innerHTML = lineNumberFromID + 1;
                  j = j + 1;
                }
              }
            }
          })

          // drop event handler
          document.getElementsByClassName('margin')[0].addEventListener("mouseup", (element) => {
            clicked = false;
            // init line numbers index
            j = 0;
            for (i = 0; i < lineNumbers.children.length; i++) {
              var line = lineNumbers.children[i];
              if (lineNumbers.children[i].children.length > 0) {
                line.children.length == 1 ? line.children[0].innerHTML = lineNumberIDDrag[j] : line.children[1].innerHTML = lineNumberIDDrag[j];
                j = j + 1;
              }
            }

            // get dropped element code editor ID
            var posX = element.clientX, posY = element.clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height) {
                lineNumberToID = lineNumberID[i] - 1;
                if (i != lineNumberPos.length - 1)
                  lineNumberToIDEnd = lineNumberID[i + 1] - 1;
                else
                  lineNumberToIDEnd = lineNumberToID;
              }
            }

            console.log(lineNumberToID, lineNumberToIDEnd)

            // get dropped element line number element ID
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                var line = lineNumbers.children[i];
                var index = line.children.length == 1 ? line.children[0].innerHTML : line.children[1].innerHTML;
                if (index == lineNumberToID)
                  lineNumberElementToID = i;
              }
            }

            // get current code's command array data
            var codeData = this.state.currentCode;

            console.log(codeData)

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
                for (i = lineNumberFromIDEnd + 1; i <= lineNumberToIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID; i <= lineNumberFromIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberToIDEnd + 1; i < codeLines.length; i++) {
                  if (i != codeLines.length - 1)
                    newCodeData = newCodeData + codeLines[i] + '\n';
                  else
                    newCodeData = newCodeData + codeLines[i];
                  newPerminantData.push(perminantData[i]);
                }
              }

              else {
                for (i = 0; i <= lineNumberToIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID; i <= lineNumberFromIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberToIDEnd + 1; i < lineNumberFromID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromIDEnd + 1; i < codeLines.length; i++) {
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
          // touch start event handler
          document.getElementsByClassName('margin')[0].addEventListener("touchstart", function (element) {
            lineNumbers = document.getElementsByClassName('margin-view-overlays')[0];
            // update line number elements position data with current updated element
            pos = [];
            ind = [];
            for (i = 0; i < lineNumbers.children.length; i++) {
              var line = lineNumbers.children[i];
              if (lineNumbers.children[i].children.length > 0) {
                j = j + 1;
                var position = line.children.length == 1 ? line.children[0].getBoundingClientRect() : line.children[1].getBoundingClientRect();
                var index = line.children.length == 1 ? line.children[0].innerHTML : line.children[1].innerHTML;
                pos.push(position)
                ind.push(index);
              }
            }
            // init line number position array with beginning element's position
            lineNumberPos = pos;
            // init line number index normal array and dragging array with the real index even collapsed state
            lineNumberID = lineNumberIDDrag = ind;

            // get clicked element code editor ID
            var posX = element.changedTouches[0].clientX, posY = element.changedTouches[0].clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height) {
                lineNumberFromID = lineNumberID[i] - 1;
                if (i != lineNumberPos.length - 1)
                  lineNumberFromIDEnd = lineNumberID[i + 1] - 1;
                else
                  lineNumberFromIDEnd = lineNumberFromID;
              }
            }

            console.log(lineNumberFromID, lineNumberFromIDEnd)

            // get clicked element line number element ID
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                var line = lineNumbers.children[i];
                var index = line.children.length == 1 ? line.children[0].innerHTML : line.children[1].innerHTML;
                if (index == lineNumberFromID)
                  lineNumberElementFromID = i;
              }
            }
          })

          // touch end event handler
          document.getElementsByClassName('margin')[0].addEventListener("touchend", (element) => {
            // get dropped element code editor ID
            var posX = element.changedTouches[0].clientX, posY = element.changedTouches[0].clientY;
            for (i = 0; i < lineNumberPos.length; i++) {
              var x = lineNumberPos[i].x, y = lineNumberPos[i].y;
              var width = lineNumberPos[i].width, height = lineNumberPos[i].height;
              if (posX >= x && posX <= x + width && posY >= y && posY <= y + height) {
                lineNumberToID = lineNumberID[i] - 1;
                if (i != lineNumberPos.length - 1)
                  lineNumberToIDEnd = lineNumberID[i + 1] - 1;
                else
                  lineNumberToIDEnd = lineNumberToID;
              }
            }

            console.log(lineNumberToID, lineNumberToIDEnd)

            // get dropped element line number element ID
            for (i = 0; i < lineNumbers.children.length; i++) {
              if (lineNumbers.children[i].children.length > 0) {
                var line = lineNumbers.children[i];
                var index = line.children.length == 1 ? line.children[0].innerHTML : line.children[1].innerHTML;
                if (index == lineNumberToID)
                  lineNumberElementToID = i;
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
                for (i = lineNumberFromIDEnd + 1; i <= lineNumberToIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID; i <= lineNumberFromIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberToIDEnd + 1; i < codeLines.length; i++) {
                  if (i != codeLines.length - 1)
                    newCodeData = newCodeData + codeLines[i] + '\n';
                  else
                    newCodeData = newCodeData + codeLines[i];
                  newPerminantData.push(perminantData[i]);
                }
              }

              else {
                for (i = 0; i <= lineNumberToIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromID; i <= lineNumberFromIDEnd; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberToIDEnd + 1; i < lineNumberFromID; i++) {
                  newCodeData = newCodeData + codeLines[i] + '\n';
                  newPerminantData.push(perminantData[i]);
                }
                for (i = lineNumberFromIDEnd + 1; i < codeLines.length; i++) {
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
    slider.validate_function(editorValue);
    this.validatesFunc(editorValue);
    this.setState({ currentCode: editorValue })
    // Auth.savCode(editorValue);
  };

  validatesFunc = (context) => {
    const { settingValidate } = this.props;
    var validatedItems = slider.validate_test(context);
    this.setState({ validate: validatedItems })
    settingValidate(validatedItems)

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
    const { classes, contents, ext, theme, fileKey, validateChecked } = this.props;
    const {
      showTutorPanel,
      compressedTutorPanel,
      validate
    } = this.state
    const editorTheme = theme === 'night' ? 'vs-dark-custom' : 'vs-custom';
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
          // defaultValue={this.state.currentCode}
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
