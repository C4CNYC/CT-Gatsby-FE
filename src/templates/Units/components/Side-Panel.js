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
import { mathJaxScriptLoader } from '../../../utils/scriptLoaders';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from "react-page-scroller";
import { lesson_data } from '../utils/lesson_data';
import './slider_program.js';
import './validation.js';

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
    return <div id="lesson-page" style={{ height: "100%" }}><ReflexElement flex={1} style={{ height: "100%" }} className={`${slide.css_class} swiper-slide`}>{ReactHtmlParser(slide.html_content)}</ReflexElement></div>;
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
    if(window.innerWidth < 786){
      return (
        <ReflexContainer orientation='horizontal' className='instructions-panel is-mobile' role='complementary' tabIndex='-1' >
          <ReactPageScroller ref={c => this.reactPageScroller = c} >
            {lesson_data.slides.map(this.renderSlide)}
          </ReactPageScroller>
        </ReflexContainer>
  
      );
    }else if(window.innerWidth >= 768){
      return (
        <ReflexContainer orientation='horizontal' className='instructions-panel is-mobile' role='complementary' tabIndex='-1' >                 
            <div id="slider"></div>  
            <div class="pagination-holder">
                    <div id="previous" class="pagi-item"></div>
                    <div id="slide-count" class="pagi-item">Slide 1 of 32</div>
                    <div id="next" class="pagi-item">Start slider</div>
            </div>      
        </ReflexContainer>
  
      );
    }
  }
}

SidePanel.displayName = 'SidePanel';
SidePanel.propTypes = propTypes;

export default connect(mapStateToProps)(SidePanel);
