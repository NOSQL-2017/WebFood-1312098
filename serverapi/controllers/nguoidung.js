var express = require('express'),
    router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
    var tenDangNhap = req.query.tendangnhap;
    db.any('SELECT tendangnhap, tennguoidung, email, gioithieu, url  FROM nguoidung where tendangnhap = $1', [tenDangNhap])
        .then(function(data) {
             res.send({message: 'Success', error: false, nguoidung: data});
        })
        .catch(function(error) {
        });
});


router.post('/signup', function(req, res) {
    db.any('SELECT count(tendangnhap) as number FROM nguoidung WHERE tendangnhap=$1',[req.body.tendangnhap])
        .then(function(data) {
            if (data[0].number == '1')
                res.send({message: 'failed', error: true})
            else if (data[0].number == '0') {
                db.any('INSERT INTO nguoidung(tendangnhap, matkhau, tennguoidung, email,url, gioithieu) values($1, $2, $3, $4,$5,$6)',[req.body.tendangnhap, req.body.matkhau,req.body.hoten, req.body.email,null,null])
                    .then(function(data) {
                        res.send({message: 'Success', error: false});
                    })
                    .catch(function(error) {
                    });            
            };
        })
        .catch(function(error) {
        });
});

router.post('/capnhapanhdaidien', function(req, res) {
    console.log(req.body.tendangnhap)
    db.any('UPDATE nguoidung set url=$1 where tendangnhap=$2',[req.body.url, req.body.tendangnhap])
        .then(function(data) {
            res.send({message: 'Success', error: false});
        })
})

router.post('/login', function(req, res) {

     db.any('SELECT count(tendangnhap) as number FROM nguoidung WHERE tendangnhap=$1 and matkhau=$2',[req.body.tendangnhap, req.body.matkhau])
        .then(function(data) {
             if (data[0].number == '1')
                res.send({message: 'Success', error: false})
            else if (data[0].number == '0') {
                res.send({message: 'Failed', error: true});
            }
        })
        .catch(function(error) {
        });
    
});

module.exports = router;