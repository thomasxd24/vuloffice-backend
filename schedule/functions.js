var request = require('request');
var requ = require('request-promise');
var rp = requ.defaults({              // save cookies to jar
    rejectUnauthorized: false, 
    followAllRedirects: true   // allow redirections
});
var js2xmlparser = require("js2xmlparser");
var toutdeco = '8T3EEDA2ZX5D6754Q1LWWZF7Z8QNCMGP@toutdeco.fr'
var http = require("../controller/http/get.js")


async function updateOrdertoShipped(shopUrl,orderID) {
        var service = false
        const element = orderID;
        var shippingnumber = await getShippingNumber(element,shopUrl)
        if(shippingnumber.service == "amazon" || shippingnumber.service == "cdiscount") service = true
        console.log(`Updating the command ${orderID} with the shippingnumber ${shippingnumber} to Preparation en cours`)
        await updateOrder(orderID,service)

    console.log("Checked All orders")
}

async function getShippingNumber(orderID,shopUrl) {
    var returndata;
    var options = {
        method: 'GET',
        uri: `https://${shopUrl}/api/orders/${orderID}?output_format=JSON`,
        json:true
    };

    await rp(options)
    .then(async function (body) {
        returndata = 
        {
            number : body.order.shipping_number,
            service : body.order.payment.replace(" ","")
        }
        
    }).catch(function (err) {
        console.error(err.message)
    });
    return returndata
}

// async function checkShipped(shippingNumber,shopUrl) {
//     var returndata;
//     var options = {
//         method: 'GET',
//         uri: `https://gls-group.eu/app/service/open/rest/FR/fr/rstt001?match=${shippingNumber}`,
//         json:true
//     };

//     await rp(options)
//     .then(async function (body) {
//         if(body.tuStatus[0].progressBar.statusInfo == 'DELIVERED')
//         {
//             returndata = true
//         }
//         else
//         {
//             returndata = false
//         }
        
//     }).catch(function (err) {
//         console.error(err.message)
//     });
//     return returndata;
// }

async function updateOrder(orderID,service) {

    var orderHist = {
            order_history:
            {
                id_order_state: "3",
                id_order: orderID
            }
    }
    if(service) orderHist.order_history.id_order_state = "26"
    var xml = js2xmlparser.parse("prestashop",orderHist)

    shopUrl = toutdeco
    var options = {
        method: 'POST',
        uri: `https://${shopUrl}/api/order_histories`,
        body:xml
    };

    await rp(options)
    .then(async function (body) {
        console.log("Order state changed successfully.")
    }).catch(function (err) {
        console.error(err.message)
    });
}


module.exports =  updateOrdertoShipped;