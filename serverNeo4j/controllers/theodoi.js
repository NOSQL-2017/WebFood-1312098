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
        if (err) res.send({ message: "Failed", error: true });
        else res.send({ message: "Success", error: false, dsGoiYTheoDoi: results });
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
        if (err) res.status(404).send({ message: "Failed", error: true });
        else {
            var following = [];
            var others = [];
            for (var i = 0; i < results.length; i++) {
                following.push(results[i]['other'].properties);
            }
            res.send({ message: "Success", error: false, dsTheoDoi: following });
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
        if (err) res.status(404).send({ message: "Failed", error: true });
        else {
            var following = [];
            var others = [];
            if (err) {
                res.send({ message: "Failed", error: true });
            } else {
                res.send({ message: "Sucess", error: false, total: results['0']["COUNT(rel)"] })
            }
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
        if (err) res.send({ message: "Failed", error: true });
        else {
            var following = [];
            var others = [];
            if (err) {
                res.send({ message: "Failed", error: true });
            } else {
                res.send({ message: "Sucess", error: false, total: results['0']["COUNT(rel)"] })
            }

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
        if (err) res.send({ message: "Failed", error: true });
        else {
            var following = [];
            var others = [];
            if (results['0']["COUNT(rel)"] == 0) {
                res.send({ message: "Failed", error: true });
            } else {
                res.send({ message: "Sucess", error: false })
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
            res.send({ message: "success", error: false });
        } else {
            console.log("unfollow:", err);
            res.send({ message: "Success", error: true });
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
            res.send({ message: "success", error: false });
        } else {
            console.log("follow:", err);
            res.send({ message: "Success", error: true });
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
            console.log(err);
            res.send({ message: "failed", error: true });
        } else {
            res.send({ message: "success", error: false });
        }
        //console.log(results);
    });
});

module.exports = router;