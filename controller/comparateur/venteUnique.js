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
     console.log($('.product-price').first().attr('content'))
}
// venteUnique('https://www.vente-unique.com/p/lot-de-2-tabourets-de-bar-jeff-cuir-noir-ou-blanc-1#pcid63712');
module.exports = venteUnique;

