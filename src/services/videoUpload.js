const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const AWS = require('aws-sdk');
const { Data } = require('../models/data.models');

const Upload_Videos = async (req) => {
  const spacesEndpoint = new AWS.Endpoint('https://ams3.digitaloceanspaces.com');
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

  let objectId = req.params.id;
  return new Promise(async (resolve, reject) => {
    s3.upload(params, async function (err, data) {
      if (err) {
        reject(err);
      } else {
        const videoUrl = `https://healthappobjects.${spacesEndpoint.host}/${data.Key}`;
        let uploadData = await Data.findByIdAndUpdate({ _id: objectId }, { videoURL: videoUrl }, { new: true });
        resolve(uploadData);
      }
    });
  });
};

const Upload_Image = async (req) => {
  const spacesEndpoint = new AWS.Endpoint('https://ams3.digitaloceanspaces.com');
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

  let objectId = req.params.id;
  return new Promise(async (resolve, reject) => {
    s3.upload(params, async function (err, data) {
      if (err) {
        reject(err);
      } else {
        const ImageUrl = `https://healthappobjects.${spacesEndpoint.host}/${data.Key}`;
        let uploadData = await Data.findByIdAndUpdate({ _id: objectId }, { ImageUrl: ImageUrl }, { new: true });
        resolve(uploadData);
      }
    });
  });
};

const contentUpload = async () => {
  let arr = [];
  // const creations = await Data.create(arr);
  // return creations;
  return { msg: 'Content creation blocked contact your Developer' };
};

const getAllData = async () => {
  let val = await Data.aggregate([
    {
      $group: {
        _id: '$Type',
        documents: {
          $push: '$$ROOT',
        },
      },
    },
    {
      $project: {
        TypeName: '$_id',
        documents: 1,
      },
    },
  ]);
  return val;
};

const createNewData = async (data) => {
  const creation = await Data.create(data);
  return creation;
};

module.exports = {
  Upload_Videos,
  contentUpload,
  getAllData,
  Upload_Image,
  createNewData,
};
