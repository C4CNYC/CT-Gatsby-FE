import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { createStructuredSelector } from 'reselect';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { graphql } from 'gatsby';
import { first } from 'lodash';
import Media from 'react-responsive';

import LearnLayout from '../../../components/layouts/Learn';
import Editor from './Editor';
import Preview from '../components/Preview';
import SidePanel from '../components/Side-Panel';
import Output from '../components/Output';
import CompletionModal from '../components/CompletionModal';
import HelpModal from '../components/HelpModal';
import VideoModal from '../components/VideoModal';
import ResetModal from '../components/ResetModal';
import MobileLayout from './MobileLayout';
import DesktopLayout from './DesktopLayout';
import Hotkeys from '../components/Hotkeys';

import { getGuideUrl } from '../utils';
import { unitTypes } from '../../../../utils/unitTypes';
import { UnitNode } from '../../../state/propTypes';
import { dasherize } from '../../../..//utils/slugs';
import {
  createFiles,
  unitFilesSelector,
  unitTestsSelector,
  initConsole,
  initTests,
  updateUnitMeta,
  unitMounted,
  consoleOutputSelector,
  executeUnit,
  cancelTests
} from '../redux';

import './classic.css';
import '../components/test-frame.css';

const mapStateToProps = createStructuredSelector({
  files: unitFilesSelector,
  tests: unitTestsSelector,
  output: consoleOutputSelector
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      createFiles,
      initConsole,
      initTests,
      updateUnitMeta,
      unitMounted,
      executeUnit,
      cancelTests
    },
    dispatch
  );

const propTypes = {
  cancelTests: PropTypes.func.isRequired,
  unitMounted: PropTypes.func.isRequired,
  createFiles: PropTypes.func.isRequired,
  data: PropTypes.shape({
    unitNode: UnitNode
  }),
  executeUnit: PropTypes.func.isRequired,
  files: PropTypes.shape({
    key: PropTypes.string
  }),
  initConsole: PropTypes.func.isRequired,
  initTests: PropTypes.func.isRequired,
  output: PropTypes.string,
  pageContext: PropTypes.shape({
    unitMeta: PropTypes.shape({
      id: PropTypes.string,
      introPath: PropTypes.string,
      nextUnitPath: PropTypes.string,
      prevUnitPath: PropTypes.string
    })
  }),
  tests: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string,
      testString: PropTypes.string
    })
  ),
  updateUnitMeta: PropTypes.func.isRequired
};

const MAX_MOBILE_WIDTH = 767;

class ShowClassic extends Component {
  constructor() {
    super();

    this.resizeProps = {
      onStopResize: this.onStopResize.bind(this),
      onResize: this.onResize.bind(this)
    };

    this.state = {
      resizing: false
    };

    this.containerRef = React.createRef();
    this.editorRef = React.createRef();
  }
  onResize() {
    this.setState({ resizing: true });
  }

  onStopResize() {
    this.setState({ resizing: false });
  }

  componentDidMount() {
    const {
      data: {
        unitNode: { title }
      }
    } = this.props;
    this.initializeComponent(title);
  }

  componentDidUpdate(prevProps) {
    const {
      data: {
        unitNode: { title: prevTitle }
      }
    } = prevProps;
    const {
      data: {
        unitNode: { title: currentTitle }
      }
    } = this.props;
    if (prevTitle !== currentTitle) {
      this.initializeComponent(currentTitle);
    }
  }

  initializeComponent(title) {
    const {
      unitMounted,
      createFiles,
      initConsole,
      initTests,
      updateUnitMeta,
      data: {
        unitNode: {
          files,
          tests,
          unitType
        }
      },
      pageContext: { unitMeta }
    } = this.props;
    initConsole('');
    createFiles(files);
    initTests(tests);
    updateUnitMeta({ ...unitMeta, title, unitType });
    unitMounted(unitMeta.id);
  }

  componentWillUnmount() {
    const { createFiles, cancelTests } = this.props;
    createFiles({});
    cancelTests();
  }

  getUnit = () => this.props.data.unitNode;

  getBlockNameTitle() {
    const {
      fields: { blockName },
      title
    } = this.getUnit();
    return `${blockName}: ${title}`;
  }

  getVideoUrl = () => this.getUnit().videoUrl;

  getUnitFile() {
    const { files } = this.props;
    return first(Object.keys(files).map(key => files[key]));
  }

  hasPreview() {
    const { unitType } = this.getUnit();
    return (
      unitType === unitTypes.html ||
      unitType === unitTypes.modern
    );
  }

  renderInstructionsPanel({ showToolPanel }) {
    const {
      fields: { blockName },
      description,
      instructions
    } = this.getUnit();

    const { forumTopicId, title } = this.getUnit();
    return (
      <SidePanel
        className='full-height'
        description={description}
        guideUrl={getGuideUrl({ forumTopicId, title })}
        instructions={instructions}
        section={dasherize(blockName)}
        showToolPanel={showToolPanel}
        title={this.getBlockNameTitle()}
        videoUrl={this.getVideoUrl()}
      />
    );
  }

  renderEditor() {

    // return (
    //   <Editor
    //     containerRef={this.containerRef}
    //     ref={this.editorRef}
    //   />
    // );

    const { files } = this.props;

    const unitFile = first(Object.keys(files).map(key => files[key]));
    return (
      unitFile && (
        <Editor
          containerRef={this.containerRef}
          ref={this.editorRef}
          {...unitFile}
          fileKey={unitFile.key}
        />
      )
    );
  }

  renderTestOutput() {
    const { output } = this.props;
    return (
      <Output
        defaultOutput={`
/**
* Your test output will go here.
*/
`}
        output={output}
      />
    );
  }

  renderPreview() {
    return (
      <Preview className='full-height' disableIframe={this.state.resizing} />
    );
  }

  render() {
    const {
      fields: { blockName },
      forumTopicId,
      title
    } = this.getUnit();
    const {
      executeUnit,
      pageContext: {
        unitMeta: { introPath, nextUnitPath, prevUnitPath }
      }
    } = this.props;
    return (
      <Hotkeys
        editorRef={this.editorRef}
        executeUnit={executeUnit}
        innerRef={this.containerRef}
        introPath={introPath}
        nextUnitPath={nextUnitPath}
        prevUnitPath={prevUnitPath}
      >
        <LearnLayout>
          <Helmet title={`Learn ${this.getBlockNameTitle()} | codetribe.com`} />
          <Media maxWidth={MAX_MOBILE_WIDTH}>
            <MobileLayout
              editor={this.renderEditor()}
              guideUrl={getGuideUrl({ forumTopicId, title })}
              hasPreview={this.hasPreview()}
              instructions={this.renderInstructionsPanel({
                showToolPanel: false
              })}
              preview={this.renderPreview()}
              // testOutput={this.renderTestOutput()}
              videoUrl={this.getVideoUrl()}
            />
          </Media>
          <Media minWidth={MAX_MOBILE_WIDTH + 1}>
            <DesktopLayout
              unitFile={this.getUnitFile()}
              editor={this.renderEditor()}
              hasPreview={this.hasPreview()}
              instructions={this.renderInstructionsPanel({
                showToolPanel: true
              })}
              preview={this.renderPreview()}
              resizeProps={this.resizeProps}
              // testOutput={this.renderTestOutput()}
            />
          </Media>
          <CompletionModal blockName={blockName} />
          {/*<HelpModal />*/}
          {/*<VideoModal videoUrl={this.getVideoUrl()} />*/}
          {/*<ResetModal />*/}
        </LearnLayout>
      </Hotkeys>
    );
  }
}

ShowClassic.displayName = 'ShowClassic';
ShowClassic.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ShowClassic);

/*

files {
        indexhtml {
          key
          ext
          name
          contents
          head
          tail
        }
      }

required {
  link
  src
}


indexjs {
          key
          ext
          name
          contents
          head
          tail
        }
        indexjsx {
          key
          ext
          name
          contents
          head
          tail
        }

*/
export const query = graphql`
  query ClassicUnit($slug: String!) {
    unitNode(fields: { slug: { eq: $slug } }) {
      title
      description
      instructions
      unitType
      videoUrl
      forumTopicId
      fields {
        slug
        blockName
      }
      block
      tests {
        text
        testString
      },
      files {
        indexhtml {
          key
          ext
          name
          contents
          head
          tail
        }
      }
    }
  }
`;
