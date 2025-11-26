FROM node:20
WORKDIR /app

# Install dependencies
COPY package*.json ./
RUN npm install

# Copy source and build
COPY . .
RUN npm run build

# Expose Next.js default port
EXPOSE 3000

# Start Next.js app
CMD ["npm", "start"]