# Use an official Node.js image as the base for building the app
FROM node:16 AS build

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json to install dependencies
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the app's source code
COPY . .

# Build the React app
RUN npm run build

# Use an official Nginx image to serve the built files
FROM nginx:alpine

# Copy the React build output to Nginx's web directory
COPY --from=build /app/build /usr/share/nginx/html

# Copy the custom Nginx configuration
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Expose port 80 for the app
EXPOSE 80

# Start Nginx when the container runs
CMD ["nginx", "-g", "daemon off;"]