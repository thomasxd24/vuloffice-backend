// $('.product-price').first().attr('content')

// DOESNT WORK HAVE TO WORK MORE


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
        var prix = $('.price').html()
        // prix = prix.replace(',','.');
        // prix = prix.replace('€','');
        console.log(prix)
}
venteUnique('https://www.laredoute.fr/ppdp/prod-500063842.aspx#searchkeyword=sasha');
module.exports = venteUnique;

