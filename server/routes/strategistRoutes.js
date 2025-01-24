const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {registerStrategist, getStrategistProfile, updateStrategistProfile} = require('../controllers/strategistController'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// route to handle strategist registration
router.post('/strategist-register', upload.single('profilePicture'), async (req, res) => {
  console.log('In strategist route, register.')
  try {
    await registerStrategist(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error registering strategist.', error });
  }
});

// route to handle fetching strategist profile by id
router.get('/strategist-profile', authenticate, async (req, res) => {
    try {
      const strategistId = req.user.id;
      const strategistEmail = req.user.email;
      const strategistProfile = await getStrategistProfile(strategistId, strategistEmail);
      res.json(strategistProfile);
    } catch (error) {
        console.error('Error fetching strategist profile:', error);
        res.status(500).json({ message: 'Error fetching strategist profile', error });
    }
});

// update strategist profile
router.put('/strategist-profile', authenticate, async (req, res) => {
  console.log("PUT route reached: strategist-profile");
  try {
    const strategistId = req.user.id;
    const updatedData = req.body;
    console.log("Router: Updating strategist profile");
    await updateStrategistProfile(strategistId, updatedData);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating strategist profile:', error);
    res.status(500).json({ message: 'Error updating strategist profile', error });
  }
});

module.exports = router;
