import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function StudentDashboard() {
  const [student, setStudent] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/student-profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudent(response.data);
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
      fullname: student.fullname,
      profilepicture: student.profilepicture,
      studentEmail: student.studentEmail,
      phonenumber: student.phonenumber || '',
      dob: student.dob || '',
      gender: student.gender || '',
      address: student.address || '',
      school: student.school || '',
      grade: student.grade || '',
      gpa: student.gpa || '',
      satscore: student.satscore || '',
      actscore: student.actscore || '',
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
      await axios.put('http://localhost:3001/api/student-profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setStudent(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!student) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome, {student.fullname}</h2>
      <LogoutButton />
      <div className="text-center mb-4">
        <img
          src={student.profilepicture || 'default-profile.png'}
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
              <label>Date of Birth: </label>
              <input
                type="text"
                name="dob"
                value={formData.dob || ''}
                onChange={handleInputChange}
              />
              <label>Gender: </label>
              <input
                type="text"
                name="gender"
                value={formData.gender || ''}
                onChange={handleInputChange}
              />
              <label>Address: </label>
              <input
                type="text"
                name="address"
                value={formData.address || ''}
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
              <label>SAT Score: </label>
              <input
                type="text"
                name="satscore"
                value={formData.satscore || ''}
                onChange={handleInputChange}
              />
              <label>ACT Score: </label>
              <input
                type="text"
                name="actscore"
                value={formData.actscore || ''}
                onChange={handleInputChange}
              />
              <button type="button" onClick={handleSave}>Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div>
            <p><strong>Email:</strong> {student.studentEmail}</p>
            <p><strong>Phone Number:</strong> {student.phonenumber}</p>
            <p><strong>Date of Birth:</strong> {student.dob}</p>
            <p><strong>Gender:</strong> {student.gender}</p>
            <p><strong>Address:</strong> {student.address}</p>
            <p><strong>School:</strong> {student.school}</p>
            <p><strong>Grade:</strong> {student.grade}</p>
            <p><strong>GPA:</strong> {student.gpa}</p>
            <p><strong>SAT Score:</strong> {student.satscore}</p> { /* should make these have N/A as option*/}
            <p><strong>ACT Score:</strong> {student.actscore}</p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StudentDashboard;
