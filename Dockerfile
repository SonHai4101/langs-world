# Optimized Dockerfile for monorepo backend
FROM oven/bun:1 AS base
WORKDIR /app

# Install system dependencies once and cache them
FROM base AS system-deps
RUN apt-get update && apt-get install -y \
    openssl \
    ca-certificates \
    curl \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install dependencies stage - this will be cached if package.json doesn't change
FROM system-deps AS deps
WORKDIR /app/apps/backend

# Copy only package files first for better Docker layer caching
COPY --chown=bun:bun apps/backend/package.json apps/backend/bun.lockb* ./

# Install production dependencies only
RUN bun install --frozen-lockfile --production

# Build stage - for generating Prisma client
FROM system-deps AS build
WORKDIR /app/apps/backend

# Copy package files
COPY --chown=bun:bun apps/backend/package.json apps/backend/bun.lockb* ./

# Install all dependencies (including dev for Prisma generation)
RUN bun install --frozen-lockfile

# Copy Prisma schema and config
COPY --chown=bun:bun apps/backend/prisma ./prisma/
COPY --chown=bun:bun apps/backend/prisma.config.ts ./
COPY --chown=bun:bun apps/backend/tsconfig.json ./

# Generate Prisma client
RUN bunx prisma generate

# Final runtime stage
FROM system-deps AS runtime
WORKDIR /app/apps/backend
USER bun

# Copy production node_modules with correct ownership
COPY --from=deps --chown=bun:bun /app/apps/backend/node_modules ./node_modules

# Copy generated Prisma client and Prismabox schemas
COPY --from=build --chown=bun:bun /app/apps/backend/src/generated ./src/generated
COPY --from=build --chown=bun:bun /app/apps/backend/generated ./generated

# Copy application source code
COPY --chown=bun:bun apps/backend/src ./src/
COPY --chown=bun:bun apps/backend/package.json ./
COPY --chown=bun:bun apps/backend/prisma ./prisma/

EXPOSE 8888

# Health check
HEALTHCHECK --interval=30s --timeout=10s --start-period=40s --retries=3 \
    CMD curl -f http://localhost:8888/health || exit 1

# Start the application
CMD ["bun", "run", "src/index.ts"]
