import { LeftNavigationArrow, NavigationArrowProps, RightNavigationArrow } from "./NavigationArrow";

export const isLeftNavigationArrowProps = (props: NavigationArrowProps): props is LeftNavigationArrow => props.direction === "left";

export const isRightNavigationArrowProps = (props: NavigationArrowProps): props is RightNavigationArrow => props.direction === "right";
