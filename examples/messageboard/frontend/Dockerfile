# Image for building assets
FROM node:lts-alpine as builder

ARG WEBSOCKET_URI=http://localhost:3000

WORKDIR /home/node/examples/messageboard/frontend

COPY examples/messageboard/frontend/package*.json ./

RUN npm install

COPY examples/messageboard/frontend/ ./

ENV WEBSOCKET_URI=${WEBSOCKET_URI}

RUN npm run build

# Image for serving assets
FROM nginx:alpine as static

COPY --from=builder /home/node/examples/messageboard/frontend/public/ /usr/share/nginx/html/ 
