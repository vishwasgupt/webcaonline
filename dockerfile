# Stage 1: Build the app
FROM node:22.20-alpine3.21 AS builder

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm install --production=false

COPY . .
RUN npm run build

# Stage 2: Run the app (lighter image)
FROM node:22.20-alpine3.21 AS runner

WORKDIR /usr/src/app

# Copy only built output + production deps
COPY package*.json ./
RUN npm install 

COPY --from=builder /usr/src/app/dist ./dist

EXPOSE 5000
CMD ["npm", "run", "start"]
