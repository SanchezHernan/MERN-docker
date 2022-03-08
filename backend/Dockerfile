FROM node:latest

RUN mkdir -p /app

WORKDIR /app

COPY package*.json /app/

RUN npm install

RUN npm install -g nodemon -g --quiet

COPY . /app/

EXPOSE 4000

CMD [ "npm", "run", "dev" ]