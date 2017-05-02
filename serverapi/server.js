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

var pool = new pg.Pool(config);

pool.connect(function (err, client, done) {
        if (err) {
                return console.error('error fetching client from pool', err);
        }

        client.query('CREATE TABLE IF NOT EXISTS nguoidung(tendangnhap VARCHAR(40) PRIMARY KEY,matkhau VARCHAR(40), tennguoidung VARCHAR(40), email VARCHAR(40))');
        client.query('CREATE TABLE IF NOT EXISTS diadanh(madiadanh VARCHAR(40) PRIMARY KEY, tendiadanh VARCHAR(255))');
        client.query('CREATE TABLE IF NOT EXISTS anh(maanh serial PRIMARY KEY, url text, camnhan VARCHAR(350), sohuu VARCHAR(40), madiadanh VARCHAR(40), soluotthich INT,' +
                ' CONSTRAINT anh_nguoidung FOREIGN KEY (sohuu) REFERENCES nguoidung(tendangnhap),' +
                ' CONSTRAINT anh_diadanh FOREIGN KEY (madiadanh) REFERENCES diadanh(madiadanh)   )');
        client.query('CREATE TABLE IF NOT EXISTS theodoi(matheodoi serial PRIMARY KEY, nguoidung VARCHAR(40) , nguoitheodoi VARCHAR(40),'
                + ' CONSTRAINT user_follower FOREIGN KEY (nguoidung) REFERENCES nguoidung(tendangnhap), '
                + ' CONSTRAINT follower_user FOREIGN KEY (nguoitheodoi) REFERENCES nguoidung(tendangnhap) )');
        client.query('CREATE TABLE IF NOT EXISTS thich(mathich serial PRIMARY KEY, maanh INT, nguoithich VARCHAR(40), '
                + 'CONSTRAINT anh_thich FOREIGN KEY (maanh) REFERENCES anh(maanh), '
                + 'CONSTRAINT nguoidung_thich FOREIGN KEY (nguoithich) REFERENCES nguoidung(tendangnhap) )');

        
        client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['HG'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['HG', 'Hà Giang'])
                }
        });

         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['TH'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['TH', 'Thanh Hóa'])
                }
        });

         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['HN'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['HN', 'Hà Nội'])
                }
        });

         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['Hue'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['Hue', 'Hue'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['BB'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['BB', 'Bình Ba'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['DL'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['DL', 'Đà Lạt'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['TN'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['TN', 'Tây Ninh'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['HCM'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['HCM', 'Hồ Chí Minh'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['PY'], function(err, result) {
    
                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['PY', 'Phú Yên'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['BT'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['BT', 'Bình Thuận'])
                }
        });



         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['NT'], function(err, result) {
       
                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['NT', 'Nha Trang'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['HP'], function(err, result) {
 
                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['HP', 'Hải Phòng'])
                }
        });



         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['KT'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['KT', 'KonTum'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['CanTho'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['CanTho', 'Cần Thơ'])
                }
        });

         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['CaMau'], function(err, result) {
          
                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['CaMau', 'Cà Mau'])
                }
        });


         client.query('Select count(madiadanh) from diadanh where madiadanh = $1', ['BenTre'], function(err, result) {

                if (result.rows[0].count == 0) {
                        client.query('INSERT INTO diadanh values ($1,$2)', ['BenTre', 'Bến Tre'])
                }
        });

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

