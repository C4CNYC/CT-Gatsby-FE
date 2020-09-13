import { LitElement, html } from "lit-element";
import stepService from "Classes/step.service";
import { showToast } from "Helpers/toast.js";

class SidebarFooter extends LitElement {
  createRenderRoot() {
    return this;
  }

  static get properties() {
    return {
      avatar: { type: String },
      name: { type: String },
      email: { type: String },
    };
  }

  replayTutorial() {
    document.querySelector("course-sidebar").close();
    if (!stepService.isChallenge()) {
      showToast("You can only replay the tutorial on a challenge page.");
      return;
    }
    document.dispatchEvent(new Event("replay-tutorial"));
  }

  logout() {
    /* `api-user` cache needs to be cleared because it uses a CacheFirst strategy
     * and it's common that users change accounts when logging out
     */
    try {
      caches.delete("api-user");
    } catch (error) {
      console.log(error);
    }
    window.localStorage.clear();
    window.location.href = "/";
  }

  render() {
    return html`
      <div id="sidebar-footer">
        <div class="sidebar-footer-user-info">
          <img
            src="${this.avatar}"
            alt=""
            width="30"
            height="30"
            class="sidebar-footer-avatar"
          />
          <div>
            <div class="sidebar-footer-name">${this.name}</div>
            <div class="sidebar-footer-email">${this.email}</div>
          </div>
        </div>
        <div class="sidebar-footer-actions">
          <div
            @click="${this.replayTutorial}"
            class="v-center"
            tooltip
            data-gravity="s"
            title="Replay tutorial"
          >
            <img
              src="/assets/tutorial.svg"
              id="sidebar-footer-replay-tutorial"
              width="24"
              height="24"
            />
          </div>
          <button @click="${this.logout}" id="sidebar-footer-logout">
            Logout
          </button>
        </div>
      </div>
    `;
  }
}

window.customElements.define("sidebar-footer", SidebarFooter);
