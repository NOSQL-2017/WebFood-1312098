import express from 'express';
import commonValidations from '../shared/validations/signup';
// import bcrypt from 'bcrypt';
import isEmpty from 'lodash/isEmpty';
import cassandra from 'cassandra-driver';
import jwt from 'jsonwebtoken';
import config from '../config';

// import User from '../models/user';
let client = new cassandra.Client({ contactPoints: ['cassandra'] });
let useKS = "USE doancuoiki"
let createTB = "create table if not EXISTS users(username varchar, password varchar, email varchar,image text,role varchar,PRIMARY KEY (username));"
let createkeyspace = "CREATE KEYSPACE IF NOT EXISTS doancuoiki WITH REPLICATION = {'class': 'SimpleStrategy', 'replication_factor': 1};"
let createAdmin = 'INSERT INTO doancuoiki.users(username,password,role) values(?,?,?)';

client.connect(function (err, result) {
  if (err) {
    console.log('Something wrong');
  } else {
    console.log('Cassandra connected: User')
    client.execute(createkeyspace, [], function (err, result) {
      client.execute(useKS, [], function (err, result) {
        client.execute(createTB, [], function (err, result) {
          client.execute(createAdmin, ['admin', 'admin', 'admin'], function (err, result) { })
        })
      })
    })
  }
});
let router = express.Router();

var getUsername = 'SELECT email FROM  doancuoiki.users WHERE username=? ALLOW FILTERING';
var getEmail = 'SELECT username FROM  doancuoiki.users WHERE email=? ALLOW FILTERING';

function validateInput(data, otherValidations) {
  let { errors } = otherValidations(data);

  return client.execute(getEmail, [data.email]).then( result => {
    if (result.rows['0'] != null) {
      errors.email = 'There is user with such email';
    }
    return {
        errors,
        isValid: isEmpty(errors)
      };
  })


}

var laythongtin = 'SELECT * FROM  doancuoiki.users WHERE username=? '
router.get('/:identifier', (req, res) => {


  client.execute(laythongtin, [req.params.identifier], function (err, result) {
    if (err) {
      res.status(404).send({err});
    } else {
      res.status(201).json({ user: result.rows['0'] });
    }
  })
});

var themnguoidung = 'INSERT INTO doancuoiki.users(username,password,email,role) values(?,?,?,?)';
router.post('/', (req, res) => {
  validateInput(req.body, commonValidations).then(({ errors, isValid }) => {
    if (isValid) {
      var { username, password, email } = req.body;
      client.execute(themnguoidung, [username, password, email, 'user'], function (err, result) {
        if (err) {
          res.status(500).send({ error: err });
        } else {
          const token = jwt.sign({
            username: username
          }, config.jwtSecret);
          res.json({ token });
        }
      })

    } else {
      res.status(400).json(errors);
    }
  });

});

export default router;
