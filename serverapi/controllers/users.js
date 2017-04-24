var express = require('express'),
    router = express.Router();

var db = require('../db');


router.get('/', function(req, res) {
    var tenDangNhap = req.query.tenDangNhap;
    db.connect()
        .then(obj => {
            sco = obj;
            return sco.any('SELECT username, tennguoidung, email  FROM USERS where username != $1', [tenDangNhap])
        })
        .then (data => {
           res.send({message: 'Success', error: false, users: data});
           obj.done();
        })
        .catch(error => {

        })
});

router.post('/', function(req, res) {
    if (!req.body.tenDangNhap) {
        return res.json({
            message: 'Ten dang nhap trong',
            error: true
        })
    }
    db.connect()
        .then(obj => {
            sco = obj;
            return sco.any('SELECT count(username) as number FROM USERS WHERE username=$1',[req.body.tenDangNhap]);
            
        })
        .then (data => {
            //console.log(data[0].number);
            if (data[0].number == '1')
                res.send({message: 'failed', error: true})
            else if (data[0].number == '0') {
                sco.any('INSERT INTO USERS(username, matkkhau, tennguoidung,email) values($1, $2, $3, $4)',[req.body.tenDangNhap, req.body.matKhau,req.body.hoTen, req.body.email]);
                res.send({message: 'Success', error: false});
            };
            obj.done();
        })
        .catch(error => {
        // error
        })
});
module.exports = router;