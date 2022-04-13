FROM node:alpine
WORKDIR /app

# install dependencies
COPY package*.json /app
RUN npm i

# create and set app directory as current dir
WORKDIR /home/app
COPY . /home/app/
CMD ["node", "server.js"]