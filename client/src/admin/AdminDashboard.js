import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import LogoutButton from '../components/LogoutButton';
import axios from 'axios';

function AdminDashboard() {
  const [email, setEmail] = useState('');
  const [responseMessage, setResponseMessage] = useState('');
  const navigate = useNavigate();

  const handleGenerateLink = async (e) => {
    e.preventDefault();
    try {
      console.log("Admin generating registration link");
      const response = await axios.post(`http://localhost:3001/api/generate-registration-link`, { email });
      setResponseMessage(response.data.message);
      setEmail('');
    } catch (error) {
      setResponseMessage('Failed to send registration link. Please try again.');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-center">Welcome, Admin</h2>
      <LogoutButton />

      {/* view liaison profiles */}
      <button className="btn btn-primary" onClick={() => navigate('/admin/view-liaison-profiles')}>
        View Liaison Profiles
      </button>

      {/* view student profiles */}
      <button className="btn btn-primary" onClick={() => navigate('/admin/view-student-profiles')}>
        View Student Profiles
      </button>

      {/* view strategist profiles */}
      <button className="btn btn-primary" onClick={() => navigate('/admin/view-strategist-profiles')}>
        View Strategists Profiles
      </button>

        {/* Generate Registration Link Section */}
      <div className="mt-4">
        <h4>Generate Registration Link</h4>
        <form onSubmit={handleGenerateLink} className="d-flex flex-column">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter student email"
            required
            className="form-control mb-2"
          />
          <button type="submit" className="btn btn-success">
            Send Registration Link
          </button>
        </form>
        {responseMessage && <p className="mt-2">{responseMessage}</p>}
      </div>
    </div>
  );
}

export default AdminDashboard;
