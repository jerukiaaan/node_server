const upload = require('../middleware/s3.upload');

const uploadFile = async (req, res) => {
    upload(req, res, async function(err){
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        return res.status(200).json({ message: 'File uploaded successfully' });
    });
}

module.exports = {
    uploadFile
}