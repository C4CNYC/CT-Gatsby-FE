import { css } from "lit-element";

const styles = css`
  .course-track-locked {
    background-image: url("/assets/lock.svg");
    width: 14px;
    height: 14px;
  }

  .course-track-money {
    background-image: url("/assets/money.svg");
    width: 18px;
    height: 18px;
    position: relative; /* for tooltip */
  }
  .course-track-arrow {
    background-image: url("/assets/arrow.svg");
    width: 24px;
    height: 24px;
    transition: transform 150ms ease-out;
  }
  #course-sidebar .course-track-open .course-track-arrow {
    transform: rotate(-90deg);
  }

  .course-track-step {
    padding-left: 30px;
    background-image: url("/assets/unchecked-radio.svg");
    background-position: right 10px center;
    background-repeat: no-repeat;
    color: #777b81;
    cursor: default;
  }
  .course-track-completed:hover {
    font-weight: 650;
  }
  .course-track-completed,
  .course-track-current {
    color: #25272a;
  }
  .course-track-completed {
    cursor: pointer;
    background-image: url("/assets/checked-radio.svg");
  }
  .course-track-current {
    font-weight: bold;
  }

  .course-track-learn {
    background-size: cover;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 10px;
    background-image: url("/assets/learn.svg");
  }

  .course-track-practice {
    background-size: cover;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 10px;
    background-image: url("/assets/practice.svg");
  }

  .course-track-fill {
    background-size: cover;
    width: 12px;
    height: 12px;
    display: inline-block;
    margin-right: 10px;
    background-image: url("/assets/fillinblank.svg");
  }

  .course-track-item {
    font-weight: 700;
    font-size: 18px;
    padding-left: 30px;
    padding-right: 15px;
    color: #626262;
    display: flex;
    align-items: center;
    justify-content: space-between;
    cursor: default;
    position: -webkit-sticky;
    position: sticky;
    top: 52px;
    z-index: 1;
    background-color: white;
  }
  .course-track-clickable {
    color: #121212;
    cursor: pointer;
    transition: background-color 200ms ease-out;
  }
  .course-track-clickable:hover {
    background-color: #eeeeee;
  }
  .course-track-item,
  .course-track-step {
    border-bottom: 1px solid #e7e7e7;
    padding-top: 13px;
    padding-bottom: 13px;
  }

  .course-track-steps-container {
    background-color: #fbfbfb;
    padding-left: 30px;
    display: none;
    opacity: 0;
    animation: course-track-fadeIn 200ms ease-out forwards;
  }
  @keyframes course-track-fadeIn {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }
  #course-sidebar .course-track-open .course-track-steps-container,
  #course-sidebar sidebar-tracks[searchmode] .course-track-steps-container {
    display: block;
  }

  .course-track-latest {
    border-left: 5px solid var(--primary);
  }
`;

export default styles;
