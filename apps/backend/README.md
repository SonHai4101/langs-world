# Langs World - Backend API

Elysia.js backend API for the Langs World language learning platform.

## Tech Stack

- **Elysia.js** - Fast and type-safe web framework
- **Prisma** - Next-generation ORM
- **PostgreSQL** - Relational database
- **JWT** - Authentication
- **Swagger** - API documentation

## Project Structure

```
backend/
├── src/
│   ├── plugin/           # Elysia plugins (routes)
│   ├── services/         # Business logic services
│   ├── generated/        # Generated Prisma client
│   ├── db.ts            # Database connection
│   └── index.ts         # Application entry point
├── prisma/
│   └── schema.prisma    # Database schema
├── generated/           # Generated Prismabox schemas
└── .env                 # Environment variables
```

## Getting Started

### Installation

```bash
bun install
```

### Environment Setup

Create a `.env` file:

```env
DATABASE_URL="postgresql://user:password@localhost:5432/langs_world"
JWT_SECRET="your-super-secret-jwt-key"
```

### Database Setup

```bash
# Generate Prisma client
bun run db:generate

# Push schema to database
bun run db:push

# Or run migrations
bun run db:migrate
```

### Development

```bash
# Start development server with hot reload
bun run dev

# Start production server
bun run start
```

The API will be available at `http://localhost:8888`

## API Endpoints

### Health Check

- `GET /health` - Check if API is running

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/me` - Get current user info

### User Text

- `POST /api/user-text` - Create new text
- `GET /api/user-text` - Get all user texts (paginated)

### Upload

- `POST /api/upload/audio` - Upload audio file

## API Documentation

Visit `http://localhost:8888/swagger` for interactive API documentation.

## Database Schema

The database includes:

- **User** - User accounts
- **UserText** - Texts uploaded by users for learning
- **Word** - Dictionary of words
- **UserWord** - User's vocabulary progress
- **GeneratedQuiz** - Auto-generated quizzes
- **QuizResult** - Quiz attempt results

## Scripts

- `bun run dev` - Start development server
- `bun run start` - Start production server
- `bun run db:generate` - Generate Prisma client
- `bun run db:push` - Push schema to database
- `bun run db:migrate` - Run database migrations
- `bun run db:studio` - Open Prisma Studio

## Authentication

All protected endpoints require a Bearer token in the Authorization header:

```
Authorization: Bearer <your-jwt-token>
```

Get the token by logging in via `/api/auth/login`.
