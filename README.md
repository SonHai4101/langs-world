# Langs World - Monorepo

A language learning platform with backend API and frontend application.

## Project Structure

```
langs-world/
├── apps/
│   ├── backend/          # Elysia.js API server
│   └── frontend/         # Frontend application (to be created)
├── package.json          # Root workspace configuration
└── README.md
```

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) installed
- PostgreSQL database

### Installation

```bash
# Install all dependencies
bun install

# Install backend dependencies
cd apps/backend && bun install
```

### Development

```bash
# Run backend only
bun run dev:backend

# Or from root
bun run dev

# Run frontend (when created)
bun run dev:frontend
```

### Backend

The backend is built with:

- **Elysia.js** - Fast web framework
- **Prisma** - Database ORM
- **PostgreSQL** - Database
- **JWT** - Authentication

#### Backend Scripts

```bash
cd apps/backend

# Development
bun run dev

# Database
bun run db:generate    # Generate Prisma client
bun run db:push        # Push schema to database
bun run db:migrate     # Run migrations
bun run db:studio      # Open Prisma Studio
```

#### Environment Variables

Create `apps/backend/.env`:

```env
DATABASE_URL="postgresql://..."
JWT_SECRET="your-secret-key"
```

## API Documentation

Once the backend is running, visit:

- API Docs: http://localhost:8888/swagger
- Health Check: http://localhost:8888/health

## License

Private
