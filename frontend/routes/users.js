var express = require('express');
var router = express.Router();

let accessedIps = [];

/* GET users listing. */
router.get('/', function (req, res, next) {
  res.send({accessedIps});
});

/* GET users listing. */
router.get('/user', function (req, res, next) {
  accessedIps.push(req.ip);
  res.send({
    headers: req.headers,
    accessedBy: req.ip
  });
});

module.exports = router;
