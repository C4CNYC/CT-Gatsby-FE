import { LitElement, html } from "lit-element";
import API from "Classes/backend";
import stepService from "Classes/step.service";
import React from 'react';

class CourseSidebarTracks extends React.Component {


  constructor() {
    super();
    this.loadingState = "loading";
  }

  static get properties() {
    return {
      course: { type: String },
      static: { type: Boolean },
    };
  }

  openCurrentTrack(track, current_id) {
    // if we can find the current_id in the track_steps
    // then open this track
    if (track.track_steps) {
      const found = track.track_steps.find((track) => track.id === current_id);
      if (found) {
        return true;
      }
    }

    return false;
  }

  load() {
    API.get("tracks", { requiresLogin: false }).then((response) => {
      if (!response) {
        this.loadingState = "error";
        this.requestUpdate();
        return false;
      }
      const { tracks, user_progress, has_paid } = response;
      this.tracks = tracks;
      /* needed for sorting */
      this.original_tracks = tracks;
      this.user_progress = user_progress;
      this.has_paid = has_paid;

      this.loadingState = "done";
      this.requestUpdate();
    });
  }

  firstUpdated() {
    document.addEventListener("sidebar-tracks:update-step", (event) => {
      this.requestUpdate();
      this.querySelectorAll("sidebar-track").forEach((element) => {
        element.requestUpdate();
      });
    });
  }

  updated() {
    this.updateComplete.then(() => {
      const openTrack = this.querySelector(".course-track-open");
      if (openTrack) {
        requestAnimationFrame(() => {
          openTrack.scrollIntoView();
        });
      }
    });
  }

  search(event) {
    const term = event.currentTarget.value.toLowerCase();
    if (!term.length) {
      this.removeAttribute("searchmode");
    } else {
      this.setAttribute("searchmode", "");
    }
    /* Quick way to make a deep copy */
    this.tracks = JSON.parse(JSON.stringify(this.original_tracks));
    this.tracks = this.tracks.map((track) => {
      track.track_steps = track.track_steps.filter((track_step) => {
        return track_step.step.title.toLowerCase().includes(term);
      });
      return track;
    });
    this.requestUpdate();
  }

  render() {
    if (this.loadingState === "error") {
      return html`
        <div class="sidebar-tracks-error">
          There was a problem loading the chapters. Please reload the page and
          try again.
        </div>
      `;
    }
    if (this.loadingState === "loading") {
      return html`
        <div id="sidebar-tracks-loader">
          <circle-spinner dark></circle-spinner>
        </div>
      `;
    }

    const current_id = stepService.getStepId();

    return html`
      <div>
        <!-- don't make it type="search" for Safari -->
        <input
          type="text"
          id="sidebar-tracks-search"
          @input="${this.search}"
          placeholder="Search lessons & challenges"
          autocomplete="off"
          autocorrect="off"
          autocapitalize="off"
          spellcheck="false"
        />
      </div>
      <div id="sidebar-tracks-start">
        ${this.tracks.map((track) => {
          const is_open = this.openCurrentTrack(track, current_id);

          return html`
            <sidebar-track
              .track="${track}"
              .progress="${this.user_progress}"
              ?has_paid="${this.has_paid}"
              ?is_open="${is_open}"
              ?is_latest="${this.is_latest}"
              ?static="${this.static}"
              course="${this.course}"
            ></sidebar-track>
          `;
        })}
        ${this.tracks_coming_soon && this.tracks_coming_soon.length > 0
          ? html`${this.tracks_coming_soon.map((track) => {
              return html`<div
                class="course-track-item course-track-clickable mdc-ripple-surface"
                style="cursor: default;font-weight:normal"
              >
                ${track.name}
                <small style="color:#555">Expected ${track.date}</small>
              </div>`;
            })}`
          : ""}
        ${["react", "programming"].includes(this.course)
          ? html`
              <div
                class="course-track-item course-track-clickable mdc-ripple-surface"
                style="cursor: default;font-style:italic;font-weight:normal"
              >
                More chapters coming very soon 🚀
              </div>
            `
          : ""}
      </div>
    `;
  }
}

window.customElements.define("sidebar-tracks", SidebarTracks);
