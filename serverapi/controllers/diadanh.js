var express = require('express');
var router = express.Router();

var db = require('../db');

router.get('/', function(req, res) {
    db.any('SELECT madiadanh, tendiadanh  FROM diadanh')
        .then(function(data) {
             res.send({message: 'Success', error: false, dsDiaDanh: data});
        })
        .catch(function(error) {

        });
})

router.get('/id', function(req, res) {
    var madiadanh = req.query.madiadanh;

    db.any('SELECT tendiadanh  FROM diadanh where madiadanh=$1',[madiadanh])
        .then(function(data) {
             res.send({message: 'Success', error: false, tendiadanh: data});
        })
        .catch(function(error) {

        });
})




module.exports = router;