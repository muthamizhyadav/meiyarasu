const express = require('express');
const router = express.Router();
const ArticleController = require('../../controllers/article.controller');
const ArticleMiddleware = require('../../middlewares/articleImg');
router.route('/').post(ArticleController.createArticle);
router.route('/image/upload/:id').put(ArticleMiddleware, ArticleController.imageUpload);
router.route('/getAllArticle').get(ArticleController.getAllArticle);

module.exports = router;
