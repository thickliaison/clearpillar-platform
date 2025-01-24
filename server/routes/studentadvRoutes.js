const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {registerStudentAdv, getStudentAdvProfile, updateStudentAdvProfile} = require('../controllers/studentAdvController'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// route to handle student advisor registration
router.post('/student-adv-register', upload.single('profilePicture'), async (req, res) => {
  console.log('In Student Advisor route, register.')
  try {
    await registerStudentAdv(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error registering Student Advisor.', error });
  }
});

// route to handle fetching student advisor profile by id
router.get('/student-adv-profile', authenticate, async (req, res) => {
    try {
      const studentAdvId = req.user.id;
      const studentAdvEmail = req.user.email;
      const studentAdvProfile = await getStudentAdvProfile(studentAdvId, studentAdvEmail);
      res.json(studentAdvProfile);
    } catch (error) {
        console.error('Error fetching Student Advisor profile:', error);
        res.status(500).json({ message: 'Error fetching Student Advisor profile', error });
    }
});

// update student advisor profile
router.put('/student-adv-profile', authenticate, async (req, res) => {
  console.log("PUT route reached: student advisor profile");
  try {
    const studentAdvId = req.user.id;
    const updatedData = req.body;
    console.log("Router: Updating student advisor profile");
    await updateStudentAdvProfile(studentAdvId, updatedData);
    res.status(200).json({ message: 'Profile updated successfully' });
  } catch (error) {
    console.error('Error updating student advisor profile:', error);
    res.status(500).json({ message: 'Error updating student advisor profile', error });
  }
});

module.exports = router;
