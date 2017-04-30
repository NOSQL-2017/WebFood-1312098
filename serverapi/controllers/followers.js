var express = require('express');
var router = express.Router();


var db = require('../db');

router.get('/', function(req, res) {
    var tendangnhap = req.query.tendangnhap;

    db.any('SELECT nguoitheodoi FROM theodoi where nguoidung=$1 ',[tendangnhap])
        .then(function(data) {
             res.send({message: 'Success', error: false, dsNguoiDangTheoDoi: data});
        })
        .catch(function(error) {
        });
})

router.get('/dem', function(req, res) {
    var nguoitheodoi = req.query.nguoitheodoi;

    db.any('SELECT count(nguoidung) FROM theodoi where nguoitheodoi=$1 ',[nguoitheodoi])
        .then(function(data) {
             res.send({message: 'Success', error: false, soLuong: data['0'].count});
        })
        .catch(function(error) {
        });
})

router.post('/', function(req, res) {
    var tenDangNhap = req.body.nguoitheodoi;
    var follower = req.body.nguoidung;

     db.any('INSERT into theodoi (nguoidung, nguoitheodoi) values ($1, $2)',[tenDangNhap, follower])
        .then(function(data) {
             res.send({message: 'Success', error: false});
        })
        .catch(function(error) {
        });
});


router.delete('/', function(req, res) {
    var tenDangNhap = req.query.nguoitheodoi;
    var follower = req.query.nguoidung;

     db.any('DELETE FROM theodoi  where nguoidung = $1 and nguoitheodoi = $2',[tenDangNhap, follower])
        .then(function(data) {
             res.send({message: 'Success', error: false});
        })
        .catch(function(error) {
        });

});

module.exports = router;