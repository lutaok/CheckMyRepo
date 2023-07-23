import { useCallback, useContext, useEffect, useState } from "react";

import { GITHUB_API_BASE_URL, GithubApiUrls } from "@api/Github";
import { PUSHMORE_BASE_URL, PushmorePostRequestBody } from "@api/Pushmore";

import { GithubApiDispatchContext } from "@contexts/GithubApiContext";
import Wizard, { WizardStep } from "@components/Wizard/Wizard";

import WelcomeStep, { WELCOME_STEP_TITLE } from "./steps/WelcomeStep/WelcomeStep";
import UsernameStep, { USERNAME_STEP_TITLE } from "./steps/UsernameStep/UsernameStep";
import RepositoryStep, { REPOSITORY_STEP_TITLE } from "./steps/RepositoryStep/RepositoryStep";
import CheckInfoStep, { CHECK_INFO_STEP_TITLE } from "./steps/CheckInfoStep/CheckInfoStep";
import SentRepoStep, { SENT_REPO_STEP_TITLE } from "./steps/SentRepoStep/SentRepoStep";
import "./SendRepoPage.scss";

export interface RepoInfo {
  username: string;
  repositoryName: string;
}

const API_KEY = import.meta.env.VITE_PUSHMORE_ENDPOINT_KEY;
const PUSHMORE_SENDER = import.meta.env.VITE_PUSHMORE_SENDER;

const SendRepoPage = () => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo>({
    repositoryName: "",
    username: "",
  });

  const [currentWizardStep, setCurrentWizardStep] = useState<number>(0);

  const { dispatch } = useContext(GithubApiDispatchContext);

  const handleNextStep = () => {
    setCurrentWizardStep((prev) => prev + 1);
  };

  const handlePreviousStep = useCallback(() => {
    setCurrentWizardStep((prev) => prev - 1);
  }, []);

  const handleUsernameChange = useCallback((value: string) => {
    setRepoInfo((previousInfo) => ({ ...previousInfo, username: value }));
  }, []);

  const handleRepositoryNameChange = useCallback((value: string) => {
    setRepoInfo((previousInfo) => ({ ...previousInfo, repositoryName: value }));
  }, []);

  const wizardSteps: WizardStep[] = [
    {
      title: WELCOME_STEP_TITLE,
      content: <WelcomeStep handleNextStep={handleNextStep}></WelcomeStep>,
    },
    {
      title: USERNAME_STEP_TITLE,
      content: <UsernameStep username={repoInfo.username} onUsernameChange={handleUsernameChange}></UsernameStep>,
      handlePreviousStep,
      handleNextStep,
    },
    {
      title: REPOSITORY_STEP_TITLE,
      content: (
        <RepositoryStep repositoryName={repoInfo.repositoryName} onRepositoryNameChange={handleRepositoryNameChange}></RepositoryStep>
      ),
      handlePreviousStep,
      handleNextStep,
    },
    {
      title: CHECK_INFO_STEP_TITLE,
      content: <CheckInfoStep repoInfo={repoInfo} handleSubmit={sendRepoInfo} />,
      handlePreviousStep,
    },
    {
      title: SENT_REPO_STEP_TITLE,
      content: <SentRepoStep />,
    },
  ];

  // Hoisted function
  function sendRepoInfo(repoUrl: string) {
    if (API_KEY && repoUrl && PUSHMORE_SENDER) {
      const pushmoreUrl = `${PUSHMORE_BASE_URL}${API_KEY}`;

      const requestBody: PushmorePostRequestBody = {
        repoUrl,
        sender: PUSHMORE_SENDER,
      };

      fetch(pushmoreUrl, { method: "POST", body: JSON.stringify(requestBody) })
        .then((response) => {
          if (response.ok) {
            setCurrentWizardStep(wizardSteps.length - 1);
          }
        })
        .catch((e) => {
          console.error("Couldn't send repository info", e);
        });
    }
  }

  // fetch urls list from Github
  useEffect(() => {
    fetch(GITHUB_API_BASE_URL)
      .then((result) => result.json())
      .then((jsonData) => {
        const apiResponse: GithubApiUrls = jsonData;
        dispatch({
          type: "fetched",
          payload: {
            data: apiResponse,
          },
        });
      })
      .catch((e) => {
        console.error("Could not retrieve Github's API Urls", e);
      });
  }, [dispatch]);

  return (
    <main>
      <section className="step-container">
        <Wizard currentStep={currentWizardStep} steps={wizardSteps}></Wizard>
      </section>
    </main>
  );
};

export default SendRepoPage;
