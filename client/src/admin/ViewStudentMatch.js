import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

function ViewStudentMatch() {
  const { state } = useLocation();
  const { student, liaisonDetails } = state;
  const navigate = useNavigate();

  const editMatch = () => {
    navigate('/admin/match-student-liaison', { state: { student, isEdit: true } });
  };

  return (
    <div className="container mt-5">
      <button className="btn btn-primary" onClick={() => navigate('/admin/view-student-profiles')}>
        Return to Student Profiles
      </button>
      <h2 style={{ color: 'white' }} className="text-center">Student and Liaison Match</h2>

      <div className="match-info d-flex justify-content-between">
        {/* Student Information */}
        <div className="student-info w-50">
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

        {/* Liaison Information */}
        <div className="liaison-info w-50">
          <h3 style={{ color: 'white' }}>Current Liaison Information</h3>
          {liaisonDetails && (
            <div>
              <h2 style={{ color: 'white' }}>{liaisonDetails.fullname}'s Profile</h2>
              <img
                src={liaisonDetails.profilepicture}
                alt={`${liaisonDetails.fullname}'s profile`}
                className="img-fluid rounded-circle"
                style={{ width: '150px', height: '150px' }}
              />
              <p style={{ color: 'white' }}><strong>Phone Number:</strong> {liaisonDetails.phonenumber}</p>
              <p style={{ color: 'white' }}><strong>LinkedIn:</strong> {liaisonDetails.linkedin}</p>
              <p style={{ color: 'white' }}><strong>Location:</strong> {liaisonDetails.location}</p>
              <p style={{ color: 'white' }}><strong>Title:</strong> {liaisonDetails.title}</p>
              <p style={{ color: 'white' }}><strong>Education:</strong> {liaisonDetails.education}</p>
              <p style={{ color: 'white' }}><strong>Certificates:</strong> {liaisonDetails.certificates.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Languages:</strong> {liaisonDetails.languages.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Experience:</strong> {liaisonDetails.experience} years</p>
              <p style={{ color: 'white' }}><strong>Roles:</strong> {liaisonDetails.roles.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Success Stories:</strong> {liaisonDetails.successstories}</p>
              <p style={{ color: 'white' }}><strong>Colleges:</strong> {liaisonDetails.colleges.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Times:</strong> {liaisonDetails.times.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Communication:</strong> {liaisonDetails.communication.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Biography:</strong> {liaisonDetails.biography}</p>
              <p style={{ color: 'white' }}><strong>Affiliation:</strong> {liaisonDetails.affiliation.join(', ')}</p>
              <p style={{ color: 'white' }}><strong>Articles:</strong> {liaisonDetails.articles.join(', ')}</p>
            </div>
          )}
        </div>
      </div>

      <div className="notes mt-4">
        <h3 style={{ color: 'white' }}>Notes:</h3>
        <p style={{ color: 'white' }}>{student.notes ? student.notes : "No notes available"}</p>
      </div>

      <div className="mt-4">
        <button className="btn btn-warning" onClick={editMatch}>
          Edit Match
        </button>
      </div>
    </div>
  );
}

export default ViewStudentMatch;
