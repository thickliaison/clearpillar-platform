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

// check if email is taken
// const checkEmail = async (email) => {
//   console.log('Controller: Checking if email: ' + email + ' is taken for students.')

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

//  register a new student
const registerStudent = async (req, res) => {
    console.log('Controller: Registering a new student into the database.');
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const {
        email, password, fullName, phoneNumber, dob, gender, address, school,
        grade, gpa, satScore, actScore
    } = req.body;

    try {
        // Check if email is already taken
        const emailTaken = await checkEmail(email);
        if (emailTaken) {
            console.log('Email taken!');
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        const numericgpa = parseFloat(gpa);
        const numericsat = parseFloat(satScore);
        const numericact = parseFloat(actScore);

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
        const userValues = [email, hashedPassword, 'Student'];
        const userResult = await pool.query(userQuery, userValues);
        const userId = userResult.rows[0].id;
        console.log('Controller: Inserted user, ID is: ' + userId);

        // Insert into student_profiles table
        const profileQuery = `
            INSERT INTO student_profiles (id, profilePicture, fullName, phoneNumber, dob, gender, 
            address, school, grade, gpa, satScore, actScore)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12)
        `;
        const profileValues = [
            userId, profilePicture, fullName, phoneNumber, dob, gender, 
            address, school, grade, numericgpa, numericsat, numericact
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

// get student profile by ID
const getStudentProfile = async (studentId, studentEmail) => {
    const query = 'SELECT * FROM student_profiles WHERE id = $1';
    const values = [studentId];
  
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            console.log('Getting student information:', result.rows[0]);
            // combine profile info and email to pass to frontend
          return { ...result.rows[0], studentEmail} ; 
        } else {
          throw new Error('Student profile not found');
        }
      } catch (err) {
        console.error('Database query error:', err);
        throw err;
      }
};

// Function to update student profile
const updateStudentProfile = async (studentId, updatedData) => {
    const { phonenumber, dob, gender, address, school, grade, gpa, satscore, actscore } = updatedData;
  
    console.log(updatedData);
    try {
      console.log("Controller: Updating student profile in database")
      await pool.query(
        `UPDATE student_profiles SET
          phonenumber = $1,
          dob = $2,
          gender = $3,
          address = $4,
          school = $5,
          grade = $6,
          gpa = $7,
          satscore = $8,
          actscore = $9
        WHERE id = $10`,
        [phonenumber, dob, gender, address, school, grade, gpa, satscore, actscore, studentId]
      );
      console.log("Controller: Successfully updated student profile in database")
    } catch (error) {
      console.error('Database query error:', error);
    }
  }
  
module.exports = { checkEmail, registerStudent, uploadProfilePicture, getStudentProfile, updateStudentProfile };


