import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import styles from 'styles/Register.module.css';
import stylesLiaison from 'styles/RegisterLiaison.module.css';
import classNames from 'classnames';

function LiaisonRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePicture: null,
    fullName: '',
    phoneNumber: '',
    linkedIn: '',
    location: '',
    title: '',
    education: [''],
    certifications: [''],
    languages: [''],
    experience: '',
    roles: [''],
    successStories: '',
    colleges: [''],
    time: [''],
    communication: [],
    biography: '',
    affiliations: [''],
    published: [''],
    hobbies: [''],
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleChange = (e, index, field) => {
    if (index !== undefined && field) {
      const updatedArray = [...formData[field]];
      updatedArray[index] = e.target.value;
      setFormData({ ...formData, [field]: updatedArray });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleFileChange = (e) => {
    console.log(e.target.files[0])
    setFormData({
      ...formData,
      profilePicture: e.target.files[0]
    });
  };

  const handleCommunicationChange = (e) => {
    const value = e.target.value;
    if (value) {
      setFormData(prevData => ({
        ...prevData,
        communication: prevData.communication.includes(value)
          ? prevData.communication.filter(item => item !== value)
          : [...prevData.communication, value]

      }));
    }
  };

  /* add/remove items */
  const handleAddItem = (field) => {
    setFormData({ ...formData, [field]: [...formData[field], ''] });
  };

  const handleRemoveItem = (index, field) => {
    const updatedArray = formData[field].filter((_, i) => i !== index);
    setFormData({ ...formData, [field]: updatedArray });
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
    passwordErrorMessage: ''
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
    data.append('location', formData.location);
    data.append('biography', formData.biography);
    data.append('education', formData.education);
    data.append('successStories', formData.successStories);
    data.append('certificates', JSON.stringify(formData.certifications));
    data.append('languages', JSON.stringify(formData.languages));
    data.append('affiliation', JSON.stringify(formData.affiliations));
    data.append('title', formData.title);
    data.append('roles', JSON.stringify(formData.roles));
    data.append('times', JSON.stringify(formData.time));

    const formattedCommunication = formData.communication.map(item => `${item}`).join(',');
    data.append('communication', `{${formattedCommunication}}`);

    // data.append('communication', JSON.stringify(formData.communication));
    data.append('articles', JSON.stringify(formData.published));
    data.append('password', formData.password);

    console.log('Communication before submission:', formData.communication);

    // all form data
    console.log('Liaison Register: form data that was entered');
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (errors.passwordMatch) {
      try {
        console.log("Liaison Registration- accessing database.");
        const response = await axios.post('http://localhost:3001/api/liaison-register', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log("Liaison Registration- accessed database.");

        console.log("Full response data: ", response.data);

        if (response.data.success) {
          console.log("Liaison Registration successful.");
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
      <h2 className={classNames("mb-4", styles["register-title"])}>Register as a Liaison</h2>
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
              <label className={classNames("form-label", styles["register-form-label"])}>Location (City and State)</label>
              <input type="url" className={classNames("form-control", styles["register-form-control"])} name="location" value={formData.location} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Title/Position</label>
              <input type="url" className={classNames("form-control", styles["register-form-control"])} name="title" value={formData.title} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Highest Degree Earned</label>
              <input type="text" className={classNames("form-control", styles["register-form-control"])} name="education" value={formData.education} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}> Relevant Certifications</label>
              {formData.certifications.map((certification, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"], "me-2")}
                    name="certifications"
                    value={certification}
                    onChange={(e) => handleChange(e, index, 'certifications')}
                    required
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
                    className={classNames("form-control", styles["register-form-control"])}
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
              <label className={classNames("form-label", styles["register-form-label"])}>Years of Experience in College Admissions/Related Fields</label>
              <input type="number" className={classNames("form-control", styles["register-form-control"])} name="experience" value={formData.experience} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Previous Roles and Responsibilities</label>
              {formData.roles.map((role, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"])}
                    name="roles"
                    value={role}
                    onChange={(e) => handleChange(e, index, 'roles')}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'roles')}
                    disabled={formData.roles.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('roles')}>
                Add Additional Role(s)
              </button>
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}> Notable Achievements/Success Stories</label>
              <p> <i>A few brief testimonials or case studies showcasing achievements. </i></p>
              <textarea className={classNames("form-control", styles["register-form-control"])} name="successStories" value={formData.successStories} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Colleges/Universities Worked With</label>
              {formData.colleges.map((college, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"])}
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
              <label className={classNames("form-label", styles["register-form-label"])}>Preferred Consultation Times</label>
              {formData.time.map((time, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="time"
                    className={classNames("form-control", styles["register-form-control"])}
                    name="time"
                    value={time}
                    onChange={(e) => handleChange(e, index, 'time')}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'time')}
                    disabled={formData.time.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('time')}>
                Add Additional Time(s)
              </button>
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Modes of Communication</label>
              <div className="d-flex flex-wrap">
                {['In-Person', 'Zoom', 'Phone', 'Email'].map((mode) => (
                  <div key={mode} className={stylesLiaison["communication-option"]}>
                    <input
                      type="checkbox"
                      id={mode}
                      value={mode}
                      checked={formData.communication.includes(mode)}
                      onChange={handleCommunicationChange}
                    />
                    <label htmlFor={mode} className="ms-2">
                      {mode}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Biography/Professional Summary</label>
              <p> <i>A brief summary highlighting your experience, background, and areas of expertise. </i></p>
              <textarea className={classNames("form-control", styles["register-form-control"])} name="biography" value={formData.biography} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Professional Affiliations</label>
              {formData.affiliations.map((affiliations, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"])}
                    name="affiliations"
                    value={affiliations}
                    onChange={(e) => handleChange(e, index, 'affiliations')}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'affiliations')}
                    disabled={formData.affiliations.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('affiliations')}>
                Add Additional Affiliations(s)
              </button>
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Published Work or Articles </label>
              {formData.published.map((published, index) => (
                <div key={index} className="d-flex align-items-center mb-2">
                  <input
                    type="text"
                    className={classNames("form-control", styles["register-form-control"])}
                    name="published"
                    value={published}
                    onChange={(e) => handleChange(e, index, 'published')}
                    required
                  />
                  <button
                    type="button"
                    className="btn btn-outline-danger"
                    onClick={() => handleRemoveItem(index, 'published')}
                    disabled={formData.published.length === 1 && index === 0}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button type="button" className="btn" onClick={() => handleAddItem('published')}>
                Add Additional Work(s)
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

export default LiaisonRegister;
