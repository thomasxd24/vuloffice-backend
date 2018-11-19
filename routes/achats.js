var express = require('express');
var router = express.Router();

/* GET users listing. */
var page = 
{
  title:"Achats",
  fileName: "achats"
}
router.get('/', function(req, res, next) {
  res.render('index',{page: page});
});

module.exports = router;
