const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const bcrypt = require('bcrypt');
const pool = require('../database');
const s3 = require('../config/awsConfig');  

// get table of liaison information
const getAllLiaison = async (req, res) => {
  console.log("Controller: getting all liaison information");
  try {
      const query = `
        SELECT 
          id, 
          fullName, 
          phoneNumber, 
          linkedin, 
          location, 
          title, 
          profilePicture, 
          education, 
          certificates, 
          languages, 
          experience, 
          roles, 
          successStories, 
          colleges, 
          times, 
          communication, 
          biography, 
          affiliation, 
          articles 
        FROM liaison_profiles
      `;
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching liaison profiles:', err);
      res.status(500).json({ message: 'Error fetching liaison profiles' });
  }
};

// get table of liaison information
const getAllStudent = async (req, res) => {
  console.log("Controller: getting all student information");
  try {
      const query = `
 SELECT 
        student_profiles.id AS student_id, 
        student_profiles.fullName, 
        student_profiles.phoneNumber, 
        student_profiles.dob, 
        student_profiles.gender, 
        student_profiles.address, 
        student_profiles.school, 
        student_profiles.grade, 
        student_profiles.gpa, 
        student_profiles.satScore, 
        student_profiles.actScore,
        student_profiles.profilePicture,
        liaison_profiles.id AS liaison_id, 
        liaison_profiles.fullname AS liaison_name,
        student_liaison_matches.notes
      FROM student_profiles
      LEFT JOIN student_liaison_matches 
        ON student_profiles.id = student_liaison_matches.student_id
      LEFT JOIN liaison_profiles 
        ON student_liaison_matches.liaison_id = liaison_profiles.id      
        `;
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching student profiles:', err);
      res.status(500).json({ message: 'Error fetching student profiles' });
  }
};

// get table of liaison information
const getAllStrategist = async (req, res) => {
  console.log("Controller: getting all strategist information");
  try {
      const query = `
        SELECT 
          id, 
          fullName, 
          colleges, 
          experience, 
          specialization, 
          biography, 
          education, 
          successStories, 
          linkedIn, 
          certifications, 
          languages,
          associations,
          profilePicture
        FROM strategist_profiles
      `;
      const result = await pool.query(query);
      res.json(result.rows);
  } catch (err) {
      console.error('Error fetching strategist profiles:', err);
      res.status(500).json({ message: 'Error fetching strategist profiles' });
  }
};

// create student and liaison match
const createStudentLiaisonMatch = async (req, res) => {
  const { studentId, liaisonId, notes } = req.body;
  console.log("Matching Liaison + Student");
  console.log(req.body);

  try {
    await pool.query(
      'INSERT INTO student_liaison_matches (student_id, liaison_id, notes) VALUES ($1, $2, $3)',
      [studentId, liaisonId, notes]
    );
    res.status(200).json({ message: 'Match created successfully' });
  } catch (error) {
    console.error('Error creating match:', error);
    res.status(500).json({ error: 'Failed to create match' });
  }
};

// get individual liaison profile by ID for admin
const getLiaisonProfileById = async (req, res) => {
  const liaisonId = req.params.liaisonId; // liaison id from url

  const query = 'SELECT * FROM liaison_profiles WHERE id = $1';
  const values = [liaisonId];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
      console.log('Getting liaison information:', result.rows[0]);
      res.json(result.rows[0]); 
    } else {
      throw new Error('Liaison profile not found');
    }
  } catch (err) {
    console.error('Database query error:', err);
    res.status(500).json({ message: 'Error fetching liaison profile' });
  }
};


module.exports = {getAllLiaison, getAllStudent, getAllStrategist, createStudentLiaisonMatch, getLiaisonProfileById};
