var Order = require("./orderController.js");
var shipping = require('./shippingController.js');


async function requestEtiquette(siteName,orderID,petitColi,comment,address)
{
    try {
        var order = new Order(orderID,siteName);
        await order.init()
        if(address) order.address = address;

        if(order.address.street1.length > 35) return order.address
        var parcels = shipping.calculateParcels(orderID,siteName,order.orderRows,petitColi,comment)
        if(parcels) {
            order.parcels = parcels
        }
        else {
            throw new Error(`Il n'y a pas de produit expediable par GLS. Peut etre votre colis est supérieur a 30kg? (orderID: ${orderID} siteName: ${siteName}`)
        }
        
        var etiquetteInfo = await shipping.getEtiquetteInfo(order)
        var data = 
        {
            pdfBase64 : etiquetteInfo.base64,
            trackingNumber : etiquetteInfo.trackingNumber,
            orderID : orderID,
            siteName : siteName
        }
    } catch (error) {
        console.error(error.message)
        return error.message;
    }

    return data

}

module.exports = requestEtiquette