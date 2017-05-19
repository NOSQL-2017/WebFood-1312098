var express = require('express');
var router = express.Router();
var redis = require('redis');
client = redis.createClient('http://dbredis:6379');

client.on("error", function (err) {
    console.log("Error " + err);
});


router.get('/',function(req, res) {
    var maanh = req.query.maanh;
    client.get(maanh, function(err, reply) {
        var data = JSON.parse(reply) || {}
        res.send({message: "Success", error: false, data: data});
    });
})


router.post('/', function(req, res) {
    var maanh = req.body.maanh;
    var thongtinanh = JSON.stringify(req.body.thongtinanh);

    client.set(maanh, thongtinanh,function(error, reply) {
        if (error) {
            console.log(error);
            res.send(404).send({message: "Failed", error: true})
        } else res.status(200).send({message: "Success", error: false});
    });
    
})


module.exports = router;