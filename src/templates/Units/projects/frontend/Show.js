import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import { UnitNode } from '../../../../state/propTypes';
import {
  unitMounted,
  updateUnitMeta,
  openModal,
  updateProjectFormValues
} from '../../redux';
import { frontEndProject } from '../../../utils/unitTypes';
import { getGuideUrl } from '../../utils';

import LearnLayout from '../../../../components/layouts/Learn';
import UnitTitle from '../../components/Unit-Title';
import UnitDescription from '../../components/Unit-Description';
import Spacer from '../../../../components/helpers/Spacer';
import ProjectForm from '../ProjectForm';
import ProjectToolPanel from '../Tool-Panel';
import CompletionModal from '../../components/CompletionModal';
import HelpModal from '../../components/HelpModal';
import Hotkeys from '../../components/Hotkeys';

const mapStateToProps = () => ({});
const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updateUnitMeta,
      unitMounted,
      updateProjectFormValues,
      openCompletionModal: () => openModal('completion')
    },
    dispatch
  );

const propTypes = {
  unitMounted: PropTypes.func.isRequired,
  data: PropTypes.shape({
    unitNode: UnitNode
  }),
  openCompletionModal: PropTypes.func.isRequired,
  pageContext: PropTypes.shape({
    unitMeta: PropTypes.object
  }),
  updateUnitMeta: PropTypes.func.isRequired,
  updateProjectFormValues: PropTypes.func.isRequired
};

export class Project extends Component {
  componentDidMount() {
    const {
      unitMounted,
      data: {
        unitNode: { title, unitType }
      },
      pageContext: { unitMeta },
      updateUnitMeta
    } = this.props;
    updateUnitMeta({ ...unitMeta, title, unitType });
    unitMounted(unitMeta.id);
    this._container.focus();
  }

  componentDidUpdate(prevProps) {
    const {
      data: {
        unitNode: { title: prevTitle }
      }
    } = prevProps;
    const {
      unitMounted,
      data: {
        unitNode: { title: currentTitle, unitType }
      },
      pageContext: { unitMeta },
      updateUnitMeta
    } = this.props;
    if (prevTitle !== currentTitle) {
      updateUnitMeta({
        ...unitMeta,
        title: currentTitle,
        unitType
      });
      unitMounted(unitMeta.id);
    }
  }

  render() {
    const {
      data: {
        unitNode: {
          unitType,
          fields: { blockName, slug },
          forumTopicId,
          title,
          description
        }
      },
      openCompletionModal,
      pageContext: {
        unitMeta: { introPath, nextUnitPath, prevUnitPath }
      },
      updateProjectFormValues
    } = this.props;
    const isFrontEnd = unitType === frontEndProject;

    const blockNameTitle = `${blockName} - ${title}`;
    return (
      <Hotkeys
        innerRef={c => (this._container = c)}
        introPath={introPath}
        nextUnitPath={nextUnitPath}
        prevUnitPath={prevUnitPath}
      >
        <LearnLayout>
          <Helmet title={`${blockNameTitle} | Learn | codetribe.com`} />
          <Spacer />
          <UnitTitle>{blockNameTitle}</UnitTitle>
          <UnitDescription description={description} />
          <ProjectForm
            isFrontEnd={isFrontEnd}
            onSubmit={openCompletionModal}
            updateProjectForm={updateProjectFormValues}
          />
          <ProjectToolPanel guideUrl={getGuideUrl({ forumTopicId, title })} />
          <br />
          <Spacer />
          <CompletionModal blockName={blockName} />
          <HelpModal />
        </LearnLayout>
      </Hotkeys>
    );
  }
}

Project.displayName = 'Project';
Project.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Project);

export const query = graphql`
  query ProjectUnit($slug: String!) {
    unitNode(fields: { slug: { eq: $slug } }) {
      forumTopicId
      title
      description
      unitType
      fields {
        blockName
        slug
      }
    }
  }
`;
