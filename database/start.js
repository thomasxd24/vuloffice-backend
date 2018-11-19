var Database = require('./test.js');
var db = new Database();

async function main() {
    await db.init()
    await db.addAvoir("hi","m.vialle",new Date(),"toutdeco",125.5,"Paypal")
}

main()