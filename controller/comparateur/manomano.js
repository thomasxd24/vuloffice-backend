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
        var prix = $('.price__product').first().text()
        var dec = $('.price__product').first().children().text()
        prix = prix.replace(',','.');
        prix = prix.replace('€','');
        console.log(prix+dec)
}
venteUnique('https://www.manomano.fr/tabouret-de-cuisine/lot-de-2-tabourets-de-bar-rembourre-violet-1209101-725554');
module.exports = venteUnique;

// WORKS TO DO ...