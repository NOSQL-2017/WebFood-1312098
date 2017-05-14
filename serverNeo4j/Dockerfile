FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/serverNeo4j
WORKDIR /usr/src/doancuoiki/serverNeo4j


# Install app dependencies
COPY package.json /usr/src/doancuoiki/serverNeo4j
RUN npm install nodemon
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/serverNeo4j

EXPOSE 8081
CMD  npm start