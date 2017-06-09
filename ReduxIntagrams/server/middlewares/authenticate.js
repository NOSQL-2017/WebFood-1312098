import jwt from 'jsonwebtoken';
import config from '../config';
let cassandra = require('cassandra-driver');
let client = new cassandra.Client({ contactPoints: ['cassandra'] });
let useKS = "USE doancuoiki"

client.connect(function (err, result) {
  if (err) {
    console.log('Something wrong');
  } else {
    console.log('Cassandra connected: bao mat')
    client.execute(useKS, [], function (err, result) {
    })
  }
});

export default (req, res, next) => {
  const authorizationHeader = req.headers['authorization'];
  let token;

  if (authorizationHeader) {
    token = authorizationHeader.split(' ')[1];
  }

  if (token) {
    jwt.verify(token, config.jwtSecret, (err, decoded) => {
      if (err) {
        res.status(401).json({ error: 'Failed to authenticate' });
      } else {
        var kiemTra = 'SELECT * from doancuoiki.users where username=? ALLOW FILTERING';
        client.execute(kiemTra, [decoded.username], function (err, result) {
          if (err) {
             res.status(404).json({ error: 'No such user' });
          } else {
            if (result.rows['0'].username != null) {
              req.currentUser = result.rows['0'];
              next();
            }
            else {
              res.status(404).json({ error: 'No such user' });
            }
          }
        })
      }
    });
  } else {
    res.status(403).json({
      error: 'No token provided'
    });
  }
}
