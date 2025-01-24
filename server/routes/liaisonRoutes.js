const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { registerLiaison, getLiaisonProfile, updateLiaisonProfile, getLiaisonProfilePicture } = require('../controllers/liaisonController'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// route to handle liaison registration
router.post('/liaison-register', upload.single('profilePicture'), async (req, res) => {
  console.log('In liaison route, register.');
  console.log(req.file);
  try {
    await registerLiaison(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error registering liaison.', error });
  }
});

// route to handle fetching liaison profile by id
router.get('/liaison-profile', authenticate, async (req, res) => {
    try {
      const liaisonId = req.user.id;
      const liaisonEmail = req.user.email;
      const liaisonProfile = await getLiaisonProfile(liaisonId, liaisonEmail);
      res.json(liaisonProfile);
    } catch (error) {
        console.error('Error fetching liaison profile:', error);
        res.status(500).json({ message: 'Error fetching liaison profile', error });
    }
});

// update liaison profile
router.put('/liaison-profile', authenticate, async (req, res) => {
  console.log("PUT route reached: liaison-profile");
  try {
    const liaisonId = req.user.id;
    const updatedData = req.body;
    console.log("Router: Updating liaison profile");
    await updateLiaisonProfile(liaisonId, updatedData);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating liaison profile:', error);
    res.status(500).json({ message: 'Error updating liaison profile', error });
  }
});

// route to handle fetching liaison profile picture by id
router.get('/liaison-profile-picture', authenticate, async (req, res) => {
  try {
    const liaisonId = req.user.id;
    const liaisonEmail = req.user.email;
    const liaisonProfile = await getLiaisonProfilePicture(liaisonId, liaisonEmail);
    res.json(liaisonProfile);
  } catch (error) {
      console.error('Error fetching liaison profile picture:', error);
      res.status(500).json({ message: 'Error fetching liaison profile picture', error });
  }
});

module.exports = router;