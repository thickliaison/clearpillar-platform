const bcrypt = require('bcrypt');
const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  ssl: {
    rejectUnauthorized: false,
    ca: fs.readFileSync(path.join(__dirname, 'us-east-1-bundle.pem')),
  },
});

async function hashAndUpdatePasswords() {
    try {
        const result = await pool.query('SELECT email, password FROM users');
        const users = result.rows;
        
        // hash password in existing database if plain text
        for (const user of users) {
            const hashedPassword = await bcrypt.hash(user.password, 10);
            await pool.query('UPDATE users SET password = $1 WHERE email = $2', [hashedPassword, user.email]);
            console.log(`Updated password for ${user.email}`);
        }

        console.log('Passwords updated successfully.');
    } catch (error) {
        console.error('Error updating passwords:', error);
    } finally {
        await pool.end(); 
    }
}

hashAndUpdatePasswords();
