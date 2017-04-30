var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db');
db.any('CREATE TABLE IF NOT EXISTS nguoidung(tendangnhap VARCHAR(40) PRIMARY KEY,matkhau VARCHAR(40), tennguoidung VARCHAR(40), email VARCHAR(40))')
        .then(function(data) {    
        })
        .catch(function(error) {
        });

db.any('CREATE TABLE IF NOT EXISTS diadanh(madiadanh VARCHAR(40) PRIMARY KEY, tendiadanh VARCHAR(255))')
        .then(function(data) {  
        })
        .catch(function(error) {
        });

db.any('CREATE TABLE IF NOT EXISTS anh(maanh serial PRIMARY KEY, url text, camnhan VARCHAR(350), sohuu VARCHAR(40), madiadanh VARCHAR(40), soluotthich INT,'+ 
                ' CONSTRAINT anh_nguoidung FOREIGN KEY (sohuu) REFERENCES nguoidung(tendangnhap),'+ 
                ' CONSTRAINT anh_diadanh FOREIGN KEY (madiadanh) REFERENCES diadanh(madiadanh)   )')
        .then(function(data) {
        })
        .catch(function(error) {
        });

db.any('CREATE TABLE IF NOT EXISTS theodoi(matheodoi serial PRIMARY KEY, nguoidung VARCHAR(40) , nguoitheodoi VARCHAR(40),'
            +   ' CONSTRAINT user_follower FOREIGN KEY (nguoidung) REFERENCES nguoidung(tendangnhap), '
            +   ' CONSTRAINT follower_user FOREIGN KEY (nguoitheodoi) REFERENCES nguoidung(tendangnhap) )')
        .then(function(data) {  
        })
        .catch(function(error) {
        });

db.any('CREATE TABLE IF NOT EXISTS thich(mathich serial PRIMARY KEY, maanh INT, nguoithich VARCHAR(40), '
        + 'CONSTRAINT anh_thich FOREIGN KEY (maanh) REFERENCES anh(maanh), ' 
         + 'CONSTRAINT nguoidung_thich FOREIGN KEY (nguoithich) REFERENCES nguoidung(tendangnhap) )')
        .then(function(data) {  
        })
        .catch(function(error) {
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