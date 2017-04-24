var express = require('express'),
    router = express.Router();

var db = require('../db');

router.post('/', function(req, res) {
    if (!req.body.tenDangNhap) {
        return res.json({
            message: 'Ten dang nhap trong',
            error: true
        })
    }
    var sco;
    var kq = 0;
    db.connect()
        .then(obj => {
            sco = obj;
            return sco.any('SELECT count(username) as number FROM USERS WHERE username=$1 and matkkhau=$2',[req.body.tenDangNhap, req.body.matKhau])
            
        })
        .then (data => {
            //console.log(data[0].number);
            if (data[0].number == '1')
                res.send({message: 'Success', error: false})
            else if (data[0].number == '0') {
                res.send({message: 'Fail', error: true});
            }
            sco.done();
            
        })
        .catch(error => {
        // error
        })
    console.log(kq);
    console.log("done 1")
    
});



module.exports = router;