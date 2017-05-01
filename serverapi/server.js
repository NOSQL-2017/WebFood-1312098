var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var db = require('./db');
db.any('CREATE TABLE IF NOT EXISTS nguoidung(tendangnhap VARCHAR(40) PRIMARY KEY,matkhau VARCHAR(40), tennguoidung VARCHAR(40), email VARCHAR(40))')
        .then(function(data) {    
        })
        .catch(function(error) {
        });

db.any('CREATE TABLE IF NOT EXISTS diadanh(madiadanh VARCHAR(40) PRIMARY KEY, tendiadanh VARCHAR(255))')
        .then(function(data) {  
        })
        .catch(function(error) {
        });


db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['HG']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['HG', 'Hà Giang'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['TH']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['TH', 'Thanh Hóa'])
        }
})


db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['HCM']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['HCM', 'Hồ Chí Minh'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['HN']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['HN', 'Hà Nội'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['DL']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['DL', 'Đà Lạt'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['KT']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['KT', 'KonTum'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['TN']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['TN', 'Tây Ninh'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['NT']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['NT', 'Nha Trang'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['DN']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['DN', 'Đà Nẵng'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['H']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['H', 'Huế'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['PY']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['PY', 'Phú Yên'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['BinhThuan']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['BinhThuan', 'Bình Thuận'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['BenTre']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['BenTre', 'Bến Tre'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['CanTho']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['CanTho', 'Cần Thơ'])
        }
})

db.any('Select count(madiadanh) from diadanh where madiadanh = $1',['QuyNhon']).then(function(data) {
        if (data['0'].count == 0) {
                db.any('INSERT INTO diadanh values ($1,$2)',['QuyNhon', 'Quy Nhơn'])
        }
})


db.any('CREATE TABLE IF NOT EXISTS anh(maanh serial PRIMARY KEY, url text, camnhan VARCHAR(350), sohuu VARCHAR(40), madiadanh VARCHAR(40), soluotthich INT,'+ 
                ' CONSTRAINT anh_nguoidung FOREIGN KEY (sohuu) REFERENCES nguoidung(tendangnhap),'+ 
                ' CONSTRAINT anh_diadanh FOREIGN KEY (madiadanh) REFERENCES diadanh(madiadanh)   )')
        .then(function(data) {
        })
        .catch(function(error) {
        });

db.any('CREATE TABLE IF NOT EXISTS theodoi(matheodoi serial PRIMARY KEY, nguoidung VARCHAR(40) , nguoitheodoi VARCHAR(40),'
            +   ' CONSTRAINT user_follower FOREIGN KEY (nguoidung) REFERENCES nguoidung(tendangnhap), '
            +   ' CONSTRAINT follower_user FOREIGN KEY (nguoitheodoi) REFERENCES nguoidung(tendangnhap) )')
        .then(function(data) {  
        })
        .catch(function(error) {
        });

db.any('CREATE TABLE IF NOT EXISTS thich(mathich serial PRIMARY KEY, maanh INT, nguoithich VARCHAR(40), '
        + 'CONSTRAINT anh_thich FOREIGN KEY (maanh) REFERENCES anh(maanh), ' 
         + 'CONSTRAINT nguoidung_thich FOREIGN KEY (nguoithich) REFERENCES nguoidung(tendangnhap) )')
        .then(function(data) {  
        })
        .catch(function(error) {
        });app.use(bodyParser.json());






app.use(function(req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE');
    res.header('Access-Control-Allow-Headers','Content-Type');

    next();
});

app.use(require('./controllers'));

app.listen('8080', function() {
    console.log('Sever is running');
});