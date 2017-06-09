var express = require('express');
var router = express.Router();
var redis = require('redis');
client = redis.createClient('http://dbredis:6379');

client.on("error", function (err) {
    console.log("Error " + err);
});


router.get('/', function (req, res) {
    var maanh = req.query.maanh;
    client.get(maanh, function (err, reply) {
        if (err) {
            res.send(500).json(err);
        } else {
            if (reply != null) {
                var data = JSON.parse(reply) || {}
                res.status(201).json({ info: data });
            } else {
                res.status(404).json({ message: 'Không tìm thấy' });
            }
        }
    });
})


router.post('/', function (req, res) {
    var maanh = req.body.maanh;
    var thongtinanh = JSON.stringify(req.body.thongtinanh);

    client.set(maanh, thongtinanh, function (error, reply) {
        if (error) {
            res.send(500).json(error);
        } else {
            if (reply != null) {
                res.status(201).json({ success: true });
            } else {
                res.status(404).json({ message: 'Tạo thất bại' });
            }
        }
    });
})

router.delete('/', function (req, res) {
    var maanh = req.query.maanh;

    client.del(maanh, function (error, reply) {
        if (error) {
            res.send(500).json(error);
        } else {
            if (reply != null) {
                res.status(201).json({ success: true });
            } else {
                res.status(404).json({ message: 'Xóa thất bại' });
            }
        }
    });
})


module.exports = router;