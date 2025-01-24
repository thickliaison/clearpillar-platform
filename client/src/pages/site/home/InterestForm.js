import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import validator from 'validator';
import axios from 'axios';

export default function InterestForm() {
  const [formData, setFormData] = useState({
    fullname: '',
    email: '',
    phonenumber: '',
    services: [],
    message: '',
    verify: ''
  });
  const [errorMessage, setErrorMessage] = useState('');
  const [errorMessageEmail, setErrorMessageEmail] = useState('');
  const [errorMessagePhone, setErrorMessagePhone] = useState('');
  const [errorService, setErrorService] = useState('');
  const [errorMessageBox, setErrorMessageBox] = useState('');
  const [numChecked, setNumChecked] = useState(0);
  const navigate = useNavigate();

  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const disableButton = () => {
    setButtonDisabled(true);
  };

  const enableButton = () => {
    setButtonDisabled(false);
  }

  const handleVerifyInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  }

  const handleNameInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 100) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleEmailInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 320) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handlePhoneInputChange = (e) => {
    const { name, value } = e.target;

    if (/^\d*$/.test(value) && value.length <= 10) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  const handleCheckboxChange = (service) => {
    if (formData.services.includes(service) === false) {
      setNumChecked(numChecked + 1);
    } else {
      setNumChecked(numChecked - 1);
    }

    setFormData((prevData) => ({
      ...prevData,
      services: prevData.services.includes(service)
        ? prevData.services.filter((s) => s !== service)
        : [...prevData.services, service],
    }));
  };

  const handleMessageInputChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 500) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  }

  const handleCopyPaste = (event) => {
    event.preventDefault();
  };

  const validateEmail = () => {
    if (validator.isEmail(formData.email))
      return true;
    setErrorMessageEmail('Please input a valid email address.')
    return false;
  }

  const validatePhoneNumber = () => {
    if (validator.isMobilePhone(formData.phonenumber, 'en-US'))
      return true;
    setErrorMessagePhone('Please input a valid U.S. phone number.')
    return false;
  }

  const validateServiceInterest = () => {
    if (numChecked > 0)
      return true;
    setErrorService('Please select at least one service.')
    return false;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessageEmail('')
    setErrorMessagePhone('')
    setErrorMessageBox('')
    setErrorService('')

    if (formData.verify === '' && validateEmail() === true && validatePhoneNumber() === true && validateServiceInterest() === true) {
      disableButton();
      setOpen(true);

      try {
        const response = await axios.post('https://clearpillar.us/api/interest-form', formData);
        if (response.status === 200) {
          setOpen(false);
          enableButton();
          navigate('/interest-form-success');
        }
      } catch (error) {
        setErrorMessage('There was an error submitting the form. Please try again later.');
      }
    }
  };

  return (
    <div className="container mt-5">
      <Snackbar
        open={open}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert sx={{ width: '100%' }}>
          Submitting... Please wait.
        </Alert>
      </Snackbar>
      <h2>Student Interest Form</h2>
      {errorMessage && <div className="alert alert-danger">{errorMessage}</div>}
      <form onSubmit={handleSubmit}>
        <div className="form-group mt-4 mb-4">
          <label htmlFor="fullname">Full Name<span style={{color:'red'}}>*</span></label>
          <input
            type="text"
            id="fullname"
            name="fullname"
            value={formData.fullname}
            onChange={handleNameInputChange}
            className="form-control"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="email">Email<span style={{color:'red'}}>*</span></label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleEmailInputChange}
            className="form-control"
            required
          />
        </div>
        {errorMessageEmail && <div className="alert alert-danger">{errorMessageEmail}</div>}

        <div className="form-group mt-4">
          <label htmlFor="phonenumber">Phone Number<span style={{color:'red'}}>*</span> (digits only)</label>
          <input
            type="text"
            id="phonenumber"
            name="phonenumber"
            value={formData.phonenumber}
            onChange={handlePhoneInputChange}
            className="form-control"
            required
          />
        </div>
        {errorMessagePhone && <div className="alert alert-danger">{errorMessagePhone}</div>}

        <div className="form-group mt-4">
          <h4>Services<span style={{color:'red'}}>*</span></h4>
          <div>
            <input
              type="checkbox"
              id="tuitionplanning"
              checked={formData.services.includes('Tuition Planning')}
              onChange={() => handleCheckboxChange('Tuition Planning')}
            />
            <label htmlFor="tuitionplanning">Tution Planning</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="essayBrainstorming"
              checked={formData.services.includes('Essay Brainstorming')}
              onChange={() => handleCheckboxChange('Essay Brainstorming')}
            />
            <label htmlFor="essayBrainstorming">Essay Brainstorming</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="essayEditing"
              checked={formData.services.includes('Essay Editing')}
              onChange={() => handleCheckboxChange('Essay Editing')}
            />
            <label htmlFor="essayEditing">Essay Editing</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="extracurriculars"
              checked={formData.services.includes('Extracurriculars')}
              onChange={() => handleCheckboxChange('Extracurriculars')}
            />
            <label htmlFor="extracurriculars">Extracurriculars</label>
          </div>
          <div>
            <input
              type="checkbox"
              id="collegeListCreation"
              checked={formData.services.includes('College List Creation')}
              onChange={() => handleCheckboxChange('College List Creation')}
            />
            <label htmlFor="collegeListCreation">College List Creation</label>
          </div>
        </div>
        {errorService && <div className="alert alert-danger">{errorService}</div>}

        <div className="form-group mt-4">
          <label htmlFor="message">Additional Message (Optional):</label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleMessageInputChange}
            className="form-control"
            rows="4"
            onCopy={handleCopyPaste}
            onCut={handleCopyPaste}
            onPaste={handleCopyPaste}
          ></textarea>
        </div>
        {errorMessageBox && <div className="alert alert-danger">{errorMessageBox}</div>}

        <div style={{ display: 'none', visibility: 'hidden' }}>
          <label htmlFor="verify">Type 'Yes' to verify:</label>
          <input type="text" id="verify" tabIndex="-1" name="verify" onChange={handleVerifyInputChange} />
        </div>

        <button type="submit" className="btn btn-primary mt-4 mb-5" disabled={isButtonDisabled}>Submit</button>
      </form>
    </div>
  );
}