import React from 'react';

function LiaisonPopup({ liaison, onClose }) {
  if (!liaison) return null;

  return (
    <div className="modal" style={{ display: 'block', zIndex: 9999 }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <h2>{liaison.fullname}'s Profile</h2>
        <img src={liaison.profilepicture} alt={`${liaison.fullname}'s profile`}
          className="img-fluid rounded-circle"
          style={{ width: '150px', height: '150px' }} />
        <p><strong>Phone Number:</strong> {liaison.phonenumber}</p>
        <p><strong>LinkedIn:</strong> {liaison.linkedin}</p>
        <p><strong>Location:</strong> {liaison.location}</p>
        <p><strong>Title:</strong> {liaison.title}</p>
        <p><strong>Education:</strong> {liaison.education}</p>
        <p><strong>Certificates:</strong> {liaison.certificates.join(', ')}</p>
        <p><strong>Languages:</strong> {liaison.languages.join(', ')}</p>
        <p><strong>Experience:</strong> {liaison.experience}</p>
        <p><strong>Roles:</strong> {liaison.roles.join(', ')}</p>
        <p><strong>Success Stories:</strong> {liaison.successstories}</p>
        <p><strong>Colleges:</strong> {liaison.colleges.join(', ')}</p>
        <p><strong>Times:</strong> {liaison.times.join(', ')}</p>
        <p><strong>Communication:</strong> {liaison.communication.join(', ')}</p>
        <p><strong>Biography:</strong> {liaison.biography}</p>
        <p><strong>Affiliation:</strong> {liaison.affiliation.join(', ')}</p>
        <p><strong>Articles:</strong> {liaison.articles.join(', ')}</p>
      </div>
    </div>
  );
}

export default LiaisonPopup;
