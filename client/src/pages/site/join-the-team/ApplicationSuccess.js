import { Link } from 'react-router-dom';

export default function ApplicationSuccess() {
  return (
    <div className="container mt-5">
      <h2>Thank you for submitting your application!</h2>
      <div style={{ textAlign: 'center' }}>
        <p>We look forward to receiving your application.</p>
        <Link to="/" className="btn btn-primary mt-3 mb-5">Go Back to Home</Link>
      </div>
    </div>
  );
}