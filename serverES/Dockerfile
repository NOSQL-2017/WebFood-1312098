FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/serverES
WORKDIR /usr/src/doancuoiki/serverES


# Install app dependencies
COPY package.json /usr/src/doancuoiki/serverES
RUN npm install nodemon
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/serverES

EXPOSE 8083
CMD  npm start