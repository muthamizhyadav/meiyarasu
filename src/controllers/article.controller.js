const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const ArticleService = require('../services/article.service');

const createArticle = catchAsync(async (req, res) => {
  const data = await ArticleService.createArticle(req.body);
  res.send(data);
});

const imageUpload = catchAsync(async (req, res) => {
  const data = await ArticleService.imageUpload(req);
  res.send(data);
});

const getAllArticle = catchAsync(async (req, res) => {
  const data = await ArticleService.getAllArticle();
  res.send(data);
});

module.exports = {
  createArticle,
  imageUpload,
  getAllArticle,
};
