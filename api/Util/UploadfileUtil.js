const multer = require('multer');

// multer storeage imgUser
const storageImgUser = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, 'public/images/imguser/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,file.originalname);
    }
});

const uploadImgUser = multer({ 
    storage: storageImgUser
}).single('file');

const uploadImgUserHandling = function(req, res){
    uploadImgUser(req, res, function(err){
        console.log(req.file);
        if(err){
            res.json({success: false, message:err, error_code: 1, err_desc: err });
            return;
        }else{
            res.json({success: false, message:'upload successfully !', error_code: 0, err_desc: null });
        }
    });
};


// multer storeage tin
// const storageImgNews = multer.diskStorage({ 
//     destination: function (req, file, cb) {
//         cb(null, './client/src/assets/web/img/imgtin/');
//     },
//     filename: function (req, file, cb) {
//         var datetimestamp = Date.now();
//         cb(null,file.originalname);
//     }
// });

const storageImgNews = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, 'public/images/imgtin/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,file.originalname);
    }
});

const uploadImgNews = multer({ 
    storage: storageImgNews
}).single('file');

const uploadImgNewsHandling = function(req, res){
    uploadImgNews(req, res, function(err){
        console.log(req.file);
        if(err){
            res.json({success: false, message:err, error_code: 1, err_desc: err });
            return;
        }else{
            res.json({success: false, message:'upload successfully !', error_code: 0, err_desc: null });
        }
    });
};


const storageCvUser = multer.diskStorage({ 
    destination: function (req, file, cb) {
        cb(null, 'public/file/cv/');
    },
    filename: function (req, file, cb) {
        var datetimestamp = Date.now();
        cb(null,file.originalname);
    }
});
// multer storeage cv
const uploadCvUser = multer({ 
    storage: storageCvUser
}).single('file');


const uploadCVUserHandling = function(req, res){
    uploadCvUser(req, res, function(err){
        console.log(req.file);
        if(err){
            res.json({success: false, message:err, error_code: 1, err_desc: err });
            return;
        }else{
            res.json({success: false, message:'upload successfully !', error_code: 0, err_desc: null });
        }
    });
};

module.exports ={
    uploadImgUserHandling,
    uploadCVUserHandling,
    uploadImgNewsHandling
}