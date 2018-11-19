var express = require('express');
var router = express.Router();
var database = require("../database/test.js")
var db = new database();
db.init()
/* GET users listing. */
var page =
{
  title: "Comparateur",
  fileName: "comparateur"
}
router.get('/', function (req, res, next) {
  page.fileName = 'comparateur'
  res.render('index', { page: page });
});



router.get('/comparetable', function (req, res, next) {
  page.fileName = 'comparetable'

  res.render('index', { page: page });
});


module.exports = router;