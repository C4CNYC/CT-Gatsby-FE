import React, { useEffect, useState, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { unitTestsSelector, isUnitCompletedSelector, validateSelector, textFromEditorSelector, setCurrentSlideNumber } from '../redux';
import { createSelector } from 'reselect';
import './side-panel.css';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from "react-page-scroller";
import $ from 'jquery';
import { lesson_data } from '../../../learn/lessons/INTRO-5MIN-M-V007/lesson_data';
import '../../../learn/lessons/INTRO-5MIN-M-V007/custom.css';
import '../../../learn/lessons/common/css/custom.css';

import { bindActionCreators } from 'redux';

// manual update react after DOM manipulation
function useForceUpdate() {
  const [value, setValue] = useState(0); // integer state
  return () => setValue(value => value + 1); // update the state to force render
}

const SidePanel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const forceUpdate = useForceUpdate();

  const { setCurrentSlideNumber, textFromEditor } = props;

  const isValid = useMemo(() => {
    console.log("lesson_data.slides[currentSlide].action", lesson_data.slides[currentSlide].action)
    console.log("lesson_data.slides[currentSlide].reg", lesson_data.slides[currentSlide].reg)
    return lesson_data.slides[currentSlide].action ? !!textFromEditor.match(lesson_data.slides[currentSlide].reg) : false
  }, [currentSlide, textFromEditor])

  useEffect(() => {
    console.log(" props.textFromEditor>>>>>", props.textFromEditor, currentSlide)
    // const isValid = validateTextFromEditor(props.textFromEditor);
    if (isValid) {
      console.log('isValid', isValid, '#slide' + (currentSlide))
      // vork only first time, need to check why
      // $('#slide' + (currentSlide)).addClass('validated')
      const slide = document.getElementById(`slide${currentSlide}`)
      slide && slide.classList.add('validated')
      // forceUpdate()
    }
  }, [props.textFromEditor])

  // const validateTextFromEditor = (text) => {
  //   console.log("lesson_data.slides[currentSlide].action", lesson_data.slides[currentSlide].action)
  //   console.log("lesson_data.slides[currentSlide].reg", lesson_data.slides[currentSlide].reg)
  //   return lesson_data.slides[currentSlide].action ? !!text.match(lesson_data.slides[currentSlide].reg) : false
  // }

  const isCheckedOf = (sliderID, index) => {
    const { validate } = props;
    const validateItem = validate.filter(e => e.sliderID === sliderID)[index]
    return validateItem && validateItem.checked
  }

  console.log('isCheckedOf @@@555555555555@@@: ', isCheckedOf(0, 0))
  console.log('textFromEditor @@@222222222222@@@: ', textFromEditor, props)
  return (
    <ReflexContainer orientation='horizontal' className='instructions-panel is-mobile' role='complementary' tabIndex='-1' >
      <ReactPageScroller
        ref={c => this.reactPageScroller = c}
        animationTimer={200}
        containerWidth="100%"
        // pageOnChange={e => setCurrentSlideNumber(e)}
        pageOnChange={e => {
          setCurrentSlideNumber(e);
          setCurrentSlide(e);
        }}
      >
        {lesson_data.slides.map((slide, slideNumber) => {
          return <div id="lesson-page" style={{ height: "100%" }} key={`${lesson_data.slug}_${slideNumber}`}>
            <ReflexElement flex={1} style={{ height: "100%" }} className={`snapshot snap1 white hide-help swiper-slide`}>
              <div id={`slide${slideNumber}`}>
                {ReactHtmlParser(slide.html_content)}
              </div>
            </ReflexElement>
          </div>
        })}
      </ReactPageScroller>
    </ReflexContainer>
  )
}

const mapStateToProps = createSelector(
  isUnitCompletedSelector,
  unitTestsSelector,
  validateSelector,
  textFromEditorSelector,
  (isUnitCompleted, tests, validate, textFromEditor) => ({
    isUnitCompleted,
    tests,
    validate,
    textFromEditor
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
  isUnitCompleted: PropTypes.bool,
  tests: PropTypes.arrayOf(PropTypes.object),
  validate: PropTypes.array,
  textFromEditor: PropTypes.string,
  setCurrentSlideNumber: PropTypes.func
};

SidePanel.displayName = 'SidePanel';
SidePanel.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);

//TODO DELETED
/*import React, { Component } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { unitTestsSelector, isUnitCompletedSelector, validateSelector, textFromEditorSelector, setCurrentSlideNumber } from '../redux';
import { createSelector } from 'reselect';
import './side-panel.css';
import { mathJaxScriptLoader } from '../../../utils/scriptLoaders';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from "react-page-scroller";
import { lesson_data } from '../../../learn/lessons/INTRO-5MIN-M-V007/lesson_data';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { bindActionCreators } from 'redux';
import { renderSlide } from '../validates/renderSlide';

export class SidePanel extends Component {
  componentDidMount() {
    const MathJax = global.MathJax;
    const mathJaxMountPoint = document.querySelector('#mathjax');
    const mathJaxUnit =
      this.props.section === 'rosetta-code' ||
      this.props.section === 'project-euler';
    if (MathJax) {
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
    const {setCurrentSlideNumber, textFromEditor} = this.props;
    console.log('isCheckedOf @@@555555555555@@@: ', this.isCheckedOf(0, 0))
    console.log('textFromEditor @@@222222222222@@@: ', textFromEditor, this.props)
    return (
      <ReflexContainer orientation='horizontal' className='instructions-panel is-mobile' role='complementary' tabIndex='-1' >
        <ReactPageScroller
          ref={c => this.reactPageScroller = c}
          animationTimer={200}
          containerWidth="100%"
          pageOnChange={e => setCurrentSlideNumber(e)}
        >
            {lesson_data.slides.map((slide, slideNumber) => {
              return <div id="lesson-page" style={{ height: "100%" }}>
                <ReflexElement flex={1} style={{ height: "100%" }} className={`snapshot snap1 white hide-help swiper-slide`}>
                  {ReactHtmlParser(slide.html_content)}
                </ReflexElement>
              </div>
            })}
        </ReactPageScroller>
      </ReflexContainer>
    )

  }
}

const mapStateToProps = createSelector(
  isUnitCompletedSelector,
  unitTestsSelector,
  validateSelector,
  textFromEditorSelector,
  (isUnitCompleted, tests, validate, textFromEditor) => ({
    isUnitCompleted,
    tests,
    validate,
    textFromEditor
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
  textFromEditor: PropTypes.string,
  title: PropTypes.string,
  videoUrl: PropTypes.string,
  setCurrentSlideNumber: PropTypes.func
};

SidePanel.displayName = 'SidePanel';
SidePanel.propTypes = propTypes;

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);*/

//TODO DELETED
/*import React, { Component } from 'react';
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
        console.log('sliderID, index @@@@: ', sliderID, index)
        const { validate } = this.props;
        const validateItem = validate.filter(e => e.sliderID === sliderID)[index]
        console.log('validateItem @@@@: ', validateItem)
        return validateItem && validateItem.checked
    }

    renderChecker = (sliderID, index) => {
        console.log('this.isCheckedOf(sliderID, index) @@@@: ', this.isCheckedOf(sliderID, index))
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
        console.log('this.props @@@@@@@@: ', this.props,)
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

export default connect(mapStateToProps, mapDispatchToProps)(SidePanel);*/

