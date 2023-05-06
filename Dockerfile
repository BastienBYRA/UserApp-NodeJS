FROM node:latest 

RUN apt-get update && apt-get install -y mongodb

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=4000

EXPOSE 4000

CMD [ "npm", "start" ]