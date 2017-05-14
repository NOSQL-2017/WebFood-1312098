var express = require('express');
var app = express();
var bodyParser = require('body-parser');


var pg = require('pg');

var config = {
        user: 'pvDung', //env var: PGUSER
        database: 'DoAnCuoiKi', //env var: PGDATABASE
        password: '123456', //env var: PGPASSWORD
        host: 'dbpg', // Server hosting the postgres database
        port: 5432, //env var: PGPORT
        max: 10, // max number of clients in the pool
        idleTimeoutMillis: 30000, // how long a client is allowed to remain idle before being closed
};

var pool = new pg.Pool(config);

pool.connect(function (err, client, done) {
        if (err) {
                return console.error('error fetching client from pool', err);
        }

        client.query('CREATE TABLE IF NOT EXISTS nguoidung(tendangnhap VARCHAR(40) PRIMARY KEY,matkhau VARCHAR(40), tennguoidung VARCHAR(40), email VARCHAR(40), url text, gioithieu text)');
       
        client.query('CREATE TABLE IF NOT EXISTS anh(maanh serial PRIMARY KEY, url text, camnhan VARCHAR(350), sohuu VARCHAR(40), madiadanh VARCHAR(40), soluotthich INT )');
});

app.use(bodyParser.json());

app.use(function (req, res, next) {
        res.header('Access-Control-Allow-Origin', '*');
        res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
        res.header('Access-Control-Allow-Headers', 'Content-Type');

        next();
});

app.use(require('./controllers'));

app.listen('8080', function () {
        console.log('Sever is running');
});

