import { ReactNode, useReducer } from "react";
import { githubUrlsReducer } from "./GithubReducer";
import { GithubApiContext, GithubApiDispatchContext } from "./GithubApiContext";

interface GithubApiContextProviderProps {
  children: ReactNode;
}

const GithubApiContextProvider = ({ children }: GithubApiContextProviderProps): JSX.Element => {
  const [githubApiUrls, dispatch] = useReducer(githubUrlsReducer, null);

  return (
    <GithubApiContext.Provider
      value={{
        githubApiUrls,
      }}
    >
      <GithubApiDispatchContext.Provider value={{ dispatch }}>{children}</GithubApiDispatchContext.Provider>
    </GithubApiContext.Provider>
  );
};

export default GithubApiContextProvider;
