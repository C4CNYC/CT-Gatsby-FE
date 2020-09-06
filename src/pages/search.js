import React, { Fragment, Component } from 'react';
import PropTypes from 'prop-types';
import Helmet from 'react-helmet';
import { connect } from 'react-redux';
import { Index } from 'react-instantsearch-dom';

import { updateSearchQuery } from '../components/search/redux';
import SearchPageHits from '../components/search/searchPage/SearchPageHits';

import './search.css';

const propTypes = { updateSearchQuery: PropTypes.func.isRequired };

const mapDispatchToProps = { updateSearchQuery };

class SearchPage extends Component {
  componentWillUnmount() {
    this.props.updateSearchQuery('');
  }
  render() {
    return (
      <Fragment>
        <Helmet title='Search | codetribe.com' />
        <Index indexName='news' />
        <main>
          <SearchPageHits />
        </main>
      </Fragment>
    );
  }
}

SearchPage.displayName = 'SearchPage';
SearchPage.propTypes = propTypes;

export default connect(
  null,
  mapDispatchToProps
)(SearchPage);
