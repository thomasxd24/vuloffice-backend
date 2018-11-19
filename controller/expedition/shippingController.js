var request = require('request');
var requ = require('request-promise');
var rp = requ.defaults({              // save cookies to jar
    rejectUnauthorized: false, 
    followAllRedirects: true   // allow redirections
});


function calculateParcels(orderID,siteName,orderRows,petitColi,comment) {
    var parcelDetail = []
    for (let index = 0; index < orderRows.length; index++) {
        const oneRow = orderRows[index];
        var weightPerProduct = Number(oneRow.weightPerProduct)
        var productQuantity = Number(oneRow.productQuantity)
        if(petitColi) weightPerProduct = 1
        if(weightPerProduct < 30 && weightPerProduct > 3)
        {
            for (let index = 0; index < productQuantity; index++) {
                oneParcel = {
                    weight: weightPerProduct,
                    references: [orderID,siteName],
                    comment: comment
                }
                parcelDetail.push(oneParcel)
                
            }
        }
        else if(weightPerProduct <= 2)
        {
            oneParcel = {
                weight: 1.5,
                references: [orderID,siteName]
            }
            parcelDetail.push(oneParcel)
        }
        
    }
    return parcelDetail
        
}

async function getEtiquetteInfo(order) {
    var options = {
        method: 'POST',
        uri: 'https://api.gls-group.eu/public/v1/shipments',
        headers: {
            'Accept': 'application/json',
            'Accept-Language': 'fr',
            'Content-Type': "application/json",
            "Authorization": "Basic MjUwMzE5NDd3czozMTk0Nw=="
          },
        body: 
        {
            shipperId:"2500031947 250aaalBti", 
            references: [order.siteName, order.orderID, order.service],
            addresses:
                {
                    delivery: order.address
                },
            parcels: order.parcels,
            labelSize: "A5"
        },
        json: true
    };
    var data = await rp(options).catch(function (err) {
        console.error(err.message)
        throw new Error(`Error while receiving data from GLS for order ${order.orderID}`)
    });

    var returndata = 
    {
        base64: data.labels[0],
        trackingNumber: data.location.replace("https://gls-group.eu/track/","")
    }
     return returndata

}

module.exports.getEtiquetteInfo = getEtiquetteInfo
module.exports.calculateParcels = calculateParcels