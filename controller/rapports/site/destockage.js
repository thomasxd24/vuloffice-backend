const shopUrl = "V5BSB53RHQ7NZF64U2PYQWGSQMD4VZGA@www.destockage-discount.fr";
var http = require("../../http/get.js")
var moment = require('moment');
var shipping = require('../calculateCost')

async function getFacturedOrderList(month,year) {
    var orderList = await http.get(shopUrl,`orders?filter[current_state]=[4,5]&filter[invoice_date]=[${year}-${month}-1,${year}-${month}-31]&date=1&output_format=JSON`)
    orderList = orderList.orders
    return orderList
}

function getHeader() {
    return ['No.', 'Date', 'PPTTC', "PPHT", "ECO", "PORT", "PAHT", "PRHT", "Marge", "Produit", "Paiement"];
}


async function getOrderDetail(orderID) {
    var order = await http.get(shopUrl,`orders/${orderID}?output_format=JSON`)
    order = order.order
    var payment = order.payment
    if(order.payment == "E-Transactions" || order.payment == "Paiement par carte bancaire") payment = "CB"
    var orderRows = await transformOrderRows(order.associations.order_rows) 
    var product = orderRows[0].productRef
    var result = await getPrixAchatEtWeight(orderRows)
    orderRows = result[0]
    var PAHT = result[1]
    var orderDetail = 
    {
        factureID : order.invoice_number,
        date: moment(order.invoice_date).format("DD-MM-YY"),
        PPTTC: Number(order.total_paid).toFixed(2),
        PPHT: Number(order.total_paid_tax_excl).toFixed(2),
        eco: 0,
        PAHT: PAHT,
        product: product,
        orderRows: orderRows,
        payment : payment

    }

    return orderDetail



}

async function transformOrderRows(originalOrderRows) {
    var newOrderRows = []
    for (let index = 0; index < originalOrderRows.length; index++) {
        const row = originalOrderRows[index];
        var product = await http.get(shopUrl,`products/${row.product_id}?output_format=JSON`)
        product = product.product
        var oneRow = 
        {
            productRef: row.product_reference,
            productID: row.product_id,
            weightPerProduct : product.weight,
            productQuantity : row.product_quantity
        }
        newOrderRows.push(oneRow)
        
    }
    return newOrderRows
}

async function getPrixAchatEtWeight(orderRows) {
    var totalprixachat = 0;
    for (let index = 0; index < orderRows.length; index++) {
        var orderRow = orderRows[index];
        var result = await http.get(shopUrl,`products/${orderRow.productID}?output_format=JSON`)
        var prixAchat = Number(result.product.wholesale_price)*parseInt(orderRow.productQuantity)
        totalprixachat += prixAchat
        orderRow.weightPerProduct = Number(result.product.weight)/1000
        
    }
    return [orderRows,totalprixachat];
}

async function getOneRow(orderID) {
    var order = await getOrderDetail(orderID)
    var shippingCost = await shipping.calculateShippingCost(order.orderRows)
    var CRHT = order.PAHT + shippingCost
    var marge = ((order.PPTTC-CRHT)/order.PPHT)*100
    
    var factureNo = 
    {
        factureNumber : "FA"+order.factureID,
        orderURL : ``
    }
    var oneRow = 
    [
        factureNo.factureNumber,
        order.date,
        Number(order.PPTTC),
        Number(order.PPHT),
        order.eco,
        Number(shippingCost),
        Number(order.PAHT),
        Number(CRHT),
        marge.toFixed(2),
        order.product,
        order.payment
    ]

    return oneRow
}


module.exports = 
{
    getFacturedOrderList : getFacturedOrderList,
    getOneRow : getOneRow,
    getOrderDetail : getOrderDetail,
    transformOrderRows : transformOrderRows,
    getPrixAchatEtWeight: getPrixAchatEtWeight,
    getHeader : getHeader
}
