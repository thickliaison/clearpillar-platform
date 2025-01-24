import React from 'react';

function StrategistPopup({ strategist, onClose }) {
  if (!strategist) return null;

  return (
    <div className="modal" style={{ display: 'block', zIndex: 9999 }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{strategist.fullname}'s Profile</h2>
        <img src={strategist.profilepicture} alt={`${strategist.fullname}'s profile`}
          className="img-fluid rounded-circle"
          style={{ width: '150px', height: '150px' }} />
        <p><strong>Phone Number:</strong> {strategist.phonenumber}</p>
        <p><strong>LinkedIn:</strong> <a href={strategist.linkedin} target="_blank" rel="noopener noreferrer">{strategist.linkedin}</a></p>
        <p><strong>Colleges:</strong> {strategist.colleges ? strategist.colleges.join(', ') : 'N/A'}</p>
        <p><strong>Years of Experience:</strong> {strategist.experience}</p>
        <p><strong>Areas of Specialization:</strong> {strategist.specialization ? strategist.specialization.join(', ') : 'N/A'}</p>
        <p><strong>Education:</strong> {strategist.education}</p>
        <p><strong>Certifications:</strong> {strategist.certifications ? strategist.certifications.join(', ') : 'N/A'}</p>
        <p><strong>Languages:</strong> {strategist.languages ? strategist.languages.join(', ') : 'N/A'}</p>
        <p><strong>Biography:</strong> {strategist.biography || 'N/A'}</p>
        <p><strong>Success Stories:</strong> {strategist.successstories}</p>
        <p><strong>Associations:</strong> {strategist.associations ? strategist.associations.join(', ') : 'N/A'}</p>      </div>
    </div>
  );
}

export default StrategistPopup;
