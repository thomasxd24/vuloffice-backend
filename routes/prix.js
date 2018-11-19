var express = require('express');
var router = express.Router();
var page = 
{
  title:"Prix",
  fileName: "prix"
}
router.get('/', function(req, res, next) {
  res.render('index',{page: page});
});

module.exports = router;
