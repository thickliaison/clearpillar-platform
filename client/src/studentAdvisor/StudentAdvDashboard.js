import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function StudentAdvisorDashboard() {
  const [studentadv, setStudentAdv] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/student-adv-profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudentAdv(response.data);
        console.log('Fetched profile data:', response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
        // redirect to login page if error
        navigate('/login');
      }
    };

    fetchProfile();
  }, [navigate]);

  // handle editing profile information
  const handleEditClick = () => {
    // set form to current info
    setFormData({
      fullname: studentadv.fullname,
      profilepicture: studentadv.profilepicture,
      studentAdvEmail: studentadv.studentAdvEmail,
      phonenumber: studentadv.phonenumber || '',
      gender: studentadv.gender || '',
      school: studentadv.school || '',
      grade: studentadv.grade || '',
      gpa: studentadv.gpa || '',
    });
    setEditMode(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // save information
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Trying to update student profile..");
      console.log(formData);
      console.log(token);
      await axios.put('http://localhost:3001/api/student-adv-profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setStudentAdv(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!studentadv) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome, {studentadv.fullname}</h2>
      <LogoutButton />
      <div className="text-center mb-4">
        <img
          src={studentadv.profilepicture || 'default-profile.png'}
          alt="Profile"
          className="img-fluid rounded-circle"
          style={{ width: '150px', height: '150px' }}
        />
      </div>
      <div>
        <h3>Profile Details</h3>
        {editMode ? (
          <div>
            <form>
              <label>Phone Number: </label>
              <input
                type="text"
                name="phonenumber"
                value={formData.phonenumber || ''}
                onChange={handleInputChange}
              />
              <label>Gender: </label>
              <input
                type="text"
                name="gender"
                value={formData.gender || ''}
                onChange={handleInputChange}
              />
              <label>School: </label>
              <input
                type="text"
                name="school"
                value={formData.school || ''}
                onChange={handleInputChange}
              />
              <label>Grade: </label>
              <input
                type="text"
                name="grade"
                value={formData.grade || ''}
                onChange={handleInputChange}
              />
              <label>GPA: </label>
              <input
                type="text"
                name="gpa"
                value={formData.gpa || ''}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleSave}>Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div>
            <p><strong>Email:</strong> {studentadv.studentAdvEmail}</p>
            <p><strong>Phone Number:</strong> {studentadv.phonenumber}</p>
            <p><strong>Gender:</strong> {studentadv.gender}</p>
            <p><strong>School:</strong> {studentadv.school}</p>
            <p><strong>Grade:</strong> {studentadv.grade}</p>
            <p><strong>GPA:</strong> {studentadv.gpa}</p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentAdvisorDashboard;
