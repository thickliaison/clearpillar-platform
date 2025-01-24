import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LiaisonPopup from './LiaisonPopup'; // liaison popup

function ViewLiaisonProfiles() {
  const navigate = useNavigate();
  const [liaisons, setLiaisons] = useState([]);
  const [selectedLiaison, setSelectedLiaison] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // fetch liaison profiles 
  useEffect(() => {
    const fetchLiaisons = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3001/api/all-liaison-table', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setLiaisons(response.data);
        console.log(response.data);
        console.log(typeof response.data[0].languages);
      } catch (error) {
        console.error('Error fetching liaison profiles:', error);
      }
    };

    fetchLiaisons();
  }, []);

  // viewing the liaison profile
  const viewProfile = (liaison) => {
    setSelectedLiaison(liaison);
    setShowPopup(true);
    console.log('Selected Liaison:', liaison);
  };

  // close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedLiaison(null);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={() => navigate('/admin/admin-dashboard')}>
        Return to Dashboard
      </button>
      <h2 className="text-center">All Liaison Profiles</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Location</th>
            <th>Title</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {liaisons.map((liaison, index) => (
            <tr key={index}>
              <td>{liaison.fullname}</td>
              <td>{liaison.phonenumber}</td>
              <td>{liaison.location}</td>
              <td>{liaison.title}</td>
              <td>
                <button className="btn btn-info" onClick={() => viewProfile(liaison)}>
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* show Liaison Popup if showPopup is true */}
      {showPopup && (
        <LiaisonPopup liaison={selectedLiaison} onClose={closePopup} />
      )}
    </div>
  );
}

export default ViewLiaisonProfiles;