import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import axiosInstance from 'utils/axiosInstance';

export default function LiaisonSettings() {
  const [liaison, setLiaison] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const response = await axiosInstance.get('/liaison-profile'); // Use the global Axios instance
        setLiaison(response.data);
      } catch (error) {
        console.error('Error fetching profile:', error);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Handle clicking the edit button to enable form inputs
  const handleEditClick = () => {
    setFormData({
      fullname: liaison.fullname,
      profilepicture: liaison.profilepicture,
      liaisonEmail: liaison.liaisonEmail,
      phonenumber: liaison.phonenumber || '',
      linkedin: liaison.linkedin || '',
      location: liaison.location || '',
      title: liaison.title || '',
      education: liaison.education || '',
      certificates: liaison.certificates || [],
      languages: liaison.languages || '',
      experience: liaison.experience || 0,
      roles: liaison.roles || [],
      successStories: liaison.successStories || '',
      colleges: liaison.colleges || [],
      times: liaison.times || [],
      communication: liaison.communication || [],
      biography: liaison.biography || '',
      affiliation: liaison.affiliation || [],
      articles: liaison.articles || [],
    });
    setEditMode(true);
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  // Save updated information
  const handleSave = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log("Trying to update liaison profile...");
      console.log(formData);
      console.log(token);
      await axios.put('http://localhost:3001/api/liaison-profile', formData, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json',
        }
      });
      setLiaison(formData); // Update the state with the updated data
      setEditMode(false);
    } catch (error) {
      console.error('Error updating liaison profile:', error);
    }
  };

  if (!liaison) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome, {liaison.fullname}</h2>
      {/* <LogoutButton /> */}
      <div className="text-center mb-4">
        <img
          src={liaison.profilepicture || 'default-profile.png'}
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
                Languages:
                <input
                  type="text"
                  name="languages"
                  value={formData.languages}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Location:
                <input
                  type="text"
                  name="location"
                  value={formData.location || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Title:
                <input
                  type="text"
                  name="title"
                  value={formData.title || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Experience:
                <input
                  type="number"
                  name="experience"
                  value={formData.experience || 0}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Certificates:
                <input
                  type="text"
                  name="certificates"
                  value={formData.certificates?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, certificates: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Roles:
                <input
                  type="text"
                  name="roles"
                  value={formData.roles?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, roles: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Success Stories:
                <input
                  type="text"
                  name="successStories"
                  value={formData.successStories || ''}
                  onChange={handleInputChange}
                />
              </label>
              <label>
                Colleges:
                <input
                  type="text"
                  name="colleges"
                  value={formData.colleges?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, colleges: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Times:
                <input
                  type="text"
                  name="times"
                  value={formData.times?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, times: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Communication:
                <input
                  type="text"
                  name="communication"
                  value={formData.communication?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, communication: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Affiliation:
                <input
                  type="text"
                  name="affiliation"
                  value={formData.affiliation?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, affiliation: e.target.value.split(', ') })}
                />
              </label>
              <label>
                Articles:
                <input
                  type="text"
                  name="articles"
                  value={formData.articles?.join(', ') || ''}
                  onChange={(e) => setFormData({ ...formData, articles: e.target.value.split(', ') })}
                />
              </label>
              <button type="button" onClick={handleSave}>Save</button>
              <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
            </form>
          </div>
        ) : (
          <div>
            <p><strong>Email:</strong> {liaison.liaisonEmail}</p>
            <p><strong>Phone Number:</strong> {liaison.phonenumber}</p>
            <p><strong>LinkedIn:</strong> <a href={liaison.linkedin} target="_blank" rel="noopener noreferrer">{liaison.linkedin}</a></p>
            <p><strong>Biography:</strong> {liaison.biography}</p>
            <p><strong>Education:</strong> {liaison.education}</p>
            <p><strong>Languages:</strong> {liaison.languages.join(', ')}</p>
            <p><strong>Location:</strong> {liaison.location}</p>
            <p><strong>Title:</strong> {liaison.title}</p>
            <p><strong>Experience:</strong> {liaison.experience}</p>
            <p><strong>Certificates:</strong> {liaison.certificates.join(', ')}</p>
            <p><strong>Roles:</strong> {liaison.roles.join(', ')}</p>
            <p><strong>Success Stories:</strong> {liaison.successStories}</p>
            <p><strong>Colleges:</strong> {liaison.colleges.join(', ')}</p>
            <p><strong>Times:</strong> {liaison.times.join(', ')}</p>
            <p><strong>Communication Methods:</strong> {liaison.communication.join(', ')}</p>
            <p><strong>Affiliation:</strong> {liaison.affiliation.join(', ')}</p>
            <p><strong>Articles:</strong> {liaison.articles.join(', ')}</p>
            <button onClick={handleEditClick}>Edit</button>
          </div>
        )}
      </div>
    </div>
  );
}