var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var productsCtrl = require('./productsCtrl.js')


// massive
var massive = require('massive');


var index = require('./routes/index');
var users = require('./routes/users');


const connectionInfo = 'postgres://sean:12345@localhost:5432/test';


var app = express();
massive(connectionInfo).then(function(db){
  app.set('db', db)
  console.log(app)
  db.create_product_table()
  .then(function(response){
    console.log(response)
  })
})



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', index);
// app.use('/users', users);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   var err = new Error('Not Found');
//   err.status = 404;
//   next(err);
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
// Endpoints

// app.post('/products', function(req, res, next) {
//   var db = req.app.get('db')
//   db.create_product([req.body.name, req.body.description, req.body.price, req.body.imageUrl])
//   .then(function(results) {
//     res.send(results)
//   })
// })

app.post('/products', productsCtrl.createProducts)



// app.get('/products', function(req, res, next) {
//   var db = req.app.get('db')
//   db.read_products()
//   .then(function(results) {
//     res.send(results)
//   })
// })

app.get('/products' productsCtrl.readProducts,



// app.get('/products/:id', function(req, res, next) {
//   var db = req.app.get('db')
//   db.read_product(req.params.id)
//   .then(function(results) {
//     res.send(results)
//   })
// })

app.get('/products/:id', productsCtrl.readProduct);


// app.put('/products/:id', function(req, res, next) {
//   var db = req.app.get('db')
//   var description = req.body.description
//   db.update_product([req.params.id, description])
//   .then(function(results) {
//     res.send(results)
//   })
// })

app.put('/products/:id', productsCtrl.updateProduct);


// app.delete('/products/:id', function(req, res, next) {
//   var db = req.app.get('db')
//   db.delete_product(req.params.id)
//   .then(function(results) {
//     res.send(results)
//   })
// })

app.delete('/products/:id', productsCtrl.deleteProduct);




module.exports = app;
