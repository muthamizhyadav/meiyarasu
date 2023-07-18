const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const AWS = require('aws-sdk');

const Upload_Videos = async (req) => {
  const s3 = new AWS.S3({
    endpoint: 'https://ams3.digitaloceanspaces.com',
    useAccelerateEndpoint: false,
    s3ForcePathStyle: false,
    region: 'us-east-1',
    credentials: new AWS.Credentials('DO00WZQL763YY9XHHH7Q', 'p6rlTv7W7egz03gbKKEmuBf42jVtBpRo4aC1J8ZCVOA'),
  });
  const params = {
    Bucket: 'healthappobjects',
    Key: req.files[0].originalname,
    Body: req.files[0].buffer,
    ACL: 'public-read',
  };

  return new Promise((resolve, reject) => {
    s3.upload(params, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const contentUpload = async () => {};

module.exports = {
  Upload_Videos,
};
