var http = require("../../http/get.js")
const shopUrl = "8T3EEDA2ZX5D6754Q1LWWZF7Z8QNCMGP@toutdeco.fr";



async function getOrderRows(originalOrderRows) {
    var newOrderRows = []
    for (let index = 0; index < originalOrderRows.length; index++) {
        const row = originalOrderRows[index];
        var product = await http.get(shopUrl,`products/${row.product_id}?output_format=JSON`)
        product = product.product
        var oneRow = 
        {
            weightPerProduct : product.weight,
            productQuantity : row.product_quantity
        }
        newOrderRows.push(oneRow)
        
    }
    return newOrderRows
        

}

async function updateOrder(orderID) {
    var bodyorder = await http.get(shopUrl,`orders/${orderID}?output_format=JSON`)
    var service = "site"
    if(bodyorder.order.payment == " cdiscount" || bodyorder.order.payment == " amazon") {
        service = bodyorder.order.payment.replace(" ","")
    }
    var orderRows = await getOrderRows(bodyorder.order.associations.order_rows)
    var data = 
    {
        addressID: bodyorder.order.id_address_delivery,
        orderRows: orderRows,
        service: service,
        customerID : bodyorder.order.id_customer
    }
    return data
}


async function getAddress(addressID) {
    var address = await http.get(shopUrl,'addresses/'+addressID+'?output_format=JSON')
    address = address.address
    var data =
    {
        name1:address.firstname.replace(".", "") + " " + address.lastname,
        name2:address.company.replace(".", ""),
        name3: "",  //to be added TODO
        street1: address.address1.replace(".", ""),
        country:"FR",
        zipCode:address.postcode,
        city:address.city,
        contact:address.firstname + " " + address.lastname,
        phone: address.phone,

    }
    return data
}

async function getEmail(customerID) {
    const robotClientGroup = ['8','9']
    var customer = await http.get(shopUrl,`customers/${customerID}?output_format=JSON`)
    customer = customer.customer
    if(robotClientGroup.includes(customer.associations.groups[0].id))
    {
        return "vulcaderm@orange.fr"
    }
    return customer.email
}

module.exports =
{
    getOrderRows: getOrderRows,
    getEmail:getEmail,
    getAddress:getAddress,
    updateOrder:updateOrder
}