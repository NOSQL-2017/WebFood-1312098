var pgp = require('pg-promise')();

var cn = {
    host: 'db',
    port: 5432,
    database: 'DoAnCuoiKi',
    user: 'pvDung',
    password: '123456'
};


module.exports = pgp(cn);
