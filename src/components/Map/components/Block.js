import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { createSelector } from 'reselect';
import { Link } from 'gatsby';

import { makeExpandedBlockSelector, toggleBlock } from '../redux';
import { completedUnitsSelector, executeGA } from '../../../state';
import Caret from '../../../assets/icons/Caret';
import { blockNameify } from '../../../../utils/blockNameify';
import GreenPass from '../../../assets/icons/GreenPass';
import GreenNotCompleted from '../../../assets/icons/GreenNotCompleted';
import IntroInformation from '../../../assets/icons/IntroInformation';
import { dasherize } from '../../../..//utils/slugs';

const mapStateToProps = (state, ownProps) => {
  const expandedSelector = makeExpandedBlockSelector(ownProps.blockDashedName);

  return createSelector(
    expandedSelector,
    completedUnitsSelector,
    (isExpanded, completedUnits) => ({
      isExpanded,
      completedUnits: completedUnits.map(({ id }) => id)
    })
  )(state);
};

const mapDispatchToProps = dispatch =>
  bindActionCreators({ toggleBlock, executeGA }, dispatch);

const propTypes = {
  blockDashedName: PropTypes.string,
  units: PropTypes.array,
  completedUnits: PropTypes.arrayOf(PropTypes.string),
  executeGA: PropTypes.func,
  intro: PropTypes.shape({
    fields: PropTypes.shape({ slug: PropTypes.string.isRequired }),
    title: PropTypes.string.isRequired,
    // block: PropTypes.string.isRequired
  }),
  isExpanded: PropTypes.bool,
  toggleBlock: PropTypes.func.isRequired
};

const mapIconStyle = { height: '15px', marginRight: '10px', width: '15px' };

export class Block extends Component {
  constructor(...props) {
    super(...props);

    this.handleBlockClick = this.handleBlockClick.bind(this);
    this.handleUnitClick = this.handleUnitClick.bind(this);
    this.renderUnits = this.renderUnits.bind(this);
  }

  handleBlockClick() {
    const { blockDashedName, toggleBlock, executeGA } = this.props;
    executeGA({
      type: 'event',
      data: {
        category: 'Map Block Click',
        action: blockDashedName
      }
    });
    return toggleBlock(blockDashedName);
  }

  handleUnitClick(slug) {
    return () => {
      return this.props.executeGA({
        type: 'event',
        data: {
          category: 'Map Unit Click',
          action: slug
        }
      });
    };
  }

  renderCheckMark(isCompleted) {
    return isCompleted ? (
      <GreenPass style={mapIconStyle} />
    ) : (
      <GreenNotCompleted style={mapIconStyle} />
    );
  }

  renderUnits(intro = {}, units = []) {
    // TODO: Split this into a Unit Component and add tests
    // TODO: The styles badge and map-badge on the completion span do not exist
    return [intro].concat(units).map((unit, i) => {
      const completedClass = unit.isCompleted
        ? ' map-unit-title-completed'
        : '';
      return (
        <li
          className={'map-unit-title' + completedClass}
          id={
            unit.title
              ? dasherize(unit.title)
              : dasherize(unit.title)
          }
          key={'map-unit' + (unit.fields ? unit.fields.slug : '')}
        >
          <span className='badge map-badge'>
            {i === 0 ? (
              <IntroInformation style={mapIconStyle} />
            ) : (
              this.renderCheckMark(unit.isCompleted)
            )}
          </span>
          <Link
            onClick={this.handleUnitClick((unit.fields ? unit.fields.slug : ''))}
            to={(unit.fields ? unit.fields.slug : '')}
          >
            {unit.title || unit.title}
          </Link>
        </li>
      );
    });
  }

  render() {
    const {
      blockDashedName,
      completedUnits,
      units,
      isExpanded,
      intro
    } = this.props;
    let completedCount = 0;
    const unitsWithCompleted = units.map(unit => {
      const { id } = unit;
      const isCompleted = completedUnits.some(
        completedId => id === completedId
      );
      if (isCompleted) {
        completedCount++;
      }
      return { ...unit, isCompleted };
    });

    return (
      <li className={`block ${isExpanded ? 'open' : ''}`}>
        <button
          aria-expanded={isExpanded}
          className='map-title'
          onClick={this.handleBlockClick}
        >
          <Caret />
          <h4>{blockNameify(blockDashedName)}</h4>
          <div className='map-title-completed'>
            <span>
              {this.renderCheckMark(
                completedCount === unitsWithCompleted.length
              )}
            </span>
            <span>{`${completedCount}/${unitsWithCompleted.length}`}</span>
          </div>
        </button>
        <ul>
          {isExpanded
            ? this.renderUnits(intro, unitsWithCompleted)
            : null}
        </ul>
      </li>
    );
  }
}

Block.displayName = 'Block';
Block.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Block);
