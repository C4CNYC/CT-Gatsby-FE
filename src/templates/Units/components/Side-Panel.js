import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UnitTitle from './Unit-Title';
import UnitDescription from './Unit-Description';
import ToolPanel from './Tool-Panel';
import TestSuite from './Test-Suite';

import { unitTestsSelector, isUnitCompletedSelector } from '../redux';
import { createSelector } from 'reselect';
import './side-panel.css';
import './custom.css';
import './lessons.css'
import { mathJaxScriptLoader } from '../../../utils/scriptLoaders';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from "react-page-scroller";
import { lesson_data } from '../utils/lesson_data';
import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';

const mapStateToProps = createSelector(
  isUnitCompletedSelector,
  unitTestsSelector,
  (isUnitCompleted, tests) => ({
    isUnitCompleted,
    tests
  })
);

const propTypes = {
  description: PropTypes.string,
  guideUrl: PropTypes.string,
  instructions: PropTypes.string,
  isUnitCompleted: PropTypes.bool,
  section: PropTypes.string,
  showToolPanel: PropTypes.bool,
  tests: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  videoUrl: PropTypes.string
};

export class SidePanel extends Component {
  componentDidMount() {
    const MathJax = global.MathJax;
    const mathJaxMountPoint = document.querySelector('#mathjax');
    const mathJaxUnit =
      this.props.section === 'rosetta-code' ||
      this.props.section === 'project-euler';
    if (MathJax) {
      // Configure MathJax when it's loaded and
      // users navigate from another unit
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          processEscapes: true,
          processClass: 'rosetta-code|project-euler'
        }
      });
      MathJax.Hub.Queue([
        'Typeset',
        MathJax.Hub,
        document.querySelector('.rosetta-code'),
        document.querySelector('.project-euler')
      ]);
    } else if (!mathJaxMountPoint && mathJaxUnit) {
      mathJaxScriptLoader();
    }
  }

  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
    console.log(pageNumber)
  }
  renderSlide = (slide) => {
    return <ReflexElement flex={1}>{ReactHtmlParser(slide.html_content)}</ReflexElement>;
  }
  render() {
    const {
      title,
      description,
      instructions,
      isUnitCompleted,
      guideUrl,
      tests,
      section,
      showToolPanel,
      videoUrl
    } = this.props;
    return (

      <ReflexContainer orientation='horizontal' className='instructions-panel' role='complementary' tabIndex='-1'>
        <ReactPageScroller ref={c => this.reactPageScroller = c}>
          {lesson_data.slides.map(this.renderSlide)}
          {/* <ReflexElement flex={1}>
            <UnitTitle isCompleted={isUnitCompleted}>
              {title}
            </UnitTitle>
            <hr />
          </ReflexElement>
          <ReflexElement flex={4}>
            <UnitDescription
              description={description}
              instructions={instructions}
              section={section}
            />
          </ReflexElement>
          <ReflexElement flex={2}>
            <hr />
            {showToolPanel && <ToolPanel guideUrl={guideUrl} videoUrl={videoUrl} />}
            <TestSuite tests={tests} />
          </ReflexElement> */}
        </ReactPageScroller>
      </ReflexContainer>
      // <>
      //   <ReactPageScroller ref={c => this.reactPageScroller = c}>
      //     {lesson_data.slides.map(this.renderSlide)}
      //   </ReactPageScroller>
      // </>
    );
  }
}

SidePanel.displayName = 'SidePanel';
SidePanel.propTypes = propTypes;

export default connect(mapStateToProps)(SidePanel);
