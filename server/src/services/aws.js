const AWS = require('aws-sdk');
const crypto = require('crypto');
const fs = require('fs');
const path = require('path');
const { PassThrough } = require('stream');
import spawn from 'spawn-promise';

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

s3.pu

export const createBucket = ({
  bucketName
}) => {
  const params = {
    ACL: 'public-read',
    Bucket: bucketName,
    CreateBucketConfiguration: {
      LocationConstraint: AWS_S3_REGION
    }
  }

  const staticPolicyParams = {
    Bucket: bucketName,
    WebsiteConfiguration: {
      ErrorDocument: {
        Key: 'index.html'
      },
      IndexDocument: {
        Suffix: 'index.html',
      }
    }
  }

  return new Promise((resolve, reject) => {
    s3.createBucket(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        s3.putBucketWebsite(staticPolicyParams, (staticErr, staticData) => {
          if (staticErr) {
            reject(staticErr);
          } else {
            resolve(data);
          }
        })
      }
    })
  })
}

export const syncThemeFiles = async ({
  bucketName,
  themePath,
}) => {
  console.log('Syncing files');
  const command = `aws s3 sync ${themePath} s3://${bucketName}/ \
  --delete \
  --metadata-directive REPLACE \
  --cache-control max-age=86400,public \
  --acl public-read`

  try {
    await spawn(command, {shell: true})
  } catch (e) {
    console.log('spawn error', e);
  }

  return
}

