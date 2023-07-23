import { ReactNode } from "react";
import { isStepWithBothArrows, isStepWithLeftArrow } from "./Utilities";
import "./Wizard.scss";
import NavigationArrow from "./components/NavigationArrow";

export interface BaseStep {
  title: string;
  content: ReactNode;
}

export interface StepWithLeftArrow extends BaseStep {
  handlePreviousStep: () => void;
}

export interface StepWithBothArrows extends StepWithLeftArrow {
  handlePreviousStep: () => void;
  handleNextStep: () => void;
}

export type WizardStep = BaseStep | StepWithLeftArrow | StepWithBothArrows;

interface WizardProps {
  currentStep: number;
  steps: WizardStep[];
}

const Wizard = ({ currentStep, steps }: WizardProps): JSX.Element => {
  const selectedStep = steps[currentStep];

  return (
    <>
      <div className="step-title">
        {(isStepWithBothArrows(selectedStep) || isStepWithLeftArrow(selectedStep)) && (
          <NavigationArrow direction="left" handlePreviousStep={selectedStep.handlePreviousStep} />
        )}
        <h1>{selectedStep.title}</h1>
        {isStepWithBothArrows(selectedStep) && <NavigationArrow direction="right" handleNextStep={selectedStep.handleNextStep} />}
      </div>
      <div className="step-content">{selectedStep && selectedStep.content}</div>
    </>
  );
};

export default Wizard;
