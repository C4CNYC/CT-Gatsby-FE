'use strict';

exports.__esModule = true;

var _extends =
  Object.assign ||
  function (target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i];
      for (var key in source) {
        if (Object.prototype.hasOwnProperty.call(source, key)) {
          target[key] = source[key];
        }
      }
    }
    return target;
  };

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _lodash = require('lodash');

var _Events = require('./Events');

var Events = _interopRequireWildcard(_Events);

var _usePrevValue = require('./usePrevValue');

var _usePrevValue2 = _interopRequireDefault(_usePrevValue);

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};
    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key))
          newObj[key] = obj[key];
      }
    }
    newObj.default = obj;
    return newObj;
  }
}

function _interopRequireDefault(obj) {
  return obj && obj.__esModule ? obj : { default: obj };
}

if (!global._babelPolyfill) {
  require('babel-polyfill');
}

var DEFAULT_ANIMATION_TIMER = 1000;
var DEFAULT_ANIMATION = 'ease-in-out';
var DEFAULT_CONTAINER_HEIGHT = '100vh';
var DEFAULT_CONTAINER_WIDTH = '100vw';
var DEFAULT_COMPONENT_INDEX = 0;
var DEFAULT_COMPONENTS_TO_RENDER_LENGTH = 0;

var DEFAULT_ANIMATION_TIMER_BUFFER = 300;
var KEY_UP = 38;
var KEY_DOWN = 40;
var DISABLED_CLASS_NAME = 'rps-scroll--disabled';

var previousTouchMove = null;
var touchStartX = 0;
var touchStartY = 0;
var isScrolling = false;
var isMounted = false;
var isBodyScrollEnabled = true;
var isTransitionAfterComponentsToRenderChanged = false;
var containers = [];

var ReactPageScroller = function ReactPageScroller(_ref) {
  var animationTimer = _ref.animationTimer,
    animationTimerBuffer = _ref.animationTimerBuffer,
    blockScrollDown = _ref.blockScrollDown,
    blockScrollUp = _ref.blockScrollUp,
    children = _ref.children,
    containerHeight = _ref.containerHeight,
    containerWidth = _ref.containerWidth,
    customPageNumber = _ref.customPageNumber,
    handleScrollUnavailable = _ref.handleScrollUnavailable,
    pageOnChange = _ref.pageOnChange,
    renderAllPagesOnFirstRender = _ref.renderAllPagesOnFirstRender,
    transitionTimingFunction = _ref.transitionTimingFunction;

  var _useState = (0, _react.useState)(DEFAULT_COMPONENT_INDEX),
    componentIndex = _useState[0],
    setComponentIndex = _useState[1];

  var _useState2 = (0, _react.useState)(DEFAULT_COMPONENTS_TO_RENDER_LENGTH),
    componentsToRenderLength = _useState2[0],
    setComponentsToRenderLength = _useState2[1];

  var prevComponentIndex = (0, _usePrevValue2.default)(componentIndex);
  var pageContainer = (0, _react.useRef)(null);

  var addNextComponent = (0, _react.useCallback)(
    function (componentsToRenderOnMountLength) {
      var tempComponentsToRenderLength = 0;

      if (!(0, _lodash.isNil)(componentsToRenderOnMountLength)) {
        tempComponentsToRenderLength = componentsToRenderOnMountLength;
      }

      tempComponentsToRenderLength = Math.max(
        tempComponentsToRenderLength,
        componentsToRenderLength
      );

      if (tempComponentsToRenderLength <= componentIndex + 1) {
        if (!(0, _lodash.isNil)(children[componentIndex + 1])) {
          tempComponentsToRenderLength++;
        }
      }

      setComponentsToRenderLength(tempComponentsToRenderLength);
    },
    [children, componentIndex, componentsToRenderLength]
  );

  var checkRenderOnMount = (0, _react.useCallback)(
    function () {
      if (renderAllPagesOnFirstRender) {
        setComponentsToRenderLength(_react2.default.Children.count(children));
      } else if (!(0, _lodash.isNil)(children[DEFAULT_COMPONENT_INDEX + 1])) {
        addNextComponent(DEFAULT_COMPONENTS_TO_RENDER_LENGTH + 1);
      }
    },
    [addNextComponent, children, renderAllPagesOnFirstRender]
  );

  var disableScroll = (0, _react.useCallback)(function () {
    if (isBodyScrollEnabled) {
      isBodyScrollEnabled = false;
      window.scrollTo({
        left: 0,
        top: 0,
        behavior: 'smooth'
      });
      document.body.classList.add(DISABLED_CLASS_NAME);
      document.documentElement.classList.add(DISABLED_CLASS_NAME);
    }
  }, []);

  var enableDocumentScroll = (0, _react.useCallback)(function () {
    if (!isBodyScrollEnabled) {
      isBodyScrollEnabled = true;
      document.body.classList.remove(DISABLED_CLASS_NAME);
      document.documentElement.classList.remove(DISABLED_CLASS_NAME);
    }
  }, []);

  var setRenderComponents = (0, _react.useCallback)(
    function () {
      var newComponentsToRender = [];

      var i = 0;

      while (i < componentsToRenderLength && !(0, _lodash.isNil)(children[i])) {
        containers[i] = true;
        newComponentsToRender.push(
          _react2.default.createElement(
            'div',
            { key: i, style: { height: '100%', width: '100%' } },
            _react2.default.cloneElement(
              children[i],
              _extends({}, children[i].props)
            )
          )
        );
        i++;
      }

      return newComponentsToRender;
    },
    [children, componentsToRenderLength]
  );

  var scrollWindowDown = (0, _react.useCallback)(
    function () {
      if (!isScrolling && !blockScrollDown) {
        if (!(0, _lodash.isNil)(containers[componentIndex + 1])) {
          disableScroll();
          isScrolling = true;
          pageContainer.current.style.transform =
            'translate3d(0, ' + (componentIndex + 1) * -100 + '%, 0)';

          setTimeout(function () {
            if (isMounted) {
              setComponentIndex(function (prevState) {
                return prevState + 1;
              });
            }
          }, animationTimer + animationTimerBuffer);
        } else {
          enableDocumentScroll();
          if (handleScrollUnavailable) {
            handleScrollUnavailable();
          }
        }
      }
    },
    [
      animationTimer,
      animationTimerBuffer,
      blockScrollDown,
      componentIndex,
      disableScroll,
      enableDocumentScroll,
      handleScrollUnavailable
    ]
  );

  var scrollWindowUp = (0, _react.useCallback)(
    function () {
      if (!isScrolling && !blockScrollUp) {
        if (!(0, _lodash.isNil)(containers[componentIndex - 1])) {
          disableScroll();
          isScrolling = true;
          pageContainer.current.style.transform =
            'translate3d(0, ' + (componentIndex - 1) * -100 + '%, 0)';

          setTimeout(function () {
            if (isMounted) {
              setComponentIndex(function (prevState) {
                return prevState - 1;
              });
            }
          }, animationTimer + animationTimerBuffer);
        } else {
          enableDocumentScroll();
          if (handleScrollUnavailable) {
            handleScrollUnavailable();
          }
        }
      }
    },
    [
      animationTimer,
      animationTimerBuffer,
      blockScrollUp,
      componentIndex,
      disableScroll,
      enableDocumentScroll,
      handleScrollUnavailable
    ]
  );

  var touchMove = (0, _react.useCallback)(
    function (event) {
      // if (!(0, _lodash.isNull)(previousTouchMove)) {
      //   if (event.touches[0].clientY > previousTouchMove) {
      //     scrollWindowUp();
      //   } else {
      //     scrollWindowDown();
      //   }
      // } else {
      //   previousTouchMove = event.touches[0].clientY;
      // }
    },
    [scrollWindowDown, scrollWindowUp]
  );

  var touchStart = (0, _react.useCallback)(
    function (event) {
      touchStartX = event.touches[0].clientX;
      touchStartY = event.touches[0].clientY;
    },
    [scrollWindowDown, scrollWindowUp]
  );

  var touchEnd = (0, _react.useCallback)(
    function (event) {
      const absDeltaX = Math.abs(touchStartX - event.changedTouches[0].clientX);
      const deltaY = touchStartY - event.changedTouches[0].clientY;
      const absDeltaY = Math.abs(deltaY);

      if (absDeltaY < absDeltaX || absDeltaY < 100) {
        return;
      }

      if (deltaY > 0) {
        scrollWindowDown();
      } else {
        scrollWindowUp();
      }
    },
    [scrollWindowDown, scrollWindowUp]
  );

  var wheelScroll = (0, _react.useCallback)(
    function (event) {
      if (event.deltaY < 0) {
        scrollWindowUp();
      } else {
        scrollWindowDown();
      }
    },
    [scrollWindowDown, scrollWindowUp]
  );

  var keyPress = (0, _react.useCallback)(
    function (event) {
      if ((0, _lodash.isEqual)(event.keyCode, KEY_UP)) {
        scrollWindowUp();
      }
      if ((0, _lodash.isEqual)(event.keyCode, KEY_DOWN)) {
        scrollWindowDown();
      }
    },
    [scrollWindowDown, scrollWindowUp]
  );

  (0, _react.useEffect)(
    function () {
      pageContainer.current.addEventListener(Events.TOUCHMOVE, touchMove);
      pageContainer.current.addEventListener(Events.TOUCHSTART, touchStart);
      pageContainer.current.addEventListener(Events.TOUCHEND, touchEnd);
      pageContainer.current.addEventListener(Events.KEYDOWN, keyPress);
      return function () {
        pageContainer.current.removeEventListener(Events.TOUCHMOVE, touchMove);
        pageContainer.current.removeEventListener(
          Events.TOUCHSTART,
          touchStart
        );
        pageContainer.current.removeEventListener(Events.TOUCHEND, touchEnd);
        pageContainer.current.removeEventListener(Events.KEYDOWN, keyPress);
      };
    },
    [touchMove, keyPress]
  );

  (0, _react.useEffect)(function () {
    isMounted = true;

    checkRenderOnMount();
    return function () {
      isMounted = false;
    };
  }, []);

  (0, _react.useEffect)(
    function () {
      isScrolling = false;
      previousTouchMove = null;
      if (componentIndex > prevComponentIndex) {
        addNextComponent();
      }
    },
    [addNextComponent, componentIndex, prevComponentIndex]
  );

  (0, _react.useEffect)(
    function () {
      if (pageOnChange) {
        pageOnChange(componentIndex);
      }
    },
    [pageOnChange, componentIndex]
  );

  (0, _react.useEffect)(
    function () {
      if (
        !(0, _lodash.isNil)(customPageNumber) &&
        !(0, _lodash.isEqual)(customPageNumber, componentIndex)
      ) {
        var newComponentsToRenderLength = componentsToRenderLength;

        if (!(0, _lodash.isEqual)(componentIndex, customPageNumber)) {
          if (
            !(0, _lodash.isNil)(containers[customPageNumber]) &&
            !isScrolling
          ) {
            isScrolling = true;
            // eslint-disable-next-line max-len
            pageContainer.current.style.transform =
              'translate3d(0, ' + customPageNumber * -100 + '%, 0)';

            if (
              (0, _lodash.isNil)(containers[customPageNumber]) &&
              !(0, _lodash.isNil)(children[customPageNumber])
            ) {
              newComponentsToRenderLength++;
            }

            setTimeout(function () {
              setComponentIndex(customPageNumber);
              setComponentsToRenderLength(newComponentsToRenderLength);
            }, animationTimer + animationTimerBuffer);
          } else if (
            !isScrolling &&
            !(0, _lodash.isNil)(children[customPageNumber])
          ) {
            for (var i = componentsToRenderLength; i <= customPageNumber; i++) {
              newComponentsToRenderLength++;
            }

            if (!(0, _lodash.isNil)(children[customPageNumber])) {
              newComponentsToRenderLength++;
            }

            isScrolling = true;
            isTransitionAfterComponentsToRenderChanged = true;
            setComponentsToRenderLength(newComponentsToRenderLength);
          }
        }
      }
    },
    [customPageNumber]
  );

  (0, _react.useEffect)(
    function () {
      if (isTransitionAfterComponentsToRenderChanged) {
        isTransitionAfterComponentsToRenderChanged = false;

        pageContainer.current.style.transform =
          'translate3d(0, ' + customPageNumber * -100 + '%, 0)';

        setTimeout(function () {
          setComponentIndex(customPageNumber);
        }, animationTimer + animationTimerBuffer);
      }
    },
    [
      animationTimer,
      animationTimerBuffer,
      componentsToRenderLength,
      customPageNumber
    ]
  );

  return _react2.default.createElement(
    'div',
    {
      style: {
        height: containerHeight,
        width: containerWidth,
        overflow: 'hidden'
      }
    },
    _react2.default.createElement(
      'div',
      {
        ref: pageContainer,
        onWheel: wheelScroll,
        style: {
          height: '100%',
          width: '100%',
          transition:
            'transform ' + animationTimer + 'ms ' + transitionTimingFunction,
          outline: 'none'
        },
        tabIndex: 0
      },
      setRenderComponents()
    )
  );
};

ReactPageScroller.propTypes =
  process.env.NODE_ENV !== 'production'
    ? {
        animationTimer: _propTypes2.default.number,
        animationTimerBuffer: _propTypes2.default.number,
        blockScrollDown: _propTypes2.default.bool,
        blockScrollUp: _propTypes2.default.bool,
        children: _propTypes2.default.any,
        containerHeight: _propTypes2.default.oneOfType([
          _propTypes2.default.number,
          _propTypes2.default.string
        ]),
        containerWidth: _propTypes2.default.oneOfType([
          _propTypes2.default.number,
          _propTypes2.default.string
        ]),
        customPageNumber: _propTypes2.default.number,
        handleScrollUnavailable: _propTypes2.default.func,
        pageOnChange: _propTypes2.default.func,
        renderAllPagesOnFirstRender: _propTypes2.default.bool,
        transitionTimingFunction: _propTypes2.default.string
      }
    : {};

ReactPageScroller.defaultProps = {
  animationTimer: DEFAULT_ANIMATION_TIMER,
  animationTimerBuffer: DEFAULT_ANIMATION_TIMER_BUFFER,
  transitionTimingFunction: DEFAULT_ANIMATION,
  containerHeight: DEFAULT_CONTAINER_HEIGHT,
  containerWidth: DEFAULT_CONTAINER_WIDTH,
  blockScrollUp: false,
  blockScrollDown: false
};

exports.default = ReactPageScroller;
module.exports = exports['default'];
