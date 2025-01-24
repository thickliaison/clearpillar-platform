import React from 'react';

function StudentPopup({ student, onClose }) {
  if (!student) return null;

  return (
    <div className="modal" style={{ display: 'block', zIndex: 9999 }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{student.fullname}'s Profile</h2>
        <img src={student.profilepicture} alt={`${student.fullname}'s profile`}
          className="img-fluid rounded-circle"
          style={{ width: '150px', height: '150px' }} />
        <p><strong>Phone Number:</strong> {student.phonenumber}</p>
        <p><strong>Date of Birth:</strong> {student.dob}</p>
        <p><strong>Gender:</strong> {student.gender}</p>
        <p><strong>Address:</strong> {student.address}</p>
        <p><strong>School:</strong> {student.school}</p>
        <p><strong>Grade Level:</strong> {student.grade}</p>
        <p><strong>GPA:</strong> {student.gpa}</p>
        <p><strong>SAT Score:</strong> {student.satscore}</p>
        <p><strong>ACT Score:</strong> {student.actscore}</p>
      </div>
    </div>
  );
}

export default StudentPopup;
