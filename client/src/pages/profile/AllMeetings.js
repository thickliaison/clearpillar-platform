import React, { useState, useEffect } from 'react';
import Table from 'react-bootstrap/Table';
import { useLocation } from 'react-router-dom';
import dateFormat from 'utils/dateFormat'
import axiosInstance from 'utils/axiosInstance';

// supposed to be modular

function AllMeetings() {
    const location = useLocation();
    const m = location.state.meetings || {};
    const [meetings, setMeetings] = useState([]);

    useEffect(() => {
        if (m) {
            setMeetings(m);
        } else {
            let userType = localStorage.getItem('userType');
            const fetchAllMeetings = async () => {
                try {
                    if (userType === 'Admin') {
                    } else if (userType === 'Strategist') {
                    }
                    else if (userType === 'Student') {
                    }
                    else if (userType === 'Liaison') {
                        const response = await axiosInstance.get('/meetings'); // UPDATE THIS TO TAKE INTO CONSIDERATION THE USER TYPE, MAYBE EVEN PASS TYPE IT IN!!!
                        setMeetings(response.data);
                    }
                    else if (userType === 'Student Advisor') {

                    }
                    else {
                        console.error("unknown usertype")
                    }
                } catch (error) {
                    console.error('Error fetching profile:', error);
                }
            }
            fetchAllMeetings();
        }

    }, [m])

    const allMeetings = meetings.map((meeting) => {
        return (
            <tr key={meeting.id}>
                <td>{dateFormat(meeting.meeting_date)}</td>
                <td>{meeting.student_id}</td>
                <td>{meeting.notes}</td>
            </tr>
        )
    })

    return (
        <div>
            <h1>History</h1>

            <div >
                <div>
                    <h3>All Meetings</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Student</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allMeetings}
                        </tbody>
                    </Table>


                </div>
            </div>
        </div>
    );
}

export default AllMeetings;
