import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StrategistPopup from './StrategistPopup'; 

function ViewStrategistProfiles() {
  const navigate = useNavigate();
  const [strategists, setStrategists] = useState([]);
  const [selectedStrategist, setSelectedStrategist] = useState(null);
  const [showPopup, setShowPopup] = useState(false);

  // fetch strategists profiles 
  useEffect(() => {
    const fetchStrategists = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3001/api/all-strategist-table', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStrategists(response.data);
        console.log(response.data);
        console.log(typeof response.data[0].languages);
      } catch (error) {
        console.error('Error fetching strategists profiles:', error);
      }
    };

    fetchStrategists();
  }, []);

  // viewing the strategist profile
  const viewProfile = (strategist) => {
    setSelectedStrategist(strategist);
    setShowPopup(true);
    console.log('Selected strategist:', strategist);
  };

  // close the popup
  const closePopup = () => {
    setShowPopup(false);
    setSelectedStrategist(null);
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={() => navigate('/admin/admin-dashboard')}>
        Return to Dashboard
      </button>
      <h2 className="text-center">All Strategists Profiles</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Years of Experience</th>
            <th>Specialization Areas</th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {strategists.map((strategist, index) => (
            <tr key={index}>
              <td>{strategist.fullname}</td>
              <td>{strategist.phonenumber}</td>
              <td>{strategist.experience}</td>
              <td>{strategist.specialization}</td>
              <td>
                <button className="btn btn-info" onClick={() => viewProfile(strategist)}>
                  View Profile
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* show strategist popup if showPopup is true */}
      {showPopup && (
        <StrategistPopup strategist={selectedStrategist} onClose={closePopup} />
      )}
    </div>
  );
}

export default ViewStrategistProfiles;