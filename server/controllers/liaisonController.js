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

//  register a new liaison
const registerLiaison = async (req, res) => {
    console.log('Controller: Registering a new liaison into the database.');
    console.log('Request Body:', req.body);
    console.log('Uploaded File:', req.file);

    const {
        email, password, fullName, colleges, experience, location, biography, education,
        successStories, phoneNumber, linkedIn, certificates, languages, affiliation, title,
        roles, times, communication, articles
    } = req.body;

    console.log('Password:', password);

    try {
        // Check if email is already taken
        const emailTaken = await checkEmail(email);
        if (emailTaken) {
            console.log('Email taken!');
            return res.status(400).json({ success: false, message: 'Email already registered.' });
        }

        // Parse JSON strings into objects/arrays
        let parsedColleges = [];
        let parsedCertifications = [];
        let parsedLanguages = [];
        let parsedAffiliation = [];
        let parsedRoles = [];
        let parsedTimes = [];
        let parsedArticles = [];

        try {
            parsedColleges = JSON.parse(colleges);
            parsedCertifications = JSON.parse(certificates);
            parsedLanguages = JSON.parse(languages);
            parsedAffiliation = JSON.parse(affiliation);
            parsedRoles = JSON.parse(roles);
            parsedTimes = JSON.parse(times);
            parsedArticles = JSON.parse(articles);
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
        const userValues = [email, hashedPassword, 'Liaison'];
        const userResult = await pool.query(userQuery, userValues);
        const userId = userResult.rows[0].id;
        console.log('Controller: Inserted user, ID is: ' + userId);

        // Insert into liaison_profiles table
        const profileQuery = `
            INSERT INTO liaison_profiles (id, profilePicture, fullName, colleges, experience, location,
            biography, education, successStories, phoneNumber, linkedIn, certificates, languages, affiliation, 
            title, roles, times, communication, articles)
            VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19)
        `;
        const profileValues = [
            userId, profilePicture, fullName, parsedColleges, numericExperience, location,
            biography, education, successStories, phoneNumber, linkedIn, parsedCertifications, parsedLanguages, 
            parsedAffiliation, title, parsedRoles, parsedTimes, communication, parsedArticles
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

// get liaison profile by ID
const getLiaisonProfile = async (liaisonId, liaisonEmail) => {
    const query = 'SELECT * FROM liaison_profiles WHERE id = $1';
    const values = [liaisonId];
  
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {
            console.log('Getting liaison information:', result.rows[0]);
            // combine profile info and email to pass to frontend
            return { ...result.rows[0], liaisonEmail };
        } else {
            throw new Error('Liaison profile not found');
        }
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
};

// Function to update strategist profile
const updateLiaisonProfile = async (liaisonId, updatedData) => {
    const { 
        profilepicture, email, phonenumber, linkedin, location, title, education, certificates, 
        languages, experience, roles, successStories, colleges, times, communication, biography, affiliation, articles 
    } = updatedData;

    console.log("Updated", updatedData);
    console.log("Phone number", phonenumber);
    try {
        console.log("Controller: Updating liaison profile in the database");
        await pool.query(
            `UPDATE liaison_profiles SET
                profilePicture = $1,
                phoneNumber = $2,
                linkedIn = $3,
                location = $4,
                title = $5,
                education = $6,
                certificates = $7,
                languages = $8,
                experience = $9,
                roles = $10,
                successStories = $11,
                colleges = $12,
                times = $13,
                communication = $14,
                biography = $15,
                affiliation = $16,
                articles = $17
            WHERE id = $18`,
            [
                profilepicture, phonenumber, linkedin, location, title, education, certificates, 
                languages, experience, roles, successStories, colleges, times, communication, biography, affiliation, articles, liaisonId
            ]
        );
        console.log("Controller: Successfully updated liaison profile in the database");
    } catch (error) {
        console.error('Database query error:', error);
    }
};

// get liaison profile by ID
const getLiaisonProfilePicture = async (liaisonId, liaisonEmail) => {
    const query = 'SELECT profilepicture FROM liaison_profiles WHERE id = $1';
    const values = [liaisonId];
  
    try {
        const result = await pool.query(query, values);
        if (result.rows.length > 0) {

            return result.rows[0];
        } else {
            throw new Error('Liaison profile not found');
        }
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
};
  
module.exports = { checkEmail, uploadProfilePicture, registerLiaison, getLiaisonProfile , updateLiaisonProfile, getLiaisonProfilePicture};
