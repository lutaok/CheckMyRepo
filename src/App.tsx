import GithubApiContextProvider from "@contexts/GithubApiContextProvider";
import SendRepoPage from "@pages/SendRepoPage/SendRepoPage";

import "./App.scss";

const App = (): JSX.Element => {
  return (
    <GithubApiContextProvider>
      <SendRepoPage></SendRepoPage>
    </GithubApiContextProvider>
  );
};

export default App;
