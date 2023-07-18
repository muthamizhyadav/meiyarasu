const httpStatus = require('http-status');
const pick = require('../utils/pick');
const ApiError = require('../utils/ApiError');
const catchAsync = require('../utils/catchAsync');
const UploadService = require('../services/videoUpload');

const Upload_Videos = catchAsync(async (req, res) => {
  const videoUpload = await UploadService.Upload_Videos(req);
  res.status(httpStatus.CREATED).send(videoUpload);
});

module.exports = {
  Upload_Videos,
};
