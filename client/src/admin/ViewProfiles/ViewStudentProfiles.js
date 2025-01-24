import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import StudentPopup from './StudentPopup'; 

function ViewStudentProfiles() {
  const location = useLocation();
  const navigate = useNavigate();
  const [students, setStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [showStudentPopup, setShowStudentPopup] = useState(false);
  const [liaisonDetails, setLiaisonDetails] = useState(null);
  const [loading, setLoading] = useState(true);

  // fetch Student profiles 
  useEffect(() => {
    const fetchStudents = async () => {
      const token = localStorage.getItem('token');
      try {
        const response = await axios.get('http://localhost:3001/api/all-student-table', {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setStudents(response.data);
        setLoading(false);
        console.log(response.data);
      } catch (error) {
        console.error('Error fetching Student profiles:', error);
        setLoading(false);
      }
    };

    fetchStudents();
  }, [location.state?.updated]); 

  if (loading) return <div>Loading...</div>;

  // get liaison information
   // Fetch liaison profile by ID
   const fetchLiaisonProfile = async (liaisonId) => {
    try {
      const response = await axios.get(`http://localhost:3001/api/get-liaison-profile/${liaisonId}`);
      setLiaisonDetails(response.data);
      return response.data;
    } catch (error) {
      console.error('Error fetching liaison profile:', error);
    }
  };

  // viewing the student profile
  const viewProfile = (student) => {
    setSelectedStudent(student);
    setShowStudentPopup(true);
    console.log('Selected student:', student);
    console.log('Notes:', student.notes);
  };

  // close student info popup
  const closeStudentPopup = () => {
    setShowStudentPopup(false);
    setSelectedStudent(null);
  };

  // matching to laison 
  const openMatchPage = (student) => {
    console.log("navigating to match page");
    console.log(student);
    navigate('/admin/match-student-liaison', { state: { student } });
  };
  
  // view match if exist
  const viewMatch = async (student) =>{
    if (student.liaison_id) {
      try {
        const response = await fetchLiaisonProfile(student.liaison_id);
        if (response) {
          navigate('/admin/view-student-match', { state: { student, liaisonDetails: response } });
        }
      } catch (error) {
        console.error('Error fetching liaison profile:', error);
      }
    } else {
      navigate('/admin/view-student-match', { state: { student, liaisonDetails: null } });
    }
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={() => navigate('/admin/admin-dashboard')}>
        Return to Dashboard
      </button>
      <h2 className="text-center">All Student Profiles</h2>
      <table className="table mt-3">
        <thead>
          <tr>
            <th>Full Name</th>
            <th>Phone Number</th>
            <th>Grade Level</th>
            <th> </th>
            <th> </th>
          </tr>
        </thead>
        <tbody>
          {students.map((student, index) => (
            <tr key={index}>
              <td>{student.fullname}</td>
              <td>{student.phonenumber}</td>
              <td>{student.grade}</td>
              <td>
                <button className="btn btn-info" onClick={() => viewProfile(student)}>
                  View Profile
                </button>
              </td>

              <td>
                {student.liaison_id ? (
                  <>
                  <span>Matched with {student.liaison_name}</span>
                  <button className="btn btn-secondary" onClick={() => viewMatch(student)}>
                    View Match
                  </button>
                </>
                ) : (
                  <button className="btn btn-success" onClick={() => openMatchPage(student)}>
                    Match Liaison
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* show Student Popup if showPopup is true */}
      {showStudentPopup && (
        <StudentPopup student={selectedStudent} onClose={closeStudentPopup} />
      )}
    </div>
  );
}

export default ViewStudentProfiles;