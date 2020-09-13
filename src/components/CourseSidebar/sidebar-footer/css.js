import { css } from "lit-element";

const styles = css`
  #sidebar-footer {
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;
    padding: 15px 15px 15px 30px;
    border-top: 1px solid #e7e7e7;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: white;
  }

  #sidebar-footer-logout {
    color: #25272a;
    font-weight: 600;
    background-color: transparent;
    border: 0;
    font-family: var(--font-family);
    font-size: 14px;
    cursor: pointer;
    margin-left: 10px;
  }

  .sidebar-footer-user-info {
    display: flex;
    align-items: center;
  }

  .sidebar-footer-avatar {
    border-radius: 50%;
    margin-right: 15px;
  }

  .sidebar-footer-name,
  .sidebar-footer-email {
    color: #777b81;
  }
  .sidebar-footer-name {
    font-weight: 700;
  }
  .sidebar-footer-actions {
    display: flex;
    align-items: center;
  }

  #sidebar-footer-replay-tutorial {
    cursor: pointer;
    opacity: 0.8;
    transition: opacity 200ms, transform 200ms;
  }
  #sidebar-footer-replay-tutorial:hover {
    opacity: 1;
  }
  #sidebar-footer-replay-tutorial:active {
    transform: translate(0.5px, 0.5px);
  }
`;

export default styles;
