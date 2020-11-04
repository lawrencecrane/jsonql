## Image to build server
FROM node:lts-alpine as builder

WORKDIR /home/node/packages/ts-jsonql

COPY packages/ts-jsonql/ ./

WORKDIR /home/node/examples/messageboard/types

COPY examples/messageboard/types/ ./

WORKDIR /home/node/examples/messageboard/backend

COPY examples/messageboard/backend/package*.json ./

RUN npm install

COPY examples/messageboard/backend/ ./

RUN npm run build

## Image to run server
FROM node:lts-alpine as runtime

WORKDIR /home/node

COPY --from=builder /home/node/examples/messageboard/backend/dist/ ./dist/

CMD ["node", "dist/index.js"]