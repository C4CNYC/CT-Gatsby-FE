import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class InsideScrollView extends Component {
  static contextTypes = {
    ScrollView: PropTypes.func,
  }

  render() {
    const ScrollView = this.context.ScrollView
    return (
      <ScrollView>
        ...
        scroll view content
      </ScrollView>
    )
  }
}