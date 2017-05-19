var express = require('express');
var router = express.Router();

var cassandra = require('cassandra-driver');
var client = new cassandra.Client({ contactPoints: ['cassandra'] });
var useKS = "USE doancuoiki"
var createTB = "create table if not EXISTS nguoidung (tendangnhap varchar, matkhau varchar,hoten varchar, email varchar, anhdaidien text, gioithieu text, capdo varchar,PRIMARY KEY (tendangnhap));"
var createkeyspace = "CREATE KEYSPACE IF NOT EXISTS doancuoiki WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};"

client.connect(function (err, result) {
    if (err) {
        console.log('Something wrong');
    } else {
        console.log('Cassandra connected: nguoidung')
            client.execute(createkeyspace, [], function (err, result) {
                client.execute(useKS, [], function (err, result) {
                    client.execute(createTB,[] ,function(err) {})
            })
        })
    }
});


var themnguoidung = 'INSERT INTO doancuoiki.nguoidung(tendangnhap,matkhau,hoten,email,anhdaidien,gioithieu, capdo) values(?,?,?,?,?,?,?)';
router.post('/signup', function (req, res) {
    var tendangnhap = req.body.tendangnhap;
    var matkhau = req.body.matkhau;
    var hoten = req.body.hoten;
    var email = req.body.email;
    var anhdaidien = req.body.anhdaidien || null;
    var gioithieu = req.body.gioithieu || null;
    var capdo = "0";
    console.log(tendangnhap);
    client.execute(themnguoidung, [tendangnhap, matkhau, hoten, email, anhdaidien, gioithieu, capdo], function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ message: err, error: true });
        } else {
            res.status(200).send({ message: 'Success', error: false });
        }
    })
})


var laythongtin = 'SELECT hoten,email,anhdaidien,gioithieu,capdo FROM  doancuoiki.nguoidung WHERE tendangnhap=? '
router.get('/', function (req, res) {

    var tendangnhap = req.query.tendangnhap;    
    client.execute(laythongtin, [tendangnhap], function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ message: err, error: true });
        } else {
            res.status(200).send({ message: 'Success', error: false, nguoidung: result.rows });
        }
    })
})


var login = 'SELECT count(*) as COUNT from doancuoiki.nguoidung where tendangnhap=? and matkhau=? ALLOW FILTERING';
router.post('/login', function (req, res) {

    var tendangnhap = req.body.tendangnhap;
    var matkhau = req.body.matkhau;

    client.execute(login, [tendangnhap, matkhau], function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({message: err, error: true});
        } else {
            if (result.rows['0'].count == "1")
                res.status(200).send({ message: 'Success', error: false, check: true });
            else {
                res.status(200).send({ message: 'Success', error: false, check: false });
            }
        }
    })
})


var capnhapanhdaidien = 'update doancuoiki.nguoidung set anhdaidien = ? where tendangnhap = ? ';
router.post('/capnhapanhdaidien', function (req, res) {

    var tendangnhap = req.body.tendangnhap;
    var anhdaidien = req.body.url;

    client.execute(capnhapanhdaidien, [anhdaidien, tendangnhap], function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ message: err, error: true });
        } else {
            res.status(200).send({ message: 'Success', error: false });
        }
    })
})

var capnhaptrangthai = 'update doancuoiki.nguoidung set gioithieu = ? where tendangnhap = ?';

router.post('/capnhaptrangthai', function (req, res) {

    var tendangnhap = req.body.tendangnhap;
    var trangthai = req.body.trangthai;

    client.execute(capnhapanhdaidien, [trangthai, tendangnhap], function (err, result) {
        if (err) {
            console.log(err);
            res.status(404).send({ message: err, error: true });
        } else {
            res.status(200).send({ message: 'Success', error: false });
        }
    })
})


module.exports = router;