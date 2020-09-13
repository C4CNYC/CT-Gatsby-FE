import React, { Fragment } from 'react';
import config from '../../../content/meta/config';
import mantis from '../images/Mantis-Toboggan.png';
import Avatar from '@material-ui/core/Avatar';

function GreenPass(props) {
  return (
    <Fragment>
      <span className='sr-only'>Passed</span>
        <Avatar src={mantis} style={{ width: '200px', height: 'auto'}} />
      <svg
        height='50'
        viewBox='0 0 200 200'
        width='50'
        xmlns='http://www.w3.org/2000/svg'
        {...props}
      >
        <g>
          <title>Passed</title>
            <rect
                fill='green'
                height='10'
                stroke='green'
                strokeDasharray='null'
                strokeLinecap='null'
                strokeLinejoin='null'
                transform='rotate(-45, 120, 106.321)'
                width='64.425'
                x='55.57059'
                y='130.32089'
            />
            <rect
                fill='green'
                height='10'
                stroke='green'
                strokeDasharray='null'
                strokeLinecap='null'
                strokeLinejoin='null'
                transform='rotate(45, 66.75, 123.75)'
                width='40.332'
                x='85.41726'
                y='130.75'
            />
          {/*<circle*/}
          {/*  cx='100'*/}
          {/*  cy='99'*/}
          {/*  fill='var(--primary-color)'*/}
          {/*  r='95'*/}
          {/*  stroke='var(--primary-color)'*/}
          {/*  strokeDasharray='null'*/}
          {/*  strokeLinecap='null'*/}
          {/*  strokeLinejoin='null'*/}
          {/*/>*/}
          {/*<rect*/}
          {/*  fill='var(--primary-background)'*/}
          {/*  height='30'*/}
          {/*  stroke='green'*/}
          {/*  strokeDasharray='null'*/}
          {/*  strokeLinecap='null'*/}
          {/*  strokeLinejoin='null'*/}
          {/*  transform='rotate(-45, 120, 106.321)'*/}
          {/*  width='128.85878'*/}
          {/*  x='55.57059'*/}
          {/*  y='91.32089'*/}
          {/*/>*/}
          {/*<rect*/}
          {/*  fill='var(--primary-background)'*/}
          {/*  height='30'*/}
          {/*  stroke='green'*/}
          {/*  strokeDasharray='null'*/}
          {/*  strokeLinecap='null'*/}
          {/*  strokeLinejoin='null'*/}
          {/*  transform='rotate(45, 66.75, 123.75)'*/}
          {/*  width='80.66548'*/}
          {/*  x='26.41726'*/}
          {/*  y='108.75'*/}
          {/*/>*/}
        </g>
      </svg>
    </Fragment>
  );
}

GreenPass.displayName = 'GreenPass';

export default GreenPass;
