var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

var diaDanh = require('../models/diadanh');

var uriString = 'mongodb://dbmongo:27017';

mongoose.connect(uriString, function (err) { });

router.get('/laydsDiaDanh', function (req, res) {
    diaDanh.find({}, function (err, diadanh) {
        if (err) {
            res.status(500).json({ message: err });
        } else {
            var dsDiaDanh = [];
            if (diadanh.length > 0) {
                diadanh.forEach(function (dd) {
                    dsDiaDanh.push({
                        madiadanh: dd.madiadanh,
                        tendiadanh: dd.tendiadanh
                    })
                })
            }
            res.status(201).json({ dsDiaDanh });
        }
    })
});

router.get('/layDiaDanhTheoMa', function (req, res) {
    diaDanh.findOne({ madiadanh: req.query.madiadanh }, function (err, result) {
        if (err) {
            res.status(500).send({ message: err });
        } else {
            if (result != null) {
                res.status(404).json({ message: 'Không tìm thấy' })
            } else {
                res.status(201).json({ tendiadanh: result.tendiadanh })
            }

        }
    })
})

router.get('/laydsAnh', function (req, res) {
    var madiadanh = req.query.madiadanh;
    diaDanh.find({ madiadanh: madiadanh }, function (err, diadanh) {
        if (err) {
            res.status(500).json({ message: err});
        } else {
            if (diadanh != null) {
                var dsAnh = diadanh.dsAnh;
                res.status(201).json({dsAnh});
            } else {
                res.status(404).json({message: 'Không có ds ảnh nào'})
            }

        }
    })
});

router.post('/luuDiaDanh', function (req, res) {
    var madiadanh = req.body.madiadanh;
    var tendiadanh = req.body.tendiadanh;

    diaDanh.find({ madiadanh: madiadanh }, function (err, diadanh) {
        if (err) {
            res.status(500).json({ message: err});
        } else {
            if (!diadanh) {
                res.status(404).json({ message: 'Địa danh đã tồn tại' });
            } else {
                var dd = new diaDanh({
                    madiadanh: madiadanh,
                    tendiadanh: tendiadanh
                });

                diaDanh.create(dd, function (err, diadanhmoi) {
                    if (err) {
                        res.status(500).json({ message: err});
                    } else {
                        res.status(201).json({success: true})
                    }
                })
            }
        }
    })
});


router.delete('/xoadiadanh', function (req, res) {
    var madiadanh = req.query.madiadanh;
    diaDanh.findOneAndRemove({ madiadanh: madiadanh }, function (err) {
        if (err) {
            res.status(500).json({ message: err});
        } else {
            res.status(201).json({success: true});
        }
    })
})

router.delete('/xoaanhdiadanh', function (req, res) {
    var maanh = req.query.maanh;
    diaDanh.findOneAndRemove({ "dsAnh.maanh": maanh }, function (err) {
        if (err) {
            res.status(500).json({ message: err});
        } else {
            res.status(201).json({success: true});
        }
    })
})

router.post('/luuAnhVaoDiaDanh', function (req, res) {
    var maanh = req.body.maanh;
    var url = req.body.url;
    var madiadanh = req.body.madiadanh;
    var sohuu = req.body.sohuu;
    if (madiadanh != null && url != null && maanh != null && sohuu != null ) {
        diaDanh.findOneAndUpdate(
        { madiadanh: madiadanh },
        {
            $push: {
                "dsAnh": {
                    maanh: maanh,
                    url: url,
                    sohuu: sohuu
                }
            }
        },
        { safe: true, upsert: true, new: true },
        function (err, model) {
            if (err) {
                res.status(500).json(err);
            } else {
                if (model != null) {
                    res.status(201).json({ success: true });
                } else {
                    res.status(404).json({message: 'Không lưu được ảnh' });
                }
                
            }
        }
    )
    } else {
        res.status(404).json({message: 'Không truyền đúng dữ liệu' });
    }
   
})


module.exports = router;