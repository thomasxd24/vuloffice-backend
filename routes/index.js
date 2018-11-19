var express = require('express');
var router = express.Router();

var page = 
{
  title:"Accueil",
  fileName: "index"
}
router.get('/', function(req, res, next) {
  res.render('index',{page: page});
});

module.exports = router;
