This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Environment Variables

```
GHOST_URL=...
GHOST_CONTENT_KEY=...
GHOST_ADMIN_KEY=...
```

## Deploy on Vercel

### Create a Vercel deployment hook:

    1. Go to your Vercel project's dashboard.

    2. Click on the "Settings" tab.

    3. In the left sidebar, click on "Git" under the "Integration" section.

    4. Scroll down to find the "Deploy Hooks" section.

    5. Enter a name for the new hook (e.g., "Ghost CMS Webhook") and select the Git branch to be used for the deployment (usually "main" or "master").

    6. Click "Create Hook" and copy the generated URL.

### Add the webhook to Ghost CMS:

    1. Log in to your Ghost CMS admin panel.

    2. Click on "Integrations" in the sidebar.

    3. Click on "Add custom integration," give it a name (e.g., "Vercel Deployment"), and click "Create."

    4. In the "Webhooks" section, click on "Add webhook."

    5. Choose an event (e.g., "Site changed (rebuild)"). This event will be triggered when a post is published, updated, or deleted.

    6. Paste the Vercel deployment hook URL you copied earlier into the "Target URL" field.

    7. Click "Save."
