const mongoose = require('mongoose');
const { v4 } = require('uuid');

const DataSchema = new mongoose.Schema(
  {
    _id: {
      type: 'string',
      default: v4,
    },
    videoId: {
      type: 'String',
    },
    WorkOutName: {
      type: 'String',
    },
    BodyPart: {
      type: 'String',
    },
    Description: {
      type: 'String',
    },
    Tamil_Description: {
      type: 'String',
    },
    hindi_Description:{
      type:String,
    },
    active: {
      type: Boolean,
      default: true,
    },
    Type: {
      type: 'String',
      default: 'Buttocks',
      lowercase: true,
    },
    videoURL: {
      type: 'String',
    },
    ImageUrl: {
      type: 'String',
    },
  },
  { timestamps: true }
);

const Data = mongoose.model('Data', DataSchema);

module.exports = { Data };
