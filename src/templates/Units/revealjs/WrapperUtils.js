import { render } from "react-dom";
import * as React from "react";
import RevealJsWrapper from "./RevealJsWrapper";

function createRevealJsRequiredHtmlElements() {
  const slidesDiv = document.createElement("div");
  slidesDiv.className = "slides";

  const revealDiv = document.createElement("div");
  revealDiv.className = "reveal";
  revealDiv.appendChild(slidesDiv);
  return { slidesDiv, revealDiv };
}

export const renderSlides = (
    Slides,
    revealConfig = {}
  ) => {
    const { revealDiv, slidesDiv } = createRevealJsRequiredHtmlElements();
    document.body.appendChild(revealDiv);

    render(
      <RevealJsWrapper revealJsConfig={revealConfig} importBaseRevealJsCss={true}>
        <Slides />
      </RevealJsWrapper>,
      slidesDiv
    );
  },
  renderWrappedSlides = (WrappedSlides) => {
    const { revealDiv, slidesDiv } = createRevealJsRequiredHtmlElements();
    document.body.appendChild(revealDiv);
    render(<WrappedSlides />, slidesDiv);
  },
  requireBaseRevealCss = () => {
    // require("reveal.js/css/reset.css");
    require("./reveal.css");

    const printPdf = new URLSearchParams(window.location.search).has(
      "print-pdf"
    );
    if (printPdf) {
      require("reveal.js/css/print/pdf.css");
    }
  },
  requireAndInitializeRevealJs = (revealConfig = {}) => {
    const Reveal = require("reveal.js");
    Reveal.initialize(revealConfig);
  },
  defaultConfig = {
    // Display presentation control arrows
    controls: true,

    // Help the user learn the controls by providing hints, for example by
    // bouncing the down arrow when they first encounter a vertical slide
    controlsTutorial: true,

    // Determines where controls appear, "edges" or "bottom-right"
    controlsLayout: "edges",

    // Visibility rule for backwards navigation arrows; "faded", "hidden"
    // or "visible"
    controlsBackArrows: "faded",

    // Display a presentation progress bar
    progress: true,

    // Display the page number of the current slide
    slideNumber: false,

    // Add the current slide number to the URL hash so that reloading the
    // page/copying the URL will return you to the same slide
    hash: false,

    // Push each slide change to the browser history. Implies `hash: true`
    history: false,

    // Enable keyboard shortcuts for navigation
    keyboard: true,

    // Enable the slide overview mode
    overview: true,

    // Vertical centering of slides
    center: true,

    // Enables touch navigation on devices with touch input
    touch: true,

    // Loop the presentation
    loop: false,

    // Change the presentation direction to be RTL
    rtl: false,

    // See https://github.com/hakimel/reveal.js/#navigation-mode
    navigationMode: "linear",

    // Randomizes the order of slides each time the presentation loads
    shuffle: false,

    // Turns fragments on and off globally
    fragments: true,

    // Flags whether to include the current fragment in the URL,
    // so that reloading brings you to the same fragment position
    fragmentInURL: false,

    // Flags if the presentation is running in an embedded mode,
    // i.e. contained within a limited portion of the screen
    embedded: true,

    // Flags if we should show a help overlay when the questionmark
    // key is pressed
    help: true,

    // Flags if speaker notes should be visible to all viewers
    showNotes: false,

    // Global override for autoplaying embedded media (video/audio/iframe)
    // - null: Media will only autoplay if data-autoplay is present
    // - true: All media will autoplay, regardless of individual setting
    // - false: No media will autoplay, regardless of individual setting
    autoPlayMedia: null,

    // Global override for preloading lazy-loaded iframes
    // - null: Iframes with data-src AND data-preload will be loaded when within
    //   the viewDistance, iframes with only data-src will be loaded when visible
    // - true: All iframes with data-src will be loaded when within the viewDistance
    // - false: All iframes with data-src will be loaded only when visible
    preloadIframes: null,

    // Number of milliseconds between automatically proceeding to the
    // next slide, disabled when set to 0, this value can be overwritten
    // by using a data-autoslide attribute on your slides
    autoSlide: 0,

    // Stop auto-sliding after user input
    autoSlideStoppable: true,

    // Use this method for navigation when auto-sliding
    // autoSlideMethod: Reveal.navigateNext,

    // Specify the average time in seconds that you think you will spend
    // presenting each slide. This is used to show a pacing timer in the
    // speaker view
    defaultTiming: 120,

    // Specify the total time in seconds that is available to
    // present.  If this is set to a nonzero value, the pacing
    // timer will work out the time available for each slide,
    // instead of using the defaultTiming value
    totalTime: 0,

    // Specify the minimum amount of time you want to allot to
    // each slide, if using the totalTime calculation method.  If
    // the automated time allocation causes slide pacing to fall
    // below this threshold, then you will see an alert in the
    // speaker notes window
    minimumTimePerSlide: 0,

    // Enable slide navigation via mouse wheel
    mouseWheel: true,

    // Hide cursor if inactive
    hideInactiveCursor: false,

    // Time before the cursor is hidden (in ms)
    hideCursorTime: 5000,

    // Hides the address bar on mobile devices
    hideAddressBar: true,

    // Opens links in an iframe preview overlay
    // Add `data-preview-link` and `data-preview-link="false"` to customise each link
    // individually
    previewLinks: false,

    // Transition style
    transition: "slide", // none/fade/slide/convex/concave/zoom

    // Transition speed
    transitionSpeed: "default", // default/fast/slow

    // Transition style for full page slide backgrounds
    backgroundTransition: "fade", // none/fade/slide/convex/concave/zoom

    // Number of slides away from the current that are visible
    viewDistance: 3,

    // Number of slides away from the current that are visible on mobile
    // devices. It is advisable to set this to a lower number than
    // viewDistance in order to save resources.
    mobileViewDistance: 2,

    // Parallax background image
    parallaxBackgroundImage: "", // e.g. "'https://s3.amazonaws.com/hakim-static/reveal-js/reveal-parallax-1.jpg'"

    // Parallax background size
    parallaxBackgroundSize: "", // CSS syntax, e.g. "2100px 900px"

    // Number of pixels to move the parallax background per slide
    // - Calculated automatically unless specified
    // - Set to 0 to disable movement along an axis
    parallaxBackgroundHorizontal: null,
    parallaxBackgroundVertical: null,

    // The display mode that will be used to show slides
    display: "block"
  };
