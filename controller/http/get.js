var request = require('request');
var requ = require('request-promise');
var rp = requ.defaults({              // save cookies to jar
    rejectUnauthorized: false, 
    followAllRedirects: true   // allow redirections
});

async function getUrl(shopUrl,endUrl)
{
    var options = {
        method: 'GET',
        uri: `https://${shopUrl}/api/${endUrl}`,
        json:true
    };
    
    return await rp(options).catch(function (err) {
        console.error(`From ${endUrl} :`+err.message)
        throw new Error(`From ${endUrl} :`+err.message)
    });
}

module.exports.get = getUrl