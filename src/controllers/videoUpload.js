const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const UploadService = require('../services/videoUpload');

const Upload_Videos = catchAsync(async (req, res) => {
  const videoUpload = await UploadService.Upload_Videos(req);
  res.status(httpStatus.CREATED).send(videoUpload);
});

const contentUpload = catchAsync(async (req, res) => {
  const data = await UploadService.contentUpload();
  res.status(httpStatus.CREATED).send(data);
});

const getAllData = catchAsync(async (req, res) => {
  const data = await UploadService.getAllData();
  res.status(httpStatus.OK).send(data);
});

const Upload_Image = catchAsync(async (req, res) => {
  const data = await UploadService.Upload_Image(req);
  res.status(httpStatus.CREATED).send(data);
});

const createNewData = catchAsync(async (req, res) => {
  const data = await UploadService.createNewData(req.body);
  res.status(httpStatus.CREATED).send(data);
});

module.exports = {
  Upload_Videos,
  contentUpload,
  getAllData,
  Upload_Image,
  createNewData,
};
