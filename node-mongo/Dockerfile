FROM node:16-alpine AS builder
WORKDIR /app
COPY . .
RUN npm install
RUN npm run build

FROM node:16-alpine as final
WORKDIR /app
COPY --from=builder ./app/dist ./dist
COPY package.json .
RUN npm install
CMD ["npm", "start"]
EXPOSE 8080