import TextInput from "@components/TextInput/TextInput";

export const REPOSITORY_STEP_TITLE = "Repository";

const REPOSITORY_DEFAULT_PLACEHOLDER = "Scrivi il nome del repo di GitHub";

interface RepositoryStepProps {
  repositoryName: string;
  onRepositoryNameChange: (value: string) => void;
}

const RepositoryStep = ({ repositoryName, onRepositoryNameChange }: RepositoryStepProps): JSX.Element => {
  return <TextInput value={repositoryName} onValueChange={onRepositoryNameChange} placeholder={REPOSITORY_DEFAULT_PLACEHOLDER} />;
};

export default RepositoryStep;
