# Docker Deployment Guide

Updated Dockerfile for the monorepo structure.

## 🐳 What Changed

The Dockerfile has been updated to work with the new monorepo structure where the backend is in `apps/backend/`.

### Key Changes:

- ✅ All paths now point to `apps/backend/`
- ✅ Copies both Prisma generated files and Prismabox schemas
- ✅ Multi-stage build for optimal image size
- ✅ Production-only dependencies in final image

## 🚀 Quick Start

### Build and Run with Docker

```bash
# Build the image
docker build -t langs-world-backend .

# Run the container
docker run -p 8888:8888 \
  -e DATABASE_URL="your-database-url" \
  -e JWT_SECRET="your-jwt-secret" \
  langs-world-backend
```

### Using Docker Compose (Recommended)

```bash
# Start all services
docker-compose up -d

# View logs
docker-compose logs -f backend

# Stop services
docker-compose down
```

## 📋 Prerequisites

1. **Environment Variables**

   Make sure `apps/backend/.env` contains:

   ```env
   DATABASE_URL="postgresql://user:password@host:5432/database"
   JWT_SECRET="your-super-secret-key"
   ```

2. **Database Access**

   The container needs access to your PostgreSQL database. Options:
   - Use external database (recommended for production)
   - Use Docker Compose with PostgreSQL service (see docker-compose.yml)

## 🏗️ Build Process

The Dockerfile uses multi-stage builds:

### Stage 1: System Dependencies

- Installs OpenSSL, curl, ca-certificates

### Stage 2: Production Dependencies

- Copies `package.json`
- Installs production dependencies only
- Cached if package.json doesn't change

### Stage 3: Build

- Installs all dependencies (including dev)
- Generates Prisma client
- Generates Prismabox schemas

### Stage 4: Runtime

- Copies production dependencies
- Copies generated Prisma/Prismabox files
- Copies application source
- Runs the application

## 📦 Image Size Optimization

The final image only includes:

- ✅ Production dependencies
- ✅ Generated Prisma client
- ✅ Generated Prismabox schemas
- ✅ Application source code
- ❌ No dev dependencies
- ❌ No build tools

## 🔧 Docker Commands

### Build

```bash
# Build with tag
docker build -t langs-world-backend:latest .

# Build with specific tag
docker build -t langs-world-backend:v1.0.0 .

# Build without cache
docker build --no-cache -t langs-world-backend .
```

### Run

```bash
# Run with environment file
docker run -p 8888:8888 --env-file apps/backend/.env langs-world-backend

# Run with individual env vars
docker run -p 8888:8888 \
  -e DATABASE_URL="postgresql://..." \
  -e JWT_SECRET="secret" \
  langs-world-backend

# Run in detached mode
docker run -d -p 8888:8888 --name backend langs-world-backend

# Run with custom port
docker run -p 3000:8888 langs-world-backend
```

### Manage

```bash
# View logs
docker logs backend
docker logs -f backend  # Follow logs

# Stop container
docker stop backend

# Remove container
docker rm backend

# View running containers
docker ps

# Execute command in container
docker exec -it backend sh
```

## 🌐 Docker Compose

### Start Services

```bash
# Start in foreground
docker-compose up

# Start in background
docker-compose up -d

# Start and rebuild
docker-compose up --build
```

### Manage Services

```bash
# View logs
docker-compose logs
docker-compose logs -f backend

# Stop services
docker-compose stop

# Stop and remove containers
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Restart service
docker-compose restart backend
```

### With PostgreSQL

Uncomment the `db` service in `docker-compose.yml` to run PostgreSQL:

```yaml
db:
  image: postgres:16-alpine
  environment:
    POSTGRES_USER: postgres
    POSTGRES_PASSWORD: postgres
    POSTGRES_DB: langs_world
  ports:
    - "5432:5432"
  volumes:
    - postgres_data:/var/lib/postgresql/data
```

Then update `DATABASE_URL`:

```env
DATABASE_URL="postgresql://postgres:postgres@db:5432/langs_world"
```

## 🚢 Deployment

### Deploy to Cloud

#### Railway

```bash
# Install Railway CLI
npm i -g @railway/cli

# Login
railway login

# Deploy
railway up
```

#### Fly.io

```bash
# Install flyctl
curl -L https://fly.io/install.sh | sh

# Login
fly auth login

# Deploy
fly deploy
```

#### DigitalOcean App Platform

1. Connect your GitHub repository
2. Select the Dockerfile
3. Set environment variables
4. Deploy

### Environment Variables for Production

Make sure to set these in your deployment platform:

```env
DATABASE_URL=postgresql://...
JWT_SECRET=your-production-secret
NODE_ENV=production
```

## 🧪 Testing the Build

```bash
# Build the image
docker build -t langs-world-backend .

# Run the container
docker run -p 8888:8888 --env-file apps/backend/.env langs-world-backend

# Test the API
curl http://localhost:8888/health
# Should return: "OK, working gud!"

# Test Swagger docs
open http://localhost:8888/swagger
```

## 🐛 Troubleshooting

### Build fails with "not found"

- Make sure you're running `docker build` from the **root** directory
- Check that `apps/backend/` exists and contains all files

### Container exits immediately

- Check logs: `docker logs <container-id>`
- Verify DATABASE_URL is set correctly
- Ensure database is accessible from container

### Database connection fails

- Check DATABASE_URL format
- Ensure database host is accessible
- For local database, use `host.docker.internal` instead of `localhost`

### Prisma client errors

- Rebuild the image to regenerate Prisma client
- Check that `prisma/schema.prisma` exists

## 📊 Health Check

The container includes a health check:

- Endpoint: `http://localhost:8888/health`
- Interval: 30 seconds
- Timeout: 10 seconds
- Start period: 40 seconds
- Retries: 3

Check health status:

```bash
docker inspect --format='{{.State.Health.Status}}' <container-id>
```

## 🎯 Best Practices

1. **Use .dockerignore** - Already configured to exclude unnecessary files
2. **Multi-stage builds** - Reduces final image size
3. **Layer caching** - Package.json copied separately for better caching
4. **Non-root user** - Runs as `bun` user for security
5. **Health checks** - Monitors container health
6. **Environment variables** - Never hardcode secrets

---

**Status:** ✅ Dockerfile updated and ready for deployment!

**Test:** Build and run locally before deploying to production.
