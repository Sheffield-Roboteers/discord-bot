FROM node:latest

WORKDIR /usr/src/bot
COPY package.json config.json package-lock.json ./

RUN npm install

COPY . ./

CMD ["npm","run", "start"]