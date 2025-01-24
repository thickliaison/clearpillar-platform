const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('../database');

// handle login 
exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    console.log('Controller: Checking log in information.')
    const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
    console.log(email)
    if (result.rows.length > 0) {
      const user = result.rows[0];
      const match = await bcrypt.compare(password, user.password);
      console.log('Matched password? ' + match)
      if (match) {
        // get user type
        const userTypeResult = await pool.query('SELECT user_type FROM users WHERE id = $1', [user.id]);
        const userType = userTypeResult.rows[0].user_type;

        // token to remember id, email
        const token = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_SECRET, { expiresIn: '1h' });
        console.log('Saving token? ' + token)
        return res.json({ token, userType });
      } else {
        return res.status(401).json({ message: 'Invalid credentials' });
      }
    } else {
      return res.status(401).json({ message: 'Invalid credentials' });
    }
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
};

// check if email is taken
exports.checkEmail = async (email) => {
  console.log('Controller: Checking if email: ' + email + ' is taken')

  const query = 'SELECT * FROM users WHERE email = $1';
  const values = [email];

  try {
    const result = await pool.query(query, values);
    if (result.rows.length > 0) {
        console.log('There is a match found for existing user :', values);
    }
    return result.rows.length > 0; // return true if email found
  } catch (err) {
    console.error('Database query error:', err);
    throw err;
  }
};

// function to save tokens for resetting pw
exports.saveResetToken = async (email, token) => {
  console.log("Controller: saving reset token");
  const query = `
    UPDATE users 
    SET reset_token = $1, reset_token_expiry = NOW() + interval '1 hour'  
    WHERE email = $2
  `;

  try {
      await pool.query(query, [token, email]);
  } catch (error) {
    console.error("Error updating reset token in the database:", error.message);
    throw new Error('Database error');
  }
};

// function to reset password
exports.resetPassword = async (token, password) => {
  try {
    console.log("Reset password token is: ", token);
    // ensure not expired
    const result = await pool.query('SELECT * FROM users WHERE reset_token = $1 AND reset_token_expiry > NOW()', [token]);
    const user = result.rows[0];

    console.log(user);
    if (!user) {
      return { error: 'Password reset token is invalid or has expired.' };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update the user's password and clear the token fields
    await pool.query('UPDATE users SET password = $1, reset_token = NULL, reset_token_expiry = NULL WHERE reset_token = $2', [hashedPassword, token]);

    return { message: 'Password has been reset successfully.' };
  } catch (error) {
    console.error('Error resetting password:', error);
    throw new Error('Failed to reset password.');
  }
};