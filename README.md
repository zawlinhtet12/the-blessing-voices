# The Blessing Voices — free GitHub Pages edition

The website is served entirely from the `docs` folder. It needs no Cloudflare Worker, R2 subscription, database, administrator password, or payment setup. The public repository can use GitHub Pages with GitHub Free.

## Publish the free website

1. Upload the supplied **docs** folder to the root of `zawlinhtet12/the-blessing-voices` and commit the changes. Keep the folder name `docs`; do not upload its files directly to the repository root.
2. In the repository, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**.
4. Choose branch **main**, folder **/docs**, and click **Save**.
5. Wait for the **pages build and deployment** workflow to finish. Use the website link GitHub displays in Pages settings.

The expected project address is `https://zawlinhtet12.github.io/the-blessing-voices/`. This address is not proof the website has already deployed.

You can leave R2 disabled. The old Cloudflare deployment is no longer used for this version. Disconnect its Git repository in the Cloudflare Worker's build settings to stop it attempting the old deployment on each commit. Existing Cloudflare source files in the repository do not need to be deleted: GitHub Pages publishes only `/docs`.

## Add a story, booklet, or YouTube video

After deployment, open the website and choose **Prepare a story or booklet** in the footer, or open `/the-blessing-voices/editor/` on your GitHub Pages domain.

1. Enter the real story title, a unique page name, collection, Scripture reference, and summary.
2. Complete the story, context, lessons, life applications, three reflection questions, and prayer. Distinguish your own reflections from Bible quotations.
3. Select your actual PDF booklet and optional cover image. Paste an optional YouTube video link. No video file is uploaded to GitHub by the editor.
4. Preview the story and check it carefully.
5. Choose **Download GitHub upload package**. Extract that ZIP.
6. Drag the **docs** folder inside the extracted package into your GitHub repository’s **Add file → Upload files** area. Commit the files. A typical package contains the story page, updated library index, PDF, and cover image.
7. Wait for GitHub Pages to finish updating. Then use **Reload published library** in the editor before preparing another story. This preserves the latest index and prevents one package from hiding another entry.

The updated `data/stories.json` index makes the story appear on its collection page, in search results, and in the booklet library if a PDF is attached. Do not replace it with an old index or an empty file after publishing real stories.

## Editing and drafts

Select an existing story in the editor to load its editable source from the published story HTML. Keep the same page name when updating it. The editor can also restore a downloaded draft JSON or a previously generated story HTML page.

**Save draft on this device** stores text in that browser only. It does not store the selected PDF or image. **Download draft backup** provides a JSON backup that you can keep privately; do not upload draft backups to GitHub unless you intend to make their contents public. Reselect any unpublished attachments before exporting.

There is no private online dashboard or password system in this free edition. The editor is a public file-preparation tool. It cannot write to GitHub, and it never asks for a password or access token. GitHub account permissions control who can publish. Nothing is published until the repository files are committed and Pages deploys them.

## File sizes and free-service limits

The editor accepts PDF booklets up to **5 MB** and cover images up to **1 MB** to help keep a 156-story library small. Use compressed PDF files and small cover images. Keep all video files on YouTube.

GitHub Pages has a **1 GB published-site limit** and other usage limits. This setup uses its included public-repository service; it does not provide unlimited storage. Check the repository size as the collection grows.

## What is included

Home, four collection pages, free booklet library, About, Contact, story-layout preview, content editor, an `/admin/` information page, optimized images, sitemap, and a 404 page. No finalized list of 156 stories, actual booklet files, contact details, or sample biblical stories have been invented. The planned collection counts remain clearly labeled.

Checks cover story validation, unsafe paths, HTML escaping, preservation of the library index, download-package integrity, and internal links under the GitHub project path. The ZIP exporter was independently checked with Python's ZIP reader. The website must still be enabled in your GitHub Pages settings; no remote deployment is claimed.

Official guidance: [GitHub Pages publishing settings](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site), [uploading files](https://docs.github.com/en/repositories/working-with-files/managing-files/adding-a-file-to-a-repository), [GitHub Pages limits](https://docs.github.com/en/pages/getting-started-with-github-pages/github-pages-limits).
