const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, path.join(__dirname,"../profile_pic_uploads"));
    },
    filename: function (req, file, cb) {
      const uniquePrefix = Date.now();
      cb(null, uniquePrefix + '-' + file.originalname);
    }
});

function fileFilter (req, file, cb) {

    if (file.mimetype == "image/jpeg" || file.mimetype == "image/png") {
 
        cb(null, true)
    } else {
        
        cb(null, false)
    }

}

const opts = {
    storage: storage,
    fileFilter: fileFilter
}

const upload = multer(opts);

module.exports = upload;