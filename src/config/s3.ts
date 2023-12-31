import AWS from 'aws-sdk';

export const S3 = new AWS.S3({
    accessKeyId:process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY,
    region: process.env.NEXT_PUBLIC_AWS_S3_REGION,
  });
