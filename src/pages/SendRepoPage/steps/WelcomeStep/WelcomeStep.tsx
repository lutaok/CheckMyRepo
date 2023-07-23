import Button from "@components/Button/Button";
import Arrow from "@components/Icons/Arrow";

import "./WelcomeStep.scss";

interface WelcomeStepProps {
  handleNextStep: () => void;
}

export const WELCOME_STEP_TITLE = "Benvenuto";

const PARAGRAPH_DEFAULT_TEXT = "Nelle prossime schermate verrà chiesto di inserire username e nome repository del tuo progetto GitHub";

const BUTTON_DEFAULT_TEXT = "Procediamo!";

const WelcomeStep = ({ handleNextStep }: WelcomeStepProps): JSX.Element => {
  return (
    <div className="welcome-step">
      <p>{PARAGRAPH_DEFAULT_TEXT}</p>
      <Button icon={<Arrow />} onClick={handleNextStep}>
        {BUTTON_DEFAULT_TEXT}
      </Button>
    </div>
  );
};

export default WelcomeStep;
