# Stage 1: Build the Vue application
FROM node:17 as build-stage

# Set working directory
WORKDIR /app

# Copy package.json and pnpm-lock.yaml
COPY package.json pnpm-lock.yaml ./

# Install pnpm
RUN npm install -g pnpm

# Install dependencies
RUN pnpm install

# Copy project files to the container
COPY . .

# Build the app
RUN pnpm build

# Stage 2: Serve the app using a simple HTTP server
FROM nginx:stable-alpine as production-stage

# Copy built assets from build-stage
COPY --from=build-stage /app/dist /usr/share/nginx/html

# Expose port 80 to access the server
EXPOSE 8080

# Start Nginx server
CMD ["nginx", "-g", "daemon off;"]