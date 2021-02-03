FROM node:lts

WORKDIR /api

COPY . .

RUN npm install

EXPOSE 8080
EXPOSE 8081
EXPOSE 27018
CMD [ "node", "server.js" ]