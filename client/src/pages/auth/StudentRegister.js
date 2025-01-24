import React, { useEffect, useState } from 'react';
// getting error when trying to use datepicker for date of birth
import DatePicker from 'react-datepicker';
import styles from 'styles/Register.module.css';
import classNames from 'classnames';
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function StudentRegister() {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    profilePicture: null,
    fullName: '',
    phoneNumber: '',
    dob: '',
    gender: '',
    address: '',
    school: '',
    grade: '',
    gpa: '',
    satScore: '',
    actScore: '',
    email: ''
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
    setFormData({
      ...formData,
      profilePicture: e.target.files[0]
    });
  };

  /* birthdate */
  const handleDateChange = (date) => {
    setFormData({ ...formData, dob: date });
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
    const formattedDOB = formData.dob.toLocaleDateString('en-US');

    data.append('profilePicture', formData.profilePicture);
    data.append('fullName', formData.fullName);
    data.append('email', formData.email);
    data.append('phoneNumber', formData.phoneNumber);
    data.append('dob', formattedDOB);
    data.append('gender', formData.gender);
    data.append('address', formData.address);
    data.append('school', formData.school);
    data.append('grade', formData.grade);
    data.append('gpa', formData.gpa);
    data.append('satScore', formData.satScore);
    data.append('actScore', formData.actScore);
    data.append('password', formData.password);

    // all form data
    console.log('Student Register: form data that was entered');
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value}`);
    }

    if (errors.passwordMatch) {
      try {
        console.log("Student Registration- accessing database.");
        const response = await axios.post('http://localhost:3001/api/student-register', data, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });

        console.log("Student Registration- accessed database.");

        console.log("Full response data: ", response.data);

        if (response.data.success) {
          console.log("Student Registration successful.");
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
      <h2 className={classNames("mb-4", styles["register-title"])}>Register as a Student</h2>
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
              <label className={classNames("form-label", styles["register-form-label"])}>Date of Birth</label>
              {/* <input type="url" className={classNames("form-control", styles["register-form-control"])} name="dob" value={formData.dob} onChange={handleChange} required /> */}
              <div className="position-relative">
                <DatePicker
                  selected={formData.dob}
                  onChange={handleDateChange}
                  className={classNames("form-control", styles["register-form-control"])}
                  dateFormat="MM/dd/yyyy"
                  showYearDropdown
                  showMonthDropdown
                  dropdownMode="select"
                  required
                />
              </div>
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Gender</label>
              <input type="url" className={classNames("form-control", styles["register-form-control"])} name="gender" value={formData.gender} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Address</label>
              <input type="url" className={classNames("form-control", styles["register-form-control"])} name="address" value={formData.address} onChange={handleChange} required />
            </div>
            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>Current School Name</label>
              <input type="text" className={classNames("form-control", styles["register-form-control"])} name="school" value={formData.school} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}> Current Grade Level</label>
              <div className="position-relative">
                <select className="form-select" name="grade" value={formData.grade} onChange={handleChange} required>
                  <option value="">Select Grade Level</option>
                  <option value="8th">Grade 8</option>
                  <option value="9th">Grade 9</option>
                  <option value="10th">Grade 10</option>
                  <option value="11th">Grade 11</option>
                  <option value="12th">Grade 12</option>
                </select>
              </div>
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}>GPA</label>
              <input type="text" className={classNames("form-control", styles["register-form-control"])} name="gpa" value={formData.gpa} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}> SAT Score</label>
              <input type="text" className={classNames("form-control", styles["register-form-control"])} name="satScore" value={formData.satScore} onChange={handleChange} required />
            </div>

            <div className="mb-3">
              <label className={classNames("form-label", styles["register-form-label"])}> ACT Score</label>
              <input type="text" className={classNames("form-control", styles["register-form-control"])} name="actScore" value={formData.actScore} onChange={handleChange} required />
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

export default StudentRegister;
