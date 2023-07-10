FROM node:18-alpine
LABEL version='1.0.0'

USER root

# Create project directory in Docker Container
RUN mkdir -p /app

# Copy project files in Docker Container
COPY . /app

# Move work directory
WORKDIR /app

# Install pnpm package manage
RUN npm install -g pnpm

# Install project dependencies
RUN pnpm install

# Docker start script
CMD npm run start:test