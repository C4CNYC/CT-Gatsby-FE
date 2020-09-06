import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { uniq, find } from 'lodash';
import { dasherize } from '../../../..//utils/slugs';

import Block from './Block';

import { makeExpandedSuperBlockSelector, toggleSuperBlock } from '../redux';
import Caret from '../../../assets/icons/Caret';
import { UnitNode } from '../../../state/propTypes';

const mapStateToProps = (state, ownProps) => {
  const expandedSelector = makeExpandedSuperBlockSelector(ownProps.superBlock);

  return createSelector(
    expandedSelector,
    isExpanded => ({ isExpanded })
  )(state);
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      toggleSuperBlock
    },
    dispatch
  );
}

const propTypes = {
  introNodes: PropTypes.arrayOf(
    PropTypes.shape({
      fields: PropTypes.shape({ slug: PropTypes.string.isRequired }),
      title: PropTypes.string.isRequired,
    })
  ),
  isExpanded: PropTypes.bool,
  nodes: PropTypes.arrayOf(UnitNode),
  superBlock: PropTypes.string,
  toggleSuperBlock: PropTypes.func.isRequired
};

function createSuperBlockTitle(str) {
  return `${str}`;
}

export class SuperBlock extends Component {
  renderBlock(superBlock) {
    const { nodes, blockNodes } = this.props;
    const blocksForSuperBlock = nodes.filter(
      node => node.superBlock === superBlock
    );
    const blockDashedNames = uniq(
      blocksForSuperBlock.map(({ block }) => dasherize(block))
    );

    return (
      <ul>
        {blockDashedNames.map(blockDashedName => (
          <Block
            blockDashedName={blockDashedName}
            units={blocksForSuperBlock.filter(
              node => node.block === blockDashedName
            )}
            intro={find(
              blockNodes,
              ({ title }) =>
                dasherize(title) === blockDashedName
            )}
            key={blockDashedName}
          />
        ))}
      </ul>
    );
  }

  render() {
    const { superBlock, isExpanded, toggleSuperBlock } = this.props;
    return (
      <li
        className={`superblock ${isExpanded ? 'open' : ''}`}
        id={dasherize(superBlock)}
      >
        <button
          aria-expanded={isExpanded}
          className='map-title'
          onClick={() => toggleSuperBlock(superBlock)}
        >
          <Caret />
          <h4>{createSuperBlockTitle(superBlock)}</h4>
        </button>
        {isExpanded ? this.renderBlock(superBlock) : null}
      </li>
    );
  }
}

SuperBlock.displayName = 'SuperBlock';
SuperBlock.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SuperBlock);
