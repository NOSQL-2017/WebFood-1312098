var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var pg = require('pg');
var config = {
  user: 'pvDung', //env var: PGUSER
  database: 'DoAnCuoiKi', //env var: PGDATABASE
  password: '123456', //env var: PGPASSWORD
  host: 'db', // Server hosting the postgres database
  port: 5432, //env var: PGPORT
  max: 10, // max number of clients in the pool
  idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};
var  pool = new pg.Pool(config);
pool.connect(function(err, client, done) {
    if(err) {
        return console.error('error fetching client from pool', err);
    }
    //client.query('CREATE TABLE NGUOIDUNG(id SERIAL PRIMARY KEY, text VARCHAR(40) not null, complete BOOLEAN)');
    client.query('CREATE TABLE IF NOT EXISTS USERS(username VARCHAR(40) PRIMARY KEY,matkkhau VARCHAR(40), tennguoidung VARCHAR(40), email VARCHAR(40))');
    client.query('CREATE TABLE IF NOT EXISTS PLACES(place_id serial PRIMARY KEY, place_name VARCHAR(255))');
    client.query('CREATE TABLE IF NOT EXISTS IMAGES(image_id serial PRIMARY KEY, url text, username VARCHAR(40), place_id INT,'+ 
                ' CONSTRAINT images_user FOREIGN KEY (username) REFERENCES USERS(username),'+ 
                ' CONSTRAINT images_place FOREIGN KEY (place_id) REFERENCES PLACES(place_id)   )');
    client.query('CREATE TABLE IF NOT EXISTS FOLLOWERS(follower_id serial PRIMARY KEY,username VARCHAR(40) , follower VARCHAR(40),'
            +   ' CONSTRAINT user_follower FOREIGN KEY (username) REFERENCES USERS(username), '
            +   ' CONSTRAINT follower_user FOREIGN KEY (follower) REFERENCES USERS(username) )');
    //client.query('INSERT INTO NGUOIDUNG(email, tenNguoiDung, matKhau) values($1, $2, $3)',["dungvatoi12", "Phùng Văn Dũng", "123456"]);

});
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');

    next();
});

app.use(require('./controllers'));

app.listen('8080', function() {
    console.log('Sever is running');
});