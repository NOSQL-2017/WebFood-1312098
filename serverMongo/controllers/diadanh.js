var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var diaDanh = require('../models/diadanh');

var uriString = 'mongodb://dbmongo:27017';

mongoose.connect(uriString, function(err) {});

router.get('/laydsDiaDanh', function(req, res) {
    diaDanh.find({}, function(err, diadanh) {
        if (err) {
            res.send({ message: 'Failed', error: true});
        } else {
            var dsDiaDanh = [];
            if (diadanh.length > 0) {
                diadanh.forEach(function(dd) {
                    dsDiaDanh.push({
                        madiadanh: dd.madiadanh,
                        tendiadanh: dd.tendiadanh
                    })
                })
            }

            res.send({ message: 'Success', error: false, dsDiaDanh: dsDiaDanh});
        }
    })
});

router.get('/layDiaDanhTheoMa', function(req, res) {
    diaDanh.findOne({madiadanh: req.query.madiadanh}, function(err, result) {
        if (err) {
            res.send({message: 'Failed', error: true});
        } else {
            res.send({message: "Success", error: false, tendiadanh: result.tendiadanh})
        }
    })
})

router.get('/laydsAnh', function(req, res) {
    var madiadanh = req.query.madiadanh;
    diaDanh.find({madiadanh: madiadanh}, function(err, diadanh) {
        if (err) {
            res.send({ message: 'Failed', error: true});
        } else {
            var dsAnh = diadanh.dsAnh;
            res.send({message: "Success", error: false, dsAnh: dsAnh});
        }
    })
});

router.post('/luuDiaDanh', function(req, res) {
    var madiadanh = req.body.madiadanh;
    var tendiadanh = req.body.tendiadanh;

    diaDanh.find({madiadanh: madiadanh}, function(err, diadanh) {
        if (err) {
            res.send({ message: 'Failed', error: true});
        } else {
            if (!diadanh) {
                res.send({ message: 'Failed', error: true});
            } else {
                var dd = new diaDanh({
                    madiadanh: madiadanh,
                    tendiadanh: tendiadanh
                });

                diaDanh.create(dd, function(err, diadanhmoi) {
                    if (err) {
                        res.send({ message: 'Failed', error: true});
                    } else {
                        res.send({message: "Success", error: false});
                    }
                })
            }
        }
    })
});


router.delete('/xoadiadanh', function(req, res) {
    var madiadanh = req.query.madiadanh;
    diaDanh.findOneAndRemove({madiadanh: madiadanh}, function(err) {
        if (err) {
            res.send({ message: 'Failed', error: true });
        } else {
            res.send({ message: 'Success', error: false });
        }
    })
})

router.post('/luuAnhVaoDiaDanh', function(req, res) {
    var maanh = req.body.maanh;
    var url = req.body.url;
    var madiadanh = req.body.madiadanh;
    var sohuu = req.body.sohuu;

    diaDanh.findOneAndUpdate(
        {madiadanh: madiadanh},
        {$push: {"dsAnh": {
            maanh: maanh,
            url: url,
            sohuu: sohuu
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