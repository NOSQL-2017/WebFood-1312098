FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/serverMongo
WORKDIR /usr/src/doancuoiki/serverMongo


# Install app dependencies
COPY package.json /usr/src/doancuoiki/serverMongo
RUN npm install nodemon
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/serverMongo

EXPOSE 8082
CMD  npm start