const httpStatus = require('http-status');
const ApiError = require('../utils/ApiError');
const { Article } = require('../models/article.model');
const AWS = require('aws-sdk');

const createArticle = async (body) => {
  const data = await Article.create(body);
  return data;
};

// const spacesEndpoint = new AWS.Endpoint('https://ams3.digitaloceanspaces.com');
// const s3 = new AWS.S3({
//   endpoint: 'https://ams3.digitaloceanspaces.com',
//   useAccelerateEndpoint: false,
//   s3ForcePathStyle: false,
//   region: 'us-east-1',
//   credentials: new AWS.Credentials('DO00WZQL763YY9XHHH7Q', 'p6rlTv7W7egz03gbKKEmuBf42jVtBpRo4aC1J8ZCVOA'),
// });
// const params = {
//   Bucket: 'healthappobjects',
//   Key: req.files[0].originalname,
//   Body: req.files[0].buffer,
//   ACL: 'public-read',
// };

// let objectId = req.params.id;
// return new Promise(async (resolve, reject) => {
//   s3.upload(params, async function (err, data) {
//     if (err) {
//       reject(err);
//     } else {
//       const ImageUrl = `https://healthappobjects.${spacesEndpoint.host}/${data.Key}`;
//       let uploadData = await Data.findByIdAndUpdate({ _id: objectId }, { ImageUrl: ImageUrl }, { new: true });
//       resolve(uploadData);
//     }
//   });
// });

const imageUpload = async (req) => {
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
        let uploadData = await Article.findByIdAndUpdate({ _id: objectId }, { ImageUrl: ImageUrl }, { new: true });
        resolve(uploadData);
      }
    });
  });
};

const getAllArticle = async () => {
  const data = await Article.find().sort({createdAt:-1});
  return data;
};

const updateArticleById = async (req) => {
  let findArticleById = await Article.findById(req.params.id);
  if (!findArticleById) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Article Not Found');
  }
  findArticleById = await Article.findByIdAndUpdate({ _id: findArticleById._id }, req.body, { new: true });
  return findArticleById;
};

const DeleteArticle = async (req) => {
  let findArticleById = await Article.findById(req.params.id);
  if (!findArticleById) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Article Not Found');
  }
  findArticleById = await Article.deleteOne({ _id: findArticleById._id });
  return { deleted: true };
};

module.exports = { createArticle, imageUpload, getAllArticle, updateArticleById, DeleteArticle };
