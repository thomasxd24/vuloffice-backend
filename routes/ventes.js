var express = require('express');
var router = express.Router();

var page = 
{
  title:"Ventes",
  fileName: "ventes"
}
router.get('/', function(req, res, next) {
  res.render('index',{page: page});
});

module.exports = router;
