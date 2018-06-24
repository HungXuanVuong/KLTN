const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const jsonwebtoken = require('jsonwebtoken');
const path = require('path');
const cors = require('cors');

const port = process.env.PORT || 3000;
const config = require('./api/config/db');

const multer = require('multer');

// init mongodb
function _initializeModels() {
    mongoose.Promise = global.Promise;
    mongoose.connect(config.db);
    mongoose.connection.on('error', function (err) {
        console.log('mongoose failed to connect', { err: err });
    });
};

_initializeModels();

//midle ware
app.use(require('express-session')({
    secret: 'test',
    resave: true,
    saveUninitialized: true
}));

//CORS middleware
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Credentials", true);
    next();
});
// middleware 
app.use(cors({
    origin: 'http://localhost:4200'
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use(express.static(__dirname + '/client/dist/'));



var publicDir = require('path').join(__dirname,'/public');
app.use(express.static(publicDir));

// app.use(express.static(__dirname + '/uploads'));
// multer
const storage = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, './client/src/assets/web/img/upload/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,file.originalname);
    }
});

// const storage = multer.diskStorage({ 
//     destination: function (req, file, cb) {
//         cb(null, './uploads/');
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null, file.fieldname + '-' + datetimestamp + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1]);
//     }
// });


var upload = multer({ 
    storage: storage
}).single('file');


/** API path that will upload the files */
app.post('/upload', function (req, res) {
    upload(req, res, function (err) {
        console.log(req.file);
        if (err) {
            res.json({ error_code: 1, err_desc: err });
            return;
        }
        res.json({ error_code: 0, err_desc: null });
    });
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
/*7. CandidateRouter */
const CandidateRouter = require('./api/routers/CandidateRoute');
app.use('/candidate', CandidateRouter);
/*8. NewsCandidateRouter */
const NewsCandidateRouter = require('./api/routers/News_CandidateRoute');
app.use('/newscandidate', NewsCandidateRouter);
/*9. NewsUserRouter */
const NewsUserRouter = require('./api/routers/News_UserRoute');
app.use('/newsuser', NewsUserRouter);

//default
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/dist/index.html'));
});

app.listen(port, function () {
    console.log('listening on port : ' + port);
});