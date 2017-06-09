var express = require('express');
var router = express.Router();
var uuid = require('node-uuid');
var neo4j = require('neo4j');
var db = new neo4j.GraphDatabase('http://dbneo4j:7474');

router.get('/suggestfollowing', function (req, res) {
    var query = 'MATCH (user:User {username: {thisusername}})-[rel:follows]->(other:User), (other)-[r:follows]->(fof:User) where fof <>user and not (user)-[follows]->(fof) return distinct fof.username'
    var params = {
        thisUsername: req.query.username
    };
    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) res.status(500).json({ err });
        else res.status(201).json({ dsGoiYTheoDoi: results });
    });
})

router.get('/getfollowing', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}})-[rel:follows]->(other:User) RETURN other';
    var params = {
        thisUsername: req.query.username
    };
    var user = this;
    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) res.status(500).send({ err });
        else {
            var following = [];
            var others = [];
            for (var i = 0; i < results.length; i++) {
                following.push(results[i]['other'].properties);
            }
            res.status(201).json({ dsTheoDoi: following });
        }
    });
})

router.get('/countFollowers', function (req, res) {
    var query = 'MATCH (user:User)-[rel:follows]->(other:User {username: {otherUsername}}) RETURN COUNT(rel)';
    var params = {
        otherUsername: req.query.otherusername
    };
    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) res.status(500).json({ err });
        else {
            var following = [];
            var others = [];
            res.status(201).json({ total: results['0']["COUNT(rel)"] })
        }
    });
})

router.get('/countFollowing', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}})-[rel:follows]->(other:User) RETURN COUNT(rel)';

    var params = {
        thisUsername: req.query.username
    };
    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) res.status(500).json({ err });
        else {
            var following = [];
            var others = [];
            res.status(201).json({ total: results['0']["COUNT(rel)"] })
        }
    });
})

router.get('/checkfollowing', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}})-[rel:follows]->(other:User {username: {otherUsername}}) RETURN COUNT(rel)';

    var params = {
        thisUsername: req.query.username,
        otherUsername: req.query.otherusername
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
                res.status(201).json({ follow: false })
            } else {
                res.status(201).json({ follow: true })
            }
        }
    });
})

router.delete('/unfollow', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}}), (other:User {username: {otherUsername}}), (user) -[rel:follows]-> (other) DELETE rel';

    var params = {
        thisUsername: req.query.username,
        otherUsername: req.query.otherusername,
    };
    db.cypher({
        query: query,
        params: params,
    }, function (err) {
        if (!err) {
            res.status(201).json({ success: true });
        } else {
            res.status(500).json({ err });
        }
    });

})

router.post('/follow', function (req, res) {
    var query = 'MATCH (user:User {username: {thisUsername}}), (other:User {username: {otherUsername}}) MERGE (user)-[rel:follows]->(other)';

    var params = {
        thisUsername: req.body.username,
        otherUsername: req.body.otherusername,
    };
    db.cypher({
        query: query,
        params: params,
    }, function (err) {
        if (!err) {
            res.status(201).json({ success: true });
        } else {
            res.status(500).json({ err });
        }
    });

});



router.post('/createuser', function (req, res) {
    var query = 'CREATE (user:User {username: {thisusername}}) RETURN user';
    console.log(req.body.username);
    var params = {
        thisusername: req.body.username
    };
    db.cypher({
        query: query,
        params: params,
    }, function (err, results) {
        if (err) {
            res.status(500).json({ err });
        } else {
            res.status(201).json({ success: true });
        }
    });
});

module.exports = router;