FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/serverCassandra
WORKDIR /usr/src/doancuoiki/serverCassandra


# Install app dependencies
COPY package.json /usr/src/doancuoiki/serverCassandra
RUN npm install nodemon -g
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/serverCassandra

EXPOSE 8085
CMD  npm start