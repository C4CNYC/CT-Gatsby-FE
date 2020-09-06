import React, { Component } from 'react';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import uniq from 'lodash/uniq';
import { createSelector } from 'reselect';

import SuperBlock from './components/SuperBlock';
import Spacer from '../helpers/Spacer';

import './map.css';
import { UnitNode } from '../../state/propTypes';
import { toggleSuperBlock, toggleBlock, resetExpansion } from './redux';
import { currentUnitIdSelector } from '../../state';
import { dasherize } from '../../..//utils/slugs';
import Grid from '@material-ui/core/Grid';

const propTypes = {
  currentUnitId: PropTypes.string,
  hash: PropTypes.string,
  blockNodes: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({
        slug: PropTypes.string.isRequired,
      }),
      title: PropTypes.string.isRequired,
      // block: PropTypes.string.isRequired
    })
  ),
  isSignedIn: PropTypes.bool,
  nodes: PropTypes.arrayOf(UnitNode),
  resetExpansion: PropTypes.func,
  toggleBlock: PropTypes.func.isRequired,
  toggleSuperBlock: PropTypes.func.isRequired
};

const mapStateToProps = state => {
  return createSelector(
    currentUnitIdSelector,
    currentUnitId => ({
      currentUnitId
    })
  )(state);
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      resetExpansion,
      toggleSuperBlock,
      toggleBlock
    },
    dispatch
  );
}

export class Map extends Component {
  constructor(props) {
    super(props);
    this.initializeExpandedState();
  }

  // As this happens in the constructor, it's necessary to manipulate state
  // directly.
  initializeExpandedState() {
    const {
      currentUnitId,
      hash,
      nodes,
      resetExpansion,
      toggleBlock,
      toggleSuperBlock,
      isSignedIn
    } = this.props;
    resetExpansion();

    let node;

    // find the unit that has the same superblock with hash
    if (hash) {
      node = nodes.find(node => dasherize(node.superBlock) === hash);
    }

    // without hash only expand when signed in
    if (isSignedIn) {
      // if there is no hash or the hash did not match any unit superblock
      // and there was a currentUnitId
      if (!node && currentUnitId) {
        node = nodes.find(node => node.id === currentUnitId);
      }
      if (!node) node = nodes[0];
    }

    if (!node) return;

    toggleBlock(node.block);
    toggleSuperBlock(node.superBlock);
  }

  renderSuperBlocks(superBlocks) {
    const { nodes, blockNodes } = this.props;
    return superBlocks.map(superBlock => (
      <SuperBlock
        blockNodes={blockNodes}
        key={superBlock}
        nodes={nodes}
        superBlock={superBlock}
      />
    ));
  }

  render() {
    const { nodes } = this.props;
    const superBlocks = uniq(nodes.map(({ superBlock }) => superBlock));
    return (
      <Grid item={true}>
        <Grid item={true} sm={10}  xs={12}>
          <div className='map-ui'>
            <ul>
              {this.renderSuperBlocks(superBlocks)}
              <Spacer />
            </ul>
          </div>
        </Grid>
      </Grid>
    );
  }
}

Map.displayName = 'Map';
Map.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Map);
