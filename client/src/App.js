import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from 'utils/ScrollToTop';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Home from '@home/Home';
import ForgotPassword from '@auth/ForgotPassword';
import ResetPassword from '@auth/ResetPassword';
import InterestForm from '@home/InterestForm';
import ThickLiaison from '@thickliaison/ThickLiaison';
import InterestSuccess from '@home/InterestSuccess';
import AboutUs from '@about/AboutUs';
import CommunityImpact from '@about/CommunityImpact';
import Privacy from '@about/Privacy';
import Roadmap from '@student-resources/Roadmap';
import Workshops from '@student-resources/Workshops';
import BusinessModel from '@join-the-team/BusinessModel';
import EssayBrainstorming from '@student-resources/EssayBrainstorming';
import LoginPage from '@auth/LoginPage';
import StrategistRegister from '@auth/StrategistRegister';
import LiaisonRegister from '@auth/LiaisonRegister';
import StudentRegister from '@auth/StudentRegister';
import StudentAdvisorRegister from '@auth/StudentAdvisorRegister';
import JoinStudentAdvisor from '@join-the-team/JoinStudentAdvisor';
import JoinStrategist from '@join-the-team/JoinStrategist';
import JoinLiaison from '@join-the-team/JoinLiaison';
import JoinCareerAdvisor from '@join-the-team/JoinCareerAdvisor';
import EssayAssistance from '@services/EssayAssistance';
import TuitionPlanning from '@services/TuitionPlanning';
import AdmissionStrategy from '@services/AdmissionStrategy';
import ApplicationForm from 'pages/site/join-the-team/ApplicationForm';
import ApplicationSuccess from 'pages/site/join-the-team/ApplicationSuccess';

// import OtherServices from '@services/OtherServices';
//import Dashboard from '@profile/Dashboard';
import AllMeetings from '@profile/AllMeetings';
import Profile from '@profile/Profile';

import RegisterSuccess from 'components/RegisterSuccess';

// strategist
import StrategistDashboard from 'strategist/StrategistDashboard';

// liaison
import LiaisonDashboard from '@profile/liaison/LiaisonDashboard';
import LiaisonSettings from '@profile/liaison/LiaisonSettings';

//student 
import StudentDashboard from 'student/StudentDashboard';

//student advisor
import StudentAdvDashboard from 'studentAdvisor/StudentAdvDashboard';

// admin
import AdminDashboard from 'admin/AdminDashboard';
import ViewLiaisonProfiles from 'admin/ViewProfiles/ViewLiaisonProfiles';
import ViewStudentProfiles from 'admin/ViewProfiles/ViewStudentProfiles';
import ViewStrategistProfiles from 'admin/ViewProfiles/ViewStrategistProfiles';
import MatchStudentLiaison from 'admin/MatchStudentLiaison';
import ViewStudentMatch from 'admin/ViewStudentMatch';

import isTokenExpired from 'utils/validateToken';
import NewMeeting from 'pages/profile/NewMeeting';

import { LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';

function App() {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>

      <Router>
        <ScrollToTop />
        <Navbar />
          <Routes>
            {/* landing pages */}
            <Route path="/" element={<Home />} />
            <Route path="*" element={<Navigate to="/" />} />
            <Route path="/about-us" element={<AboutUs />} />
            <Route path="/thick-liaison" element={<ThickLiaison />} />
            <Route path="/privacy" element={<Privacy />} />
            <Route path="/student-interest-form" element={<InterestForm />} />
            <Route path='/interest-form-success' element={<InterestSuccess />} />
            <Route path="/community-impact" element={<CommunityImpact />} />
            <Route path="/services/admissions-strategy" element={<AdmissionStrategy />} />
            <Route path="/services/essay-assistance" element={<EssayAssistance />} />
            <Route path="/services/tuition-planning" element={<TuitionPlanning />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            
            {/* <Route path="/services/other-services" element={<OtherServices />} /> */}
            <Route path="/resources/roadmap" element={<Roadmap />} />
            <Route path="/resources/essay-brainstorming" element={<EssayBrainstorming />} />
            <Route path="/resources/workshops" element={<Workshops />} />
            <Route path="/opportunities/business-model" element={<BusinessModel />} />
            <Route path="/opportunities/join-student-advisor" element={<JoinStudentAdvisor />} />
            <Route path="/opportunities/join-strategist" element={<JoinStrategist />} />
            <Route path="/opportunities/join-liaison" element={<JoinLiaison />} />
            <Route path="/opportunities/join-career-advisor" element={<JoinCareerAdvisor />} />
            <Route path="/opportunities/application-form" element={<ApplicationForm />} />
            <Route path="/opportunities/application-form-success" element={<ApplicationSuccess />} />

            {/* Login/Registration */}
            <Route path="/login" element={<PublicLoginRoute><LoginPage /></PublicLoginRoute>} />
            <Route path="/register/strategist-register" element={<StrategistRegister />} />
            <Route path="/register/liaison-register" element={<LiaisonRegister />} />
            <Route path="/register/student-register" element={<StudentRegister />} />
            <Route path="/register/studentadvisor-register" element={<StudentAdvisorRegister />} />

            {/* Modular Pages */}
            <Route path="/dashboard/all-meetings" element={<PrivateRoute><AllMeetings /></PrivateRoute>} />
            <Route path="/dashboard/new-meeting" element={<PrivateRoute><NewMeeting /></PrivateRoute>} />

            {/* strategist pages */}
            <Route path="/register-success" element={ < RegisterSuccess/>} />
            <Route path="/strategist/strategist-dashboard" element={<StrategistDashboard />} />
            
            {/* liaison pages */}
            <Route path="/register-success" element={<RegisterSuccess />} />
            <Route path="/liaison/dashboard" element={<PrivateRoute><LiaisonDashboard /></PrivateRoute>} />
            <Route path="/liaison/settings" element={<PrivateRoute><LiaisonSettings /></PrivateRoute>} />            

            {/* student pages */}
            <Route path="/student/student-dashboard" element={<StudentDashboard />} />

            {/* student advisor pages */}
            <Route path="/studentAdvisor/student-adv-dashboard" element={<StudentAdvDashboard />} />

            {/* admin pages */}
            <Route path="/admin/admin-dashboard" element={<AdminDashboard />} />
            <Route path="/admin/view-liaison-profiles" element={<ViewLiaisonProfiles />} />            
            <Route path="/admin/view-liaison-profiles" element={<ViewLiaisonProfiles />} />
            <Route path="/admin/view-student-profiles" element={<ViewStudentProfiles />} />
            <Route path="/admin/view-strategist-profiles" element={<ViewStrategistProfiles />} />
            <Route path="/admin/match-student-liaison" element={<MatchStudentLiaison />} />
            <Route path="/admin/view-student-match" element={<ViewStudentMatch />} />

          </Routes>
        <Footer />
      </Router>
      </LocalizationProvider>

  );
}

function PrivateRoute({ children }) {
  const token = localStorage.getItem('token');

  return isTokenExpired(token) ? <Navigate to="/login" /> : children;
}

function PublicLoginRoute({ children }) {
  const token = localStorage.getItem('token');

  return isTokenExpired(token) ? children : <Navigate to="/" />;
}

export default App;