const express = require('express');
const router = express.Router();
const { login } = require('../controllers/authController');
// const { register } = require('../controllers/authController');
const strategistRoutes = require('./strategistRoutes');
const studentRoutes = require('./studentRoutes');
const liaisonRoutes = require('./liaisonRoutes');
const studentAdvRoutes = require('./studentadvRoutes')
const adminRoutes = require('./adminRoutes')
const uploadRoutes = require('./uploadRoutes');
const interestRoutes = require('./interestRoutes');
const forgotPassword = require('./forgotPassword');
const resetPassword = require('./resetPassword');
const meetingRoutes = require('./meetingRoutes')

router.post('/login', login);

router.use(strategistRoutes);
router.use(studentRoutes);
router.use(liaisonRoutes)
router.use(studentAdvRoutes);
router.use(adminRoutes);
router.use(uploadRoutes);
router.use(interestRoutes);
router.use(forgotPassword);
router.use(resetPassword);
router.use(meetingRoutes);

module.exports = router;