import { StepWithBothArrows, StepWithLeftArrow, WizardStep } from "./Wizard";

export const isStepWithLeftArrow = (step: WizardStep): step is StepWithLeftArrow =>
  typeof (step as StepWithLeftArrow).handlePreviousStep !== "undefined" &&
  typeof (step as StepWithBothArrows).handleNextStep === "undefined";

export const isStepWithBothArrows = (step: WizardStep): step is StepWithBothArrows =>
  typeof (step as StepWithBothArrows).handlePreviousStep !== "undefined" &&
  typeof (step as StepWithBothArrows).handleNextStep !== "undefined";
