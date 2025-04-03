FROM oven/bun:1.2.8-alpine

# Create app directory
WORKDIR /usr/src/app

# Copy package.json and bun.lockb (if available)
COPY package.json bun.lockb* ./

# Install dependencies
RUN bun install

# Copy the rest of the application
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Start the application
CMD ["bun", "start"]
