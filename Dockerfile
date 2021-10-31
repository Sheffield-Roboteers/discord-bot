FROM alpine:latest

WORKDIR /usr/src/bot
COPY package.json config.json ./

RUN apk add --update \
    && apk add --no-cache nodejs-current npm \
    && apk add --no-cache --virtual .build git curl build-base g++ \
    && npm install \
    && apk del .build

COPY . .

CMD ["node", "main.js"]