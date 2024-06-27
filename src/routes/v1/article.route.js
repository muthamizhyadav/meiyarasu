const express = require('express');
const router = express.Router();
const ArticleController = require('../../controllers/article.controller');
const ArticleMiddleware = require('../../middlewares/articleImg');
router.route('/').post(ArticleController.createArticle);
router.route('/image/upload/:id').put(ArticleMiddleware, ArticleController.imageUpload);
router.route('/getAllArticle').get(ArticleController.getAllArticle);
router.route("/update/:id").put(ArticleController.updateArticleById);
router.route("/delete/byId/:id").delete(ArticleController.DeleteArticle);


module.exports = router;
