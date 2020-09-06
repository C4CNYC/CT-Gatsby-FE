import React, { Fragment, Component } from 'react';
import Prism from 'prismjs';
import PropTypes from 'prop-types';

import './unit-description.css';
// import Swiper from 'react-id-swiper';
// import 'swiper/css/swiper.css';
import RevealJsWrapper from '../revealjs/RevealJsWrapper';
import Slides from "../revealjs/Slides";
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({});

const propTypes = {
  description: PropTypes.string,
  instructions: PropTypes.string,
  section: PropTypes.string
};

class UnitDescription extends Component {
  componentDidMount() {
    // Just in case 'current' has not been created, though it should have been.
    if (this.instructionsRef.current) {
      Prism.highlightAllUnder(this.instructionsRef.current);
    }
  }

  constructor(props) {
    super(props);
    this.instructionsRef = React.createRef();
  }

  render() {
    // const swiperParams = {
    //   direction: 'vertical',
    //   pagination: {
    //     el: '.swiper-pagination',
    //     type: 'bullets',
    //     clickable: true
    //   },
    //   navigation: {
    //     nextEl: '.swiper-button-next',
    //     prevEl: '.swiper-button-prev'
    //   },
    //   spaceBetween: 30
    // }
    const { description, instructions, section } = this.props;
    return (

          // <div className={`reveal unit-instructions ${section}`} style={{height: '100%%'}}
          <div className={`unit-instructions ${section}`} style={{height: '100%%'}}
               ref={this.instructionsRef}>
            <div className={'slides'}>
              <section dangerouslySetInnerHTML={{ __html: description }} />
              {/*<RevealJsWrapper revealJsConfig={{*/}
              {/*  dependencies: [*/}
              {/*    { src: "plugin/markdown/marked.js" },*/}
              {/*    { src: "plugin/markdown/markdown.js" },*/}
              {/*    { src: "plugin/highlight/highlight.js" },*/}
              {/*    { src: "plugin/notes/notes.js" },*/}
              {/*    { src: "plugin/zoom-js/zoom.js" }*/}
              {/*  ],*/}
              {/*  hash: true,*/}
              {/*  pdfSeparateFragments: false*/}
              {/*}} importBaseRevealJsCss={true}>*/}
              {/*  <Slides content={description} />*/}
              {/*</RevealJsWrapper>*/}
            </div>
          </div>



    );
  }
}

UnitDescription.displayName = 'UnitDescription';
UnitDescription.propTypes = propTypes;

export default withStyles(styles)(UnitDescription);
