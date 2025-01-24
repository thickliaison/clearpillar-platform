const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const db = require('../database');
const {resetPassword} = require('../controllers/authController');

router.post('/reset-password', async (req, res) => {
  console.log("Resetting password");

  const { token, password } = req.body;

  try {
    const result = await resetPassword(token, password);

    if (result.error) {
      return res.status(400).send({ error: result.error });
    }

    res.status(200).send({ message: result.message });
  } catch (error) {
    res.status(500).send({ error: 'Failed to reset password.' });
  }
});

module.exports = router;
