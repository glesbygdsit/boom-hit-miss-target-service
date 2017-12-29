FROM node:9
WORKDIR /usr/src/app

COPY ./src/package*.json ./
RUN npm install
COPY ./src/ ./

CMD ["npm", "start"]