import aws from "../../configs/aws.js";

export const uploadFile = async (path, buffer, mimetype) => {
  const file = await aws
    .upload({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: path,
      Body: buffer,
      ContentType: mimetype,
    })
    .promise();

  return file.Location;
};

export const deleteFile = async (path) => {
  await aws
    .deleteObject({
      Bucket: process.env.BACKBLAZE_BUCKET,
      Key: path,
    })
    .promise();
};
