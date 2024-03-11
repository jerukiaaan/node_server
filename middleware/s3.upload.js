const multer = require('multer');
const multerS3 = require('multer-s3-transform');
const AWS = require('aws-sdk');
const config = require('../config/s3.config');

const S3 = new AWS.S3({
    accessKeyId: config.AWS_ACCESS_KEY_ID,
    secretAccessKey: config.AWS_SECRET_ACCESS_KEY
})

const upload = multer({
    storage: multerS3({
        s3: S3,
        bucket: config.AWS_BUCKET_NAME,
        acl: 'public-read',
        metadata: function (req, file, cb) {
            cb(null, {
                fieldName: file.fieldname,
                fileType: file.fieldname === 'profilePicture' ? 'profilePicture' : 'requirement'
            });
        },
        key: function (req, file, cb) {
            cb(null, `${req.params.userId}/${file.fieldname}/${file.originalname}`)
        }
    })
})

module.exports = upload.fields(
    [
        { name: 'profilePicture', maxCount: 1 },
        { name: 'requirement', maxCount: 1 }
    ]
)
