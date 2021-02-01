import React, { useEffect, useState, useMemo } from 'react';
import ReactHtmlParser from 'react-html-parser';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import { createSelector } from 'reselect';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from '../react-page-scroller';
import useMediaQuery from '@material-ui/core/useMediaQuery';

import {
  unitTestsSelector,
  isUnitCompletedSelector,
  validateSelector,
  textFromEditorSelector,
  setCurrentSlideNumber,
  currentSlideNumberSelector,
  lessonSelector,
  lessonDataSelector,
  moveToTab,
  monacoeditorSelector
} from '../redux';
// import './side-panel.css';
import '../../../learn/lessons/common/css/custom.css';
import '../../../learn/lessons/common/css/lessons.css';

import { bindActionCreators } from 'redux';

// manual update react after DOM manipulation
// function useForceUpdate() {
//   const [, setValue] = useState(0); // integer state
//   return () => setValue((value) => value + 1); // update the state to force render
// }
const styles = (theme) => ({
  pageLesson: {
    height: 'calc(100% - 100px)'
  },
  reflex: {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    backgroundColor: 'black'
  },
  slideContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    paddingTop: 15,
    paddingBottom: 25,
    width: '100%',
    height: '100%'
  }
});

const SidePanel = (props) => {
  // const [currentSlide, setCurrentSlide] = useState(0);

  const { classes } = props;
  const isDesktop = useMediaQuery('(min-width:768px)');

  // const forceUpdate = useForceUpdate();

  const {
    setCurrentSlideNumber,
    textFromEditor,
    lessonData,
    moveToTab,
    currentSlideNumber,
    monacoEditor
  } = props;

  const isValid = useMemo(() => {
    if (!lessonData.slides[currentSlideNumber]) {
      return false;
    }
    const res = lessonData.slides[currentSlideNumber].action
      ? !!textFromEditor.match(lessonData.slides[currentSlideNumber].reg)
      : true;

    if (typeof window !== 'undefined') {
      console.log('have window');
      const slideInStorage = Number(
        localStorage.getItem(`lesson-progress-${lessonData.id}`)
      );
      if (res && slideInStorage < currentSlideNumber) {
        localStorage.setItem(
          `lesson-progress-${lessonData.id}`,
          currentSlideNumber
        );
      }
    }
    return res;
  }, [currentSlideNumber, textFromEditor]);

  useEffect(() => {
    if (isValid) {
      const slide = document.getElementById(`slide${currentSlideNumber}`);
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

    let slideInStorage = 0;

    if (typeof window !== 'undefined') {
      slideInStorage = Number(
        localStorage.getItem(`lesson-progress-${lessonData.id}`)
      );
    }

    if (slideInStorage > currentSlideNumber) {
      // setCurrentSlide(slideInStorage);
      setCurrentSlideNumber(slideInStorage);
    }
  }, [lessonData]);

  const clickHandler = (e) => {
    e.persist();

    if (
      e.target.closest('.swiper-next') ||
      (e.target.closest(`#slide${currentSlideNumber}`) &&
        e.target.closest('.swiper-editor') &&
        isValid)
    ) {
      setCurrentSlideNumber(currentSlide + 1);
      // setCurrentSlide(currentSlide + 1);
    }
    if (e.target.closest('.button-locked')) {
      monacoEditor.focus();
      // moveToTab(1);
    }
  };

  const pageChangeHandler = (e) => {
    setCurrentSlideNumber(e);
    // setCurrentSlide(e);
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
        animationTimer={300}
        containerWidth='100%'
        customPageNumber={currentSlideNumber}
        blockScrollDown={!isValid}
        // pageOnChange={e => setCurrentSlideNumber(e)}
        pageOnChange={(e) => pageChangeHandler(e)}
      >
        {lessonData.slides.map((slide, slideNumber) => {
          return (
            <div
              id='lesson-page'
              key={`${lessonData.slug}_${slideNumber}`}
              onClick={(e) => clickHandler(e)}
              style={{
                height: `calc(100% - ${isDesktop ? '60' : '100'}px)`
              }}
            >
              <ReflexElement
                flex={1}
                className={`${
                  classes.reflex
                } snap1 white hide-help swiper-slide${
                  slide.reg ? ' bg-orange' : ''
                }`}
              >
                <div
                  id={`slide${slideNumber}`}
                  className={classes.slideContainer}
                >
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
  currentSlideNumberSelector,
  monacoeditorSelector,
  (
    isUnitCompleted,
    tests,
    validate,
    textFromEditor,
    lesson,
    lessonData,
    currentSlideNumber,
    monacoEditor
  ) => ({
    isUnitCompleted,
    tests,
    validate,
    textFromEditor,
    lesson,
    lessonData,
    currentSlideNumber,
    monacoEditor
  })
);
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      setCurrentSlideNumber,
      moveToTab
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(SidePanel));
