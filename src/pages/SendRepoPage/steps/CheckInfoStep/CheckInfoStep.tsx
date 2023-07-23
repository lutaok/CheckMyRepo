import { isGithubDataNotFound, isGithubRepositoryResponse } from "@api/Github";

import Button from "@components/Button/Button";
import Spinner from "@components/Icons/Spinner";
import Check from "@components/Icons/Check";
import Fail from "@components/Icons/Fail";

import { RepoInfo } from "@pages/SendRepoPage/SendRepoPage";

import { useContext, useEffect, useState } from "react";
import { GithubApiContext } from "@contexts/GithubApiContext";
import "./CheckInfoStep.scss";

export const CHECK_INFO_STEP_TITLE = "Controllo dati inseriti";

const CHECK_INFO_DEFAULT_SUBMIT_TEXT = "Invia!";

enum ValidityCheckStatus {
  VALID = "VALID",
  INVALID = "INVALID",
  CHECKING = "CHECKING",
  EMPTY = "EMPTY",
}

interface CheckInfoStepProps {
  repoInfo: RepoInfo;
  handleSubmit: (repoUrlToSend: string) => void;
}

const CheckInfoStep = ({ repoInfo, handleSubmit }: CheckInfoStepProps): JSX.Element => {
  const [usernameValidityStatus, setUsernameValidityStatus] = useState<ValidityCheckStatus>(
    repoInfo.username ? ValidityCheckStatus.CHECKING : ValidityCheckStatus.EMPTY,
  );

  const [repositoryNameValidityStatus, setRepositoryNameValidityStatus] = useState<ValidityCheckStatus>(
    repoInfo.repositoryName ? ValidityCheckStatus.CHECKING : ValidityCheckStatus.EMPTY,
  );

  const [repoUrl, setRepoUrl] = useState<string>();

  const { githubApiUrls } = useContext(GithubApiContext);

  // check if username is valid
  useEffect(() => {
    if (repoInfo.username && githubApiUrls) {
      const userUrl = githubApiUrls.user_url.replace("{user}", repoInfo.username);
      fetch(userUrl)
        .then((response) => response.json())
        .then((userInfo) => {
          if (isGithubDataNotFound(userInfo)) {
            setUsernameValidityStatus(ValidityCheckStatus.INVALID);
          } else {
            setUsernameValidityStatus(ValidityCheckStatus.VALID);
          }
        })
        .catch((e) => {
          // Handle error in some way
          console.error("Could not check if username is valid", e);
        });
    }
  }, [repoInfo.username, githubApiUrls]);

  // check if repository name is valid for that username
  useEffect(() => {
    if (repoInfo.repositoryName && githubApiUrls && repoInfo.username) {
      const repoUrl = githubApiUrls.repository_url.replace("{owner}", repoInfo.username).replace("{repo}", repoInfo.repositoryName);
      fetch(repoUrl)
        .then((response) => response.json())
        .then((repositoryData) => {
          if (isGithubDataNotFound(repositoryData)) {
            setRepositoryNameValidityStatus(ValidityCheckStatus.INVALID);
          } else if (isGithubRepositoryResponse(repositoryData)) {
            setRepoUrl(repositoryData.html_url);
            setRepositoryNameValidityStatus(ValidityCheckStatus.VALID);
          }
        })
        .catch((e) => {
          // Handle error in some way
          console.error("Could not check if repo name is valid", e);
          setRepositoryNameValidityStatus(ValidityCheckStatus.INVALID);
        });
    } else {
      // If username is empty can't perform check on Repository name
      setRepositoryNameValidityStatus(ValidityCheckStatus.EMPTY);
    }
  }, [githubApiUrls, repoInfo]);

  const isSubmitDisabled =
    usernameValidityStatus !== ValidityCheckStatus.VALID || repositoryNameValidityStatus !== ValidityCheckStatus.VALID;

  return (
    <div className="check-info">
      <div className="info-container">
        <div className="info">
          <span>/</span>
          {repoInfo.username ? <span>{repoInfo.username}</span> : <span className="placeholder">Username</span>}
          <span>
            {usernameValidityStatus === ValidityCheckStatus.CHECKING && <Spinner />}
            {usernameValidityStatus === ValidityCheckStatus.INVALID && <Fail className="fail" />}
            {usernameValidityStatus === ValidityCheckStatus.VALID && <Check className="valid" />}
          </span>
        </div>
        <div className="info">
          <span>/</span>
          {repoInfo.repositoryName ? <span>{repoInfo.repositoryName}</span> : <span className="placeholder">Repository</span>}
          <span>
            {repositoryNameValidityStatus === ValidityCheckStatus.CHECKING && <Spinner />}
            {repositoryNameValidityStatus === ValidityCheckStatus.INVALID && <Fail className="fail" />}
            {repositoryNameValidityStatus === ValidityCheckStatus.VALID && <Check className="valid" />}
          </span>
        </div>
      </div>

      <Button
        type="submit"
        disabled={isSubmitDisabled}
        onClick={() => {
          if (repoUrl) {
            handleSubmit(repoUrl);
          }
        }}
      >
        {CHECK_INFO_DEFAULT_SUBMIT_TEXT}
      </Button>
    </div>
  );
};

export default CheckInfoStep;
