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
RUN bun run build

# Stage 2: Run
FROM oven/bun:1.2.8-alpine

# Install necessary runtime dependencies
RUN apk add --no-cache nodejs

# Create app directory
WORKDIR /usr/src/app

# Copy built files from the builder stage
COPY --from=builder /usr/src/app/build/index.js ./index.js

# Expose the port your app runs on
EXPOSE 3001

# Start the application
CMD ["bun", "run", "index.js"]
