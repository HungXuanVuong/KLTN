const express = require('express');
const app = express(), port = 3000;
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const config = require('./api/config/db');

// init mongodb
function _initializeModels(){
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db);
    mongoose.connection.on('error', function(err){
        console.log('mongoose failed to connect', {err:err});
    });
};

 _initializeModels();

 //midle ware
 app.use(require('express-session')({
    secret: 'test',
    resave: true,
    saveUninitialized:true
}));

//CORS middleware
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 });
// middleware 
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/'));
//default
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

// public api
/*1. UserRouter */
const UserRouter = require('./api/routers/UserRoute');
app.use('/authentication', UserRouter);
/*2. NewsRouter */
const NewsRouter = require('./api/routers/NewsRoute');
app.use('/news', NewsRouter);
/*3. GiftRouter */
const GiftRouter = require('./api/routers/GiftRoute');
app.use('/gift', GiftRouter);
/*4. Type_giftRouter */
const Type_giftRouter = require('./api/routers/Type_giftRoute');
app.use('/typegift', Type_giftRouter);
/*5. PolicyRouter */
const PolicyRouter = require('./api/routers/PolicyRoute');
app.use('/policy', PolicyRouter);
/*6. OrderRouter */
const OrderRouter = require('./api/routers/OrderRoute');
app.use('/order', OrderRouter);



app.listen(port, function(){
    console.log('listening on port : ' + port);
});