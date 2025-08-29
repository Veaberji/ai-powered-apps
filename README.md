# AI powered apps

To install dependencies:

```bash
bun i
```

Add your OpenAI API key as env var, create .env file with

```
OPENAI_API_KEY=<your key>
```

Run the DB in docker:

```
docker compose up
```

And seed the DB using `packages/server/prisma/seed_data.sql`

To run:

```bash
bun run dev
```

This project was created using `bun init` in bun v1.2.21. [Bun](https://bun.com) is a fast all-in-one JavaScript runtime.
