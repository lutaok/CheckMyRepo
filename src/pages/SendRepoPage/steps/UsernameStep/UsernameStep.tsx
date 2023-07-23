import TextInput from "@components/TextInput/TextInput";

export const USERNAME_STEP_TITLE = "Username";

const USERNAME_PLACEHOLDER = "Scrivi lo username di Github";

interface UsernameStepProps {
  username: string;
  onUsernameChange: (value: string) => void;
}

const UsernameStep = ({ username, onUsernameChange }: UsernameStepProps): JSX.Element => {
  return <TextInput placeholder={USERNAME_PLACEHOLDER} onValueChange={onUsernameChange} value={username} />;
};
export default UsernameStep;
