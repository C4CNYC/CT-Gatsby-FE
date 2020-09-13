import "./sidebar-track/index.js";
import "./sidebar-tracks/index.js";
import "./sidebar-footer/index.js";
import styles from "./css.js";
// import sidebarTracksCss from "./sidebar-tracks/css.js";
// import sidebarTrackCss from "./sidebar-track/css.js";
// import sidebarFooterCss from "./sidebar-footer/css.js";
import React from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';

class CourseSidebar extends React.Component {
  state = {
    display: `display: none`,
    sidebarOpen: false,
    errorLoading: false,
  };

  static get properties() {
    return {
      course: { type: String },
      user: { type: Object },
      static: { type: Boolean },
    };
  }

  load() {
    customElements.whenDefined("sidebar-tracks").then(() => {
      this.querySelector("sidebar-tracks").load();
    });
  }

  open() {
    this.display = "display: block";
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.sidebarOpen = true;
        this.requestUpdate();
      });
    });
  }

  close() {
    this.sidebarOpen = false;
    this.querySelector("#course-sidebar").addEventListener(
      "transitionend",
      () => {
        this.display = `display: none`;
        this.requestUpdate();
      },
      { once: true }
    );
  }

  render() {
    return (
      <div
        id="course-sidebar"
        style="${this.display}"
        class="${this.sidebarOpen ? "open" : ""}"
      >
        <div id="sidebar-tracks-container" tooltip-parent>
          <sidebar-tracks
            static="${this.static}"
            course="${this.course}"
          ></sidebar-tracks>
        </div>
        {this.user
          ? <sidebar-footer
                .avatar="${this.user.avatar}"
                .name="${this.user.name}"
                .email="${this.user.email}"
                course="${this.course}"
              ></sidebar-footer>
          : ''}
      </div>
      <div
        id="course-sidebar-overlay"
        @click="${this.close}"
        class="${this.sidebarOpen ? "show" : ""}"
      ></div>
  );
  }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(withStyles(styles)(CourseSidebar));
