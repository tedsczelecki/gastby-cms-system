FROM node:10

# Create app directory
WORKDIR /usr/src/app

RUN npm install @babel/cli @babel/core -g --save

COPY package*.json ./

RUN npm install

COPY . /usr/src/app

EXPOSE 8000

CMD env `cat .env | grep -v '^\s*#'` npm run start:prod
