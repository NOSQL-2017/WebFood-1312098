var express = require('express');
var router = express.Router();

var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
    host: 'http://esdb:9200',
    log: 'trace'
});

router.get('/', function(req, res) {
    var tennguoidung = req.query.tennguoidung;
    client.search({
        index: 'doancuoiki',
        type: 'users',
        body: {
            query: {
                match: {
                    tennguoidung: tennguoidung
                }
            }
        }
        }).then(function (resp) {
            var hits = resp.hits.hits;
            res.status(200).send({message: "Success", error: false, dsTimKiem: hits});
        }, function (err) {
            res.status(404).send({message: "Failed", error: true});
            console.trace(err.message);
        });
});

router.post('/', function(req, res) {
    var tennguoidung = req.body.tennguoidung;
    var tendangnhap = req.body.tendangnhap;
    client.index({
        index: 'doancuoiki',
        type: 'users',
        body: {
            tendangnhap: tendangnhap,
            tennguoidung: tennguoidung,
            post_date: new Date()
        },
        refresh: true
        }, function( err, result ) {
            if (err) {
                res.status(404).send({message: "Failed", error: true});
            } else {
                res.status(200).send({message: "Success", error: false})
            }
        });
});



module.exports = router;