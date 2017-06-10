var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://dbneo4j:7474');



router.get('/countlike', function (req, res) {
    var query = 'MATCH (user:User)-[rel:like]->(img:Images {img_id: {images_id}}) RETURN COUNT(rel)';

    var params = {
        images_id: req.query.images_id
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) res.status(500).json({ err });
        else {
            var following = [];
            var others = [];
            res.status(201).json({ total: results['0']["COUNT(rel)"] });
        }
    });

})

router.get('/checklike', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}})-[rel:like]->(img:Images {img_id: {images_id}}) RETURN COUNT(rel)';

    var params = {
        thisUsername: req.query.username,
        images_id: req.query.images_id
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) res.status(500).json({ err });
        else {
            var following = [];
            var others = [];
            if (results['0']["COUNT(rel)"] == 0) {
                res.status(201).json({ like: false })
            } else {
                res.status(201).json({ like: true })
            }
        }

    });

})

router.delete('/unlike', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}}), (img:Images {img_id: {images_id}}) MERGE (user)-[rel:like]->(img) DELETE rel';

    var params = {
        thisUsername: req.query.username,
        images_id: req.query.images_id
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err) {
        if (!err) {
            res.status(201).json({success: true });
        } else {
            res.status(500).json({err});
        }
    });

})

router.post('/like', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}}), (img:Images {img_id: {images_id}}) MERGE (user)-[rel:like]->(img)';

    var params = {
        thisUsername: req.body.username,
        images_id: req.body.images_id
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err) {
        if (!err) {
            res.status(201).json({success: true });
        } else {
            res.status(500).json({err});
        }
    });

});

router.delete('/deleteimage', function (req, res) {
    var query = 'match (img:Images {img_id: {images_id}}) optional match ()-[r:like]->(img) delete r, img';
   
    var params = {
        images_id: req.query.images_id
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err) {
        if (!err) {
            res.status(201).json({success: true });
        } else {
            res.status(500).json({err});
        }
    });

})


router.post('/createimage', function (req, res) {
    var query = 'CREATE (im:Images {img_id: {images_id}}) RETURN im';
    var params = {
        images_id: req.body.images_id
    };

    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) {
            res.status(500).json({err});
        } else {
            res.status(201).json({ success: true });
        }
    });
});

module.exports = router;