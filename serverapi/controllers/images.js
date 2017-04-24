var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
    var tenDangNhap = req.query.tenDangNhap;
    console.log(tenDangNhap);
     db.connect()
        .then(obj => {
            sco = obj;
            return sco.any('SELECT url, username  FROM images where username=$1',[tenDangNhap]);
            
        })
        .then (data => {
           res.send({message: 'Success', error: false, images: data});
           sco.done();
        })
        .catch(error => {

        })
})

router.post('/', function(req, res) {
    var files = req.body.urls;
    var tenDangNhap = req.body.username;
    var sco;
    var kq = 0;
    
    db.connect()
        .then(obj => {
            sco = obj;
            files.forEach( (file) => {
                sco.any('INSERT INTO IMAGES(url, username, place_id) VALUES($1, $2, $3)', [file.secure_url,tenDangNhap, null]);
            })
            sco.done(); 
        })
        .then (data => {
            //console.log(data[0].number);
            
             res.send({message: 'Success', error: false})
        })
        .catch(error => {
             res.send({message: 'failed', error: true})
        })
    //res.send({message: 'Success', error: false});
});


router.post('/get', function(req, res) {
    console.log(req.body.username);
    db.connect()
        .then(obj => {
            sco = obj;
           return sco.any('select url from images where username = $1', [req.body.username]);
          
        })
        .then (data => {
            //console.log(data[0].number);
             res.send({message: 'Success', error: false, images: data});
              sco.done();
        })
        .catch(error => {
             res.send({message: 'failed', error: true})
        })
    //res.send({message: 'Success', error: false});
});
module.exports = router;