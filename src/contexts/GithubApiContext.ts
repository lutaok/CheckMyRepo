import { Dispatch, createContext } from "react";

import { GithubApiUrls } from "@api/Github";
import { GithubApiActions } from "./GithubReducer";

interface GitHubApiContextValue {
  githubApiUrls: GithubApiUrls | null;
}

export const GithubApiContext = createContext<GitHubApiContextValue>({
  githubApiUrls: null,
});

interface GitHubApiDispatchContextValue {
  dispatch: Dispatch<GithubApiActions>;
}

export const GithubApiDispatchContext = createContext<GitHubApiDispatchContextValue>({
  dispatch: () => null,
});
