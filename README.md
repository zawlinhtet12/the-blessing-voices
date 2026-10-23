# The Blessing Voices — Cloudflare setup

This version runs independently of ChatGPT Sites. It uses Cloudflare Workers for the website, D1 for story records, R2 for files, and its own private administrator sign-in. No ChatGPT account is required for visitors or administrators.

## 1. Update GitHub first

Open the supplied **Cloudflare-Update** folder. Upload everything inside it to the root of `zawlinhtet12/the-blessing-voices`, keeping the folders intact. Include the `app` folder even though one already exists. GitHub will merge its contents and replace matching files. Commit the changes.

The update contains fewer than 100 files. It also restores the homepage route that was missing from the manual GitHub uploads. Do not upload local dependencies, `.dev.vars`, or any password file.

## 2. Connect Cloudflare to GitHub

1. Sign in at https://dash.cloudflare.com/ and open **Workers & Pages**.
2. Create a new Worker/application and select the option to import a Git repository.
3. Authorize Cloudflare to access your GitHub repository, then select **the-blessing-voices**.
4. Use the following settings:

| Setting | Value |
| --- | --- |
| Worker/project name | `the-blessing-voices` |
| Production branch | `main` |
| Root directory | Repository root; leave the default |
| Build command | `npm run build` |
| Deploy command | `npm run deploy` |
| Build variable | `NODE_VERSION` = `24` |

Use a **Worker with a Git connection**, rather than a static-only Pages deployment.

The supplied deployment command is designed to create the declared storage bindings if needed, apply the database migrations, and publish the built Worker. R2 must be enabled on the Cloudflare account. Complete any account setup prompts directly in Cloudflare.

If deployment reports a permissions error for D1, the build’s Cloudflare API token needs the account’s **D1 Edit** permission in addition to the normal Workers and R2 permissions. Change that permission in Cloudflare; never put an API token in GitHub or this chat.

## 3. Configure the private dashboard

After the first deployment, open the Worker’s **Settings → Variables & Secrets**. Add these as **runtime secrets**, not build variables:

| Secret name | What you enter |
| --- | --- |
| `ADMIN_EMAIL` | Your administrator email address |
| `ADMIN_PASSWORD` | A unique password of at least 16 characters |
| `SESSION_SECRET` | A separate random string of at least 32 characters; a password manager can generate 64 random characters |

Save/deploy the settings. Do not share these values here or upload them to GitHub. The login stays disabled until all three settings are valid. Replacing the password or session secret invalidates existing sessions.

Optionally add `SITE_URL` as a normal runtime variable with the exact website address Cloudflare provides, such as your actual `https://…workers.dev` address. It is used for canonical page links and the sitemap. Do not enter a guessed address. Dashboard settings are preserved on later builds.

## 4. Open the website

Use the actual URL shown in the successful Cloudflare deployment. Open `/admin` at the end of that address to sign in with the email and password you configured.

Choose **New entry**, add the actual story title and text, attach a booklet/video, and save a private draft. Preview it before switching visibility to **Published on website**. Readers can open published stories and download attached PDFs without signing in.

Upload limits remain: PDF 20 MB, image 8 MB, video 30 MB. Longer videos can use YouTube links. Sessions expire after eight hours; ten failed sign-in attempts from one address trigger a fifteen-minute pause.

## Verification and current status

The conversion was built and tested locally. Checks covered signed sessions, expiration and tampering, password changes, rejection of old identity headers, login rate limits, cross-origin rejection, draft/file privacy, uploads, publication/unpublication, PDF downloads, and byte ranges. A Cloudflare account deployment has not been performed or verified by the assistant.

If Cloudflare displays an error, share a screenshot of the build error with secrets and tokens hidden. Do not change the build command to a static-assets upload command; the dashboard requires the Worker.

## Development reference

Use Node.js 24 and `npm ci`. Run `npm test` and `npx tsc --noEmit`, then `npm run build`.

For local development, create an ignored `.dev.vars` with the three administrator settings. Test-only settings can be created using `node scripts/create-preview-secrets.mjs`; this does not create real hosted credentials. Apply migrations using `npx wrangler d1 migrations apply DB --local --persist-to .wrangler/state`, then run `npm run dev`. The HTTP integration script reads only these local test settings. Never commit `.dev.vars`.

Official references: [Workers Builds configuration](https://developers.cloudflare.com/workers/ci-cd/builds/configuration/), [resource provisioning](https://developers.cloudflare.com/workers/wrangler/configuration/#automatic-provisioning), [runtime secrets](https://developers.cloudflare.com/workers/configuration/secrets/).
