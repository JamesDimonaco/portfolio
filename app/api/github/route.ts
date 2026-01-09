import { NextResponse } from "next/server";

const GITHUB_USERNAME = "jamesdimonaco";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface GitHubRepo {
  stargazers_count: number;
  language: string | null;
  fork: boolean;
}

interface GitHubUser {
  public_repos: number;
  followers: number;
}

interface ContributionDay {
  contributionCount: number;
}

interface ContributionWeek {
  contributionDays: ContributionDay[];
}

interface GitHubStats {
  publicRepos: number;
  totalStars: number;
  followers: number;
  contributions: number;
  topLanguages: { name: string; count: number }[];
}

async function fetchGitHubUser(): Promise<GitHubUser> {
  const res = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}`, {
    headers: {
      ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
      Accept: "application/vnd.github.v3+json",
    },
    next: { revalidate: 3600 }, // Cache for 1 hour
  });

  if (!res.ok) {
    throw new Error(`Failed to fetch user: ${res.status}`);
  }

  return res.json();
}

async function fetchAllRepos(): Promise<GitHubRepo[]> {
  const repos: GitHubRepo[] = [];
  let page = 1;
  const perPage = 100;

  while (true) {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=${perPage}&page=${page}&type=owner`,
      {
        headers: {
          ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
          Accept: "application/vnd.github.v3+json",
        },
        next: { revalidate: 3600 },
      }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch repos: ${res.status}`);
    }

    const data: GitHubRepo[] = await res.json();
    repos.push(...data);

    if (data.length < perPage) break;
    page++;
  }

  return repos;
}

async function fetchContributions(): Promise<number> {
  if (!GITHUB_TOKEN) {
    return 0; // GraphQL requires auth
  }

  const query = `
    query($username: String!) {
      user(login: $username) {
        contributionsCollection {
          contributionCalendar {
            totalContributions
            weeks {
              contributionDays {
                contributionCount
              }
            }
          }
        }
      }
    }
  `;

  const res = await fetch("https://api.github.com/graphql", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      query,
      variables: { username: GITHUB_USERNAME },
    }),
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.error("Failed to fetch contributions");
    return 0;
  }

  const data = await res.json();
  return data?.data?.user?.contributionsCollection?.contributionCalendar?.totalContributions || 0;
}

function calculateLanguages(repos: GitHubRepo[]): { name: string; count: number }[] {
  const languageCounts: Record<string, number> = {};

  for (const repo of repos) {
    if (repo.language && !repo.fork) {
      languageCounts[repo.language] = (languageCounts[repo.language] || 0) + 1;
    }
  }

  return Object.entries(languageCounts)
    .map(([name, count]) => ({ name, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5);
}

export async function GET() {
  try {
    const [user, repos, contributions] = await Promise.all([
      fetchGitHubUser(),
      fetchAllRepos(),
      fetchContributions(),
    ]);

    const totalStars = repos
      .filter((repo) => !repo.fork)
      .reduce((sum, repo) => sum + repo.stargazers_count, 0);

    const topLanguages = calculateLanguages(repos);

    const stats: GitHubStats = {
      publicRepos: user.public_repos,
      totalStars,
      followers: user.followers,
      contributions,
      topLanguages,
    };

    return NextResponse.json(stats, {
      headers: {
        "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400",
      },
    });
  } catch (error) {
    console.error("GitHub API error:", error);
    return NextResponse.json(
      { error: "Failed to fetch GitHub stats" },
      { status: 500 }
    );
  }
}
