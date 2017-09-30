# Use node as base image
FROM node
# Set current working directory in the container
WORKDIR /home/sleuth-frontend
# Copy package.json
COPY package.json .
# Build the app
RUN yarn
# Copy the remaining contents to the container
COPY . .