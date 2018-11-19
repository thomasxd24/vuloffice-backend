var Rapport = require('./rapportsController.js')
const PDFDocument = require('../pdfTable/pdfTable');
var XLSX = require('xlsx')
var Excel = require('exceljs');

var months = ['Janvier', 'Fevrier', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Aout', 'Septembre', 'Octobre', 'Novembre', 'Décembre']
async function requestPDFRapport(siteName, month, year, res) {
    var rapport = new Rapport(siteName, month, year)
    var humanMonth = months[parseInt(month) - 1]
    await rapport.init()
    var workbook = new Excel.Workbook();
    var ws = workbook.addWorksheet(`Ventes ${siteName} ${humanMonth}`, {pageSetup:{fitToPage: true, fitToWidth: 10}});
    console.log("Creation de rapport")
    var ppht = rapport.rows[rapport.rows.length-1][3]
    var crht = rapport.rows[rapport.rows.length-1][7]
    var marge = (rapport.rows[rapport.rows.length-1][8]/rapport.rows.length-1).toFixed(2)
    var fullRows = [
        ['Vulcaderm'],['Rapport de Vente'],
        [rapport.siteName,'','','',humanMonth,'','','','',rapport.year,''],
        [],
        ['Chiffre d\'Affaire HT','','',ppht,'','','','','','',''],
        ['Gain HT','','',ppht-crht,'','','','','','',''],
        ['Marge','','',marge,'','','','','','',''],
        
    ]
    fullRows = fullRows.concat(rapport.rows)

    ws.addRows(fullRows);
    ws.columns = [
        {width: 21 },
    ];
    var tobemerge = ["A1:K1", "A2:K2", "A3:D3", "E3:I3", "J3:K3", "A5:C5", "D5:K5", "A6:C6", "D6:K6", "A7:C7", "D7:K7"]
    for (let index = 0; index < tobemerge.length; index++) {
        const element = tobemerge[index];
        ws.mergeCells(element);
    }
    
    // ws.getColumn(4).font = { name: 'Calibri', family: 2, size: 20, bold: true };
    for (let index = 1; index < 8; index++) {
        ws.getRow(index).font = { name: 'Calibri', family: 2, size: 20, bold: true };
        ws.getRow(index).alignment = { vertical: 'middle', horizontal: 'center' };
        
    }
    ws.getRow(8).font = { name: 'Calibri', family: 2, size: 12, bold: true };

    // workbook.commit();
    res.setHeader("Content-Disposition", "attachment; filename=" + `Ventes ${siteName} ${humanMonth}.xlsx`);
    await workbook.xlsx.write(res);
    res.end();

    // var wb = XLSX.utils.book_new();
    // XLSX.utils.book_append_sheet(wb, ws, `Vente Toutdeco ${humanMonth}`);

    // /* generate buffer */
    // var buf = XLSX.write(wb, { type: 'buffer', bookType: bookType || "xlsx" });

    /* send to client */
    

}


module.exports = requestPDFRapport