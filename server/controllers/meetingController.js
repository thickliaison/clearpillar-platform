const pool = require('../database');

exports.getMeetings = async (id) => {
    let query = 'SELECT * FROM meetings WHERE meet_with_id = $1 ORDER BY meeting_date ASC';
    let values = [id];

    try {
        const result = await pool.query(query, values);

        // get student profile by id -- the one in controller requires the email...
        for (let r of result.rows) {
            query = 'SELECT fullname FROM student_profiles WHERE id = $1';
            values = [r.student_id];

            let stuResult = await pool.query(query, values);

            if (stuResult.rows.length > 0) {
                // Replace student_id with fullname
                r.student_id = stuResult.rows[0].fullname;
            } else {
                r.student_id = 'Unknown Student';
            }
        }

        return result.rows;

    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
};

exports.createMeeting = async (meet_with_id, meeting_date, student_id) => {
    //31 - temporary id
    
    let query = `INSERT INTO meetings (meet_with_id, meeting_date, student_id)
             VALUES($1, $2, $3)`;
    let values = [meet_with_id, meeting_date, 31]
    try {
        await pool.query(query, values);
        return {
            success: true,
        }
    } catch (err) {
        console.error('Database query error:', err);
        throw err;
    }
}