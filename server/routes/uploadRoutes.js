const express = require('express');
const router = express.Router();
const { upload, uploadProfilePicture } = require('../controllers/uploadController');

router.post('/upload-profile-picture', upload.single('profilePicture'), uploadProfilePicture);

module.exports = router;
