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
        var prix = $('.price').first().text()
        prix = prix.replace(',','.');
        prix = prix.replace('€','');
        console.log(prix)
}
venteUnique('https://www.comptoirxl.com/tabouret-de-bar-design-charly-lot-de-2-noir');
module.exports = venteUnique;

