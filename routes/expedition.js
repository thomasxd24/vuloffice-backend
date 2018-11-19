var express = require('express');
var router = express.Router();
var requestEtiquette = require('../controller/expedition/requestEtiquetteController.js')
var updateOrdertoShipped = require('../schedule/functions.js');
var page = 
{
  title:"Expéditon",
  fileName: "expedition"
}
router.get('/', function(req, res, next) {
  page.fileName = "expedition"
  res.render('index',{page: page});
});

router.get('/send',async function(req, res, next) {
  var result = 
  {
    error: false,
    data:{}
  }
  var petitColi = false
  var noprep = false
  if(req.query.petitColi) petitColi = true
  if(req.query.noPrep) noprep = true
  if(req.query.orderID) result.data = await requestEtiquette(req.query.siteName,req.query.orderID,petitColi,req.query.comment)
  if(!result.data.trackingNumber) result.error = true
  if(!req.query.orderID) result.data = "Veuillez rensigner le numéro de commande"
  
  if(result.data.street1)
  {
    result.data.orderID = req.query.orderID
    result.data.siteName = req.query.siteName
    res.json(result.data)
    return
  }
  
  if(req.query.siteName == "toutdeco") var shopUrl = "8T3EEDA2ZX5D6754Q1LWWZF7Z8QNCMGP@toutdeco.fr"
  if(req.query.siteName == "destockage") var shopUrl = "V5BSB53RHQ7NZF64U2PYQWGSQMD4VZGA@www.destockage-discount.fr"
  if(!noprep) updateOrdertoShipped(shopUrl,req.query.orderID)
  res.json(result);
})

router.post('/send',async function(req, res, next) {
  var petitColi = false
  
  if(req.body.petitColi) petitColi = true
  if(req.body.noprep) noprep = true
  console.log(req.body)
  var address = req.body;
  var orderID = req.body.orderID
  var siteName = req.body.siteName
  delete address.orderID;
  delete address.siteName;
  page.data = await requestEtiquette(siteName,orderID,petitColi,req.body.comment,noprep,address);
  if(page.data.street1)
  {
    page.fileName = "problemaddress"
    res.render('index',{page: page});
    return
  }

  page.fileName = "experesult"
  res.render('index',{page: page});
})

module.exports = router;
