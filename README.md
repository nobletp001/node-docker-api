# Auth API

A starter Node.js + TypeScript authentication API that uses Prisma as the ORM. Includes Express routing, request validation with Zod, JWT handling, password hashing, and error/response helpers.

## Getting Started

```bash
npm install
cp .env.example .env
npx prisma migrate dev --name init
npm run dev
```

Update the values in `.env` to match your environment before running migrations.

## Scripts

- `npm run dev` – start the dev server with live reload.
- `npm run build` – compile TypeScript to `dist/`.
- `npm start` – run the compiled server.
- `npm run lint` – type-check the project.
- `npm run prisma:generate` – regenerate Prisma client.
- `npm run prisma:migrate` – run migrations interactively.
- `npm run prisma:studio` – open Prisma Studio.

## Project Structure

```
auth-api/
├── prisma/             # Prisma schema and migrations seed
├── src/
│   ├── config/         # Environment configuration helpers
│   ├── controllers/    # Route handlers
│   ├── db/             # Prisma client wrapper
│   ├── middleware/     # Shared Express middleware
│   ├── routes/         # Route definitions
│   ├── services/       # Business logic
│   ├── utils/          # Helpers (tokens, password hashing, logger)
│   └── validators/     # Zod schemas
└── .env.example        # Sample environment variables
```

Prisma defaults to PostgreSQL but you can update `prisma/schema.prisma` to any provider.
