import React from 'react';
import PropTypes from 'prop-types';

import { FullWidthRow } from '../../helpers';

import './portfolio.css';
import { Card } from '@material-ui/core';

const propTypes = {
  portfolio: PropTypes.arrayOf(
    PropTypes.shape({
      description: PropTypes.string,
      id: PropTypes.string,
      image: PropTypes.string,
      title: PropTypes.string,
      url: PropTypes.string
    })
  )
};

function Portfolio({ portfolio = [] }) {
  if (!portfolio.length) {
    return null;
  }
  return (
    <FullWidthRow>
      <h2 className='text-center'>Portfolio</h2>
      {portfolio.map(({ title, url, image, description, id }) => (
        <Card key={id}>
          <div align='middle'>
            {image && (
              <img
                alt={`A screen shot of ${title}`}
                className='portfolio-screen-shot'
                src={image}
              />
            )}
          </div>
          <div>
            <div className='portfolio-heading'>
              <a href={url} rel='nofollow noopener noreferrer'>
                {title}
              </a>
            </div>
            <p>{description}</p>
          </div>
        </Card>
      ))}
      <hr />
    </FullWidthRow>
  );
}

Portfolio.displayName = 'Portfolio';
Portfolio.propTypes = propTypes;

export default Portfolio;
