var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var diaDanh = require('../models/anh');

var uriString = 'mongodb://dbmongo:27017';

mongoose.connect(uriString, function(err) {});

router.get('/', function(req, res) {
    var sohuu = req.query.sohuu;
    diaDanh.find({sohuu: sohuu}, function(err, result) {
        if (err) {
            res.send({ message: 'Failed', error: true});
        } else {
            var dsAnh = result.dsAnh || [];
            res.send({message: "Success", error: false, dsAnh: dsAnh});
        }
    })
});



router.delete('/', function(req, res) {
    var maanh = req.query.maanh;
    diaDanh.findOneAndRemove({"dsAnh.maanh": maanh}, function(err) {
        if (err) {
            res.send({ message: 'Failed', error: true });
        } else {
            res.send({ message: 'Success', error: false });
        }
    })
})

router.post('/', function(req, res) {
    var maanh = req.body.maanh;
    var sohuu = req.body.sohuu;

    diaDanh.findOneAndUpdate(
        {sohuu: sohuu},
        {$push: {"dsAnh": {
            maanh: maanh
        }}},
        {safe: true, upsert: true, new: true},
        function(err, model) {
            if (err) {
                    res.send({message: 'Failed', error: true});
                } else {
                    res.send({message: 'Success', error: false});
                }
        }
    )
})


module.exports = router;