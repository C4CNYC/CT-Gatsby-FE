import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { createSelector } from 'reselect';
import { connect } from 'react-redux';
import { graphql } from 'gatsby';
import Helmet from 'react-helmet';

import {
  executeUnit,
  unitMounted,
  unitTestsSelector,
  consoleOutputSelector,
  initConsole,
  initTests,
  updateBackendFormValues,
  updateUnitMeta,
  updateProjectFormValues,
  backendNS
} from '../../redux';
import { getGuideUrl } from '../../utils';

import LearnLayout from '../../../../components/layouts/Learn';
import UnitTitle from '../../components/Unit-Title';
import UnitDescription from '../../components/Unit-Description';
import TestSuite from '../../components/Test-Suite';
import Output from '../../components/Output';
import CompletionModal from '../../components/CompletionModal';
import HelpModal from '../../components/HelpModal';
import ProjectToolPanel from '../Tool-Panel';
import ProjectForm from '../ProjectForm';
import { Form } from '../../../../components/formHelpers';
import Spacer from '../../../../components/helpers/Spacer';
import { UnitNode } from '../../../../state/propTypes';
import { isSignedInSelector } from '../../../../state';
import Hotkeys from '../../components/Hotkeys';

import { backend } from '../../../utils/unitTypes';

import '../../components/test-frame.css';

const propTypes = {
  unitMounted: PropTypes.func.isRequired,
  data: PropTypes.shape({
    unitNode: UnitNode
  }),
  description: PropTypes.string,
  executeUnit: PropTypes.func.isRequired,
  forumTopicId: PropTypes.number,
  id: PropTypes.string,
  initConsole: PropTypes.func.isRequired,
  initTests: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool,
  output: PropTypes.string,
  pageContext: PropTypes.shape({
    unitMeta: PropTypes.object
  }),
  tests: PropTypes.array,
  title: PropTypes.string,
  updateBackendFormValues: PropTypes.func.isRequired,
  updateUnitMeta: PropTypes.func.isRequired,
  updateProjectFormValues: PropTypes.func.isRequired
};

const mapStateToProps = createSelector(
  consoleOutputSelector,
  unitTestsSelector,
  isSignedInSelector,
  (output, tests, isSignedIn) => ({
    tests,
    output,
    isSignedIn
  })
);

const mapDispatchToActions = {
  unitMounted,
  executeUnit,
  initConsole,
  initTests,
  updateBackendFormValues,
  updateUnitMeta,
  updateProjectFormValues
};

const formFields = ['solution'];
const options = {
  required: ['solution'],
  types: {
    solution: 'url'
  },
  placeholders: {
    solution: 'Link to solution, ex: https://codepen.io/camperbot/full/oNvPqqo'
  }
};

export class BackEnd extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.updateDimensions = this.updateDimensions.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  componentDidMount() {
    this.initializeComponent();
    window.addEventListener('resize', this.updateDimensions);
    this._container.focus();
  }

  updateDimensions() {
    this.setState({ width: window.innerWidth, height: window.innerHeight });
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions);
  }

  componentDidUpdate(prevProps) {
    const {
      data: {
        unitNode: { title: prevTitle }
      }
    } = prevProps;
    const {
      data: {
        unitNode: { title: currentTitle }
      }
    } = this.props;
    if (prevTitle !== currentTitle) {
      this.initializeComponent();
    }
  }

  initializeComponent() {
    const {
      unitMounted,
      initConsole,
      initTests,
      updateUnitMeta,
      data: {
        unitNode: {
          fields: { tests },
          unitType
        }
      },
      pageContext: { unitMeta }
    } = this.props;
    initConsole('');
    initTests(tests);
    updateUnitMeta({ ...unitMeta, unitType });
    unitMounted(unitMeta.id);
  }

  handleSubmit(values) {
    const { updateBackendFormValues, executeUnit } = this.props;
    updateBackendFormValues(values);
    executeUnit();
  }

  render() {
    const {
      data: {
        unitNode: {
          fields: { blockName },
          unitType,
          forumTopicId,
          title,
          description,
          instructions
        }
      },
      output,
      pageContext: {
        unitMeta: { introPath, nextUnitPath, prevUnitPath }
      },
      tests,
      isSignedIn,
      executeUnit,
      updateProjectFormValues
    } = this.props;

    const buttonCopy = isSignedIn
      ? 'Submit and go to my next unit'
      : "I've completed this unit";
    const blockNameTitle = `${blockName} - ${title}`;

    return (
      <Hotkeys
        innerRef={c => (this._container = c)}
        introPath={introPath}
        nextUnitPath={nextUnitPath}
        prevUnitPath={prevUnitPath}
      >
        <>
          <Helmet title={`${blockNameTitle} | Learn | codetribe.com`} />
          <Grid>
            <Row>
              <Col md={8} mdOffset={2} sm={10}  xs={12}>
                <Spacer />
                <UnitTitle>{blockNameTitle}</UnitTitle>
                <UnitDescription
                  description={description}
                  instructions={instructions}
                />
                {unitType === backend ? (
                  <Form
                    buttonText={`${buttonCopy}`}
                    formFields={formFields}
                    id={backendNS}
                    options={options}
                    submit={this.handleSubmit}
                  />
                ) : (
                  <ProjectForm
                    isFrontEnd={false}
                    onSubmit={executeUnit}
                    updateProjectForm={updateProjectFormValues}
                  />
                )}
                <ProjectToolPanel
                  guideUrl={getGuideUrl({ forumTopicId, title })}
                />
                <br />
                <Output
                  defaultOutput={`/**
*
* Test output will go here
*
*
*/`}
                  dimensions={this.state}
                  height={150}
                  output={output}
                />
                <TestSuite tests={tests} />
                <Spacer />
              </Col>
              <CompletionModal blockName={blockName} />
              <HelpModal />
            </Row>
          </Grid>
        </>
      </Hotkeys>
    );
  }
}

BackEnd.displayName = 'BackEnd';
BackEnd.propTypes = propTypes;

export default connect(
  mapStateToProps,
  mapDispatchToActions
)(BackEnd);

export const query = graphql`
  query BackendUnit($slug: String!) {
    unitNode(fields: { slug: { eq: $slug } }) {
      forumTopicId
      title
      description
      instructions
      unitType
      fields {
        blockName
        slug
      }
      tests {
        text
        testString
      }
    }
  }
`;
