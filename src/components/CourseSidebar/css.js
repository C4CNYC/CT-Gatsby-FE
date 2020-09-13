import { css } from "lit-element";

const styles = css`
  #course-sidebar {
    --width: 450px;
    background-color: white;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: var(--width);
    transform: translateX(calc(-1 * var(--width)));
    transition: transform 200ms ease-in;
    will-change: transform;
    z-index: var(--sidebar-layer);
    display: none;
  }
  #course-sidebar.open {
    transform: translateX(0);
  }

  #course-sidebar a {
    color: initial;
    text-decoration: none;
  }

  #sidebar-tracks-container {
    height: calc(100vh - 69px);
    overflow-y: auto;
    overscroll-behavior: contain;
    -webkit-overflow-scrolling: touch;
  }

  #course-sidebar-overlay {
    background-color: #121212;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    opacity: 0;
    transition: opacity 200ms ease-in;
    z-index: var(--overlay-layer);
    transform: scale(0);
    cursor: pointer;
  }
  #course-sidebar-overlay.show {
    transform: scale(1);
    opacity: 0.7;
  }

  @media (max-width: 700px) {
    #course-sidebar {
      --width: 85%;
      transform: translateX(-100%);
    }
  }
`;

export default styles;
