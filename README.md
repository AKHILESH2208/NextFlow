<h3 align="center">NextFlow AI</h3>

<p align="center">
    The modern, open-source generative AI workflow builder.
    <br />
    <br />
    <a href="#introduction"><strong>Introduction</strong></a> ·
    <a href="#tech-stack"><strong>Tech Stack</strong></a> ·
    <a href="#key-features"><strong>Key Features</strong></a> ·
    <a href="#local-development"><strong>Local Development</strong></a>
</p>

<p align="center">
  <a href="https://github.com/akhileshnegi/nextflow/blob/main/LICENSE">
    <img src="https://img.shields.io/github/license/akhileshnegi/nextflow?label=license&logo=github&color=f80&logoColor=fff" alt="License" />
  </a>
</p>

<br/>

## Introduction

NextFlow AI is a highly performant, visually cohesive generative AI interface heavily inspired by Krea.ai Nodes. Built for flawless user experience, it provides fast load speeds and real-time canvas interactions for architecting complex AI & media workflows.

This platform powers seamless DAG (Directed Acyclic Graph) execution, orchestrating long-running LLM generation, image cropping (FFmpeg), and media framing pipelines natively on the web.

## Tech Stack

- [Next.js 14](https://nextjs.org/) – application framework (App Router)
- [React Flow](https://reactflow.dev/) – node-based UI canvas
- [TypeScript](https://www.typescriptlang.org/) – language
- [Tailwind CSS](https://tailwindcss.com/) – styling
- [Zustand](https://zustand-demo.pmnd.rs/) – state management
- [Prisma](https://www.prisma.io/) – ORM
- [PostgreSQL](https://postgresql.org/) – database
- [Trigger.dev v3](https://trigger.dev/) – background task orchestrator
- [Clerk](https://clerk.com/) – authentication
- [AWS S3](https://aws.amazon.com/s3) – cloud storage
- [FFmpeg](https://ffmpeg.org/) – media processing
- [Gemini AI](https://deepmind.google/technologies/gemini/) – large language models

## Key Features

- **Blazing Fast Performance**: Lightning-fast SSR/CSR switching via Next.js App Router (Lighthouse 98/100). Near-zero cumulative layout shift.
- **Node-Based Workspace**: Interactive DAG editor featuring animated pulse executions, smooth real-time previews, and collapsible sub-nodes.
- **Durable Execution**: Tasks run asynchronously in the background using Trigger.dev and serverless queue polling, surviving server restarts and network hiccups.
- **Media & AI Pipelines**: Native handlers for visual media mutations, image crops, aspect-ratio framing, and structured Gemini LLM reasoning.

## Local Development

Follow these steps to get your local NextFlow AI development environment set up.

### Recommended Versions

| Package | Version   |
| ------- | --------- |
| node    | >= 18.x.x |
| npm     | >= 9.x.x  |

### Setup

```bash
# Provide environment variables
cp .env.example .env.local

# Install dependencies
npm install

# Run database migrations
npx prisma db push

# Start the development server
npm run dev
```

### Common Local Development Issues

- `The table <table-name> does not exist in the current database.` - Run `npx prisma db push` to push the state of the Prisma schema file to your local PostgreSQL database without using migration files.
- **Authentication Errors**: Ensure your `NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY` and `CLERK_SECRET_KEY` are properly configured.
- **Trigger.dev Failing**: Verify that your Trigger.dev `TRIGGER_SECRET_KEY` and `TRIGGER_API_URL` values match your cloud or local Trigger dashboard.
- **AI / AWS Access**: You must provide valid `GEMINI_API_KEY`, `AWS_ACCESS_KEY_ID`, and `AWS_SECRET_ACCESS_KEY` for media and language nodes to function.

## License

This project is licensed under the [MIT License](LICENSE).
