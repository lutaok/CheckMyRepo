import TextInput from "@components/TextInput/TextInput";

export const USERNAME_STEP_TITLE = "Username";

const USERNAME_PLACEHOLDER = "Scrivi lo username di Github";

const USERNAME_INPUT_NAME = "username";

interface UsernameStepProps {
  username: string;
  onUsernameChange: (value: string) => void;
}

const UsernameStep = ({ username, onUsernameChange }: UsernameStepProps): JSX.Element => {
  return <TextInput name={USERNAME_INPUT_NAME} placeholder={USERNAME_PLACEHOLDER} onValueChange={onUsernameChange} value={username} />;
};
export default UsernameStep;
