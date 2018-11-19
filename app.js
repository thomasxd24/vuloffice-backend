var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var gad = require('git-auto-deploy');
var indexRouter = require('./routes/index');
var ventesRouter = require('./routes/ventes');
var avoirRouter = require('./routes/avoir');
var achatsRouter = require('./routes/achats');
var comparateurRouter = require('./routes/comparateur');
var stocksRouter = require('./routes/stocks');
var rapportsRouter = require('./routes/rapports');
var prixRouter = require('./routes/prix');
var expeditionRouter = require('./routes/expedition');


var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.set('json spaces', 2);
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', indexRouter);
app.use('/api/ventes', ventesRouter);
app.use('/api/achats', achatsRouter);
app.use('/api/stocks', stocksRouter);
app.use('/api/comparateur', comparateurRouter);
app.use('/api/avoir', avoirRouter);
app.use('/api/rapports', rapportsRouter);
app.use('/api/prix', prixRouter);
app.use('/api/expedition', expeditionRouter);

app.post('/webhook',function(req,res){
  res.sendStatus(200)
    gad.deploy();
})
// catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });

// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = err;

//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });



module.exports = app;
