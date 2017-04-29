var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
    var tendangnhap = req.query.sohuu;

    db.any('SELECT maanh,url,camnhan,sohuu, madiadanh, soluotthich  FROM anh where sohuu=$1',[tendangnhap])
        .then(function(data) {
             res.send({message: 'Success', error: false, dsAnhDaLuu: data});
        })
        .catch(function(error) {

        });
})

router.post('/', function(req, res) {


        db.any('INSERT INTO anh(url,camnhan,sohuu, madiadanh, soluotthich) VALUES($1, $2, $3, $4, $5)', [req.body.url, req.body.camnhan,req.body.sohuu,req.body.diadanh,0])
            .then(function(data) {
                res.send({message: 'Success', error: false})
            })
            .catch(function(error) {

            });

});

router.delete('/', function(req, res) {

        db.any('DELETE FROM anh where maanh=$1 ', [req.query.maanh])
            .then(function(data) {
                res.send({message: 'Success', error: false})
            })
            .catch(function(error) {

            });
});



module.exports = router;