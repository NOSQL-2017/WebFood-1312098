FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/ReduxIntagrams
WORKDIR /usr/src/doancuoiki/ReduxIntagrams


# Install app dependencies
COPY package.json /usr/src/doancuoiki/ReduxIntagrams
RUN npm install nodemon -g
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/ReduxIntagrams

EXPOSE 3000
CMD npm start