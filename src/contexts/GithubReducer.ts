import { GithubApiUrls } from "@api/Github";

type ActionMap<M extends { [index: string]: unknown }> = {
  [Key in keyof M]: M[Key] extends undefined
    ? {
        type: Key;
      }
    : {
        type: Key;
        payload: M[Key];
      };
};

type GithubPayload = {
  fetched: {
    data: GithubApiUrls;
  };
};

export type GithubApiActions = ActionMap<GithubPayload>[keyof ActionMap<GithubPayload>];

export const githubUrlsReducer = (urls: GithubApiUrls | null, action: GithubApiActions) => {
  switch (action.type) {
    case "fetched":
      return {
        ...urls,
        ...action.payload.data,
      };
    default:
      return null;
  }
};
