FROM node:lts-alpine

WORKDIR /home/node/packages/ts-jsonql

COPY packages/ts-jsonql/ ./

WORKDIR /home/node/examples/messageboard/types

COPY examples/messageboard/types/ ./

WORKDIR /home/node/examples/messageboard/backend

COPY examples/messageboard/backend/package*.json ./

RUN npm install

COPY examples/messageboard/backend/ ./

RUN npm run build

CMD ["npm", "start"]