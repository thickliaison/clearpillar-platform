import React, { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import Table from 'react-bootstrap/Table';
import profile_img from 'images/profile-placeholder.png';
import styles from 'styles/Dashboard.module.css';
import Profile from '@profile/Profile'
import axios from 'axios';
import formatDateToTimeZone from 'utils/dateFormat'
import axiosInstance from 'utils/axiosInstance';


function LiaisonDashboard() {
    const navigate = useNavigate();
    const [meetings, setMeetings] = useState([]);
    const [upcomingMeetings, setUpcomingMeetings] = useState([])
    const [currentPg, setCurrentPg] = useState(1);
    const meetingsPerPg = 5;

    const indexEnd = currentPg * meetingsPerPg;
    const indexStart = indexEnd - meetingsPerPg;

    useEffect(() => {
        const fetchMeetings = async () => {
            try {
                const response = await axiosInstance.get('/meetings');
                setMeetings(response.data);
            } catch (error) {
                console.error('Error fetching meetings:', error);
            }
        };

        fetchMeetings();
    }, []);

    useEffect(() => {
        const currentTime = new Date();
        const filteredUpcomingMeetings = meetings.filter(meeting => {
            const meetingTime = new Date(meeting.meeting_date);
            return meetingTime > currentTime; // Filter for future meetings only
        });
        setUpcomingMeetings(filteredUpcomingMeetings);
    }, [meetings])

    const currMeetings = upcomingMeetings.slice(indexStart, indexEnd).map((m) => {
        return (
            <tr key={m.id}>
                <td>{formatDateToTimeZone(m.meeting_date)}</td>
                <td>{m.student_id}</td>
                <td>{m.notes}</td>
            </tr>
        )
    })

    const endPg = Math.ceil(upcomingMeetings.length / meetingsPerPg);

    const noMeetingsNotfic = () => {
        if (currMeetings.length === 0) {
            return (
                <tr>
                    <td colSpan={3}>
                        <i>No meetings to show.</i>
                    </td>
                </tr>
            )
        } else {
            return (
                <>
                </>
            )
        }
    }

    const prevPg = () => {
        if (currentPg > 1) {
            setCurrentPg(currentPg - 1);
        }
    }
    const nextPg = () => {
        if (currentPg < endPg) {
            setCurrentPg(currentPg + 1);
        }
    }

    const handleAllMeetingsClick = () => {
        navigate('/dashboard/all-meetings', { state: { meetings: meetings } })
    }

    const handleAddMeetingsClick = () => {
        navigate('/dashboard/new-meeting')
    }

    const handleProfile = () => {
        console.log("clicked img!")
        navigate('/profile')
    }

    return (
        <div className={styles.box}>

            <div className={styles.col}>
                <h1>Hello, [insert name].</h1>

                <div>
                    <h3>Assigned Students</h3>
                    <Table className={[styles.no_border, styles.center].join(' ')}>
                        <tbody>
                            <tr>
                                <td className={styles.profile} onClick={handleProfile}>
                                    <img src={profile_img} alt="name 1" style={{ height: "80px", width: "80px", paddingBottom: "10px" }}  /><br />
                                    <span>Student 1</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 2" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} onClick={handleProfile} /><br />
                                    <span>Student 2</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 3" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} onClick={handleProfile} /><br />
                                    <span>Student 3</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 4" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} onClick={handleProfile} /><br />
                                    <span>Student 4</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 5" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} onClick={handleProfile} /><br />
                                    <span>Student 5</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 6" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} onClick={handleProfile} /><br />
                                    <span>Student 6</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 7" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} onClick={handleProfile} /><br />
                                    <span>Student 7</span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>

                <div>
                    <h3>Your Team</h3>
                    <Table className={[styles.no_border, styles.center].join(' ')}>
                        <tbody>
                            <tr>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 1" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} /><br /><span>Liaison 1</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 2" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} /><br /><span>Professional 1</span>
                                </td>
                                <td className={styles.profile}>
                                    <img src={profile_img} alt="name 3" style={{ height: "80px", width: "80px", paddingBottom: "10px" }} /><br /><span>Professional 2</span>
                                </td>
                                <td>
                                    <img alt=""></img><br /><span></span>
                                </td>
                                <td>
                                    <img alt=""></img><br /><span></span>
                                </td>
                                <td>
                                    <img alt=""></img><br /><span></span>
                                </td>
                                <td>
                                    <img alt=""></img><br /><span></span>
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                </div>
            </div>

            {/* Need to dynamically grab the meeting details from server */}
            <div className={styles.col}>
                <div>
                    <h3>Upcoming Meetings</h3>
                    <button onClick={handleAllMeetingsClick}>All meetings</button>
                    <button onClick={handleAddMeetingsClick}>+</button>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>Date</th>
                                <th>Student</th>
                                <th>Notes</th>
                            </tr>
                        </thead>
                        <tbody>
                            {currMeetings}
                            {noMeetingsNotfic()}
                        </tbody>
                    </Table>
                    <div className={styles.right}>
                        <button onClick={prevPg} disabled={currentPg === 1}>&#60;</button>
                        <button onClick={nextPg} disabled={currentPg === endPg || endPg === 0}>&#62;</button>
                    </div>
                    
                </div>

                {/* <div>
                    <h3>Required Actions</h3>
                    <Table>
                        <thead>
                            <tr>
                                <th>Item</th>
                                <th colSpan={3}>Details</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className={styles.red}>Upload Meeting Notes</td>
                                <td>01/02/2023</td>
                                <td>3:00 PM</td>
                                <td>Joe Doe</td>
                            </tr>
                        </tbody>
                    </Table>
                </div> */}
            </div>

        </div>
    );
}

export default LiaisonDashboard;