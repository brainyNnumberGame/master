var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: '小楚设计的猜数字游戏' });
});

module.exports = router;
