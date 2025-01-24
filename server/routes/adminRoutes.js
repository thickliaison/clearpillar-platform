const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
// const { getAllLiaison, getAllStudent, getAllStrategist, createStudentLiaisonMatch, getStudentLiaisonMatch, getLiaisonProfileById } = require('../controllers/adminController'); 
const { getAllLiaison, getAllStudent, getAllStrategist, createStudentLiaisonMatch, getLiaisonProfileById } = require('../controllers/adminController'); 

// Get table of liaison information
router.get('/all-liaison-table', authenticate, getAllLiaison);

// Get table of student information
router.get('/all-student-table', authenticate, getAllStudent);

// Get table of strategist information
router.get('/all-strategist-table', authenticate, getAllStrategist);

// create match between liaison and student
router.post('/match-student-liaison', createStudentLiaisonMatch);

// get match between liaison and student
//router.post('/get-student-liaison-match', getStudentLiaisonMatch);

// route to get liaison info
router.get('/get-liaison-profile/:liaisonId', getLiaisonProfileById);

module.exports = router;