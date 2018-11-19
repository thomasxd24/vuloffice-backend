class Database {
  constructor() {
    this.url = 'mongodb://51.68.230.58:27017/'
  }

  async init() {
    var MongoClient = require('mongodb').MongoClient;
    this.db = await MongoClient.connect(this.url,{ useNewUrlParser: true });
  }

  async addAvoir(ref, clientName, returnDate, site, totalTTC, payment) {
    var db = this.db.db("vuloffice")
    var myobj = {
      ref: ref,
      clientName: clientName,
      createdDate: new Date(),
      returnDate: new Date(returnDate),
      site: site,
      totalTTC: Number(totalTTC),
      payment: payment

    };
    await db.collection("avoir").insertOne(myobj);
    console.log("inserted")
  }

  async getAvoirByMonth(year, month,site) {
    var format = require('dateformat')
    var db = this.db.db("vuloffice");
    console.log(month+1);
    var result = await db.collection("avoir").find({
      site:site,
      returnDate: {
        $gte: new Date(`${year}-${month}-01T00:00:00.000Z`),
        $lt: new Date(`${year}-${month + 1}-01T00:00:00.000Z`)
      }
    }).sort({ _id: 1 }).toArray();
    var resultArray = []
    for (let index = 0; index < result.length; index++) {
      const oneRow = result[index];
      var totalHT = 0- Number(oneRow.totalTTC) / 1.2
      var totalTTC = 0 - oneRow.totalTTC
      var date = format(oneRow.returnDate,'dd-mm-yy')
      var oneRowArray = [
        oneRow.ref,
        date,
        Number(totalTTC.toFixed(2)),
        Number(totalHT.toFixed(2)),
        0,
        0,
        'Avoir',
        0,
        0,
        oneRow.clientName,
        oneRow.payment
        

      ]
      resultArray.push(oneRowArray)

    }
    return resultArray

  }

  async getAvoir() {
    var db = this.db.db("vuloffice");
    var result = await db.collection("avoir").find().limit(50).sort({ _id: -1 }).toArray();
    var json = { data: [] }
    for (let index = 0; index < result.length; index++) {
      const oneRow = result[index];
      var oneRowArray = [
        oneRow.ref,
        oneRow.site,
        oneRow.clientName,
        oneRow.returnDate,
        oneRow.payment,
        oneRow.totalTTC,
        '<button type="button" class="btn btn-primary">Modifier</button>'
      ]
      json.data.push(oneRowArray)

    }
    return json
  }

}



module.exports = Database