async function calculateShippingCost(orderRows) {
    var quantity = 0
    var totalshippingcost = 0
    var totalweight = 0
    for (let index = 0; index < orderRows.length; index++) {
        const orderRow = orderRows[index];
        var quantity = parseInt(orderRow.productQuantity)
        var weight = Number(orderRow.weightPerProduct)
        totalweight += weight
        if(weight <=2)
        {
            var totalonelineweight = weight*quantity 
            if(totalonelineweight <=2)
            {
                totalshippingcost = totalshippingcost + 6.32
            }
            else
            { 
                var numberofcolis = totalonelineweight/2
                totalshippingcost = totalshippingcost + (6.32*Math.ceil(numberofcolis))
            }
        }
        else if(weight >2 && weight <=30)
        {
            totalshippingcost = totalshippingcost + (9*quantity)
        }
        else
        {
            totalshippingcost = totalshippingcost + (43*quantity)
        }
        if(totalweight <=2)
        {
            totalshippingcost =  6.32
        }
    }
        
    return totalshippingcost
}

module.exports.calculateShippingCost = calculateShippingCost