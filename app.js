//REQUIREMENTS
var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

//INITIALIZE VARIABLE
var app = express();

//BODY PARSE
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
    // parse application/json
app.use(bodyParser.json())

//IMPORT ROUTES
var appRoutes = require('./routes/app');
var productRoutes = require('./routes/product');
var userRoutes = require('./routes/user');
var productcategory = require('./routes/productcategory');
var imgRoutes = require('./routes/img');
var uploadsRoutes = require('./routes/uploads');
var roomCategory = require('./routes/roomcategory');
var roomRoutes = require('./routes/room');
var employeeRoutes = require('./routes/employee');
var loginRoutes = require('./routes/login');
var clientRoutes = require('./routes/client');
var detailReservationRoutes = require('./routes/reservationdetails');

//CONNECTING TO THE DATABASE
mongoose.connection.openUri('mongodb://localhost:27017/app', (err, res) => {
    if (err) throw err;
    console.log('Database: \x1b[32m%s\x1b[0m', 'onLine');

});

//ROUTES
app.use('/detailreservation', detailReservationRoutes);
app.use('/client', clientRoutes);
app.use('/login', loginRoutes);
app.use('/employee', employeeRoutes);
app.use('/room', roomRoutes);
app.use('/roomcategory', roomCategory);
app.use('/productcategory', productcategory);
app.use('/product', productRoutes);
app.use('/user', userRoutes);
app.use('/upload', uploadsRoutes);
app.use('/img', imgRoutes);
app.use('/', appRoutes);

//HEAR REQUEST
app.listen(3000, () => {
    console.log('Express server port 300: \x1b[32m%s\x1b[0m', 'onLine');
});