export const PUSHMORE_BASE_URL = "https://pushmore.io/webhook/";

export interface PushmorePostRequestBody {
  repoUrl: string;
  sender: string;
}
