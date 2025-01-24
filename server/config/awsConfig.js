const { S3Client } = require('@aws-sdk/client-s3');

const s3 = new S3Client({
  region: 'us-east-1',
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
  },
  endpoint: 'https://s3.us-east-1.amazonaws.com', 
});

module.exports = s3;
