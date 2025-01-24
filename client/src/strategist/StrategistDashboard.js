import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';

function StrategistDashboard() {
  const [strategist, setStrategist] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api/strategist-profile', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStrategist(response.data);
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
      fullname: strategist.fullname,
      profilepicture: strategist.profilepicture,
      strategistEmail: strategist.strategistEmail,
      phonenumber: strategist.phonenumber || '',
      linkedin: strategist.linkedin || '',
      experience: strategist.experience || 0,
      biography: strategist.biography || '',
      education: strategist.education || '',
      successstories: strategist.successstories || '',
      specialization: strategist.specialization || [],
      certifications: strategist.certifications || [],
      languages: strategist.languages || [],
      associations: strategist.associations || [],
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
      console.log("Trying to update strategist profile..");
      console.log(formData);
      console.log(token);
      await axios.put('http://localhost:3001/api/strategist-profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setStrategist(formData);
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
    }
  };

  if (!strategist) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome, {strategist.fullname}</h2>
      <LogoutButton />
      <div className="text-center mb-4">
        <img
          src={strategist.profilepicture || 'default-profile.png'}
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
              <label>
                Phone Number:
                <input
                  type="text"
                  name="phonenumber"
                  value={formData.phonenumber || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                LinkedIn:
                <input
                  type="text"
                  name="linkedin"
                  value={formData.linkedin || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Experience:
                <input
                  type="number"
                  name="experience"
                  value={formData.experience || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Biography:
                <textarea
                  name="biography"
                  value={formData.biography || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Education:
                <input
                  type="text"
                  name="education"
                  value={formData.education || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Success Stories:
                <textarea
                  name="successstories"
                  value={formData.successstories || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Specializations:
                <input
                  type="text"
                  name="specialization"
                  value={formData.specialization?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, specialization: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Certifications:
                <input
                  type="text"
                  name="certifications"
                  value={formData.certifications?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, certifications: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Languages:
                <input
                  type="text"
                  name="languages"
                  value={formData.languages?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, languages: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Associations:
                <input
                  type="text"
                  name="associations"
                  value={formData.associations?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, associations: e.target.value.split(', ') })}
                />
              </label>
              <button type="button" onClick={handleSave}>Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div>
            <p><strong>Email:</strong> {strategist.strategistEmail}</p>
            <p><strong>Phone Number:</strong> {strategist.phonenumber}</p>
            <p><strong>LinkedIn:</strong> <a href={strategist.linkedin} target="_blank" rel="noopener noreferrer">{strategist.linkedin}</a></p>
            <p><strong>Experience:</strong> {strategist.experience} years</p>
            <p><strong>Biography:</strong> {strategist.biography}</p>
            <p><strong>Education:</strong> {strategist.education}</p>
            <p><strong>Success Stories:</strong> {strategist.successstories}</p>
            <p><strong>Specializations:</strong> {strategist.specialization.join(', ')}</p>
            <p><strong>Certifications:</strong> {strategist.certifications.join(', ')}</p>
            <p><strong>Languages:</strong> {strategist.languages.join(', ')}</p>
            <p><strong>Associations:</strong> {strategist.associations.join(', ')}</p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}

export default StrategistDashboard;
