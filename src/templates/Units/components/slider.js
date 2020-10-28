import React, {Component} from 'react'
import './side-panel.css';
import * as Auth from './authmanager.js'
import * as slider from './slider_program.js';
import image1 from './img/slide1.png';
import image2 from './img/slide2.png';
import image3 from './img/slide3.png';
import image4 from './img/slide4.png';
import image5 from './img/slide5.png';
import image6 from './img/slide6.png';
import image7 from './img/slide7.png';
import image8 from './img/slide8.png';
import image9 from './img/slide9.png';
import image10 from './img/slide10.png';
import image11 from './img/slide11.png';
import image12 from './img/slide12.png';
import image13 from './img/slide13.png';
import image14 from './img/slide14.png';
import image15 from './img/slide15.png';
import image16 from './img/slide16.png';


export class sliders extends Component{
  componentDidMount(){
    slider.slider_changed();    
  }  
  render(){
    return (
      <div>
<div
  id="slider"
  maxsize="1.7976931348623157e+308"
  orientation="horizontal"
  minsize={1}
  events="[object Object]"
  flex="0.5"
  index={0}
>
  <div className="slider-card challange" data-validation-id={1}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">step 1 of 2</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check0" />
      <div className="execerpt-content">
        Hi.... 👋
        <br />
        <span>
          Type <xmp>&lt;h1&gt;</xmp> in the editor below
        </span>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn0">
        Skip this →
      </div>
      <div className="row bottom-description">
        DESCRIPTION: Add{" "}
        <strong>
          <xmp className="plain-text">&lt;h1&gt;</xmp>
        </strong>
      </div>
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image1} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image2} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image3} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image4} />
    </div>
  </div>
  <div className="slider-card challange" data-validation-id={2}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">step 2 of 2</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check5" />
      <div className="execerpt-content">
        Type <strong>your name</strong> and a{" "}
        <xmp className="plain-text">&lt;h1&gt;</xmp> closing tag.
        <br />
        <xmp>&lt;h1&gt; Joey Green &lt;/h1&gt;</xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn5">
        Skip this →
      </div>
      <div className="row bottom-description">
        TIP: Notice the closing tag has / in it.
      </div>
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image5} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image6} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image7} />
    </div>
  </div>
  <div className="slider-card challange" data-validation-id={3}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">step 1 of 3</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check9" />
      <div className="execerpt-content">
        Add a <xmp className="plain-text">&lt;body&gt;</xmp> tag.
        <br />
        <xmp>&lt;body&gt; &lt;h1&gt; Joey Green &lt;/h1&gt;</xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn9">
        Skip this →
      </div>
      <div className="row bottom-description">
        TIP: <xmp className="plain-text">&lt;body&gt;</xmp> Needs to be on top,
        so push the <xmp className="plain-text">&lt;h1&gt;</xmp> down to line 2.
      </div>
    </div>
  </div>
  <div className="slider-card challange" data-validation-id={4}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">step 2 of 3</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check10" />
      <div className="execerpt-content">
        Add a <xmp className="plain-text">style=""</xmp> inside the{" "}
        <xmp className="plain-text">&lt;body&gt;</xmp> tag.
        <br />
        Before the <xmp className="plain-text">&gt;</xmp> symbol.
        <br />
        <xmp>&lt;body style=" "&gt; &lt;h1&gt; Joey Green &lt;/h1&gt;</xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn10">
        Skip this →
      </div>
      <div className="row bottom-description">
        TIP: No spaces between style, = &amp; " .
      </div>
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image8} />
    </div>
  </div>
  <div className="slider-card challange" data-validation-id={5}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">step 3 of 3</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check12" />
      <div className="execerpt-content">
        Add a <xmp className="plain-text">background: pink;</xmp> inside the
        "quotes". Before the <xmp className="plain-text">&gt;</xmp> symbol.
        <br />
        <xmp>
          &lt;body style="background: pink;"&gt; &lt;h1&gt; Joey Green
          &lt;/h1&gt;
        </xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn12">
        Skip this →
      </div>
      <div className="row bottom-description">
        TIP: There's a colon (:) and a semicolon (;) at the end.
      </div>
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image9} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image10} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image11} />
    </div>
  </div>
  <div className="slider-card challange" data-validation-id={6}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">step 3 of 3</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check16" />
      <div className="execerpt-content">
        Change <xmp className="plain-text">pink</xmp> to red or any other color
        you like.
        <br />
        <xmp>
          &lt;body style="backgorund: red;"&gt; &lt;h1&gt; Joey Green
          &lt;/h1&gt;
        </xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn16">
        Skip this →
      </div>
      <div className="row bottom-description">
        TIP: There's a colon (:) and a semicolon (;) at the end.
      </div>
    </div>
  </div>
  <div className="slider-card img-button">
    <div className="row">
      <img />
    </div>
    <div className="row" />
    <div className="img-button-row">
      <h2 className="c-header">great work!</h2>
    </div>
    <div className="img-button-row">
      <h2 className="c-sub-header">
        Click below to download your Hour of Code certificate
      </h2>
    </div>
    <div className="img-button-row">
      <div className="c-button">
        <a href="#">Get Certificate 😎</a>
      </div>
    </div>
  </div>
  <div className="slider-card img-button">
    <div className="row">
      <img />
    </div>
    <div className="row" />
    <div className="img-button-row">
      <h2 className="c-sub-header normal-text">What would you like to do?</h2>
    </div>
    <div className="img-button-row">
      <br />
    </div>
    <div className="img-button-row">
      <div className="c-button">
        <a href="#">advanced bonus section</a>
      </div>
    </div>
    <div className="img-button-row">
      <div className="c-button">
        <a href="#">start project 1</a>
      </div>
    </div>
    <div className="img-button-row">
      <div className="c-button">
        <a href="#">project page</a>
      </div>
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image12} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image13} />
    </div>
  </div>
  <div className="slider-card challange pest" data-validation-id={7}>
    <div className="row">
      <h2>CHALLANGE</h2>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check21" />
      <div className="execerpt-content">
        Insert this inside the <xmp className="plain-text">&lt;h1&gt;</xmp> tag:
        <br />
        <xmp className="plain-text">style="font-size: 100px;"</xmp>
        <br />
        <xmp>
          &lt;body style="background: pink;"&gt; &lt;h1 style="font-size:
          100px;"&gt; Joey Green &lt;/h1&gt;
        </xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn21">
        Skip this →
      </div>
      <div className="row bottom-description">
        <strong>This section of code:</strong> Increases the size of the text.
      </div>
      <div className="row top-label">bonus: 1 of 3</div>
    </div>
  </div>
  <div className="slider-card challange pest" data-validation-id={8}>
    <div className="row">
      <h2>CHALLANGE</h2>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check22" />
      <div className="execerpt-content">
        Add this style to change text color:
        <br />{" "}
        <xmp className="plain-text">color: blue; style="font-size: 100px;"</xmp>
        <br />
        <xmp>
          &lt;body style="background: pink;"&gt; &lt;h1 style="font-size 100px;
          color: blue;"&gt; Joey Green &lt;/h1&gt;
        </xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn22">
        Skip this →
      </div>
      <div className="row bottom-description">
        <span style={{ color: "red" }}>TIP: </span>Keep they styling between the
        "quotes".
      </div>
      <div className="row top-label">bonus: 2 of 3</div>
    </div>
  </div>
  <div className="slider-card challange pest" data-validation-id={9}>
    <div className="row">
      <h2>CHALLANGE</h2>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check23" />
      <div className="execerpt-content">
        Finally, center your text with this:
        <br /> <xmp className="plain-text">text-align: center;</xmp>
        <br />
        <xmp>
          &lt;body style="background: pink;"&gt; &lt;h1 style="font-size: 100px;
          color: blue; text-align: center;"&gt; Joey Green &lt;/h1&gt;
        </xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn23">
        Skip this →
      </div>
      <div className="row bottom-description">
        <span style={{ color: "red" }}>TIP: </span>Keep they styling between the
        "quotes".
      </div>
      <div className="row top-label">bonus: 3 of 3</div>
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image14} />
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image15} />
    </div>
  </div>
  <div className="slider-card challange pest" data-validation-id={10}>
    <div className="row">
      <h2>CHALLANGE</h2>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check26" />
      <div className="execerpt-content">
        Replace the background color from "red" to linear-gradient()
        <br />
        <xmp>&lt;body style="background: linear-gradient();"&gt;</xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn26">
        Skip this →
      </div>
      <div className="row bottom-description">
        <strong>This section of code: </strong>Creates a beautiful mixture of
        colors.
      </div>
      <div className="row top-label">bonus: 1 of 2</div>
    </div>
  </div>
  <div className="slider-card challange pest" data-validation-id={11}>
    <div className="row">
      <h2>CHALLANGE</h2>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check27" />
      <div className="execerpt-content">
        Insert a cool diagonal separation(
        <span style={{ color: "blue" }}>110deg,</span>) and some
        <br />
        beautiful colors:
        <br />
        <span style={{ color: "blue" }}>yellow 40%, pink 40% </span>
        linear-gardient()
        <xmp>
          &lt;body style="background: linear-gradient(110 deg, yellow 40%, pink
          40%);"&gt;
        </xmp>
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn27">
        Skip this →
      </div>
      <div className="row bottom-description">
        Don't add any spaces unless shown.
      </div>
      <div className="row top-label">bonus: 2 of 2</div>
    </div>
  </div>
  <div className="slider-card img">
    <div>
      <img src={image16} />
    </div>
  </div>
  <div className="slider-card challange" data-validation-id={12}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">play: 1 of 2</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check29" />
      <div className="execerpt-content">
        Try changing <xmp className="plain-text">110 deg</xmp> to 90 or 0.
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn29">
        Skip this →
      </div>
      <div className="row bottom-description" />
    </div>
  </div>
  <div className="slider-card challange" data-validation-id={13}>
    <div className="row header">
      <h2>CHALLANGE</h2>
      <div className="row top-label">play: 2 of 2</div>
      <hr />
    </div>
    <div className="row excerpt">
      <div className="check" id="check30" />
      <div className="execerpt-content">
        Try playing with the colors of the linear-gradient.
      </div>
    </div>
    <div className="row">
      <hr />
    </div>
    <div className="row">
      <div className="success-next-button" id="btn30">
        Skip this →
      </div>
      <div className="row bottom-description" />
    </div>
  </div>
  <div className="slider-card img-button">
    <div className="row">
      <img />
    </div>
    <div className="row" />
    <div className="img-button-row">
      <h2 className="c-sub-header normal-text">What would you like to do?</h2>
    </div>
    <div className="img-button-row">
      <br />
    </div>
    <div className="img-button-row">
      <div className="c-button">
        <a href="#">share to gallery</a>
      </div>
    </div>
    <div className="img-button-row">
      <div className="c-button">
        <a href="#">start project 1</a>
      </div>
    </div>
  </div>
</div>


      <div className="pagination-holder">
          <div id="previous" className="pagi-item" onClick={()=>{
              slider.previous();
              Auth.save_slide_number(slider.get_current_slide_number())
          }}/>
          <div id="slide-count" className="pagi-item">
            Slide 1 of 32
          </div>
          <div id="next" className="pagi-item" onClick={()=>{
              slider.next();
              Auth.save_slide_number(slider.get_current_slide_number());
          }}>
            Start slider
          </div>
        </div>  
      </div>
      
    )
  }
}


export default sliders;