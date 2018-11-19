// $('.product-price').first().attr('content')

var cheerio = require('cheerio'); // Basically jQuery for node.js
var rp = require('request-promise');
async function venteUnique(url) {
    var options = {
        uri: url,
        transform: function (body) {
            return cheerio.load(body);
        }
    };
    
    var $ = await rp(options)
        .catch(function (err) {
            console.log("Error");
        });
        var prix = $('.col-md-9 > span').first().text().replace(',','.').replace('€','')
        console.log(prix)
}
venteUnique('https://www.miliboo.com/lot-tabourets-bar-galaxy-jaune-10046.html');
module.exports = venteUnique;

