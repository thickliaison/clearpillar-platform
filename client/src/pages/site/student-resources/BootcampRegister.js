import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import { Snackbar, Alert } from "@mui/material";
import validator from "validator";
import axios from "axios";
import styles from "styles/BootcampRegister.module.css";

// Raised from 3 to 5 per attendee feedback asking to see/select more topics.
const MAX_TOPICS = 5;

const GRADE_OPTIONS = [
  { value: "9th Grade", labelKey: "grade-9" },
  { value: "10th Grade", labelKey: "grade-10" },
  { value: "11th Grade", labelKey: "grade-11" },
  { value: "12th Grade", labelKey: "grade-12" },
  { value: "Other", labelKey: "grade-other" },
];

const LANGUAGE_OPTIONS = [
  { value: "English", labelKey: "language-english" },
  { value: "Chinese", labelKey: "language-chinese" },
  { value: "Both", labelKey: "language-both" },
];

const ATTENDANCE_FORMAT_OPTIONS = [
  { value: "In Person", labelKey: "attendance-in-person" },
  { value: "Remote", labelKey: "attendance-remote" },
];

const TOPIC_OPTIONS = [
  { value: "College Planning Roadmap", labelKey: "topic-roadmap" },
  { value: "Building a College List", labelKey: "topic-college-list" },
  { value: "Common Application", labelKey: "topic-common-app" },
  { value: "Activities & Resume Building", labelKey: "topic-activities" },
  { value: "Recommendation Letters", labelKey: "topic-recommendations" },
  { value: "College Essays", labelKey: "topic-essays" },
  { value: "SAT / ACT Preparation", labelKey: "topic-sat-act" },
  { value: "Financial Aid (FAFSA/CSS)", labelKey: "topic-financial-aid" },
  { value: "Scholarships", labelKey: "topic-scholarships" },
  { value: "College Interviews", labelKey: "topic-interviews" },
  { value: "Student Leadership Development", labelKey: "topic-leadership" },
];

const HEAR_ABOUT_OPTIONS = [
  { value: "School Counselor", labelKey: "hear-counselor" },
  { value: "Flyer", labelKey: "hear-flyer" },
  { value: "Teacher", labelKey: "hear-teacher" },
  { value: "Friend / Family", labelKey: "hear-friend" },
  { value: "WeChat", labelKey: "hear-wechat" },
  { value: "Instagram", labelKey: "hear-instagram" },
  { value: "Library", labelKey: "hear-library" },
  { value: "Community Organization", labelKey: "hear-community" },
  { value: "Council Member's Office", labelKey: "hear-council" },
  { value: "ClearPillar Website", labelKey: "hear-website" },
  { value: "Other", labelKey: "hear-other" },
];

const initialFormData = {
  firstName: "",
  lastName: "",
  gradeLevel: "",
  gradeOther: "",
  highSchool: "",
  studentEmail: "",
  studentPhone: "",
  parentName: "",
  parentEmail: "",
  parentPhone: "",
  preferredLanguage: "",
  attendanceFormat: "",
  topics: [],
  hearAbout: "",
  hearAboutOther: "",
  photoPermission: false,
  communicationConsent: false,
  registrationConfirmation: false,
  verify: "",
};

export default function BootcampRegister() {
  const { t } = useTranslation("bootcampRegister");
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);
  const [errors, setErrors] = useState({});
  const [isButtonDisabled, setButtonDisabled] = useState(false);
  const [open, setOpen] = useState(false);

  const setField = (name, value) => {
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleTextChange = (e, maxLength = 100) => {
    const { name, value } = e.target;
    if (value.length <= maxLength) {
      setField(name, value);
    }
  };

  const handleEmailChange = (e) => {
    const { name, value } = e.target;
    if (value.length <= 320) {
      setField(name, value);
    }
  };

  const handlePhoneChange = (e) => {
    const { name, value } = e.target;
    if (/^\d*$/.test(value) && value.length <= 10) {
      setField(name, value);
    }
  };

  const handleTopicChange = (topic) => {
    setFormData((prev) => {
      const isSelected = prev.topics.includes(topic);
      if (isSelected) {
        return {
          ...prev,
          topics: prev.topics.filter((item) => item !== topic),
        };
      }
      if (prev.topics.length >= MAX_TOPICS) {
        return prev;
      }
      return { ...prev, topics: [...prev.topics, topic] };
    });
  };

  const validateForm = () => {
    const nextErrors = {};

    if (!validator.isEmail(formData.studentEmail)) {
      nextErrors.studentEmail = t("error-student-email");
    }
    if (!validator.isEmail(formData.parentEmail)) {
      nextErrors.parentEmail = t("error-parent-email");
    }
    if (
      formData.studentPhone &&
      !validator.isMobilePhone(formData.studentPhone, "en-US")
    ) {
      nextErrors.studentPhone = t("error-student-phone");
    }
    if (!validator.isMobilePhone(formData.parentPhone, "en-US")) {
      nextErrors.parentPhone = t("error-parent-phone");
    }
    if (formData.topics.length === 0) {
      nextErrors.topics = t("error-topics-min");
    }
    if (formData.topics.length > MAX_TOPICS) {
      nextErrors.topics = t("error-topics-max");
    }
    if (!formData.communicationConsent || !formData.registrationConfirmation) {
      nextErrors.consent = t("error-consent");
    }

    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({});

    if (formData.verify !== "" || !validateForm()) {
      return;
    }

    setButtonDisabled(true);
    setOpen(true);

    try {
      const response = await axios.post(
        "https://clearpillar.us/api/bootcamp-register",
        formData,
      );
      if (response.status === 200) {
        setOpen(false);
        setButtonDisabled(false);
        navigate("/resources/bootcamp/register/success");
      }
    } catch (error) {
      setOpen(false);
      setButtonDisabled(false);
      setErrors({ submit: t("error-submit") });
    }
  };

  const requiredMark = <span className={styles.required}>*</span>;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>{t("title")}</h1>

        {errors.submit && (
          <div className="alert alert-danger">{errors.submit}</div>
        )}

        <Snackbar
          open={open}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert sx={{ width: "100%" }}>{t("submitting")}</Alert>
        </Snackbar>

        <form onSubmit={handleSubmit} className={styles.form}>
          <h2>{t("student-section")}</h2>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="firstName">
                  {t("first-name")}
                  {requiredMark}
                </label>
                <input
                  type="text"
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={(e) => handleTextChange(e)}
                  className="form-control"
                  required
                />
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="lastName">
                  {t("last-name")}
                  {requiredMark}
                </label>
                <input
                  type="text"
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={(e) => handleTextChange(e)}
                  className="form-control"
                  required
                />
              </div>
            </div>
          </div>

          <div className="form-group mb-3">
            <label>
              {t("grade-level")}
              {requiredMark}
            </label>
            <div className={styles.radioGroup}>
              {GRADE_OPTIONS.map(({ value, labelKey }) => (
                <label key={value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="gradeLevel"
                    value={value}
                    checked={formData.gradeLevel === value}
                    onChange={(e) => setField("gradeLevel", e.target.value)}
                    required
                  />
                  {t(labelKey)}
                </label>
              ))}
            </div>
            {formData.gradeLevel === "Other" && (
              <input
                type="text"
                name="gradeOther"
                value={formData.gradeOther}
                onChange={(e) => handleTextChange(e)}
                className={`form-control mt-2 ${styles.otherInput}`}
                placeholder={t("grade-other-specify")}
                required
              />
            )}
          </div>

          <div className="form-group mb-3">
            <label htmlFor="highSchool">
              {t("high-school")}
              {requiredMark}
            </label>
            <input
              type="text"
              id="highSchool"
              name="highSchool"
              value={formData.highSchool}
              onChange={(e) => handleTextChange(e, 150)}
              className="form-control"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="studentEmail">
                  {t("student-email")}
                  {requiredMark}
                </label>
                <input
                  type="email"
                  id="studentEmail"
                  name="studentEmail"
                  value={formData.studentEmail}
                  onChange={handleEmailChange}
                  className="form-control"
                  required
                />
                {errors.studentEmail && (
                  <div className="alert alert-danger mt-2">
                    {errors.studentEmail}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="studentPhone">{t("student-phone")}</label>
                <input
                  type="text"
                  id="studentPhone"
                  name="studentPhone"
                  value={formData.studentPhone}
                  onChange={handlePhoneChange}
                  className="form-control"
                />
                {errors.studentPhone && (
                  <div className="alert alert-danger mt-2">
                    {errors.studentPhone}
                  </div>
                )}
              </div>
            </div>
          </div>

          <h2>{t("parent-section")}</h2>

          <div className="form-group mb-3">
            <label htmlFor="parentName">
              {t("parent-name")}
              {requiredMark}
            </label>
            <input
              type="text"
              id="parentName"
              name="parentName"
              value={formData.parentName}
              onChange={(e) => handleTextChange(e)}
              className="form-control"
              required
            />
          </div>

          <div className="row">
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="parentEmail">
                  {t("parent-email")}
                  {requiredMark}
                </label>
                <input
                  type="email"
                  id="parentEmail"
                  name="parentEmail"
                  value={formData.parentEmail}
                  onChange={handleEmailChange}
                  className="form-control"
                  required
                />
                {errors.parentEmail && (
                  <div className="alert alert-danger mt-2">
                    {errors.parentEmail}
                  </div>
                )}
              </div>
            </div>
            <div className="col-md-6">
              <div className="form-group mb-3">
                <label htmlFor="parentPhone">
                  {t("parent-phone")}
                  {requiredMark}
                </label>
                <input
                  type="text"
                  id="parentPhone"
                  name="parentPhone"
                  value={formData.parentPhone}
                  onChange={handlePhoneChange}
                  className="form-control"
                  required
                />
                {errors.parentPhone && (
                  <div className="alert alert-danger mt-2">
                    {errors.parentPhone}
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="form-group mb-3">
            <label>
              {t("preferred-language")}
              {requiredMark}
            </label>
            <div className={styles.radioGroup}>
              {LANGUAGE_OPTIONS.map(({ value, labelKey }) => (
                <label key={value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="preferredLanguage"
                    value={value}
                    checked={formData.preferredLanguage === value}
                    onChange={(e) =>
                      setField("preferredLanguage", e.target.value)
                    }
                    required
                  />
                  {t(labelKey)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group mb-3">
            <label>
              {t("attendance-format")}
              {requiredMark}
            </label>
            <div className={styles.radioGroup}>
              {ATTENDANCE_FORMAT_OPTIONS.map(({ value, labelKey }) => (
                <label key={value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="attendanceFormat"
                    value={value}
                    checked={formData.attendanceFormat === value}
                    onChange={(e) =>
                      setField("attendanceFormat", e.target.value)
                    }
                    required
                  />
                  {t(labelKey)}
                </label>
              ))}
            </div>
          </div>

          <div className="form-group mb-3">
            <label>
              {t("topics")}
              {requiredMark}
            </label>
            <div className={styles.checkboxGroup}>
              {TOPIC_OPTIONS.map(({ value, labelKey }) => (
                <label key={value} className={styles.checkboxLabel}>
                  <input
                    type="checkbox"
                    checked={formData.topics.includes(value)}
                    onChange={() => handleTopicChange(value)}
                    disabled={
                      !formData.topics.includes(value) &&
                      formData.topics.length >= MAX_TOPICS
                    }
                  />
                  {t(labelKey)}
                </label>
              ))}
            </div>
            {errors.topics && (
              <div className="alert alert-danger mt-2">{errors.topics}</div>
            )}
          </div>

          <div className="form-group mb-3">
            <label>
              {t("hear-about")}
              {requiredMark}
            </label>
            <div className={styles.radioGroup}>
              {HEAR_ABOUT_OPTIONS.map(({ value, labelKey }) => (
                <label key={value} className={styles.radioLabel}>
                  <input
                    type="radio"
                    name="hearAbout"
                    value={value}
                    checked={formData.hearAbout === value}
                    onChange={(e) => setField("hearAbout", e.target.value)}
                    required
                  />
                  {t(labelKey)}
                </label>
              ))}
            </div>
            {formData.hearAbout === "Other" && (
              <input
                type="text"
                name="hearAboutOther"
                value={formData.hearAboutOther}
                onChange={(e) => handleTextChange(e, 200)}
                className={`form-control mt-2 ${styles.otherInput}`}
                placeholder={t("hear-other-specify")}
                required
              />
            )}
          </div>

          <div className={`form-group mb-3 ${styles.consentGroup}`}>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.photoPermission}
                onChange={(e) => setField("photoPermission", e.target.checked)}
              />
              {t("photo-permission")}
              {requiredMark}
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.communicationConsent}
                onChange={(e) =>
                  setField("communicationConsent", e.target.checked)
                }
                required
              />
              {t("communication-consent")}
              {requiredMark}
            </label>
            <label className={styles.checkboxLabel}>
              <input
                type="checkbox"
                checked={formData.registrationConfirmation}
                onChange={(e) =>
                  setField("registrationConfirmation", e.target.checked)
                }
                required
              />
              {t("registration-confirmation")}
              {requiredMark}
            </label>
            {errors.consent && (
              <div className="alert alert-danger mt-2">{errors.consent}</div>
            )}
          </div>

          <div style={{ display: "none", visibility: "hidden" }}>
            <label htmlFor="verify">Type 'Yes' to verify:</label>
            <input
              type="text"
              id="verify"
              tabIndex="-1"
              name="verify"
              value={formData.verify}
              onChange={(e) => setField("verify", e.target.value)}
            />
          </div>

          <button
            type="submit"
            className={`btn ${styles.submitBtn}`}
            disabled={isButtonDisabled}
          >
            {t("submit")}
          </button>
        </form>
      </div>
    </section>
  );
}
