var express = require('express');
var router = express.Router();
var requestPDFRapport = require('../controller/rapports/requestPDFRapport')

var page = 
{
  title:"Rapports",
  fileName: "rapports"
}
router.get('/', function(req, res, next) {
  res.render('index',{page: page});
});

router.get('/send',async function(req, res, next) {
  requestPDFRapport(req.query.siteName,req.query.month,req.query.year,res)
})

module.exports = router;
