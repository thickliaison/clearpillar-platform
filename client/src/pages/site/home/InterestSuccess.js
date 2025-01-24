import { Link } from 'react-router-dom';

export default function InterestSuccess() {
  return (
    <div className="container mt-5">
      <h2>Thank you for submitting your interest!</h2>
      <div style={{ textAlign: 'center' }}>
        <p>We will contact you soon.</p>
        <Link to="/" className="btn btn-primary mt-3 mb-5">Go Back to Home</Link>
      </div>
    </div>
  );
}