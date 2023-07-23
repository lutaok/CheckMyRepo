export interface GithubApiUrls {
  current_user_url: string;
  current_user_authorizations_html_url: string;
  authorizations_url: string;
  code_search_url: string;
  commit_search_url: string;
  emails_url: string;
  emojis_url: string;
  events_url: string;
  feeds_url: string;
  followers_url: string;
  following_url: string;
  gists_url: string;
  hub_url: string;
  issue_search_url: string;
  issues_url: string;
  keys_url: string;
  label_search_url: string;
  notifications_url: string;
  organization_url: string;
  organization_repositories_url: string;
  organization_teams_url: string;
  public_gists_url: string;
  rate_limit_url: string;
  repository_url: string;
  repository_search_url: string;
  current_user_repositories_url: string;
  starred_url: string;
  starred_gists_url: string;
  topic_search_url: string;
  user_url: string;
  user_organizations_url: string;
  user_repositories_url: string;
  user_search_url: string;
}

interface GithubRepositoryResponse {
  id: number;
  private: boolean;
  html_url: string;
  description: string;
  fork: boolean;
}

interface GithubInfoNotFoundResponse {
  message: "Not Found";
  documentation_url: string;
}

export const GITHUB_API_BASE_URL = "https://api.github.com";

export const isGithubDataNotFound = (data: unknown): data is GithubInfoNotFoundResponse =>
  !!data && (data as GithubInfoNotFoundResponse).message === "Not Found";

export const isGithubRepositoryResponse = (data: unknown): data is GithubRepositoryResponse =>
  !!data && typeof (data as GithubRepositoryResponse).fork !== "undefined";
