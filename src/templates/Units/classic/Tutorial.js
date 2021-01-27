import React, { useState, useEffect } from 'react';
import withStyles from '@material-ui/core/styles/withStyles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import ArrowRightAltIcon from '@material-ui/icons/ArrowRightAlt';

const styles = (theme) => ({
  popup: {
    position: 'fixed',
    maxWidth: 200,
    padding: theme.base.sizes.linesMargin,
    zIndex: '10',
    background: theme.main.colors.background,
    color: theme.main.colors.content,
    textAlign: 'center',

    '&::after': {
      content: `""`,
      display: 'none',
      border: '16px solid transparent',
      position: 'absolute',
      width: 1,
      height: 1
    },

    '&[data-tutorial-position^="left-top"]': {
      top: theme.bars.sizes.actionsBar + 16,
      left: `calc(2 * ${theme.base.sizes.linesMargin} + 16px)`
    },

    '&[data-tutorial-position^="bottom"]': {
      bottom: theme.bars.sizes.actionsBar + 16,
      left: '50%',
      transform: 'translateX(-50%)'
    },

    '&[data-tutorial-position^="top"]': {
      top: theme.bars.sizes.actionsBar + 16,
      left: '50%',
      transform: 'translateX(-50%)'
    },

    '&[data-tutorial-arrow^="bottom"]::after': {
      display: 'block',
      left: '50%',
      borderTop: `16px solid ${theme.main.colors.background}`,
      top: '100%',
      transform: 'translateX(-50%)'
    },

    '&[data-tutorial-arrow^="left-top"]::after': {
      display: 'block',
      right: '100%',
      top: 16,
      borderRight: `16px solid ${theme.main.colors.background}`
    }
  },

  button: {
    margin: 'auto',
    textTransform: 'uppercase',
    background: theme.base.colors.accent,
    border: 'none'
  }
});

const tutorialData = [
  {
    title: 'tip 1 of 3',
    text: <p>To help you, we have added the &lt; {'&'} &gt; keys here.</p>,
    button: 'Thanks >',
    arrow: 'bottom',
    position: 'bottom'
  },
  {
    title: 'tip 2 of 3',
    text: <p>This is where you will type {'<h1>'}</p>,
    button: 'OK >',
    arrow: 'left-top',
    position: 'left-top'
  },
  {
    title: 'tip 3 of 3',
    text: (
      <p>
        When done swipe right <ArrowRightAltIcon /> or click <AssignmentIcon />{' '}
        button to return to the slides.
      </p>
    ),
    button: 'Got it.',
    arrow: 'none',
    position: 'top'
  }
];

export const Tutorial = ({ classes }) => {
  const [tipIndex, setTipIndex] = useState(0);
  const [currentTip, setCurrentTip] = useState(null);

  useEffect(() => {
    const completed = localStorage.getItem('tutorial-finished');
    if (!completed) {
      setCurrentTip(tutorialData[tipIndex]);
    }
  }, []);

  const clickHandler = () => {
    if (tipIndex + 1 === tutorialData.length) {
      localStorage.setItem('tutorial-finished', true);
    }
    setCurrentTip(tutorialData[tipIndex + 1]);
    setTipIndex(tipIndex + 1);
  };

  return currentTip ? (
    <div
      className={classes.popup}
      data-tutorial-position={currentTip.position}
      data-tutorial-arrow={currentTip.arrow}
    >
      <h3>{currentTip.title}</h3>
      <p>{currentTip.text}</p>
      <button className={classes.button} onClick={(e) => clickHandler()}>
        {currentTip.button}
      </button>
    </div>
  ) : null;
};

export default withStyles(styles)(Tutorial);
