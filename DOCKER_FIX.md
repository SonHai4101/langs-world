# Docker Build Fix - DATABASE_URL Issue

## 🐛 Problem

The Docker build was failing with:

```
Failed to load config file "/app/apps/backend" as a TypeScript/JavaScript module.
Error: PrismaConfigEnvError: Missing required environment variable: DATABASE_URL
```

## 🔍 Root Cause

The `prisma.config.ts` file was trying to load `DATABASE_URL` from environment variables during the build stage:

```typescript
// prisma.config.ts
import "dotenv/config";
import { defineConfig, env } from "prisma/config";

export default defineConfig({
  datasource: {
    url: env("DATABASE_URL"), // ❌ Requires DATABASE_URL at build time
  },
});
```

During Docker build, there's no `.env` file available, and we don't want to expose production credentials in the build stage anyway.

## ✅ Solution

### What Changed

1. **Removed `prisma.config.ts` from build**
   - Don't copy `prisma.config.ts` during build
   - Use `--schema` flag to point directly to `schema.prisma`

2. **Added dummy DATABASE_URL**
   - Set a placeholder `DATABASE_URL` for Prisma generation
   - This is only used to generate the client, not for actual connections
   - Real `DATABASE_URL` is provided at runtime via environment variables

3. **Updated generate command**

   ```dockerfile
   # Before
   RUN bunx prisma generate

   # After
   ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public"
   RUN bunx prisma generate --schema=./prisma/schema.prisma
   ```

## 📋 Updated Dockerfile Stages

### Build Stage (Lines 24-43)

```dockerfile
FROM system-deps AS build
WORKDIR /app/apps/backend

# Copy package files
COPY --chown=bun:bun apps/backend/package.json apps/backend/bun.lockb* ./

# Install all dependencies
RUN bun install --frozen-lockfile

# Copy Prisma schema (NOT prisma.config.ts)
COPY --chown=bun:bun apps/backend/prisma ./prisma/
COPY --chown=bun:bun apps/backend/tsconfig.json ./

# Set dummy DATABASE_URL for generation only
ENV DATABASE_URL="postgresql://dummy:dummy@localhost:5432/dummy?schema=public"

# Generate Prisma client using schema directly
RUN bunx prisma generate --schema=./prisma/schema.prisma
```

### Runtime Stage (Lines 45-69)

```dockerfile
FROM system-deps AS runtime
WORKDIR /app/apps/backend
USER bun

# Copy generated files
COPY --from=build --chown=bun:bun /app/apps/backend/src/generated ./src/generated
COPY --from=build --chown=bun:bun /app/apps/backend/generated ./generated

# Copy application code
COPY --chown=bun:bun apps/backend/src ./src/
COPY --chown=bun:bun apps/backend/package.json ./
COPY --chown=bun:bun apps/backend/prisma ./prisma/

# Start application (uses real DATABASE_URL from environment)
CMD ["bun", "run", "src/index.ts"]
```

## 🚀 How to Build Now

```bash
# Build the image (no DATABASE_URL needed)
docker build -t langs-world-backend .

# Run with real DATABASE_URL
docker run -p 8888:8888 \
  -e DATABASE_URL="postgresql://user:pass@host:5432/db" \
  -e JWT_SECRET="your-secret" \
  langs-world-backend
```

## 🔐 Security Benefits

1. **No credentials in build**
   - Build stage uses dummy DATABASE_URL
   - Real credentials only provided at runtime

2. **Separation of concerns**
   - Build time: Generate Prisma client (no DB connection)
   - Runtime: Connect to actual database

3. **Flexible deployment**
   - Same image can be used with different databases
   - Just change environment variables

## 📝 Important Notes

### Dummy DATABASE_URL

- Only used for generating Prisma client
- Prisma doesn't actually connect during generation
- It just needs a valid PostgreSQL connection string format

### Runtime DATABASE_URL

- Must be provided when running the container
- Can be different for each environment (dev, staging, prod)
- Passed via `-e` flag or docker-compose environment

### prisma.config.ts

- Not needed during Docker build
- Still used in local development
- Helps with migrations and other Prisma CLI commands

## 🧪 Testing

```bash
# Build
docker build -t langs-world-backend .

# Run with your database
docker run -p 8888:8888 \
  --env-file apps/backend/.env \
  langs-world-backend

# Test
curl http://localhost:8888/health
```

## 🎯 Summary

**Before:** ❌ Build failed because `prisma.config.ts` required `DATABASE_URL`

**After:** ✅ Build succeeds with dummy `DATABASE_URL`, real one provided at runtime

**Key Change:** Use `--schema` flag instead of relying on `prisma.config.ts` during build

---

**Status:** ✅ Docker build issue resolved!

**Next:** Build and deploy your image successfully.
