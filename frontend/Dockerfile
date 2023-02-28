FROM node:18-alpine 

# Set the working directory to /app
WORKDIR /app

# Copy package.json and yarn.lock to the working directory
COPY package.json yarn.lock ./

# Install dependencies
RUN yarn install

# Copy the rest of the application code to the working directory
COPY . .

# Build the Next.js application
RUN yarn build

# Expose port 3000 for the application
EXPOSE 3000

# Set the NODE_ENV environment variable to production
ENV NODE_ENV development

# Start the application
CMD ["yarn", "dev"]