var express = require('express');
var router = express.Router();
var database = require("../database/test.js")
var db = new database();
db.init()
/* GET users listing. */
var page =
{
  title: "Avoir",
  fileName: "avoir"
}
router.get('/', function (req, res, next) {
  page.fileName = 'avoir'
  res.render('index', { page: page });
});
router.get('/adjouter', function (req, res, next) {
  page.fileName = 'avoirAdd'
  res.render('index', { page: page });
});

router.get('/get', async function (req, res, next) {

  var json = await db.getAvoir();
  res.set('Content-Type', 'application/json');
  res.json(json)
});

router.get('/change/:id', function (req, res, next) {
  page.fileName = 'avoirChange'

  res.render('index', { page: page });
});

router.post('/add', async function (req, res, next) {
  var reque = req.body
  console.log(reque);
  await db.addAvoir(reque.ref, reque.client, reque.date, reque.site, reque.total, reque.payment)
  res.redirect('/avoir')
});

module.exports = router;