FROM node:latest

WORKDIR /usr/src/bot
COPY package.json config.json yarn.lock ./

RUN yarn install

COPY . ./

CMD ["yarn", "start"]