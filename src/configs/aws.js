import aws from "aws-sdk";
import { config } from "dotenv";

config();

const s3 = new aws.S3({
  endpoint: new aws.Endpoint(process.env.ENDPOINT_S3),
  credentials: {
    accessKeyId: process.env.KEY_ID,
    secretAccessKey: process.env.APP_KEY,
  },
});

export default s3;
