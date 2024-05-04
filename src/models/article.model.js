const mongoose = require('mongoose');
const { v4 } = require('uuid');

const ArticleSchema = new mongoose.Schema(
  {
    _id: {
      type: String,
      default: v4,
    },
    title: {
      type: String,
    },
    description: {
      type: String,
    },
    Tamil_Description: {
      type: String,
    },  hindi_Description: {
      type: String,
    },
    ImageUrl: {
      type: String,
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

const Article = mongoose.model('Article', ArticleSchema);

module.exports = { Article };
