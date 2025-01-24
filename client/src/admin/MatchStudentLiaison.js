import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

function MatchStudentLiaison() {
  const location = useLocation();
  const navigate = useNavigate();
  const [student, setStudent] = useState(location.state?.student || null);
  const [liaisons, setLiaisons] = useState([]);
  const [selectedLiaison, setSelectedLiaison] = useState(null);
  const [existingMatch, setExistingMatch] = useState(null);
  const [notes, setNotes] = useState('');
  const [confirmationMessage, setConfirmationMessage] = useState(''); 

  // get liaisons
  useEffect(() => {
    const fetchLiaisons = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:3001/api//all-liaison-table', {
          headers: { 'Authorization': `Bearer ${token}` },
        });
        setLiaisons(response.data);
      } catch (error) {
        console.error('Error fetching liaisons:', error);
      }
    };

    // get existing matches
    // const fetchExistingMatch = async () => {
    //   try {
    //     const token = localStorage.getItem('token');
    //     console.log("Student ID:", student.student_id);
    //     const response = await axios.get(`http://localhost:3001/api/get-student-liaison-match/${student.student_id}`, {
    //       headers: { Authorization: `Bearer ${token}` },
    //     });
    //     setExistingMatch(response.data); 
    //     setSelectedLiaison(response.data ? response.data.liaison_id : null);
    //   } catch (error) {
    //     console.error('Error fetching match:', error);
    //   }
    // };

    fetchLiaisons();
    // if (student) fetchExistingMatch();
  }, [student]);

  //  match confirmation
  const handleConfirmMatch = async () => {
    if (selectedLiaison) {
      try {
        const token = localStorage.getItem('token');
        await axios.post('http://localhost:3001/api/match-student-liaison', {
          studentId: student.student_id, 
          liaisonId: selectedLiaison.id, 
          notes: notes
        }, {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        setConfirmationMessage('Match successfully confirmed!');
        navigate('/admin/view-student-profiles', { state: { updated: true } });
      } catch (error) {
        console.error('Error confirming match:', error);
        setConfirmationMessage('Error confirming match, please try again.');
      }
    } else {
      setConfirmationMessage('Please select a liaison to confirm the match.');
    }
  };

  return (
    <div className="match-liaison-page">
      <button className="btn btn-secondary" onClick={() => navigate('/admin/view-student-profiles')}>
        Back to Profiles
      </button>

      <div className="match-container" style={{ display: 'flex', justifyContent: 'space-between', gap: '20px', marginTop: '20px' }}>
        
        <div className="student-info" style={{ width: '48%' }}>
          <h3 style={{ color: 'white' }}>Student Information</h3>
          {student && (
            <div>
              <h2 style={{ color: 'white' }}>{student.fullname}'s Profile</h2>
              <img
                src={student.profilepicture}
                alt={`${student.fullname}'s profile`}
                className="img-fluid rounded-circle"
                style={{ width: '150px', height: '150px' }}
              />
              <p style={{ color: 'white' }}><strong>Phone Number:</strong> {student.phonenumber}</p>
              <p style={{ color: 'white' }}><strong>Date of Birth:</strong> {student.dob}</p>
              <p style={{ color: 'white' }}><strong>Gender:</strong> {student.gender}</p>
              <p style={{ color: 'white' }}><strong>Address:</strong> {student.address}</p>
              <p style={{ color: 'white' }}><strong>School:</strong> {student.school}</p>
              <p style={{ color: 'white' }}><strong>Grade Level:</strong> {student.grade}</p>
              <p style={{ color: 'white' }}><strong>GPA:</strong> {student.gpa}</p>
              <p style={{ color: 'white' }}><strong>SAT Score:</strong> {student.satscore}</p>
              <p style={{ color: 'white' }}><strong>ACT Score:</strong> {student.actscore}</p>
            </div>
          )}
        </div>

        {/* liaison selection */}
        <div className="liaison-selection" style={{ width: '48%' }}>
          <h3 style={{ color: 'white' }}>Select a Liaison</h3>
          <select
            value={selectedLiaison ? selectedLiaison.id : ''}
            onChange={(e) => {
              const selected = liaisons.find(liaison => liaison.id === parseInt(e.target.value, 10)); // parse value to number
              setSelectedLiaison(selected);
              console.log("Selected Liaison:", selected);
              console.log("Liaisons Array:", liaisons);
              console.log("Selected Value:", e.target.value);
            }}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1em',
              marginTop: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          >
            <option value="">Select a Liaison</option>
            {liaisons.map((liaison) => (
              <option key={liaison.id} value={liaison.id}>
                {liaison.fullname} - {liaison.experience} years experience
              </option>
            ))}
          </select>

          {/* selected liaison information */}
          {selectedLiaison && (
            <div className="selected-liaison-info" style={{ marginTop: '20px' }}>
              <h2 style={{ color: 'white' }}> {selectedLiaison.fullname}'s Profile</h2>
              <img 
                src={selectedLiaison.profilepicture} 
                alt={`${selectedLiaison.fullname}'s profile`}
                className="img-fluid rounded-circle"
                style={{ width: '150px', height: '150px' }} 
              />
              <p style={{ color: 'white' }}><strong>Phone Number:</strong> {selectedLiaison.phonenumber}</p>
              <p style={{ color: 'white' }}><strong>LinkedIn:</strong> {selectedLiaison.linkedin}</p>
              <p style={{ color: 'white' }}><strong>Location:</strong> {selectedLiaison.location}</p>
              <p style={{ color: 'white' }}><strong>Title:</strong> {selectedLiaison.title}</p>
              <p style={{ color: 'white' }}><strong>Education:</strong> {selectedLiaison.education}</p>
              <p style={{ color: 'white' }}><strong>Certificates:</strong> {selectedLiaison.certificates.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Languages:</strong> {selectedLiaison.languages.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Experience:</strong> {selectedLiaison.experience} years</p>
              <p style={{ color: 'white' }}><strong>Roles:</strong> {selectedLiaison.roles.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Success Stories:</strong> {selectedLiaison.successstories}</p>
              <p style={{ color: 'white' }}><strong>Colleges:</strong> {selectedLiaison.colleges.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Times:</strong> {selectedLiaison.times.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Communication:</strong> {selectedLiaison.communication.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Biography:</strong> {selectedLiaison.biography}</p>
              <p style={{ color: 'white' }}><strong>Affiliation:</strong> {selectedLiaison.affiliation.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Articles:</strong> {selectedLiaison.articles.join(', ')}</p>
            </div>
          )}

          {/* notes input */}
          <textarea
            placeholder="Add notes for this match..."
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            style={{
              width: '100%',
              padding: '10px',
              fontSize: '1em',
              marginTop: '10px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
          ></textarea>

          {/* submit match */}
          <button 
            className="btn btn-primary" 
            onClick={handleConfirmMatch} 
            style={{ marginTop: '20px', padding: '10px 20px' }}
          >
            Confirm Match
          </button>

          {/* confirmation message */}
          {confirmationMessage && (
            <p style={{ color: 'white', marginTop: '10px' }}>{confirmationMessage}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default MatchStudentLiaison;
