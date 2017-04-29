FROM node:boron

#Create app directory
RUN mkdir -p /usr/src/doancuoiki/Client
WORKDIR /usr/src/doancuoiki/Client


# Install app dependencies
COPY package.json /usr/src/doancuoiki/Client
RUN npm install nodemon
RUN npm install -g webpack@1.12.13 
RUN npm install

# Bundle app source
COPY . /usr/src/doancuoiki/Client

EXPOSE 3000
CMD  webpack && npm start