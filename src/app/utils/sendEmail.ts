import nodemailer from 'nodemailer';
import config from '../config';

export const sendEmail = async (to: string, html: string) => {
  const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // gmail's smtp host
    port: 587, // gmail's smtp port
    secure: config.node_env === 'production',
    auth: {
      user: config.smtp_auth_user,
      pass: config.smtp_auth_pass, // ph-university's app password set in my gmail's security
    },
  });

  await transporter.sendMail({
    from: config.smtp_auth_user, // sender address
    to, // list of receivers
    subject: 'Change your password', // Subject line
    text: 'Reset password within 10 minutes!', // plain text body
    html, // html body
  });
};

export const generateOtp = (): string => {
  return Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
};

