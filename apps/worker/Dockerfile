FROM node:20-slim AS base

# Enable pnpm
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# Set working directory
WORKDIR /app

# Copy the entire repository
COPY . .

# Install dependencies and build
WORKDIR /app/apps/api
RUN corepack prepare pnpm@latest --activate
RUN pnpm install --no-frozen-lockfile
RUN pnpm run build

# Start worker
CMD ["node", "dist/workers.js"]
