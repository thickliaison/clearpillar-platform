const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const nodemailer = require('nodemailer');
const {checkEmail, saveResetToken} = require('../controllers/authController');
require('dotenv').config();

// Function to send email
const sendResetEmail = async (email, token) => {
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Password Reset Request',
      text: `You requested a password reset. Click the link below to reset your password:\n\n` +
            `http://localhost:3000/reset-password?token=${token}\n\n` +
            `If you didn't request this, please ignore this email.`
    };

    console.log("Sending reset password email");

    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");

  } catch (error) {
    console.error("Error sending email:", error.message); // Log error details
    throw error;
  }
};


router.post('/forgot-password', async (req, res) => {
  const { email } = req.body;
  const token = crypto.randomBytes(20).toString('hex');

  console.log("User requesting reset: ", email);
  try {

    const emailExist = await checkEmail(email);
    console.log("Email exists:", emailExist);
    
    if (emailExist) {
       // Save the reset token and expiration time to the database
      await saveResetToken(email, token);

      // Send reset email
      await sendResetEmail(email, token);

      res.status(200).send({ message: 'Password reset link sent.' });
    }
    else {
      res.status(404).send({ warning: 'Email address not found.' });
    }
  
  } catch (error) {
    res.status(500).send({ error: 'Failed to process request.' });
  }
});

module.exports = router;
