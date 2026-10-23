# Moving The Blessing Voices to GitHub

This repository contains the full website and private content dashboard. Moving the source to GitHub does not publish the website or provision the database and file storage.

## Included

- Homepage, four Bible story collection pages, booklet library, About, and Contact.
- A private dashboard at `/admin` for story drafts, images, PDFs, videos, and YouTube links.
- Database schema and generated SQL migration under `db/` and `drizzle/`.
- Server-side file access checks and published-story reader pages.
- Unit and local HTTP integration checks under `tests/`.

## Current hosting dependencies

This is the working source prepared for ChatGPT Sites. It uses Vinext on Cloudflare Workers, D1 for records, and R2 for files. Its administrator sign-in currently trusts identity supplied by the Sites hosting platform.

Before deployment outside Sites:

1. Replace dispatch-owned ChatGPT sign-in and identity-header trust with authentication supplied and verified by the new host. Never trust user-supplied authentication headers on an unprotected public Worker.
2. Configure the administrator allowlist for the new identity provider. Set the server-only `ADMIN_EMAIL` hosting variable to your verified administrator email. The owner check in `lib/server.ts` denies hosted editor access when this setting is missing. Never put it in browser code.
3. Provision and bind the database and object storage; apply the generated SQL migration once.
4. Replace the Sites project manifest and deployment integration with the destination host's configuration while retaining the Vinext build integration required by the chosen runtime.
5. Update the site's canonical origin and sitemap to the new website address.
6. Verify owner-only editing, draft-file privacy, real uploads, downloads, and published collection lists on the destination host.

GitHub Pages is a static hosting service. It cannot run this dashboard's server routes and storage. It can host an exported static version of the public website, but a separate backend would still be needed for uploads and publishing.

## Development

Use Node.js 22.13 or newer and npm. Run `npm ci`, then `npx tsc --noEmit` and `node --experimental-strip-types --test tests/content.test.ts` for the checks used during development. Build with `npm run build`. The included Sites starter README, preserved as `SITES-STARTER.md`, explains local D1 migrations and local development sign-in.

The loopback development sign-in is for local testing only and is excluded from production. It is not a replacement for hosted administrator authentication.

## Files intentionally excluded

Dependencies, local databases, uploaded test files, build output, credentials, environment files, and tool state are excluded by `.gitignore`. Do not commit access tokens or secret values. No finalized story list, PDF collection, or contact details have been invented.
