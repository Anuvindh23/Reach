# Use an official Node.js LTS (Long Term Support) image as the base image
FROM node:14-alpine

# Set the working directory inside the container
# WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install app dependencies
RUN npm install

# Copy the entire project directory into the container
COPY . .

# Expose the port your app runs on
EXPOSE 3000

# Command to start your app
CMD ["node", "index.js"]
