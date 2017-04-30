var express = require('express');
var router = express.Router();


var db = require('../db');

router.get('/dem', function(req, res) {

    db.any('SELECT COUNT(mathich) FROM thich where maanh=$1 ',[req.query.maanh])
        .then(function(data) {
             res.send({message: 'Success', error: false, soluotthich: data['0'].count});
        })
        .catch(function(error) {
        });
})

router.get('/kiemtra', function(req, res) {

    db.any('SELECT COUNT(mathich) FROM thich where maanh=$1 and nguoithich=$2 ',[req.query.maanh, req.query.nguoithich])
        .then(function(data) {
                if (data['0'].count == 0)
                    res.send({message: 'Success', error: false, isLike: false});
                else 
                    res.send({message: 'Success', error: false, isLike: true});
        })
        .catch(function(error) {
        });
})



router.post('/', function(req, res) {
     db.any('INSERT into thich (maanh, nguoithich ) values ($1, $2)',[req.body.maanh, req.body.nguoithich])
        .then(function(data) {
             res.send({message: 'Success', error: false});
        })
        .catch(function(error) {
        });
});


router.delete('/', function(req, res) {
     db.any('DELETE FROM thich  where maanh = $1 and nguoithich = $2',[req.query.maanh, req.query.nguoithich])
        .then(function(data) {
             res.send({message: 'Success', error: false});
        })
        .catch(function(error) {
        });

});

module.exports = router;