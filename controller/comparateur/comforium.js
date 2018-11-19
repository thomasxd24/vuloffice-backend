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
        var prix = $('.special-price > span').first().text()
        var dec = $('.mini-pricev3').text()
        prix = prix + dec.replace(',','.');
        console.log(prix)
}
venteUnique('https://www.comforium.com/tabouret-de-bar-blanc-design-en-polyester-avec-pietement-rond-en-acier-chrome-32630.html#');
module.exports = venteUnique;

