var express = require('express'),
    router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
    var tenDangNhap = req.query.tendangnhap;
    db.any('SELECT tendangnhap, tennguoidung, email  FROM nguoidung where tendangnhap != $1 and not EXISTS (SELECT 1 from theodoi where nguoidung=$1 and nguoitheodoi=tendangnhap)', [tenDangNhap])
        .then(function(data) {
             res.send({message: 'Success', error: false, dsGoiYTheoDoi: data});
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
                db.any('INSERT INTO nguoidung(tendangnhap, matkhau, tennguoidung, email) values($1, $2, $3, $4)',[req.body.tendangnhap, req.body.matkhau,req.body.hoten, req.body.email])
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