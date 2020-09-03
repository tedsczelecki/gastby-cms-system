const AWS = require('aws-sdk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');
const { PassThrough } = require('stream');

const {
  AWS_ACCESS_KEY,
  AWS_SECRET_ACCESS_KEY,
  AWS_S3_REGION,
  AWS_S3_BUCKET,
} = process.env;

const s3 = new AWS.S3({
  accessKeyId: AWS_ACCESS_KEY,
  secretAccessKey: AWS_SECRET_ACCESS_KEY
});

const fileTypeSizes = {
  feed: [960],
  source: [2800],
  thumb: [300, 300],
}

const s3Upload = ({ ContentType = 'image/jpeg', stream, key }) => {
  console.log('CONTENT TYPE', ContentType);
  return new Promise((resolve, reject) => {
    const params = {
      Bucket: AWS_S3_BUCKET,
      Key: key,
      Body: stream,
      ACL: 'public-read',
    };

    console.log(params);
    s3.upload(params, (err, data) => {
      console.log('ERROR', err);
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

const s3Delete = ({ url }) => {
  const Key = url.replace('https://', '').split('/').slice(1).join('/');
  return new Promise((resolve, reject) => {
    s3.deleteObject({
      Bucket: AWS_S3_BUCKET,
      Key,
    }, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    })
  })
}

export const getHash = ({
  hashContent = '',
  salt = 'qweasd123345ertdfg'
} = {}) => {
  return crypto.createHash('md5').update(salt + hashContent + new Date().getTime() + salt).digest('hex')
}

export const getFilePathname = () => {
  const hash = getHash();
  return `${hash[0]}/${hash[0]}${hash[1]}/${hash}`;
}

export const getSharpBuffer = ({ stream, size = [] }) => {
  return new Promise((resolve, reject) => {
    const sharpTransform = sharp()
      .rotate()
      .resize(...size)
      .jpeg();

    stream.pipe(sharpTransform);
    resolve(sharpTransform.toBuffer())
  })
}

export const addWatermark = ({ width, aspectRatio, username }) => async (buffer) => {
  return await sharp(buffer)
    .composite([
      getWaterMark({
        aspectRatio,
        username,
        width,
      })
    ])
    .toBuffer();
}

export const getStreamMetadata = ({stream}) => {
  return new Promise((resolve, reject) => {
    stream
      .pipe(sharp().metadata((err, metadata) => {
        if (err) {
          return reject(err);
        }
        resolve(metadata);
      }))
  })
}

export const getWaterMark = ({
  aspectRatio = 1,
  username,
  width = 2020,
}) => {
  return {
    input: Buffer.from(
      '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 '+ width +' 60" version="1.1">'+
          '<text font-family="sans-serif" font-size="20px" x="' + width + '" y="0" fill="#ffffff" text-anchor="end" transform="translate(-24, 32)">'+
            'http://only-what.rebelpixel.ca/'+ username +
          '</text>' +
        '</svg>'
    ),
    gravity: 'southeast',
  }
}

export const prepareAndUploadImage = async ({ filename, metadata, size = [], stream, username }) => {
  const uploadDir = getFilePathname();
  const filenameHash = getHash({ hashContent: filename });
  const hashedFileName = size.length > 0
    ? `${size.join('-')}__${filenameHash}.jpg`
    : `${filenameHash}.jpg`;

  const sharpBuffer = await getSharpBuffer({ stream, size }).then(addWatermark({ width: size[0], username }))

  return await s3Upload({ stream: sharpBuffer, key: `${uploadDir}/${hashedFileName}`});
}

export const createImages = async ({
  createReadStream,
  filename,
  me,
  mimetype,
  models,
  stream,
  type,
}) => {
  const metadata = await getStreamMetadata({ stream: createReadStream() });
  const { width, height } = metadata;
  const aspectRatio = width / height;
  const orientation = width > height ? 'landscape' : 'portrait';
  const size = fileTypeSizes[type || 'feed'];

  const typeObject = await prepareAndUploadImage({
    filename,
    metadata,
    size,
    stream: createReadStream(),
    username: me.username,
  });
  const sourceObject = await prepareAndUploadImage({
    filename,
    metadata,
    size: fileTypeSizes.source,
    stream: createReadStream(),
    username: me.username,
  });
  const thumbObject = await prepareAndUploadImage({
    filename,
    metadata,
    size: fileTypeSizes.thumb,
    stream: createReadStream(),
    username: me.username,
  });

  return await models.File.create({
    userId: me.id,
    mimetype,
    name: filename,
    aspectRatio,
    orientation,
    url: typeObject.Location,
    sourceUrl: sourceObject.Location,
    thumbUrl: thumbObject.Location,
  });
}

export const createVideo = async ({
  createReadStream,
  filename,
  me,
  mimetype,
  models,
  stream,
  type,
}) => {
  console.log(filename);
  const extension = filename.split('.').slice(-1);
  console.log(extension);

  const uploadDir = getFilePathname();
  const filenameHash = getHash({ hashContent: filename });
  const hashedFileName = `${filenameHash}.${extension}`;

  console.log('HASHED NAME', uploadDir, hashedFileName);
  // const Body = Buffer.from(createReadStream, "binary")
  const videoObject = await s3Upload({ stream: createReadStream(), key: `${uploadDir}/${hashedFileName}`});

  return await models.File.create({
    userId: me.id,
    mimetype,
    name: filename,
    url: videoObject.Location,
    sourceUrl: videoObject.Location,
  });
}

export const uploadFile = async ({ file, models, type = 'feed', me }) => {
  const { createReadStream, filename, mimetype, ...rest } = await file;
  const args = { filename, models, createReadStream, type, me, mimetype }

  switch(mimetype) {
    case 'video/mp4':
      console.log('UPLOADING VIDEO');
      return await createVideo(args)
      break;
    default:
      return await createImages(args)
  }

  console.log('REST', rest);
  // const pathObj = await S3Upload({ stream, filename, uploadDir: userId });

  // const souceUrl = await prepareAndUpload({ filename, mimetype, stream, type = 'source' })
  //
  // const photo = await models.File.create({
  //   userId,
  //   name: filename,
  //   sourceUrl,
  //   url//pathObj.Location
  // });
  //
  // return photo
}

export const deleteFiles = async ({
  files,
  me,
  models,
}) => {
  return await Promise.all(files.map(async (file) => {
    return await deleteFileById({
      fileId: file.id,
      me,
      models,
    })
  }))
}

export const deleteFileById = async ({
  fileId,
  models,
  me,
}) => {
  const file = await models.File.findOne({
    where: {
      id: fileId,
      userId: me.id,
    }
  });

  await deleteFile({ file });


  // await models.File.destroy({
  //   where: {
  //     id: fileId,
  //     userId: me.id,return
  //   }
  // })
  return;
}

export const deleteFile = async ({
  file
}) => {
  await Promise.all([
    s3Delete({ url: file.url }),
    s3Delete({ url: file.sourceUrl }),
  ])
}
