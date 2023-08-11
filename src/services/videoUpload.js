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
  let arr = [
    {
      videoId: '88',
      WorkOutName: 'Back Extension',
      BodyPart: 'Buttocks',
      Description:
        'Your upper body should be supported by the back extension machine at a 45-degree angle.\n\nPut your hands behind your head or cross your arms over your chest while standing with your feet under the footpads.\n\nStretch your back by lowering your upper body towards the floor.\nAlign your upper and lower bodies by raising your upper body back up.\n\nThe appropriate number of times should be repeated.',
    },
    {
      videoId: '89',
      WorkOutName: 'Bridging',
      BodyPart: 'Buttocks',
      Description:
        'Laying on your back on the floor or a soft exercise mat is a good place to start.\n\nPut your feet level on the ground about hip-width apart while bending your knees. When your arms are at your sides, your feet should be near enough that you can touch them with your fingertips.\n\nYour palms should be facing down when you rest your arms at your sides.\n\nEngage your core and glutes as you gradually lift your hips off the ground after your body is straight from your shoulders to your knees.\n\nAt the peak of the exercise, squeeze your glutes and hold for a few seconds.\n\nIn a controlled manner, bring your hips back to the starting position.\n\nThe appropriate number of times should be repeated.',
    },
    {
      videoId: '90',
      WorkOutName: 'Floor Hip Abductions',
      BodyPart: 'Buttocks',
      Description:
        "Lay on your side on the floor or a soft workout mat. You have the option of supporting your head with your hand or resting it on your arm.\n\nKeep your legs straight and stack them atop one another.\n\nLift your upper leg slowly away from the bottom leg while maintaining it straight.\n\nLift the leg as high as you find comfortable while keeping your form in check.\nYour hip's side ought to contract when you read this.\n\nFor a brief period, maintain the raised position while squeezing the muscles on the side of your hip.\n\nIn a controlled manner, bring the leg back down to the beginning position.\n\nFor the necessary number of times, perform the hip abduction exercise on one side.\n\nRepeat the same amount of repetitions on the opposite side.",
    },
    {
      videoId: '91',
      WorkOutName: 'Floor Hip Extensions',
      BodyPart: 'Buttocks',
      Description:
        "Beginning on all fours. Your shoulders, hips, and hands should all be in line with each other. Make sure your spine is straight, then tighten your abdominals.\n\nLift your right leg off the ground while shifting your weight to your left side. As you attempt to press your right foot's heel into the wall behind you, push your right foot back and up while straightening your knee. Avoid moving your hips or shoulders; instead, focus mostly on your glutes. Be very careful to avoid arching your lower back. Maintain your leg at hip level.\n\nPut your leg back in its original position.\n\nRepeat the same amount of repetitions on the opposite side",
    },
  ];
  const creations = await Data.create(arr);
  return creations;
  // return { msg: 'Content creation blocked contact your Developer' };
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

const updateDataById = async (id, body) => {
  let values = await Data.findById(id);
  if (!values) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Not Found OR Icorrect Id');
  }
  values = await Data.findByIdAndUpdate({ _id: id }, body, { new: true });
  return values;
};

module.exports = {
  Upload_Videos,
  contentUpload,
  getAllData,
  Upload_Image,
  createNewData,
  updateDataById,
};
