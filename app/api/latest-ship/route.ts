import { NextResponse } from "next/server";

const GITHUB_USERNAME = "jamesdimonaco";
const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

interface PushEventPayload {
  head?: string;
  commits?: { message: string }[];
}

interface GitHubEvent {
  type: string;
  repo: { name: string };
  payload: PushEventPayload;
  created_at: string;
}

interface GitHubCommit {
  commit: { message: string };
}

export interface ShipItem {
  repo: string;
  message: string;
  date: string;
}

const githubHeaders = {
  ...(GITHUB_TOKEN && { Authorization: `Bearer ${GITHUB_TOKEN}` }),
  Accept: "application/vnd.github.v3+json",
};

// GitHub's public events API frequently omits the `commits` array on
// PushEvent payloads (privacy/truncation), leaving only the `head` SHA.
// Fall back to fetching that commit directly to get a real message.
async function resolveCommitMessage(repo: string, sha: string): Promise<string | null> {
  try {
    const res = await fetch(`https://api.github.com/repos/${repo}/commits/${sha}`, {
      headers: githubHeaders,
      next: { revalidate: 3600 },
    });
    if (!res.ok) return null;
    const data: GitHubCommit = await res.json();
    return data.commit?.message?.split("\n")[0]?.trim() || null;
  } catch {
    return null;
  }
}

export async function GET() {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/events/public?per_page=30`,
      { headers: githubHeaders, next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      throw new Error(`Failed to fetch events: ${res.status}`);
    }

    const events: GitHubEvent[] = await res.json();

    const items: ShipItem[] = [];
    const seenRepos = new Set<string>();

    for (const event of events) {
      if (event.type !== "PushEvent") continue;
      if (seenRepos.has(event.repo.name)) continue;

      let message = event.payload.commits?.[event.payload.commits.length - 1]?.message
        ?.split("\n")[0]
        ?.trim();

      if (!message && event.payload.head) {
        message = (await resolveCommitMessage(event.repo.name, event.payload.head)) || undefined;
      }

      if (!message) continue;

      seenRepos.add(event.repo.name);
      items.push({
        repo: event.repo.name.split("/").pop() || event.repo.name,
        message,
        date: event.created_at,
      });

      if (items.length >= 5) break;
    }

    if (items.length === 0) {
      return NextResponse.json({ items: [] }, { status: 200 });
    }

    return NextResponse.json(
      { items },
      { headers: { "Cache-Control": "public, s-maxage=3600, stale-while-revalidate=86400" } }
    );
  } catch (error) {
    console.error("Latest ship API error:", error);
    return NextResponse.json({ items: [] }, { status: 200 });
  }
}
