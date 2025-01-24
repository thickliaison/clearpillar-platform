const express = require('express');
const router = express.Router();
const authenticate = require('../middleware/authenticate');
const { getMeetings, createMeeting } = require('../controllers/meetingController'); 

router.get('/meetings', authenticate, async (req, res) => {
    try {
      const id = req.user.id;
      //const email = req.user.email;
      const meetings = await getMeetings(id);
      res.json(meetings);
    } catch (error) {
        console.error('Error fetching meetings:', error);
        res.status(500).json({ message: 'Error fetching meetings', error });
    }
});

router.post('/create-meeting', authenticate, async (req, res) => {
  try {
    const id = req.user.id;
    const response = await createMeeting(id, req.body.datetime, req.body.student);
    if (response.success) {
      res.status(200).json({ message: 'Created meeting!' });
    }
      
  } catch (error) {
      console.error('Error fetching meetings:', error);
      res.status(500).json({ message: 'Error fetching meetings', error });
  }
});

module.exports = router;