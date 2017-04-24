var express = require('express');
var router = express.Router();


var db = require('../db');

router.get('/', function(req, res) {
    var tenDangNhap = req.query.tenDangNhap;
    console.log(tenDangNhap);
     db.connect()
        .then(obj => {
            sco = obj;
            return sco.any('SELECT follower  FROM followers where username=$1',[tenDangNhap]);
            sco.done();
        })
        .then (data => {
           res.send({message: 'Success', error: false, followers: data});
           sco.done();
        })
        .catch(error => {

        })
})

router.post('/', function(req, res) {
    var tenDangNhap = req.body.tenDangNhap;
    var follower = req.body.follower;
     db.connect()
        .then(obj => {
            sco = obj;
            sco.any('INSERT into followers (username, follower) values ($1, $2)',[tenDangNhap, follower]);
            sco.done();
        })
        .then (data => {
           res.send({message: 'Success', error: false});
        })
        .catch(error => {

        })
});


router.delete('/', function(req, res) {
    var tenDangNhap = req.query.tenDangNhap;
    var follower = req.query.follower;
     db.connect()
        .then(obj => {
            sco = obj;
            sco.any('DELETE FROM followers  where username = $1 and follower = $2',[tenDangNhap, follower]);
            sco.done();
        })
        .then (data => {
           res.send({message: 'Success', error: false});
        })
        .catch(error => {

        })
});




module.exports = router;