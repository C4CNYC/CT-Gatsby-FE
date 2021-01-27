import React, { useEffect, useState, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from 'react-page-scroller';

import {
  unitTestsSelector,
  isUnitCompletedSelector,
  validateSelector,
  textFromEditorSelector,
  setCurrentSlideNumber,
  lessonSelector,
  lessonDataSelector
} from '../redux';
import './side-panel.css';
import '../../../learn/lessons/common/css/custom.css';
import '../../../learn/lessons/common/css/lessons.css';

import { bindActionCreators } from 'redux';

// manual update react after DOM manipulation
// function useForceUpdate() {
//   const [, setValue] = useState(0); // integer state
//   return () => setValue((value) => value + 1); // update the state to force render
// }

const SidePanel = (props) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // const forceUpdate = useForceUpdate();

  const { setCurrentSlideNumber, textFromEditor, lessonData } = props;

  const isValid = useMemo(() => {
    return lessonData.slides[currentSlide].action
      ? !!textFromEditor.match(lessonData.slides[currentSlide].reg)
      : true;
  }, [currentSlide, textFromEditor]);

  useEffect(() => {
    console.log(
      ' props.textFromEditor>>>>>',
      props.textFromEditor,
      currentSlide
    );
    if (isValid) {
      console.log('isValid', isValid, '#slide' + currentSlide);
      const slide = document.getElementById(`slide${currentSlide}`);
      slide && slide.classList.add('validated');

      // forceUpdate()
    }
  }, [props.textFromEditor]);

  useEffect(() => {
    let stylesContainer = document.getElementById('lesson-style');
    if (!stylesContainer) {
      stylesContainer = document.createElement('style');
      stylesContainer.id = 'lesson-style';
      stylesContainer.type = 'text/css';
      document.head.append(stylesContainer);
    }
    const css = !lessonData.style ? '' : lessonData.style;
    if (stylesContainer.styleSheet) {
      stylesContainer.styleSheet.cssText = css;
    } else {
      stylesContainer.appendChild(document.createTextNode(css));
    }
  }, [lessonData]);

  const clickHandler = (e) => {
    e.persist();

    if (
      e.target.closest('.swiper-next') ||
      (e.target.closest(`#slide${currentSlide}`) &&
        e.target.closest('.swiper-editor') &&
        isValid)
    ) {
      setCurrentSlideNumber(currentSlide + 1);
      setCurrentSlide(currentSlide + 1);
    }
  };

  // const isCheckedOf = (sliderID, index) => {
  //   const { validate } = props;
  //   const validateItem = validate.filter((e) => e.sliderID === sliderID)[index];
  //   return validateItem && validateItem.checked;
  // };

  // console.log('isCheckedOf @@@555555555555@@@: ', isCheckedOf(0, 0));
  // console.log('textFromEditor @@@222222222222@@@: ', textFromEditor, props);
  return (
    <ReflexContainer
      orientation='horizontal'
      className='instructions-panel is-mobile'
      role='complementary'
      tabIndex='-1'
    >
      <ReactPageScroller
        ref={(c) => (this.reactPageScroller = c)}
        animationTimer={1000}
        containerWidth='100%'
        customPageNumber={currentSlide}
        blockScrollDown={!isValid}
        // pageOnChange={e => setCurrentSlideNumber(e)}
        pageOnChange={(e) => {
          setCurrentSlideNumber(e);
          setCurrentSlide(e);
        }}
      >
        {lessonData.slides.map((slide, slideNumber) => {
          return (
            <div
              id='lesson-page'
              style={{ height: '100%' }}
              key={`${lessonData.slug}_${slideNumber}`}
              onClick={(e) => clickHandler(e)}
            >
              <ReflexElement
                flex={1}
                style={{ height: '100%' }}
                className={`snapshot snap1 white hide-help swiper-slide`}
              >
                <div id={`slide${slideNumber}`}>
                  {ReactHtmlParser(slide.html_content)}
                </div>
              </ReflexElement>
            </div>
          );
        })}
      </ReactPageScroller>
    </ReflexContainer>
  );
};

const mapStateToProps = createSelector(
  isUnitCompletedSelector,
  unitTestsSelector,
  validateSelector,
  textFromEditorSelector,
  lessonSelector,
  lessonDataSelector,
  (isUnitCompleted, tests, validate, textFromEditor, lesson, lessonData) => ({
    isUnitCompleted,
    tests,
    validate,
    textFromEditor,
    lesson,
    lessonData
  })
);
const mapDispatchToProps = (dispatch) =>
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
