import Arrow from "@components/Icons/Arrow";

import { isLeftNavigationArrowProps } from "./Utilities";
import "./NavigationArrow.scss";

export interface LeftNavigationArrow {
  direction: "left";
  handlePreviousStep: () => void;
}

export interface RightNavigationArrow {
  direction: "right";
  handleNextStep: () => void;
}

export type NavigationArrowProps = LeftNavigationArrow | RightNavigationArrow;

const NavigationArrow = (props: NavigationArrowProps): JSX.Element => {
  return (
    <span
      className="navigation-arrow"
      onClick={() => {
        if (isLeftNavigationArrowProps(props)) {
          props.handlePreviousStep();
        } else {
          props.handleNextStep();
        }
      }}
    >
      {isLeftNavigationArrowProps(props) ? <Arrow className="left" /> : <Arrow />}
    </span>
  );
};

export default NavigationArrow;
