var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var Anh = require('../models/anh');

var uriString = 'mongodb://dbmongo:27017';

mongoose.connect(uriString, function (err) { });

router.get('/', function (req, res) {
    var sohuu = req.query.sohuu;
    try {
        Anh.findOne({ sohuu: sohuu }, function (err, result) {
            if (err) {
                res.status(500).json(err);
            } else {
                if (result) {
                    var dsAnh = result.dsAnh || [];
                    res.status(201).json({ dsAnh });
                } else {
                    res.status(404).json({ message: 'Bạn chưa có hình nào cả.' })
                }
            }
        })
    } catch (error) {
        res.status(500).json(err);
    }

});



router.delete('/', function (req, res) {
    var maanh = req.query.maanh;
    var sohuu = req.query.sohuu
    if (maanh != null && sohuu != null) {
        Anh.update(
            { sohuu: sohuu },
            { $pull: { dsAnh: { maanh: maanh } } },
            { safe: true },
            function xoaAnh(err, result) {
                if (err) {
                    res.status(500).json(err);
                } else {
                    res.status(201).json({ success: true });
                }
            })
    } else {
        res.status(404).json({ message: 'Không truyền đúng dữ liệu' });
    }
})

router.post('/', function (req, res) {
    var maanh = req.body.maanh;
    var sohuu = req.body.sohuu;
    if (sohuu) {
        try {
            Anh.findOneAndUpdate(
                { sohuu: sohuu },
                {
                    $push: {
                        "dsAnh": {
                            maanh: maanh
                        }
                    }
                },
                { safe: true, upsert: true, new: true },
                function (err, model) {
                    if (err) {
                        res.status(500).json(err);
                    } else {
                        res.status(201).json({ success: true });
                    }
                }
            )
        } catch (error) {
            res.status(500).json(error);
        }
    } else {
        res.status(404).json({ message: 'Không có người sở hữu' });
    }


})


module.exports = router;