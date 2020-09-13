import { css } from "lit-element";

const styles = css`
  #sidebar-tracks-start {
    padding-top: 52px;
  }

  #sidebar-tracks-loader {
    text-align: center;
    display: flex;
    align-items: center;
    height: 100%;
    justify-content: center;
  }

  .sidebar-tracks-error {
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
    max-width: 80%;
    margin: 0 auto;
    line-height: 30px;
  }

  #sidebar-tracks-search {
    width: 100%;
    padding: 18px;
    border: 0;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 14px;
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
  }
`;

export default styles;
