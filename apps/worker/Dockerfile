FROM node:20-slim

# Install pnpm
RUN npm install -g pnpm

# Set working directory
WORKDIR /app

# Copy package files first for better caching
COPY package.json pnpm-lock.yaml ./
COPY apps/api/package.json apps/api/
COPY apps/api/pnpm-lock.yaml apps/api/

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the code
COPY . .

# Change to API directory and build
WORKDIR /app/apps/api
RUN pnpm run build

# Start worker
CMD ["node", "dist/workers.js"]
