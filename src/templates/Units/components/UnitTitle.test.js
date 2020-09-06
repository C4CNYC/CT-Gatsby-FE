/* global expect */

import React from 'react';
import renderer from 'react-test-renderer';

import UnitTitle from './Unit-Title';

const baseProps = {
  children: 'title text',
  isCompleted: true
};

describe('<UnitTitle/>', () => {
  it('renders correctly', () => {
    const tree = renderer.create(<UnitTitle {...baseProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
