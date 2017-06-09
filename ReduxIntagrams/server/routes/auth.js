import express from 'express';
import jwt from 'jsonwebtoken';
import config from '../config';

let cassandra = require('cassandra-driver');
let client = new cassandra.Client({ contactPoints: ['cassandra'] });
let useKS = "USE doancuoiki";

client.connect(function (err, result) {
  if (err) {
    console.log('Something wrong');
  } else {
    console.log('Cassandra connected: bao mat')
    client.execute(useKS, [], function (err, result) {
    })
  }
});


let router = express.Router();


var login = 'SELECT username from doancuoiki.users where username=? and password=? ALLOW FILTERING';
router.post('/', (req, res) => {
  const { identifier, password } = req.body;

  client.execute(login, [identifier, password], function (err, result) {
    if (err) {
      res.status(500).send({ erros: err });
    } else {
      if (result.rows['0'] != null) {
        console.log(result);
        const token = jwt.sign({
          username: result.rows['0'].username
        }, config.jwtSecret);
        res.json({ token });
      }
      else {
        res.status(401).json({ errors: { form: 'Invalid Credentials' } });
      }
    }
  })

});

export default router;
