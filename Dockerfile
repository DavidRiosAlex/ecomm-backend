# Stage 1: Build
FROM oven/bun:1.2.8-alpine AS builder

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb (if available)
COPY package.json bun.lockb* ./

# Copy the rest of the application
COPY . .

# Install dependencies and build the application
RUN bun install

EXPOSE 3001

# Start the application
CMD ["bun", "run", "dev"]
