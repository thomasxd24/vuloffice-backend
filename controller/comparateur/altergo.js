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
        var prix = $('.price').eq(2).text()
        prix = prix.replace(',','.');
        prix = prix.replace('€','');
        console.log(prix)
}
venteUnique('https://www.alterego-design.fr/tabouret-de-bar-design-comet-coque-rouge-reglable-en-hauteur-avec-dossier.html#');
module.exports = venteUnique;

