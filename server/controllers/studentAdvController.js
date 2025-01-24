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

//  register a new student advisor
const registerStudentAdv = async (req, res) => {
    console.log('Controller: Registering a new student advisor into the database.');
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const {
        email, password, fullName, phoneNumber, gender, school, grade, gpa
    } = req.body;

    console.log('Password:', password);

    try {
        // Check if email is already taken
        const emailTaken = await checkEmail(email);

        if (emailTaken) {
            console.log('Email taken!');
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

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
        const userValues = [email, hashedPassword, 'Student Advisor'];
        const userResult = await pool.query(userQuery, userValues);
        const userId = userResult.rows[0].id;
        console.log('Controller: Inserted user, ID is: ' + userId);

        // Insert into strategist_profiles table
        const profileQuery = `
            INSERT INTO student_adv_profiles (id, profilePicture, fullName,
            phoneNumber, gender, school, grade, gpa)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8)
        `;
        const profileValues = [
            userId, profilePicture, fullName, phoneNumber, gender, school, grade, gpa
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

// get student advisor profile by ID
const getStudentAdvProfile = async (studentAdvId, studentAdvEmail) => {
    const query = 'SELECT * FROM student_adv_profiles WHERE id = $1';
    const values = [studentAdvId];
  
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            console.log('Getting student advisor information:', result.rows[0]);
            // combine profile info and email to pass to frontend
          return { ...result.rows[0], studentAdvEmail} ; 
        } else {
          throw new Error('Student advisor profile not found');
        }
      } catch (err) {
        console.error('Database query error:', err);
        throw err;
      }
};

// Function to update student advisor profile
const updateStudentAdvProfile = async (studentAdvId, updatedData) => {
  const { phonenumber, gender, school, grade, gpa} = updatedData;

  console.log(updatedData);
  console.log("gpa", gpa);
  try {
    console.log("Controller: Updating student advisor profile in database")
    await pool.query(
      `UPDATE student_adv_profiles SET
        phoneNumber = $1,
        gender = $2,
        school = $3,
        grade = $4,
        gpa = $5
      WHERE id = $6`,
      [phonenumber, gender, school, grade, gpa, studentAdvId]
    );
    console.log("Controller: Successfully updated student advisor profile in database")
  } catch (error) {
    console.error('Database query error:', error);
  }
}
  
module.exports = { checkEmail, uploadProfilePicture, registerStudentAdv, getStudentAdvProfile , updateStudentAdvProfile};


