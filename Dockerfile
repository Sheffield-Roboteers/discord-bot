FROM node:16-alpine

WORKDIR /usr/src/bot
COPY package.json config.json ./

RUN npm install 

COPY . .

CMD ["node", "main.js"]