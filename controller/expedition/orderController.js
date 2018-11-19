class Order {
    constructor(orderID,siteName)
    {
        this.orderID = orderID
        this.siteName = siteName
    }

    async init() {
        var siteController = require(`./site/${this.siteName}.js`);
        var orderDetail = await siteController.updateOrder(this.orderID);
        this.addressID = orderDetail.addressID;
        this.orderRows = orderDetail.orderRows;
        this.service = orderDetail.service;
        this.customerID = orderDetail.customerID;
        var addressDetail = await siteController.getAddress(this.addressID);
        this.address = addressDetail;
        var email = await siteController.getEmail(this.customerID,this.service);
        this.address.email = email;  
    }
}

module.exports = Order