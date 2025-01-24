const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const pool = require('../database');
const s3 = require('../config/awsConfig');  
const {checkEmail} = require('../controllers/authController');


const uploadProfilePicture = async (file) => {
    if (!file) {
        throw new Error('No file uploaded');
    }

    console.log('Storing profile picture in bucket.')

    const fileName = `profile-pictures/${uuidv4()}${path.extname(file.originalname)}`;
    const uploadParams = {
        Bucket: 'bucket-ak1q67',
        Key: fileName,
        Body: file.buffer,
        ContentType: file.mimetype
    };

    try {
        const data = await s3.send(new PutObjectCommand(uploadParams));
        return `https://${uploadParams.Bucket}.s3.us-east-1.amazonaws.com/${uploadParams.Key}`;
    } catch (err) {
        console.error(`Error uploading file: ${err.message}`);
        throw new Error(`Error uploading file: ${err.message}`);
    }
};

// // check if email is taken
// const checkEmail = async (email) => {
//   console.log('Controller: Checking if email: ' + email + ' is taken')

//   const query = 'SELECT * FROM users WHERE email = $1';
//   const values = [email];

//   try {
//     const result = await pool.query(query, values);
//     if (result.rows.length > 0) {
//         console.error('There is a match found for existing user :', values);
//     }
//     return result.rows.length > 0; // return true if email found
//   } catch (err) {
//     console.error('Database query error:', err);
//     throw err;
//   }
// };

//  register a new strategist
const registerStrategist = async (req, res) => {
    console.log('Controller: Registering a new strategist into the database.');
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const {
        email, password, fullName, colleges, experience, specialization, biography, education,
        successStories, phoneNumber, linkedIn, certifications, languages, associations
    } = req.body;

    try {
        // Check if email is already taken
        const emailTaken = await checkEmail(email);
        if (emailTaken) {
            console.log('Email taken!');
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        // Parse JSON strings into objects/arrays
        let parsedColleges = [];
        let parsedSpecialization = [];
        let parsedCertifications = [];
        let parsedLanguages = [];
        let parsedAssociations = [];

        try {
            parsedColleges = JSON.parse(colleges);
            parsedSpecialization = JSON.parse(specialization);
            parsedCertifications = JSON.parse(certifications);
            parsedLanguages = JSON.parse(languages);
            parsedAssociations = JSON.parse(associations);
        } catch (err) {
            console.error('Error parsing JSON:', err);
            return res.status(400).json({ success: false, message: 'Invalid JSON format in one or more fields.' });
        }

        const numericExperience = parseFloat(experience);

        // Handle profile picture upload
        let profilePicture = null;
        if (req.file) {
            try {
                profilePicture = await uploadProfilePicture(req.file);
                console.log('Profile Picture URL:', profilePicture);
            } catch (uploadError) {
                console.error('Error uploading profile picture:', uploadError);
                return res.status(500).json({ success: false, message: 'Error uploading profile picture.' });
            }
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into users table
        const userQuery = `
            INSERT INTO users (email, password, user_type)
            VALUES ($1, $2, $3) RETURNING id
        `;
        const userValues = [email, hashedPassword, 'Strategist'];
        const userResult = await pool.query(userQuery, userValues);
        const userId = userResult.rows[0].id;
        console.log('Controller: Inserted user, ID is: ' + userId);

        // Insert into strategist_profiles table
        const profileQuery = `
            INSERT INTO strategist_profiles (id, profilePicture, fullName, colleges, experience, specialization, 
            biography, education, successStories, phoneNumber, linkedIn, certifications, languages, associations)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14)
        `;
        const profileValues = [
            userId, profilePicture, fullName, parsedColleges, numericExperience, parsedSpecialization, biography, education,
            successStories, phoneNumber, linkedIn, parsedCertifications, parsedLanguages, parsedAssociations
        ];
        await pool.query(profileQuery, profileValues);

        console.log('Registration successful.');
        return res.json({ success: true });
    } catch (err) {
        console.error('Database insertion error:', err);
        if (!res.headersSent) {
            return res.status(500).json({ success: false, message: 'Internal server error.' });
        }
    }
};

// get strategist profile by ID
const getStrategistProfile = async (strategistId, strategistEmail) => {
    const query = 'SELECT * FROM strategist_profiles WHERE id = $1';
    const values = [strategistId];
  
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            console.log('Getting strategist information:', result.rows[0]);
            // combine profile info and email to pass to frontend
          return { ...result.rows[0], strategistEmail} ; 
        } else {
          throw new Error('Strategist profile not found');
        }
      } catch (err) {
        console.error('Database query error:', err);
        throw err;
      }
};

// Function to update strategist profile
const updateStrategistProfile = async (strategistId, updatedData) => {
  const { phonenumber, linkedin, experience, biography, education, successstories, specialization, certifications, languages, associations } = updatedData;

  console.log(updatedData);
  try {
    console.log("Controller: Updating strategist profile in database")
    await pool.query(
      `UPDATE strategist_profiles SET
        phoneNumber = $1,
        linkedIn = $2,
        experience = $3,
        biography = $4,
        education = $5,
        successStories = $6,
        specialization = $7,
        certifications = $8,
        languages = $9,
        associations = $10
      WHERE id = $11`,
      [phonenumber, linkedin, experience, biography, education, successstories, specialization, certifications, languages, associations, strategistId]
    );
    console.log("Controller: Successfully updated strategist profile in database")
  } catch (error) {
    console.error('Database query error:', error);
  }
}
  
module.exports = { checkEmail, uploadProfilePicture, registerStrategist, getStrategistProfile , updateStrategistProfile};


