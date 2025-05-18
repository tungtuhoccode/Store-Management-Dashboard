# 1) Start from an official Node LTS slim image
FROM node:20-alpine

# 2) Create & switch to our working directory inside docker container
WORKDIR /app

# 3) Copy only the package manifests (caches layer unless these change)
COPY package.json package-lock.json ./

# 4) Install production deps
RUN npm ci --omit=dev

# 5) Copy your environment file in (so process.env works at runtime)
COPY .env ./

# 6) Copy the backend code into /app
COPY . .

# 7) Declare which port your app listens on
EXPOSE 6000

# 8) Default command to start your server
CMD ["node", "server.js"]
