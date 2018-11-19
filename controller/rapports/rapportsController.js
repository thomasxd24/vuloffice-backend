class Rapport {
    constructor(siteName, month, year) {
        this.siteName = siteName
        this.month = month
        this.year = year
        this.siteController = require(`./site/${siteName}`)
    }

    async init() {
        var months = ['Janvier','Fevrier','Mars','Avril','Mai','Juin','Juillet','Aout','Septembre', 'Octobre','Novembre','Décembre']
        var Database = require("../../database/test.js")
        var db = new Database()
        await db.init();
        var header = this.siteController.getHeader();
        var rows = []
        rows.push(header)
        var orderList = await this.siteController.getFacturedOrderList(this.month, this.year)
        for (let index = 0; index < orderList.length; index++) {
            const orderID = orderList[index].id;
            var oneRow = await this.siteController.getOneRow(orderID)
            rows.push(oneRow)
        }
        var avoirList = await db.getAvoirByMonth(parseInt(this.year),parseInt(this.month),this.siteName)
        rows = rows.concat(avoirList)
        var stats = await this.getStats(rows)
        rows.push(stats)
        this.rows = rows
        this.header = header
    }


    async getStats(row) {
        var array = row
        var result = await array.reduce(function (r, a) {
            a.forEach(function (b, i) {
                if (i == 0 || i == 1 ||i == 6|| i == 9 || i == 10) {
                    r[i] = ""
                    return
                }

                if (i == 11) return
                r[i] = (r[i] || 0) + Number(b);
            });
            return r;
        }, []);


        for (let index = 0; index < result.length; index++) {
            if (result[index] == "") continue
            result[index] = result[index].toFixed(2)

        }
        return result
    }


}

module.exports = Rapport