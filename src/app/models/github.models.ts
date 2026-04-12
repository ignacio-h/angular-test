// https://api.github.com/users/<user_login>
export interface GithubUser {
  login: string;
  name: string | null;
  avatar_url: string;
  public_repos: number;
  followers: number;
  following: number;
  bio: string | null;
  html_url: string;
}

export interface GithubRepo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  stargazers_count: number;
  language: string | null;
  updated_at: string;
  fork: boolean;
}
