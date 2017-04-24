FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/serverapi
WORKDIR /usr/src/doancuoiki/serverapi


# Install app dependencies
COPY package.json /usr/src/doancuoiki/serverapi
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/serverapi

EXPOSE 8080
CMD  npm start