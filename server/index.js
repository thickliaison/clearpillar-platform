// for creating tables back end and testing
// TO CREATE TABLES, RUN: node index.js and then go to the URL (ex: localhost:3001/api/create-init-table)
const express = require('express');
const app = express();
const pool = require('./database');
const bcrypt = require('bcrypt');

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Getting database');
});

// create users table for checking login information
app.get('/create-init-table', async (req, res) => {
  try {
    console.log('Attempting to create a table...');
    const createTableQuery = `
      CREATE TABLE IF NOT EXISTS users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) NOT NULL,
          user_type VARCHAR(50) NOT NULL,
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(createTableQuery);
    res.send('Table created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// insert admin information manually
app.get('/insert-admin-data', async (req, res) => {
  try {
    console.log('Attempting to insert into table as admin...');
    const hashedPassword = await bcrypt.hash('clearpillar', 10);
    const insertDataQuery = `
      INSERT INTO users (email, password, user_type) 
      VALUES ($1, $2, $3) 
      RETURNING id;
    `;
    const values = ['clearpillaradmin@gmail.com', hashedPassword, 'Admin'];
    const result = await pool.query(insertDataQuery, values);
    res.send(`Inserted user with ID: ${result.rows[0].id}`);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create strategist profile table
app.get('/create-strategist-table', async (req, res) => {
    try {
      console.log('Attempting to create strategist profile table');
      const insertDataQuery = `
       CREATE TABLE IF NOT EXISTS strategist_profiles (
          id INTEGER PRIMARY KEY REFERENCES users(id),
          profilePicture VARCHAR(255),
          fullName VARCHAR(255),
          colleges TEXT[], 
          experience INTEGER,
          specialization TEXT[], 
          biography TEXT,
          education TEXT, 
          successStories TEXT, 
          phoneNumber VARCHAR(20), 
          linkedIn VARCHAR(255),
          certifications TEXT[],
          languages TEXT[],
          associations TEXT[],
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
      `;
      await pool.query(insertDataQuery);
      res.send('Strategist Profile Table created successfully');
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

// create student profile table
app.get('/create-student-table', async (req, res) => {
  try {
    console.log('Attempting to create student profile table');
    const insertDataQuery = `
     CREATE TABLE IF NOT EXISTS student_profiles (
        id INTEGER PRIMARY KEY REFERENCES users(id),
        profilePicture VARCHAR(255),
        fullName VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL, 
        dob VARCHAR(10), 
        gender TEXT,
        address TEXT,
        school TEXT, 
        grade TEXT,
        gpa DECIMAL(3, 2), 
        satScore INTEGER,
        actScore INTEGER,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );
    `;
    await pool.query(insertDataQuery);
    res.send('Student Profile Table created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create liaison profile table
app.get('/create-liaison-table', async (req, res) => {
  try {
    console.log('Attempting to create liaison profile table');
    const insertDataQuery = `
     CREATE TABLE IF NOT EXISTS liaison_profiles (
        id INTEGER PRIMARY KEY REFERENCES users(id),
        profilePicture VARCHAR(255),
        fullName VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL, 
        linkedin VARCHAR(255),
        location TEXT,
        title TEXT,
        education TEXT, 
        certificates TEXT[],
        languages TEXT[],
        experience INTEGER,
        roles TEXT[],
        successStories TEXT,
        colleges TEXT[], 
        times TEXT[],
        communication TEXT[], 
        biography TEXT, 
        affiliation TEXT[], 
        articles TEXT[], 
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      );
    `;
    await pool.query(insertDataQuery);
    res.send('Liaison Profile Table created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// create student advisor profile table
app.get('/create-student-advisor-table', async (req, res) => {
  try {
    console.log('Attempting to create student advisor profile table');
    const insertDataQuery = `
     CREATE TABLE IF NOT EXISTS student_adv_profiles (
        id INTEGER PRIMARY KEY REFERENCES users(id),
        profilePicture VARCHAR(255),
        fullName VARCHAR(255) NOT NULL,
        phoneNumber VARCHAR(20) NOT NULL, 
        gender VARCHAR(255),
        school TEXT,
        grade TEXT, 
        gpa TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      );
    `;
    await pool.query(insertDataQuery);
    res.send('Student Advisor Profile Table created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// liaison student matches table
app.get('/create-student-match-liaison-table', async (req, res) => {
  try {
    console.log('Attempting to create student and liaison matching table');
    const insertDataQuery = `
     CREATE TABLE IF NOT EXISTS student_liaison_matches (
        id SERIAL PRIMARY KEY,
        student_id INTEGER REFERENCES student_profiles(id) ON DELETE CASCADE,
        liaison_id INTEGER REFERENCES liaison_profiles(id) ON DELETE CASCADE,
        matched_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status VARCHAR(50) DEFAULT 'active',
        notes TEXT
      );
    `;
    await pool.query(insertDataQuery);
    res.send('Student and liaison matches table created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

// meetings table
app.get('/create-meetings-table', async (req, res) => {
  try {
    console.log('Attempting to meetings matching table');
    const insertDataQuery = `
     CREATE TABLE IF NOT EXISTS meetings (
        id SERIAL PRIMARY KEY,
        meeting_date TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,        
        student_id INTEGER REFERENCES student_profiles(id),
        meet_with_id INTEGER REFERENCES users(id),
        notes TEXT
      );
    `;
    await pool.query(insertDataQuery);
    res.send('Meeting table created successfully');
  } catch (err) {
    res.status(500).send(err.message);
  }
});

/// ------------------------------------------ testing  ------------------------------------------------ ///
app.get('/get-data', async (req, res) => {
  try {
    console.log('Attempting to get from table...');
    const getDataQuery = `
      SELECT * FROM test_table;
    `;
    const result = await pool.query(getDataQuery);
    res.json(result.rows);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

app.get('/delete-data', async (req, res) => {
  try {
    console.log('Attempting to delete from table...');
    const deleteDataQuery = `
      DELETE FROM test_table WHERE test_column = $1 RETURNING *;
    `;
    const result = await pool.query(deleteDataQuery, ['banana']);
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
