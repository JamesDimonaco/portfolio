# Portfolio

james.dimonaco.co.uk — James's portfolio. Single-page Next.js site (shadcn, framer-motion); the whole page is one `"use client"` component in `app/page.tsx`.

## Facts
- Project data lives in `lib/projects.ts` (shared by the page and `/api/commits`). Each project has a `repo` (owner/name) field; `isPrivate: true` → no Code link, "Private repo" label instead.
- `/api/commits` fetches each repo's latest commit (1h revalidate); `GITHUB_TOKEN` must exist in Vercel env for the private repos. The grid sorts most-recent-commit first; repos without data keep hand order at the bottom.

## Decisions (don't re-litigate)
- Timeline experiment scrapped 2026-07-18 — James called it "too tacky". Branch `feat/timeline` kept on origin for salvage; don't re-suggest a timeline.
- The LatestShip strip was deleted in favour of the commit-sorted grid ("messy") — don't bring it back.
- Deferred but wanted eventually (don't do unprompted): a course/Caltech entry in Experience between Where You At and Dama Health.

## Verify
`npx tsc --noEmit` + `pnpm build`. Localhost browser tools are intercepted on this machine — verify with `curl 127.0.0.1` instead.
