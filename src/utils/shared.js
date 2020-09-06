import { forceCheck } from "react-lazyload";
import { navigatorPositionChange } from '../state';
import { navigateTo } from 'gatsby-link';

export function featureNavigator(e) {
  e && e.preventDefault();

  // todo tmp
  navigateTo("/");
  return;

  if (this.props.navigatorPosition === "is-aside") {
    if (this.props.isWideScreen) {
      this.props.navigatorPositionChange("moving-featured");

      setTimeout(() => {
        this.props.navigatorPositionChange("resizing-featured");
        setTimeout(() => {
          this.props.navigatorPositionChange("is-featured");
          this.props.navigatorShapeChange("open");

          // uncomment following lines if you want to count featuring Navigator as a visit
          // to index page ('/'), you have to also uncomment import { navigateTo }...
          /*
          setTimeout(() => {
            navigateTo("/");
          }, 1000);
          */
        });
      }, 300);
    } else {
      setTimeout(() => {
        this.props.navigatorPositionChange("is-featured");
      }, 0);
    }
  }
}

export function moveNavigatorAside(e) {
  const target = e ? e.currentTarget : null;
  const dataShape = target ? target.getAttribute("data-shape") : null;
  const navigatorShape = dataShape ? dataShape : "open";

  if (this.props.navigatorPosition === "is-featured") {
    if (this.props.isWideScreen) {
      this.props.navigatorPositionChange("moving-aside");

      setTimeout(() => {
        if (typeof window !== `undefined`) {
          if (window.location.pathname !== "/") {
            this.props.navigatorPositionChange("resizing-aside");
            this.props.navigatorShapeChange(navigatorShape);
            setTimeout(() => {
              this.props.navigatorPositionChange("is-aside");
              setTimeout(forceCheck, 600);
            });
          }
        }
      }, 1000);
    } else {
      setTimeout(() => {
        this.props.navigatorPositionChange("is-aside");
      }, 100);
    }
  }
}
