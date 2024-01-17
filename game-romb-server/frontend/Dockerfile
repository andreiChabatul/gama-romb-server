#STAGE 1
FROM node:21.4.0-alpine3.18 AS build
WORKDIR /src/app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

#STAGE 2
FROM nginx:1.17.1-alpine
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=build /src/app/dist/romb_game /usr/share/nginx/html
