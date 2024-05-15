import nodemailer from "nodemailer";

export const transport = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const send = (to, subject, html) => {
  return new Promise((resolve, reject) => {
    transport.sendMail(
      {
        from: process.env.EMAIL_FROM,
        to,
        subject,
        html,
      },
      (error, info) => {
        if (error) {
          reject(error);
        } else {
          resolve(info);
        }
      }
    );
  });
};
