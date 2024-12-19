# Use a Node.js base image
FROM node:14

# Create and change to the app directory
WORKDIR /usr/src/app

# Copy package.json and package-lock.json
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install --frozen-lockfile

# Copy the rest of the application code
COPY . .

# Copy wait-for-it.sh script
COPY wait-for-it.sh /usr/src/app/wait-for-it.sh
RUN chmod +x /usr/src/app/wait-for-it.sh

# Expose the application port
EXPOSE 3130

# Command to run the application in development mode
CMD ["./wait-for-it.sh", "db:5432", "--", "yarn", "dev"]
