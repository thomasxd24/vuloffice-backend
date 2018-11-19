var express = require('express');
var router = express.Router();

var page = 
{
  title:"Stock",
  fileName: "stock"
}
router.get('/', function(req, res, next) {
  res.render('index',{page: page});
});

module.exports = router;
