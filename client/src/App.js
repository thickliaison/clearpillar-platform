import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import ScrollToTop from 'utils/ScrollToTop';
import Navbar from 'components/Navbar';
import Footer from 'components/Footer';
import Home from '@home/Home';
import InterestForm from '@home/InterestForm';
import InterestSuccess from '@home/InterestSuccess';
import ThickLiaison from '@thickliaison/ThickLiaison';
import AboutUs from '@about/AboutUs';
import CommunityImpact from '@about/CommunityImpact';
import Privacy from '@about/Privacy';
import Roadmap from '@student-resources/Roadmap';
import AdmissionStrategy from '@services/AdmissionStrategy';
import EssayAssistance from '@services/EssayAssistance';
import TuitionPlanning from '@services/TuitionPlanning';
import EssayBrainstorming from '@student-resources/EssayBrainstorming';
import Workshops from '@student-resources/Workshops';
import BusinessModel from '@join-the-team/BusinessModel';
import JoinLiaison from '@join-the-team/JoinLiaison';
import JoinStrategist from '@join-the-team/JoinStrategist';
import JoinStudentAdvisor from '@join-the-team/JoinStudentAdvisor';
import ApplicationForm from 'pages/site/join-the-team/ApplicationForm';
import ApplicationSuccess from 'pages/site/join-the-team/ApplicationSuccess';

function App() {
  return (
    <Router>
      <ScrollToTop />

      <Navbar />

      {/* landing pages */}
      <Routes>
        <Route path="*" element={<Navigate to="/" />} />

        <Route path="/" element={<Home />} />

        <Route path="/student-interest-form" element={<InterestForm />} />
        <Route path='/interest-form-success' element={<InterestSuccess />} />

        <Route path="/thick-liaison" element={<ThickLiaison />} />

        <Route path="/about-us" element={<AboutUs />} />
        <Route path="/community-impact" element={<CommunityImpact />} />
        <Route path="/privacy" element={<Privacy />} />

        <Route path="/services/admissions-strategy" element={<AdmissionStrategy />} />
        <Route path="/services/essay-assistance" element={<EssayAssistance />} />
        <Route path="/services/tuition-planning" element={<TuitionPlanning />} />

        <Route path="/resources/roadmap" element={<Roadmap />} />
        <Route path="/resources/essay-brainstorming" element={<EssayBrainstorming />} />
        <Route path="/resources/workshops" element={<Workshops />} />

        <Route path="/opportunities/business-model" element={<BusinessModel />} />
        <Route path="/opportunities/join-liaison" element={<JoinLiaison />} />
        <Route path="/opportunities/join-strategist" element={<JoinStrategist />} />
        <Route path="/opportunities/join-student-advisor" element={<JoinStudentAdvisor />} />
        
        <Route path="/opportunities/application-form" element={<ApplicationForm />} />
        <Route path="/opportunities/application-form-success" element={<ApplicationSuccess />} />
        
      </Routes>

      <Footer />

    </Router>
  );
}

export default App;