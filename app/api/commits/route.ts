import { NextResponse } from "next/server";
import { projects } from "@/lib/projects";

const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

const githubHeaders = {
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
  Accept: "application/vnd.github.v3+json",
};

export interface LatestCommit {
  message: string;
  date: string;
  /** Omitted for private repos — visitors can't see the commit anyway */
  url?: string;
}

interface GitHubCommitResponse {
  html_url: string;
  commit: {
    message: string;
    committer: { date: string } | null;
    author: { date: string } | null;
  };
}

async function fetchLatestCommit(
  repo: string,
  isPrivate: boolean,
): Promise<LatestCommit | null> {
  try {
    const res = await fetch(
      `https://api.github.com/repos/${repo}/commits?per_page=1`,
      { headers: githubHeaders, next: { revalidate: 3600 } },
    );
    if (!res.ok) return null;
    const data: GitHubCommitResponse[] = await res.json();
    const first = data[0];
    if (!first) return null;
    const message = first.commit.message.split("\n")[0]?.trim();
    const date = first.commit.committer?.date || first.commit.author?.date;
    if (!message || !date) return null;
    return {
      message,
      date,
      ...(isPrivate ? {} : { url: first.html_url }),
    };
  } catch {
    return null;
  }
}

export async function GET() {
  const entries = await Promise.all(
    projects.map(async (p) => [
      p.repo,
      await fetchLatestCommit(p.repo, Boolean(p.isPrivate)),
    ] as const),
  );

  const commits: Record<string, LatestCommit> = {};
  for (const [repo, commit] of entries) {
    if (commit) commits[repo] = commit;
  }

  return NextResponse.json(
    { commits },
    { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } },
  );
}
