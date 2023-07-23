import Button from "@components/Button/Button";

export const SENT_REPO_STEP_TITLE = "Repository mandato!";

const SENT_REPO_DEFAULT_ACTION_TEXT = "Home";

const SentRepoStep = () => {
  return <Button onClick={() => window.location.reload()}>{SENT_REPO_DEFAULT_ACTION_TEXT}</Button>;
};

export default SentRepoStep;
