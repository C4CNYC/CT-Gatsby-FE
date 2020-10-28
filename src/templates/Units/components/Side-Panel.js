import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import UnitTitle from './Unit-Title';
import UnitDescription from './Unit-Description';
import ToolPanel from './Tool-Panel';
import TestSuite from './Test-Suite';

import { unitTestsSelector, isUnitCompletedSelector } from '../redux';
import { createSelector } from 'reselect';
import './side-panel.css';
import { mathJaxScriptLoader } from '../../../utils/scriptLoaders';
import { ReflexContainer, ReflexElement } from 'react-reflex';
import ReactPageScroller from "react-page-scroller";
import { lesson_data } from '../utils/lesson_data';
import './slider_program.js';
import './validation.js';

import Sliders from './slider.js'
import * as slider from './slider_program.js'

import ReactHtmlParser, { processNodes, convertNodeToElement, htmlparser2 } from 'react-html-parser';
import ArrowForwardIcon from '@material-ui/icons/ArrowForward';
const mapStateToProps = createSelector(
  isUnitCompletedSelector,
  unitTestsSelector,
  (isUnitCompleted, tests) => ({
    isUnitCompleted,
    tests
  })
);

const propTypes = {
  description: PropTypes.string,
  guideUrl: PropTypes.string,
  instructions: PropTypes.string,
  isUnitCompleted: PropTypes.bool,
  section: PropTypes.string,
  showToolPanel: PropTypes.bool,
  tests: PropTypes.arrayOf(PropTypes.object),
  title: PropTypes.string,
  videoUrl: PropTypes.string
};

export class SidePanel extends Component {
  componentDidMount() {
    const MathJax = global.MathJax;
    const mathJaxMountPoint = document.querySelector('#mathjax');
    const mathJaxUnit =
      this.props.section === 'rosetta-code' ||
      this.props.section === 'project-euler';
    if (MathJax) {
      // Configure MathJax when it's loaded and
      // users navigate from another unit
      MathJax.Hub.Config({
        tex2jax: {
          inlineMath: [['$', '$'], ['\\(', '\\)']],
          processEscapes: true,
          processClass: 'rosetta-code|project-euler'
        }
      });
      MathJax.Hub.Queue([
        'Typeset',
        MathJax.Hub,
        document.querySelector('.rosetta-code'),
        document.querySelector('.project-euler')
      ]);
    } else if (!mathJaxMountPoint && mathJaxUnit) {
      mathJaxScriptLoader();
    }
  }

  goToPage = (pageNumber) => {
    this.reactPageScroller.goToPage(pageNumber);
  }
  renderSlide = (slide, slideNumber) => {
    switch (slideNumber) {
      case 0:
        return <div id="lesson-page" style={{ height: "100%" }}>
          <ReflexElement flex={1} style={{ height: "100%" }} className={`snapshot snap1 white hide-help swiper-slide`}>
            <div>
              <p class="slide-header h2">CHALLENGE</p>
            </div>
            <div>
              <p class="h1 white">Hi,... <img class='swiper-lazy' src={require('../img/emoji/72/waving-hand-sign-type-3.png')} alt='' /> </p>
              <div class="h2 white">Type <div class='inline-code bg-black p-2'>&lt;h1&gt;</div> in the code editor.</div>
            </div>
            <div class='white'>
              <p class="h5 pt-3 ">Tip: Swipe left <img class='swiper-lazy w-1em' src={require('../img/emoji/72/leftwards-black-arrow.png')} alt='' /> or click the button below.</p>
              <div class="">
                <div class="button-locked">
                  <div class="btn btn-primary swiper-editor bg-aqXua skip check c1-back" >SEE CODE EDITOR</div>
                </div>
                <div class="button-unlocked">
                  <a class="btn btn-primary success check swiper-next c1-back">I did it <i class="icon-sentiment_satisfied"></i></a>
                </div>
              </div>
              <p class=" pt-3 mb-1">Not sure what to do?</p>
              <p class="pt-0 underline take-tour pointer">Take the Tour</p>
            </div>
          </ReflexElement>
        </div >
      case 1:
        return <div id="lesson-page" style={{ height: "100%" }}>
          <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
            <div class='container'>
              <h2 class='lesson-title encouraging yellow mb-2'>GOOD JOB!</h2>
              <p class='lesson-instructions mb-4'>That’s a great start.</p>
              <p class='lesson-instructions mb-5'>
                <div class='mt-5'>
                  <img class='w-20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAAHqsLF6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAFBUExURQAAANW3n259LsKRakFJVw8KCUw+Nk5VYkk9OZS3IGlqbT5GVJ5kPDkiFMiiiICCjlFYZU9PPyAYFZRdN0UpFY+OmGZaVDo+SIOjHZq9I2uDN1AvGWp6LberoVs1HKlmHjY/TVJDPD0tJWxgWp5yWWc8IFZbZyEMCD8vKEpSX0lAO08/OXp9iX2ZKlBRXEw8NGpue1lea6hsQUIyKjUoIXiMMUc/P4GdIF1QSS01P00/N6Gir4lYM09BOYSgI15jcFVmPnB0gMKZfTU4Q3pKKa9zRU0/OIupKSEjKWt5L0g9OUo6MywgG+DXzHBDJGp6LmNodZeZpnySKbaFYp3BJVVJQGJTTbR4S0NKWH6UK2VwgkdHQ3Z4hkdOW4JQLHmNKxgQDSoYD1lLREw+NzE1Py0vN0hQXfTv4kU2L0k6NTtDT3teMycAAABqdFJOUwD/aP+A/5//v///////////EP///////4D///+//////////////////2tQ////z///////zyD//4CA//+A//////////////+A3/////+g/////////////485////sP///4///7///+/HrkQyAAAACXBIWXMAAA7DAAAOwwHHb6hkAAAGiElEQVRIS82Xe1faSBTAbWsKlqA4AXzQUoklBGotr1a3m900CmhNTGEpJFtMOlgfyPf/AHvvZFCC6O45u3/sr+eUyX1lMjP33nFhmv1tmf3Kspxs4YD4Ta2OA6HbfCPgQCkbZQUHschhJIaDLQQHt9ykt2/YQJazJv6+j2tiAwdRv+rYOPDahqFfwWDLU9a8jzDYxDAbqGNEzSgfIdGamevtkzSLBgxghlQTJRrMd2HBFDIvTp2DoU+4wEh1fkU6qe+BIFZUdLej64pXCgTRrXHM9dzY7eSPdisKAP8vcckcBqa5yoeMXj+9vb3PHwB11Mqdk3SaPy6cwExV0qi3JlNXcXFFMS+rXCCTuNhsVofJicCyl4eO8+L6TpCRus1mVxNGXLDSYR/X6exwQUQvG2eG0a5EuMBLVPSUrlciLheM3WLihZIoupOv3drCr3fHk8//wfaREQj2lAquh1fZVb4Gkn9MyYRFAfb5Us9w02rleuf7/XQ6J29vs4M2zWoN16w2MlstkqSt8/PZMKhH6tSWpAaVVXWyMAE/UWlR6ovNqpbNa1lyu9gBpkzzvlAYNh3HyRaGQz9LZgwsIa+d+q+vweK08fpJg9IaVwWU6lSwNUmsSl1JFCU/I9DJBgdElEq7DJuyg5wZ5bZeSeB5vwX2Q9F1sNEr5XIb1ErEW+Q6xjjmFSMJpWIcplLjipKIwFkdcB0Ddirmul7xYtc4LhZBe7uXnF6wneMYMAYl8oHrkD2WczN8m3rH+vov91l/yrX/KZ9OTPNk/nFBbnrsQG2HF/mWgYnHCQ1aLfMTF04xgKyEE4c2MkR6z8V3jNh5QxuVjtLp9Fsun4BpLKsj02ypNFOHIzk7kcmZVOvEtinGwqJ2x3Oul0nSl7SkBQf8OVcFmIHaoraIB4rUZfmEqwLwDXVCk1K1Ws1mtQaR5fAk4NVDmpegmDSlqpjP5smsAck2kmrBhEPdtAqCb9NZA5r0TxtErDrOK5uIPVuwwnNQ6bCx/Fp78sxxruFHywtkukzDJAVIizddpwoVrduV/KRghbdjRIWsDykjOtWqKGm2QOuhhfq+k+oE1Y0B49SKwXWMK6hsbUgslllQ8yCzlEnVY1wVmUXZABtQs8wrch1j0YPk1NtgUtGD1EsUPa5jlFwvAjF03eh0XMxM0LNWN2EApRNTc9zeSZUxNUE/5jrGRyyukL2HOxeXu6jG5OS6AMhdNLkYG7sXRW9O8mIuQoMau6B0IX/hMbTUH9AATKazO/QVS0wUZvMHVwKDDS6cZvN3rgW+LmEzrOx62BUVJVGBsXI0ZfB0bnlY59r/K6ulE7PV6/exWqT7uZuHi848PkbNXB86V9DgGL2RGS2FLgUPM7iBi0wP6gfUotsoKtakfTP69zFWb0YjLELQQHmYfr+/LxOrxQK1wiXlPiUTrx9Qe2pBGIzSqxEaJzIL1e+F832W30bMP4BFGY1kQjP5LCFqDuj1cveL6x1vp/0DLDrMNzStkSdEZvFM85EduZnxtygJyokk+faQQtEEauGaNE1pxCwYUExpPA/eUFCrGEFrwGdgCPWBNgNEWRm2CEAFQaAFqHRAkjIyDTtLrEcDwA5YJJPN2g07ORza4A6XEAfKpR8fJm1J8+0MRHg0QJ0IWdvPXL7qn64V3myjv+No8HRZSKWHvp0USP3RABYV4rbvny77wnHSuYZqDlwf2OxJ9PNxgVrqw4v4XrXg02HXpIMnXWf5dJktQfPZKfSF5WXJb2RhYUjtJze/z/NaHQLgvku4d7D8ze4BNITJNuQLoLZGs034joFZh9UW4iwChhAz8WQ8OAfoPxRAXQ/+CJnHFVZvdvsysE1AJ1kJgJbCuwbUfajsoSvbFFfsagYRIEQQA0BfcAZvdMe+ESk+FGAR2wMPgTEwCAPHIAL3oLGE7oRTLOLVDyYBt3QWo617imEkisEY387cPfehAANsQBBiEgPcxyupVCoSwXfDywP3WPjSOcUAb5Y4C4wBQdbKO4fKirFSXoNXJyIRuJOi+3jroQDY47B/QQwWZHx5dlZ215RLN3C+bXzc/D6sZ/EYEOT4+PKYkOM1cAVfdOa3Xm5+j9WTQL815o005uI/8AQmzsDJA6X56dFnbsEBlzGCg2k+H82/Nf+xMe8OPofNb39ylxBf9jaO4FXlMjuA5bMEN2ckDC4uw6yONn7/wp2mebm39A7mu3bBWWPT54Sk75b2XnKnf83Cwl+k1MzvsrhbzAAAAABJRU5ErkJggg==' />
                  <img class='w-20' src='data:image/png;base64,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' />
                  <img class='w-20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEgAAABICAMAAABiM0N1AAAABGdBTUEAALGPC/xhBQAAAAFzUkdCAK7OHOkAAABmUExURUdwTMB6EuGhHrVnCbJiBtqYG+qqHNaVHbtoBOCkJemnGLxzDb9yDOObB/a7JteOB+2sFuKaCaRTBvrJP/7INf/NPfm/J//SR/W4HfvEL//VUvGxFOihBu2qDOGXBP/XXtiLBMx8A8a+HBQAAAAUdFJOUwBmVcbrKndB/RWagqP03s7F4vzAIdJpyQAABH1JREFUWMO1l4lygzgMhsthzoQkrQHfMe//kivJhkCSdiewq3Z6DPHnX4dl8fX1P1udFmX9H3DKH6XUT3OYVXbjHU39HNPFrlzdox1iFWJcQMQq93HSjit1V6NaaF26L0ASIqSk0wPvlRoBqJo9ib8OPUhRo6+80doYwfnQ7AqQHAlkq6mqJg0YfSv3ODZwzL3q7SSHyXAuzHTaIagRkjzrhfMDF/Dt3HlHsOuL4Agaha8qb4U2Tsued+zjWrxoVKT6wXrvjLUWUjf2w8eS2E1D0hRmfaQfaL3UH4PKM1TPuq7V2PPBXj52LT2HMlw4gNH+8nn6C7cBgVfCTtmOMmoMgoJvECMOHJ+xHefjEkEYaPBKWOPzPWef3QgECUcKFJGf8mRXBzlbLaTkEigWMVXe7mtpDkBCaG0BAmf2O9vZ0xpjAWIC5Ps7S3Z2WYg1gtyElLzd36xLDJGIpORrvxVGiwGzhVEu93PqxgoAUfVMOdsPgqMvBinlgEk7AkrPIEjyUNDZgSu20QNweihHfQjErqinx9NxDJRq4oyHQXCBcDj54dS7/SDWBUERdDowg5AgdRRUX6NnAJIIOhrq30CsTAuylNX/VkQkKLrmNyBWNF0Hh0eidT9Nwf44HkuIXkCsuFHF99SDYSMuu+a3M53aIYJeFJVXaL9EQb10/cJmXcN+82wJ0RZU3OgRTW6zIUp2xfucrWINlT3PRHVx3nLuCwoGufpNb3wPqpst574WxYfrS6QKG8JJnhGIrqG6dVYQ5+HYIuktqVmDsLADqPXEeXEsgoDUlU/Xh50TjIIQhL0/mYwY5nxtbIy5e9ZUX/QaBK22AlCJk0CMnNokbQYRiW0nPuzWPHCwHeXpV32KjvW0bEaN8xxHHDhO11XuytD2QRJ5pmkGIccelThGKZGEFU77Sl1sJj6B/Rp3IBDcRixzmtzlUdK4QKIeFISSVvP8GkT3GoDaaU7AuIAWMYTpyQEpVpJgnAk3EXHwzs7KPAjitGirZObMDjyiRHMRLpMEMq7KZkHkWoD1K0owGUDnxbeEQHTL0ojlq3wjaGN8jaEF53QDCte1QEH4XhQFrTUtCIQgReKkILRbgpS4CAqCnDMOazHkjK/WP5QgYwgc65L1yIe+4QOYtCDyMWZPgMiQg4wQGhONL7cggc/xIXkIHPkrIjJwU3Dg8YbRRFCwmD25dmQN2VAMDL+n7RAaQHJeH1TwLYEYQpP/RIF4rkb6MIQKISKnj+7wVUwDghiBEjHOV8nq8BviiHBOwmlcKGI2rRcIUQgzrUf68gaCtHhImjFPjA2FMH7Kkqc3h6goxGmJaCDYmWBNhCAFMfmJPb85oCS9bAwL57Vh/aIjQpBS5aenV4PCG1o47+fiioeAmRAgSEHMy6tBOj12cp6+0IwjJP2ezXuEACVr30wldTZ5Hz8SLPwbuAj2j+dVhZRf3lNYlldkORn9GYnxKyLgA9kp+eNtpy6Ttm2TJCnB0iRpT6csm5FVThtk2alNSvbpSFjXDJFtGzZIS/Yn4h8gCODzqyrhSQAAAABJRU5ErkJggg==' />
                </div>
              </p>
              <p class="lesson-tip"><span>Tip:</span> Swipe up to view the next slide</p>
            </div>
          </ReflexElement>
        </div>
      case 2:
        return <div id="lesson-page" style={{ height: "100%" }}>
          <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
            {ReactHtmlParser(slide.html_content)}
          </ReflexElement>
        </div>
      case 3:
        return <div id="lesson-page" style={{ height: "100%" }}>
          <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
            <div class='container'>
              <h2 class='lesson-title encouraging mb-4'>Awesome!</h2>
              <img class='w-20' src='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAEAAAABACAMAAAHqsLF6AAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAGSUExURQAAAPjCK8OtX/iwJvinI/i5L/rhaO3t7d93F4ZtHON7GfekIv3vseB3F25dQOF5GfrfW/i3KPrEVP3vvVM0AauQOdt7G825ZfCZH/zsnfLy8vzsovzjouN7F7mvn996F/rdUfvXgvvpjY12U1c4BeaAGvzqkrmkf/bXaN3a1ff39+2SHt96GZR/XLaUP+mMHfvnhPegIOWGHPORHfi8KviqJHFTGPrSW492PvTcffnYNeN6F3xtU/CMG+G2Uvvle/z8/NfOv8mtTPribczGu5qOevzdmt93F////+GBGfnEP/m7PMnBs+vq6qmagP3nrfvaj/rgYdt1GdrEb++9SfvYdf3uqPreVph9MfitJd93F/3uxfnJLq+gi/zrl7yfUPzilGE+B41sKN99Gf7vzeB4F4NnP/vNakwxAvaXHvrcSPvoifvfhv3st/i0Jm5GAfnQMeuGG3pYK0IqAzUgAPraPuF5GeLKWd9vH+fn5vrRTP3qvmRIFWNQMd96GvrjdOF5F25NIfacIN9/H+B7Gc6qNkcwT4YAAACFdFJOUwD/////////gP/f//+P/4D///////9A////////7/9g////////////////cP//////////////////r///////////////IP/P//////////9Q/////////0D//////////4D/r/////////////////////+//xD//////zD/z///EJ+yNk40AAAACXBIWXMAAA7DAAAOwwHHb6hkAAAI3UlEQVRIS51XDVvayBaOJqA2KwUKbVRUlMRFqYUAQeUWURS1oCi1CnHVFncrX5o2fFUkLZKr//uemUSLXbbb576P1kzmnHfOTM55z5ToAtV61uLhL10+HZkpMwQRLCjRjttCEH31dNtcDxKE1JzbmmuSBBFg4WE5AtYBgRTQ3wdMtp49a6GHi5nT0+kpguAzFV9/J+MhqLBzbc0Z5oni69GtrYGaTBAiPDQFZM2TJFocw0+TJKne6qNJ0jF2CBgbc1Bo7JfW2tml8nT5fX/7gDyCwPvCBadxrd1vdn4JB1XYQTBeq2Zjxli2VjNZigQxTt0151mE+dkgfQUkV0XB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' />
            </div>
          </ReflexElement>
        </div>

      case 4: return <div id="lesson-page" style={{ height: "100%" }}>
        <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
          <div class='container'>
            <h2 class='lesson-title font-weight-normal mb-5'>First of all,...</h2>
            <p class='lesson-instructions mb-5'>coding uses some funny characters</p>
            <p class='lesson-instructions mb-5'>Example:</p>
            <div class='direction-arrow-blog'>
              <div class='inline-arrows' style={{ top: '-30%' }}>
                <div class='direction-arrow-left'>
                  <div class=' arrow-left'>➞</div>
                </div>
                <div class='direction-arrow-right'>
                  <div class=' arrow-right'>➞</div>
                </div>
              </div>
              <div class='h1-content-area'> <h1></h1>
              </div>
            </div>
            <div class='bounce-arrow'>
              <img class='swiper-lazy' src={require('../img/down-scroll.png')} alt='' />
            </div>
          </div>
        </ReflexElement>
      </div>
      case 5: return <div id="lesson-page" style={{ height: "100%" }}>
        <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
          <div class='container'>
            <h2 class='lesson-title encouraging mb-5'>QUICK KEYS</h2>
            <p class='lesson-instructions mt-2'>We added them </p>
            <p class='lesson-instructions'>to your keyboard</p>
            <div class='direction-arrow-blog'>
              <div class='inline-arrows'>
                <div class='direction-arrow-left'>
                  <div class=' arrow-left'>&#10142; </div>
                </div>
                <div class='direction-arrow-right'>
                  <div class=' arrow-right'>&#10142;\t</div>
                </div>                            </div>
              <img style={{ maxWidth: '300px', marginTop: '2em' }} class='swiper-lazy' src={require('../img/lessons/new-keyboard.png')} alt='' />
            </div>
            <p class='lesson-instructions mt-3'>to make it easier for you.</p>
          </div>
        </ReflexElement>
      </div>

      case 6: return <div id="lesson-page" style={{ height: "100%" }}>
        <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
          <div class='container'>
            <h2 class='lesson-title font-weight-normal mt-5' style={{ textTransform: 'none' }}>You are<br /> learning</h2>
            <h2 class='lesson-title mb-5'>HTML</h2>
            <div>
              <img class='w-15 swiper-lazy' src={require('../img/emoji/thinking-face_1f914.png')} alt='' />
            </div>
          </div>
        </ReflexElement>
      </div>

      case 7: return <div id="lesson-page" style={{ height: "100%" }}>
        <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
          <div class='container'>
            <h2 class='lesson-title blue'>HTML</h2>
            <p class='lesson-instructions fs-16 mb-4'>HyperText Markup Language.</p>
            <img src={require('../img/lessons/P001-L00-M-V001-HTML-skeleton.jpg?00')} class='swiper-lazy mb-4' style={{ maxHeight: '40vh' }} />
            <div class='swiper-lazy-preloader'></div>
            <h3 class='lesson-title font-weight-normal mt-4'>HTML is the website <span class='yellow'>STRUCTURE</span><br />
              <small>(SKELETON)</small>
            </h3>
          </div>
        </ReflexElement>
      </div>

      case 8: return <div id="lesson-page" style={{ height: "100%" }}>
        <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
          <div class='container'>
            <h3 class='lesson-title font-weight-normal mb-5'>It works like this:</h3>
            <img src={require('../img/lessons/bold-tags.png')} class='swiper-lazy mb-4' style={{ maxWidth: '70vw' }} />
            <div class='swiper-lazy-preloader'></div>
          </div>
        </ReflexElement>
      </div>

      case 9: return <div id="lesson-page" style={{ height: "100%" }}>
        <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
          <div class='container'>
            <h2 class='lesson-title font-weight-normal  mb-5' style={{ textTransform: 'none' }}>Ready for a<br /> “Challenge?”</h2>
            <img class='w-30 swiper-lazy' src={require('../img/emoji/boxing-glove.png')} alt='' />
            <img src="data:image/gif;base64,R0lGODlhAQABAIAAAP///wAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" alt="HoC tracking pixel" />
          </div>
        </ReflexElement>
      </div>

      case 10: return <div id="lesson-page" style={{ height: "100%" }}>
        <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide checkpoint cp_yellow`}>

          <div class='container'>
            <h2>Challenge</h2>
            <div style={{ marginTop: '3rem' }}>
              <ol style={{ listStyle: 'none', paddingLeft: 0 }}>
                <li class='task-1'>
                  <p>Type your name between tags.</p>
                </li>
              </ol>
            </div>
            <div style={{ textAlign: 'left' }}>
              <p class='like-this' style={{ paddingLeft: 0 }}>Like this:</p>
            </div>
            <div class='h1-content-area-3'>
              <p align='left' id='attr-type-value' class='m-4' style={{ color: '#f1f1f1', fontSize: '18px' }}>
                <span class='cm-tag'>&lt;h1&gt;</span>your name<span class='cm-tag'>&lt;/h1&gt;</span> </p>
            </div>
          </div>
          <div class='container'>
            <div class='button-locked'>
              <a class='btn btn-primary action check swiper-editor' style={{}}>Let's get Coding <ArrowForwardIcon /> </a> <br />
              <a class='swiper-next skip' style={{}}>Skip this step</a>
            </div>
            <div class='button-unlocked'>
              <a class='btn btn-primary success check swiper-next' style={{}}>I did it <i class='icon-sentiment_satisfied'></i>
              </a> <br />
            </div>
          </div>
          <div class='container'>
            <p class='lesson-tip'>
              <span>Tip:</span> Swipe left to start.  </p>
          </div>

        </ReflexElement>
      </div>

      //     case 11: return <div id="lesson-page" style={{ height: "100%" }}>
      //       <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
      //         <div class='container'>
      //           <h2 class='lesson-title encouraging  mb-5'>GOOD JOB!</h2>
      //           <h3 class='lesson-title font-weight-normal mb-5'>Now we’ll add <br /> some styling with <br />
      //             <span class='pink' style={{ fontWeight: 'bold' }}>CSS</span>.
      // </h3>
      //           <h3 class='lesson-title font-weight-normal mt-5'>Are you ready?</h3>
      //         </div>
      //       </ReflexElement>
      //     </div>


      // case 12: return <div id="lesson-page" style={{ height: "100%" }}>
      //   <ReflexElement flex={1} style={{ height: "100%" }} className={`swiper-slide`}>
      //     <div class='container'>
      //       <h2 class='lesson-title pink '>CSS</h2>
      //       <p class='lesson-instructions fs-16 mb-4'>Cascading Style Sheets</p>
      //       <div style={{ position: 'relative' }}>
      //         <p class='lesson-instructions pink' style={{ position: 'absolute', top: '53%', left: '10%' }}>style='...'</p>
      //         <img src={require('../img/lessons/css-girl.png')} class='swiper-lazy mb-2' style={{ maxHeight: '50vh' }} />
      //       </div>
      //       <div class='swiper-lazy-preloader'></div>
      //       <h3 class='lesson-title font-weight-normal mt-2'>
      //         <span class=' pink' style={{ marginLeft: '-25%' }}>CSS</span> is the <br />
      //         <span class='yellow' style={{ marginLeft: '25%' }}>STYLE </span>
      //         <small> (BLING)</small>
      //       </h3>
      //     </div>
      //   </ReflexElement>
      // </div>
      default:
        return null;
      // return <div id="lesson-page" style={{ height: "100%" }}>
      //   <ReflexElement flex={1} style={{ height: "100%" }} className={`${slide.css_class} swiper-slide`}>
      //     {ReactHtmlParser(slide.html_content)}
      //   </ReflexElement>
      // </div>;

    }

  }
  render() {
    const {
      title,
      description,
      instructions,
      isUnitCompleted,
      guideUrl,
      tests,
      section,
      showToolPanel,
      videoUrl
    } = this.props;
    if (window.innerWidth < 768) {
      return (
        <ReflexContainer orientation='horizontal' className='instructions-panel is-mobile' role='complementary' tabIndex='-1' >
          <ReactPageScroller
            ref={c => this.reactPageScroller = c}
            animationTimer={200}
            containerWidth="100%"
          >
            {lesson_data.slides.map(this.renderSlide)}
          </ReactPageScroller>
        </ReflexContainer>
      )
    } else {
      return (
        <div>
          <Sliders />
        </div>
      )
    }

  }
}

SidePanel.displayName = 'SidePanel';
SidePanel.propTypes = propTypes;

export default connect(mapStateToProps)(SidePanel);
