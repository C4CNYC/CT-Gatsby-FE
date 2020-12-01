import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UnitTitle from './Unit-Title';
import UnitDescription from './Unit-Description';
import ToolPanel from './Tool-Panel';
import TestSuite from './Test-Suite';

import { unitTestsSelector, isUnitCompletedSelector, validateSelector, setCurrentSlideNumber } from '../redux';
import { createSelector } from 'reselect';
import './side-panel.css';
import { mathJaxScriptLoader } from '../../../utils/scriptLoaders';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from "react-page-scroller";
import { lesson_data } from '../utils/lesson_data';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { bindActionCreators } from 'redux';
import { renderSlide } from '../validates/renderSlide';
const mapStateToProps = createSelector(
  isUnitCompletedSelector,
  unitTestsSelector,
  validateSelector,
  (isUnitCompleted, tests, validate) => ({
    isUnitCompleted,
    tests,
    validate
  })
);
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      setCurrentSlideNumber
    },
    dispatch
  );

const propTypes = {
  description: PropTypes.string,
  guideUrl: PropTypes.string,
  instructions: PropTypes.string,
  isUnitCompleted: PropTypes.bool,
  section: PropTypes.string,
  showToolPanel: PropTypes.bool,
  tests: PropTypes.arrayOf(PropTypes.object),
  validate: PropTypes.array,
  title: PropTypes.string,
  videoUrl: PropTypes.string,
  setCurrentSlideNumber: PropTypes.func
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

  }
  isCheckedOf = (sliderID, index) => {
    const { validate } = this.props;
    const validateItem = validate.filter(e => e.sliderID === sliderID)[index]
    return validateItem && validateItem.checked
  }

  renderChecker = (sliderID, index) => {
    return this.isCheckedOf(sliderID, index) ?
      <CheckCircleIcon style={{ color: "green", fontSize: "40px" }} /> :
      <RadioButtonUncheckedIcon style={{ color: "black", fontSize: "40px" }} />
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
      videoUrl,
      setCurrentSlideNumber
    } = this.props;
    return (
      <ReflexContainer orientation='horizontal' className='instructions-panel is-mobile' role='complementary' tabIndex='-1' >
        <ReactPageScroller
          ref={c => this.reactPageScroller = c}
          animationTimer={200}
          containerWidth="100%"
          pageOnChange={e => setCurrentSlideNumber(e)}
        >
          {lesson_data.slides.map((slide, slideNumber) => renderSlide(slide, slideNumber, this.renderChecker, this.isCheckedOf))}
        </ReactPageScroller>
      </ReflexContainer>
    )

  }
}

SidePanel.displayName = 'SidePanel';
SidePanel.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);
