const express = require('express');
const multer = require('multer');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const {registerStudent, getStudentProfile, updateStudentProfile} = require('../controllers/studentController'); 

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// route to handle student registration
router.post('/student-register', upload.single('profilePicture'), async (req, res) => {
  console.log('In student route, register.')
  try {
    await registerStudent(req, res);
  } catch (error) {
    res.status(500).json({ message: 'Error registering student.', error });
  }
});

// route to handle fetching student profile by id
router.get('/student-profile', authenticate, async (req, res) => {
    try {
      let studentId = req.user.id;  // default to the logged -in student's id
      const studentEmail = req.user.email;
      
      // if the user is an admin, set studentId to be fetched from the request 
      if (req.user.user_type === 'admin') {
        const { studentIdFromRequest } = req.query; 
        if (studentIdFromRequest) {
            studentId = studentIdFromRequest; 
        } else {
            return res.status(400).json({ message: 'Student ID is required for admin users' });
        }
    }

      console.log('Student ID:', studentId);
      const studentProfile = await getStudentProfile(studentId, studentEmail);
      res.json(studentProfile);
    } catch (error) {
        console.error('Error fetching student profile:', error);
        res.status(500).json({ message: 'Error fetching student profile', error });
    }
});

// update student profile
router.put('/student-profile', authenticate, async (req, res) => {
    console.log("PUT route reached: student-profile");
    try {
      const studentId = req.user.id;
      const updatedData = req.body;
      console.log("Router: Updating student profile");
      await updateStudentProfile(studentId, updatedData);
      res.status(200).json({ message: 'Profile updated successfully' });
    } catch (error) {
      console.error('Error updating student profile:', error);
      res.status(500).json({ message: 'Error updating student profile', error });
    }
  });
module.exports = router;
