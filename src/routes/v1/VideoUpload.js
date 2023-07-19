const express = require('express');
const router = express.Router();
const videoUploadController = require('../../controllers/videoUpload');
const videoMiddleware = require('../../middlewares/vid');
router.route('/').post(videoMiddleware, videoUploadController.Upload_Videos);
router.route('/content').get(videoUploadController.contentUpload);
router.route('/get/All').get(videoUploadController.getAllData);

module.exports = router;
