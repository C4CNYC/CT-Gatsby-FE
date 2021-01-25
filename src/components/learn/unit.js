import React from 'react';
import Helmet from 'react-helmet';
import { Link } from 'gatsby';

import FullWidthRow from '../../components/helpers/FullWidthRow';
import { Box, Card, CardContent, Grid } from '@material-ui/core';
import { Spacer } from '../../components/helpers';

import { lesson_data } from '../../learn/data/lesson_data';
import { unit_data } from '../../learn/data/units_data';

export const Unit = ({ unitId }) => {
  const getUnit = (id) => {
    const unit = unit_data.filter((unit) => unit.link === id);
    if (unit) {
      return unit[0];
    }

    return {
      content: '',
      title: '',
      image: ''
    };
  };

  const { content, title, image } = getUnit(unitId);

  return (
    <>
      <Helmet>
        <title>{title} | codetribe.com</title>
      </Helmet>
      <Box p={3}>
        <Grid className='intro-layout-container' container={true} spacing={3}>
          <Grid container={true}>
            <Grid item={true}>
              <img alt='' src={image} style={{ width: '100%' }} />
            </Grid>
            <Grid item={true}>
              <h1
                className='intro-layout'
                dangerouslySetInnerHTML={{ __html: title }}
              />
            </Grid>
          </Grid>
          <FullWidthRow>
            <div
              className='intro-layout'
              dangerouslySetInnerHTML={{ __html: content }}
            />
            <p>
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
              dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
              ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
              dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem
              ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor
              Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum
              dolor Lorem ipsum dolor Lorem ipsum dolor Lorem ipsum dolor{' '}
            </p>
          </FullWidthRow>
        </Grid>
      </Box>
      <Box p={3}>
        <FullWidthRow>
          <h2>Lessons:</h2>
        </FullWidthRow>
        <Grid container={true} spacing={3}>
          {lesson_data.map((lesson, i) => (
            <Grid className={'superblock'} item={true} key={i} xs={4}>
              <Card>
                <CardContent>
                  <Link to={lesson.link}>
                    <img alt='' src={lesson.image} style={{ width: '100%' }} />
                    <h2 className='medium-heading'>{lesson.title}</h2>
                  </Link>
                </CardContent>
              </Card>
            </Grid>
          ))}
          <Spacer />
        </Grid>
      </Box>
    </>
  );
};

Unit.displayName = 'UnitPage';
