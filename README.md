# AI powered apps

## 1. ChatBot assistant, which answers questions about WonderWorld park, OpenAI is used.

## 2. Reviews summarization, free huggingface models are used (by http calls or local model launched in ollama).

To install dependencies:

```bash
bun i
```

Add your OpenAI API key as env var, create .env file with

```
OPENAI_API_KEY=<your key>
```

Run the DB in docker and add `DATABASE_URL` to .env file:

```
docker compose up
```

And seed the DB using `packages/server/prisma/seed_data.sql`

Add `HF_TOKEN` to .env to use free huggingface models.

To run:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
