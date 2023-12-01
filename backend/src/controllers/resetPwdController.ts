import * as mssql from 'mssql';
import * as bcrypt from 'bcrypt';
import * as nodemailer from 'nodemailer';
import * as crypto from 'crypto';
import dotenv from 'dotenv';
import { sqlConfig } from '../config/sqlConfig';

dotenv.config();

// const { sqlConfig } = require('../Config/config');

// Nodemailer configuration
const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  service: 'gmail',
  port: 587,
  auth: {
    user: process.env.EMAIL,
    pass: process.env.EMAIL_PWD,
  },
});

// This is a function for generating unique Token
const generateUniqueToken = () => {
  return crypto.randomBytes(3).toString('hex').toUpperCase();
};

/////FUNCTION TO SAVE TOKEN TO THE DATABASE
const saveResetTokenToDatabase = async (userEmail: string, resetToken: string, expiration: Date) => {
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('userEmail', mssql.NVarChar(255), userEmail)
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .input('expiration', mssql.DateTime, expiration)
    .execute('createResetToken');
};

// UPDATING PASSWORD IN DATABASE
const updatePasswordInDatabase = async (userEmail: string, newPassword: string) => {
  const hashedPwd = await bcrypt.hash(newPassword, 8);
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('userEmail', mssql.NVarChar(255), userEmail)
    .input('newPassword', mssql.NVarChar(255), hashedPwd)
    .execute('updatePassword');
};

// FUNCTION FOR DELETING THE RESET TOKEN FROM DATABASE AFTER ONE HOUR IS DONE
const deleteTokenFromDatabase = async (resetToken: string) => {
  const pool = await mssql.connect(sqlConfig);
  await pool.request()
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .execute('deleteResetToken');
};

// FUNCTION FOR GETTING THE TOKEN INFORMATION FROM DATABASE
const getTokenInfoFromDatabase = async (resetToken: string) => {
  const pool = await mssql.connect(sqlConfig);
  const result = await pool.request()
    .input('resetToken', mssql.NVarChar(255), resetToken)
    .query('EXEC getTokenInfo @resetToken');

  if (result.recordset.length > 0) {
    return result.recordset[0];
  }

  return null;
};

// FUNCTION TO SEND AN EMAIL
const sendResetEmail = async (userEmail: string, resetLink: string) => {
  const mailOptions: nodemailer.SendMailOptions = {
    from: process.env.EMAIL,
    to: userEmail,
    subject: `Password Reset Request for ${userEmail}`,
    text: `Here is your password reset code: ${resetLink}. Use it within one hour. If you did not request to reset your password, kindly ignore`,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending email:', error);
  }
};

export {
  saveResetTokenToDatabase,
  updatePasswordInDatabase,
  deleteTokenFromDatabase,
  getTokenInfoFromDatabase,
  generateUniqueToken,
  sendResetEmail,
};
