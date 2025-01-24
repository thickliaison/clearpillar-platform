import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import validator from 'validator';
import axios from 'axios';

export default function ApplicationForm() {
    const [formData, setFormData] = useState({
        fullname: '',
        email: '',
        phonenumber: '',
        linkedin: '',
        position: '',
        resume: '',
        verify: ''
    });

    const [errorMessage, setErrorMessage] = useState('');
    const [errorMessageEmail, setErrorMessageEmail] = useState('');
    const [errorMessagePhone, setErrorMessagePhone] = useState('');
    const [errorLinkedIn, setErrorLinkedIn] = useState('');
    const [errorFile, setErrorFile] = useState('');
    const navigate = useNavigate();

    const [file, setFile] = useState()
    const [isButtonDisabled, setButtonDisabled] = useState(false);
    const [open, setOpen] = useState(false);

    const maxSize = 5 * 1024 * 1024; // 5 MB

    const disableButton = () => {
        setButtonDisabled(true);
    };

    const enableButton = () => {
        setButtonDisabled(false);
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

    const handleLinkedInChange = (e) => {
        const { name, value } = e.target;
        if (value.length <= 128) {
            setFormData((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    const handlePositionChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

    const handleFileChange = (e) => {
        const { name, value } = e.target;
        const f = e.target.files[0];
        setErrorFile('')

        if (f.size > maxSize) {
            setErrorFile('File too large. Try again with a smaller file size.')
            setFormData((prevData) => ({
                ...prevData,
                [name]: '',
            }));
        } else {
            if (f.type === 'application/pdf') {
                setFile(f);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else if (f.type === 'application/msword' ||
                f.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document') {
                setFile(f);
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: value,
                }));
            } else {
                setErrorFile('Please upload a valid file (PDF, .doc, or .docx).')
                setFormData((prevData) => ({
                    ...prevData,
                    [name]: '',
                }));
            }
        }
    }

    const handleVerifyInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value,
        }));
    }

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

    const validateLinkedIn = () => {
        if (formData.linkedin.includes('https://www.linkedin.com/in/') || formData.linkedin === '')
            return true;
        setErrorLinkedIn('Please input a valid LinkedIn profile link.')
        return false;
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        setErrorMessageEmail('')
        setErrorMessagePhone('')
        setErrorLinkedIn('')

        if (formData.verify === '' && validateEmail() === true && validatePhoneNumber() === true && validateLinkedIn() === true) {
            disableButton();
            setOpen(true);

            const formDataObject = new FormData();

            formDataObject.append('fullname', formData.fullname);
            formDataObject.append('email', formData.email);
            formDataObject.append('phonenumber', formData.phonenumber);
            formDataObject.append('linkedin', formData.linkedin);
            formDataObject.append('position', formData.position);
            formDataObject.append('resume', file);

            try {
                const response = await axios.post('https://clearpillar.us/api/application-form', formDataObject, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                })
                if (response.status === 200) {
                    setOpen(false);
                    enableButton();
                    navigate('/opportunities/application-form-success');
                }
            } catch (error) {
                setErrorMessage('There was an error submitting the form. Please try again later.');
            }
        }
    }

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

            <h2>Application Form to Join ClearPillar</h2>
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
                    <label htmlFor="linkedin">LinkedIn Profile (optional)</label>
                    <input
                        type="text"
                        id="linkedin"
                        name="linkedin"
                        value={formData.linkedin.trim()}
                        onChange={handleLinkedInChange}
                        className="form-control"
                    />
                </div>
                {errorLinkedIn && <div className="alert alert-danger">{errorLinkedIn}</div>}

                <div className="form-group mt-4">
                    <label htmlFor="position">Position<span style={{color:'red'}}>*</span></label>
                    <br />
                    <select id='position' name='position' value={formData.position} onChange={handlePositionChange} required>
                        <option value="">-- Default --</option>
                        <option value="Liaison">Liaison</option>
                        <option value="Strategist">Strategist</option>
                        <option value="Student Advisor">Student Advisor</option>
                    </select>
                </div>

                <div className="form-group mt-4">
                    <label htmlFor="file">Resume/CV<span style={{color:'red'}}>*</span> (file must be .PDF, .doc, or .docx type)</label>
                    <br />
                    <input
                        type="file"
                        id="resume"
                        name="resume"
                        value={formData.resume}
                        onChange={handleFileChange}
                        required
                    />
                </div>
                {errorFile && <div className="alert alert-danger">{errorFile}</div>}

                <div style={{ display: 'none', visibility: 'hidden' }}>
                    <label htmlFor="verify">Type 'Yes' to verify:</label>
                    <input type="text" id="verify" tabIndex="-1" name="verify" onChange={handleVerifyInputChange} />
                </div>

                <button type="submit" className="btn btn-primary mt-4 mb-5" disabled={isButtonDisabled}>Submit</button>
            </form>
        </div>
    );
}
