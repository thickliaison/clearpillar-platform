import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Accordion from 'react-bootstrap/Accordion';
import { useNavigate } from "react-router-dom";
import styles from 'styles/Register.module.css'
import stylesStrategist from 'styles/RegisterStrategist.module.css'
import classNames from 'classnames';

/* to-do */
// 1. set up requirements for the text boxes so that users 
// are not allowed to continue to next page unless format matches (ie, phone # must be #)

// 2. connect to database

// 3. asked which inputs are required, which are optional

function StrategistRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [selectedSpecializations, setSelectedSpecializations] = useState([]);
  const [formData, setFormData] = useState({
    role: 'strategist',
    profilePicture: null,
    fullName: '',
    email: '',
    colleges: [''],
    experience: '',
    specialization: [],
    biography: '',
    education: '',
    successStories: '',
    phoneNumber: '',
    linkedIn: '',
    certifications: [''],
    languages: [''],
    associations: [''],
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e, index, field) => {
    const { name, value } = e.target;
    if (['colleges', 'certifications', 'languages', 'associations'].includes(field)) {
      const newValues = [...formData[field]];
      newValues[index] = value;
      setFormData({
        ...formData,
        [field]: newValues
      });
    } else if (name === 'specialization') {
      const newSpecialization = [...formData.specialization];
      if (newSpecialization.includes(value)) {
        setFormData({
          ...formData,
          specialization: newSpecialization.filter(s => s !== value)
        });
      } else {
        setFormData({
          ...formData,
          specialization: [...newSpecialization, value]
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  const handleFileChange = (e) => {
    setFormData({
      ...formData,
      profilePicture: e.target.files[0]
    });
  };

  /* add/remove items */
  const handleAddItem = (field) => {
    setFormData({
      ...formData,
      [field]: [...formData[field], '']
    });
  };

  const handleRemoveItem = (index, field) => {
    if (formData[field].length > 1) {
      setFormData({
        ...formData,
        [field]: formData[field].filter((_, i) => i !== index)
      });
    }
  };

  /* specialization areas */
  const specializations = {
    'College Admissions Services': [
      'Admissions Strategy',
      'Essay Brainstorming/Writing & Editing',
      'SAT Preparation',
      'ACT Preparation',
      'Building College Lists',
      'Resume and Brag Sheet Review & Editing',
      'Interview Preparation'
    ],
    'Assessment Services': [
      'Personality Assessments',
      'Major Assessments',
      'Career Counseling and Assessments'
    ],
    'Financial Aid & Tuition Planning': [
      'Income and Assets Analysis',
      'Scholarships',
      'Experts in private Loans',
      '529 plan',
      'Financial Aid Appeal Expert'
    ],
    'Insurances': [
      'Tuition insurance',
      'Life insurance',
      'Travel insurance',
      'Health insurance',
      'Renter insurance'
    ]
  };

  const handleBoxClick = (category, specialization) => {
    setSelectedSpecializations(prev => {
      const isSelected = prev.some(s => s.category === category && s.specialization === specialization);
      const newSpecializations = isSelected
        ? prev.filter(s => !(s.category === category && s.specialization === specialization))
        : [...prev, { category, specialization }];

      setFormData({
        ...formData,
        specialization: newSpecializations.map(s => s.specialization)
      });

      return newSpecializations;
    });
  };

  /* count selected specializations */
  const countSelectedPerCategory = (category) => {
    return selectedSpecializations.filter(s => s.category === category).length;
  };

  /* page 1, page 2 of form */
  const handleNextStep = () => {
    setStep(step + 1);
  };

  const handlePrevStep = () => {
    setStep(step - 1);
  };

  /* check matching passwords */
  const [errors, setErrors] = useState({
    passwordMatch: false,
    passwordErrorMessage: '',
    emailTaken: true,
    emailErrorMessage: ''
  });

  useEffect(() => {
    if (formData.password && formData.confirmPassword) {
      if (formData.password === formData.confirmPassword) {
        setErrors({ ...errors, passwordMatch: true, passwordErrorMessage: 'Passwords match!' });
      } else {
        setErrors({ ...errors, passwordMatch: false, passwordErrorMessage: 'Passwords do not match! Please check again.' });
      }
    }
  }, [formData.password, formData.confirmPassword]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = new FormData();

    data.append('profilePicture', formData.profilePicture);
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('linkedIn', formData.linkedIn);
    data.append('colleges', JSON.stringify(formData.colleges));
    data.append('experience', formData.experience);
    data.append('specialization', JSON.stringify(formData.specialization));
    data.append('biography', formData.biography);
    data.append('education', formData.education);
    data.append('successStories', formData.successStories);
    data.append('certifications', JSON.stringify(formData.certifications));
    data.append('languages', JSON.stringify(formData.languages));
    data.append('associations', JSON.stringify(formData.associations));
    data.append('password', formData.password);

    // all form data
    console.log('Strategist Register: form data that was entered');
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (errors.passwordMatch) {
      try {
        console.log("Strategist Registration- accessing database.");
        const response = await axios.post('http://localhost:3001/api/strategist-register', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log("Strategist Registration- accessed database.");

        console.log("Full response data: ", response.data);

        if (response.data.success) {
          console.log("Strategist Registration successful.");
          navigate("/register-success");
        } else {
          console.log("Error in adding user to server");
          alert(response.data.message);
        }
      } catch (error) {
        console.error("There was an error processing the registration: ", error);
      }
    } else {
      setErrors({ ...errors, passwordErrorMessage: 'Please ensure passwords match before submitting.' });
    }
  };

  return (
    <div className={classNames("mt-5", styles["register-container"])}>
      <h2 className={classNames("mb-4", styles["register-title"])}>Register as a Strategist</h2>
      <p className="text-center"><i> <span className="text-danger">*</span> indicates required field. </i></p>
      <form onSubmit={handleSubmit} className="p-4 rounded shadow">
        {step === 1 && (
          <>
            <div className="mb-3 text-center">
              <label className={classNames("form-label", styles["register-form-label"])}>Profile Picture</label>
              <div className={styles["profile-picture-container"]}>
                {formData.profilePicture ? (
                  <img
                    src={URL.createObjectURL(formData.profilePicture)}
                    alt="Profile"
                    className={styles["profile-picture"]}
                  />
                ) : (
                  <i className={classNames("fas", "fa-user-circle", "fa-5x", styles["profile-picture-placeholder"])}></i>
                )}
              </div>
              <button type="button" className="btn"
                onClick={() => document.getElementById('profilePictureInput').click()}>
                Upload Profile Picture
              </button>
              <input
                type="file"
                id="profilePictureInput"
                className="d-none"
                name="profilePicture"
                onChange={handleFileChange} />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Full Name <span className="text-danger">*</span> </label>
              <input type="text" className={classNames("form-control", styles["register-form-control"])} name="fullName" value={formData.fullName} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Phone Number <span className="text-danger">*</span> </label>
              <input type="tel" className={classNames("form-control", styles["register-form-control"])} name="phoneNumber" value={formData.phoneNumber} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>LinkedIn Profile</label>
              <input type="url" className={classNames("form-control", styles["register-form-control"])} name="linkedIn" value={formData.linkedIn} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Colleges/Universities Worked For</label>
              {formData.colleges.map((college, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"], "me-2")}
                    name="colleges"
                    value={college}
                    onChange={(e) => handleChange(e, index, 'colleges')}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'colleges')}
                    disabled={formData.colleges.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('colleges')}>
                Add Additional College(s)
              </button>
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Years of Experience in Admissions <span className="text-danger">*</span> </label>
              <input type="number" className={classNames("form-control", styles["register-form-control"])} name="experience" value={formData.experience} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Specialization Areas</label>
              <div className={stylesStrategist["specialization-container"]}>
                <Accordion className={stylesStrategist["accordion-container"]} defaultActiveKey="0">
                  {Object.keys(specializations).map((category, index) => (
                    <Accordion.Item eventKey={index.toString()} key={index}>
                      <Accordion.Header>{category} ({countSelectedPerCategory(category)} selected) </Accordion.Header>
                      <Accordion.Body>
                        <div className={stylesStrategist["specialization-container"]}>
                          {specializations[category].map((specialization) => (
                            <div
                              key={specialization}
                              className={`${stylesStrategist["specialization-box"]} ${selectedSpecializations.some(s => s.category === category && s.specialization === specialization) ? stylesStrategist.selected : ''}`}
                              onClick={() => handleBoxClick(category, specialization)}
                            >
                              <span>{specialization}</span>
                            </div>
                          ))}
                        </div>
                      </Accordion.Body>
                    </Accordion.Item>
                  ))}
                </Accordion>
              </div>
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Biography/Professional Summary</label>
              <p> <i>A brief summary highlighting your experience, background, and areas of expertise. </i></p>
              <textarea className={classNames("form-control", styles["register-form-control"])} name="biography" value={formData.biography} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Highest Degree Earned <span className="text-danger">*</span></label>
              <input type="text" className={classNames("form-control", styles["register-form-control"])} name="education" value={formData.education} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Success Stories</label>
              <p> <i>A few brief testimonials or case studies showcasing successful student admissions. </i></p>
              <textarea className={classNames("form-control", styles["register-form-control"])} name="successStories" value={formData.successStories} onChange={handleChange} />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Certifications</label>
              {formData.certifications.map((certification, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"], "me-2")}
                    name="certifications"
                    value={certification}
                    onChange={(e) => handleChange(e, index, 'certifications')}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'certifications')}
                    disabled={formData.certifications.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('certifications')}>
                Add Additional Certification(s)
              </button>
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Languages Spoken</label>
              {formData.languages.map((language, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"], "me-2")}
                    name="languages"
                    value={language}
                    onChange={(e) => handleChange(e, index, 'languages')}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'languages')}
                    disabled={formData.languages.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('languages')}>
                Add Additional Language(s)
              </button>
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Professional Associations</label>
              {formData.associations.map((association, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"], "me-2")}
                    name="associations"
                    value={association}
                    onChange={(e) => handleChange(e, index, 'associations')}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'associations')}
                    disabled={formData.associations.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('associations')}>
                Add Additional Association(s)
              </button>
            </div>
            <div className="text-center">
              <button type="button" className="btn register-next-btn" onClick={handleNextStep}>
                Next
              </button>
            </div>
          </>
        )}
        {step === 2 && (
          <>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Email <span className="text-danger">*</span> </label>
              <input type="email" className={classNames("form-control", styles["register-form-control"])} name="email" value={formData.email} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Password <span className="text-danger">*</span></label>
              <input
                type="password"
                className={classNames("form-control", styles["register-form-control"])}
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Confirm Password <span className="text-danger">*</span></label>
              <input
                type="password"
                className={classNames("form-control", styles["register-form-control"])}
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
              />
            </div>

            {formData.password && formData.confirmPassword && (
              <div className={`mb-3 ${errors.passwordMatch ? 'text-success' : 'text-danger'}`}>
                {errors.passwordErrorMessage}
              </div>
            )}

            {formData.email && (
              <div className={`mb-3 ${errors.emailTaken ? 'text-danger' : ''}`}>
                {errors.emailErrorMessage}
              </div>
            )}

            <div className="text-center">
              <button type="button" className="btn me-1" onClick={handlePrevStep}>
                Back
              </button>
              <button type="submit" className="btn">
                Register
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

export default StrategistRegister;
