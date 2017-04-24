FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/Client
WORKDIR /usr/src/doancuoiki/Client


# Install app dependencies
COPY package.json /usr/src/doancuoiki/Client
RUN npm install
RUN npm install -g webpack@1.12.13 

# Bundle app source
COPY . /usr/src/doancuoiki/Client

EXPOSE 3000
CMD npm rebuild node-sass && webpack && npm start