var CronJob = require('cron').CronJob;

function init() {
    var updateOrdertoShipped = require('./functions.js');
console.log('Before job instantiation');
const job = new CronJob('* 10-17 * * 1-5', function() {
    updateOrdertoShipped("8T3EEDA2ZX5D6754Q1LWWZF7Z8QNCMGP@toutdeco.fr")
    // console.log("1 minutes done")
});
console.log('After job instantiation');
job.start();
}

module.exports.init = init