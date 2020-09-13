import { LitElement, html } from "lit-element";
import { classMap } from "lit-html/directives/class-map.js";
import { setupTooltips } from "Helpers/setup-tooltips";
import stepService from "Classes/step.service";
import AppHistory from "Classes/app-history";

class SidebarTrack extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      course: { type: String },
      track: { type: Object },
      progress: { type: Object },
      has_paid: { type: Boolean },
      is_open: { type: Boolean },
      is_latest: { type: Boolean },
      static: { type: Boolean },
    };
  }

  firstUpdated() {
    setupTooltips();
    document.addEventListener("sidebar-track:complete-step", (event) => {
      this.markStepCompleted(event.detail.step_id);
    });
  }

  markStepCompleted(step_id) {
    if (!step_id) {
      return;
    }
    this.progress.push(step_id);
    this.requestUpdate();
  }

  _getIcon() {
    if (!this.track.track_steps) {
      return html`
        <div
          class="course-track-locked"
          tooltip
          data-gravity="s"
          title="Complete current chapter to unlock"
        ></div>
      `;
    }
    if (!this.track.is_free && !this.has_paid) {
      return html`
        <div
          class="course-track-money"
          tooltip
          data-gravity="e"
          title="Upgrade to unlock. Click to preview content."
        ></div>
      `;
    }
    return html` <div class="course-track-arrow"></div> `;
  }
  _getClickable() {
    if (!this.track.track_steps) {
      return false;
    }
    if (!this.track.is_free && !this.has_paid) {
      return false;
    }
    return true;
  }

  _getIsLatest() {
    const last = this.progress[this.progress.length - 1];
    if (
      last &&
      this.track.track_steps &&
      this.track.track_steps.find((track) => track.id === last)
    ) {
      return true;
    }
    return false;
  }

  _goToStep(event) {
    event.preventDefault();
    const href = event.currentTarget.getAttribute("href");
    if (!href) {
      return;
    }

    if (this.static) {
      // then we're most likely in the payment page, so open in a new tab
      window.open(href);
    } else {
      AppHistory.pushState(href);
    }

    document.querySelector("course-sidebar").close();
  }

  _getTrackSteps() {
    if (!this.track.track_steps) {
      return html``;
    }

    const current_id = stepService.getStepId();

    return html`
      ${this.track.track_steps.map((track_step) => {
        const completed = this.progress.includes(track_step.id);
        return html`
          <a
            href="${completed ? `app.html?id=${track_step.id}` : ""}"
            @click="${this._goToStep}"
          >
            <div
              class="${classMap({
                "course-track-step": true,
                "course-track-completed": completed,
                "course-track-current": current_id === track_step.id,
              })}"
            >
              <div
                class="${classMap({
                  "course-track-learn": track_step.step_type === "App\\Lesson",
                  "course-track-practice":
                    track_step.step_type === "App\\Challenge",
                  "course-track-fill":
                    track_step.step_type === "App\\FillInBlank",
                })}"
              ></div>
              ${track_step.step.title}
            </div></a
          >
        `;
      })}
    `;
  }

  _toggleOpen() {
    this.is_open = !this.is_open;
    this.requestUpdate();
  }

  render() {
    let clickable = this._getClickable();
    const is_latest = this._getIsLatest();

    return html`
      <div
        class="${classMap({
          "track-container": true,
          "course-track-open": this.is_open,
        })}"
      >
        <div
        @click="${this._toggleOpen}"
          class="${classMap({
            "course-track-item": true,
            "course-track-clickable": clickable,
            "course-track-latest": is_latest,
            "mdc-ripple-surface": clickable,
          })}"
        >
          <div>
            <span>${this.track.position}</span>.
            <span class="title">${this.track.title}</span>
          </div>
          ${this._getIcon()}
        </div>
        <div class="course-track-steps-container">
            ${this._getTrackSteps()}
          </div>
        </div>
      </div>
    `;
  }
}

window.customElements.define("sidebar-track", SidebarTrack);
