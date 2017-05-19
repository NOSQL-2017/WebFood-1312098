FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/serverRedis
WORKDIR /usr/src/doancuoiki/serverRedis


# Install app dependencies
COPY package.json /usr/src/doancuoiki/serverRedis
RUN npm install nodemon -g
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/serverRedis

EXPOSE 8084
CMD  npm start