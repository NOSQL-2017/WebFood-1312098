var express = require('express');
var router = express.Router();


var db = require('../db');

router.get('/', function(req, res) {
    var tendangnhap = req.query.tendangnhap;

    db.any('SELECT nguoitheodoi FROM theodoi where nguoidung=$1',[tendangnhap])
        .then(function(data) {
             res.send({message: 'Success', error: false, dsNguoiTheoDoi: data});
        })
        .catch(function(error) {
        });
})

router.post('/', function(req, res) {
    var tenDangNhap = req.body.tendangnhap;
    var follower = req.body.nguoitheodoi;

     db.any('INSERT into theodoi (nguoidung, nguoitheodoi) values ($1, $2)',[tenDangNhap, follower])
        .then(function(data) {
             res.send({message: 'Success', error: false});
        })
        .catch(function(error) {
        });
});


router.delete('/', function(req, res) {
    var tenDangNhap = req.query.tendangnhap;
    var follower = req.query.nguoitheodoi;

     db.any('DELETE FROM theodoi  where nguoidung = $1 and nguoitheodoi = $2',[tenDangNhap, follower])
        .then(function(data) {
             res.send({message: 'Success', error: false});
        })
        .catch(function(error) {
        });

});

module.exports = router;