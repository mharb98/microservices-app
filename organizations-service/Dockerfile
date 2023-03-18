FROM node:16-alpine as development

WORKDIR /app

COPY package.json .

RUN npm install

COPY . .

EXPOSE 3002

CMD ["npm", "run", "start:dev"]

FROM node:16-alpine AS builder

WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

FROM node:16-alpine as production

COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/dist ./dist
EXPOSE 3002

CMD [  "npm", "run", "start:prod" ]