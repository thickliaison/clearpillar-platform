require('dotenv').config();
const express = require('express');
const multer = require('multer');
const router = express.Router();
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS
  },
  // debug: true,
  // logger: true
});

router.post('/interest-form', async (req, res) => {
  console.log('In interest form route');
  const { fullname, email, phonenumber, services, message } = req.body;

  console.log("Services: ", services);
  
  console.log('Interest route: selected services are ', services);

  // send new interest form to home office email
  const mailOptionsOffice = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    subject: 'New Client Interest Submission',
    text: `
      A potential client has submitted their interest form:

      Full Name: ${fullname}
      Email: ${email}
      Phone Number: ${phonenumber}
      
      Services Interested In:
      ${services}
      
      Additional Message: ${message}
    `
  };

  // email confirmation student
  const mailOptionsStudent = {
    from: process.env.EMAIL_USER,
    to: email, // send confirmation to the student's email
    subject: 'Thank You for Your Interest',
    html: `
    <html>
      <body>
        <h3>Hi ${fullname},</h3>
        <p>Thank you for your interest in ClearPillar!</p>
        <p>We have received your inquiry and someone from our team will reach out to you shortly.</p>
        <p>If you have any immediate questions, feel free to reply to this email.</p>
        <p>Best regards,</p>
        <p>ClearPillar Team</p>
        <p><img src="https://clearpillar.us/favicon.png" alt="Brand Logo" style="width: 50px; height: 50px;" /></p>
        <p>+1 (347) 400-4166</p>
        <p>https://clearpillar.us</p>
      </body>
    </html>
  `
  };

  try {
    console.log("Sending office email");
    await transporter.sendMail(mailOptionsOffice);
    console.log("Sent office email");

    console.log("Sending confirmation email to student");
    await transporter.sendMail(mailOptionsStudent);
    console.log("Sent confirmation email to student");

    res.status(200).send({ message: 'Interest form submitted, and emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send({ error: 'Failed to send emails' });
  }
});

const upload = multer();

router.post('/application-form', upload.single('resume'), async (req, res) => {
  const { fullname, email, phonenumber, linkedin, position } = req.body;
  const resume = req.file;
  console.log(req.body)  
  console.log(resume)

  const mailOptionsOffice = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER, 
    subject: 'New Applicant Form Submission',
    text: `
      A potential ${position} has submitted their application form:

      Full Name: ${fullname}
      Email: ${email}
      Phone Number: ${phonenumber}
      
      LinkedIn: ${linkedin}
    `,
    attachments: [
      {
          filename: resume.originalname,
          content: resume.buffer,
      },
    ],
  };

  const mailOptionsApplicant = {
    from: process.env.EMAIL_USER,
    to: email, // send confirmation to the applicant's email
    subject: 'Thank You for Your Application to ClearPillar',
    html: `
    <html>
      <body>
        <h3>Hi ${fullname},</h3>
        <p>Thank you for your application! We are excited that you want to be part of ClearPillar!</p>
        <p>Your application has been received for the position: ${position}.</p>
        <p>If your application is selected to move forward, you will be contacted directly.</p>
        <p>Best regards,</p>
        <p>ClearPillar Team</p>
        <p><img src="https://clearpillar.us/favicon.png" alt="Brand Logo" style="width: 50px; height: 50px;" /></p>
        <p>+1 (347) 400-4166</p>
        <p>https://clearpillar.us</p>
      </body>
    </html>
  `
  };

  try {
    console.log("Sending office email");
    await transporter.sendMail(mailOptionsOffice);
    console.log("Sent office email");

    console.log("Sending confirmation email to applicant");
    await transporter.sendMail(mailOptionsApplicant);
    console.log("Sent confirmation email to applicant");

    res.status(200).send({ message: 'Application form submitted, and emails sent successfully!' });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).send({ error: 'Failed to send emails' });
  }
})

router.post('/bootcamp-register', async (req, res) => {
  const {
    firstName,
    lastName,
    gradeLevel,
    gradeOther,
    highSchool,
    studentEmail,
    studentPhone,
    parentName,
    parentEmail,
    parentPhone,
    preferredLanguage,
    topics,
    hearAbout,
    hearAboutOther,
    photoPermission,
    communicationConsent,
    registrationConfirmation,
  } = req.body;

  const gradeDisplay = gradeLevel === 'Other' ? gradeOther : gradeLevel;
  const hearAboutDisplay = hearAbout === 'Other' ? hearAboutOther : hearAbout;

  const mailOptionsOffice = {
    from: process.env.EMAIL_USER,
    to: process.env.EMAIL_USER,
    subject: 'New Bootcamp Registration',
    text: `
      A new bootcamp registration has been submitted:

      Student First Name: ${firstName}
      Student Last Name: ${lastName}
      Grade Level: ${gradeDisplay}
      High School: ${highSchool}
      Student Email: ${studentEmail}
      Student Phone: ${studentPhone || 'Not provided'}

      Parent/Guardian Name: ${parentName}
      Parent/Guardian Email: ${parentEmail}
      Parent/Guardian Phone: ${parentPhone}

      Preferred Language: ${preferredLanguage}

      Topics of Interest:
      ${topics.join(', ')}

      How They Heard About the Program: ${hearAboutDisplay}

      Photo/Video Permission: ${photoPermission ? 'Yes' : 'No'}
      Communication Consent: ${communicationConsent ? 'Yes' : 'No'}
      Registration Confirmation Acknowledged: ${registrationConfirmation ? 'Yes' : 'No'}
    `,
  };

  const mailOptionsParent = {
    from: process.env.EMAIL_USER,
    to: parentEmail,
    subject: 'Bootcamp Registration Confirmation',
    html: `
    <html>
      <body>
        <h3>Hi ${parentName},</h3>
        <p>Thank you for registering ${firstName} ${lastName} for the ClearPillar Bootcamp!</p>
        <p>We have received your registration and will follow up with additional program information and a short participant questionnaire.</p>
        <p>If you have any questions, feel free to reply to this email.</p>
        <p>Best regards,</p>
        <p>ClearPillar Team</p>
        <p><img src="https://clearpillar.us/favicon.png" alt="Brand Logo" style="width: 50px; height: 50px;" /></p>
        <p>+1 (347) 400-4166</p>
        <p>https://clearpillar.us</p>
      </body>
    </html>
    `,
  };

  try {
    await transporter.sendMail(mailOptionsOffice);
    await transporter.sendMail(mailOptionsParent);
    res.status(200).send({ message: 'Bootcamp registration submitted successfully!' });
  } catch (error) {
    console.error('Error sending bootcamp registration emails:', error);
    res.status(500).send({ error: 'Failed to send registration emails' });
  }
});

module.exports = router;