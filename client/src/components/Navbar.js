import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from 'styles/Navbar.module.css'

export default function Navbar() {
  const { t, i18n } = useTranslation('navbar');

  const changeLanguage = (lng) => {
    i18n.changeLanguage(lng);
  };

  return (
    <div className='bar'>
      {/* <MaintenanceBanner /> */}
      <nav className={`navbar navbar-expand-lg fixed-top`}>
        <div className="container-fluid">
          <Link className={`${styles.brand} navbar-brand`} to="/"> <h2> ClearPillar 正知</h2> </Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">

              {/* Thick Liaison Page */}
              <div>
                <li className="nav-item">
                  <Link className="nav-link" to="/thick-liaison">母公司網頁</Link>
                </li>
              </div>

              {/* Language Change */}
              <div className={styles.language}>
                <li className="nav-item">
                  <span className="nav-link" role="button" aria-expanded="false" onClick={() => changeLanguage('zh')}>中</span>
                </li>
                <li className="nav-item ">
                  <span className="nav-link me-1 ms-1">|</span>
                </li>
                <li className="nav-item me-3">
                  <span className="nav-link" role="button" aria-expanded="false" onClick={() => changeLanguage('en')}>EN</span>
                </li>
              </div>

              {/* About */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                {t('about')}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/about-us">{t('about-us')}</Link></li>
                  <li><Link className="dropdown-item" to="/community-impact">{t('community-impact')}</Link></li>
                  <li><Link className="dropdown-item" to="/privacy">{t('privacy')}</Link></li>

                </ul>
              </li>

              {/* Services */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {t('services')}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/services/admissions-strategy">{t('admissions-strategy')}</Link></li>
                  <li><Link className="dropdown-item" to="/services/essay-assistance">{t('essay-assistance')}</Link></li>
                  <li><Link className="dropdown-item" to="/services/tuition-planning">{t('tuition-planning')}</Link></li>
                  {/* <li><Link className="dropdown-item" to="/services/other-services">Other Services</Link></li> */}
                </ul>
              </li>

              {/* Resources */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {t('resources')}
                </Link>
                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/resources/roadmap">{t('roadmap')}</Link></li>
                  <li><Link className="dropdown-item" to="/resources/essay-brainstorming">{t('essay-brainstorm')}</Link></li>
                  <li><Link className="dropdown-item" to="/resources/workshops">{t('workshops')}</Link></li>
                </ul>
              </li>

              {/* Join the Team */}
              <li className="nav-item dropdown">
                <Link className="nav-link dropdown-toggle" to="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                  {t('join-the-team')}
                </Link>
                <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="navbarDropdown">
                  <li><Link className="dropdown-item" to="/opportunities/business-model">{t('business-model')}</Link></li>
                  <li><Link className="dropdown-item" to="/opportunities/join-liaison">{t('join-as-liaison')}</Link></li>
                  <li><Link className="dropdown-item" to="/opportunities/join-strategist">{t('join-as-strategist')}</Link></li>
                  <li><Link className="dropdown-item" to="/opportunities/join-student-advisor">{t('join-as-student-advisor')}</Link></li>
                  {/* <li><Link className="dropdown-item" to="/opportunities/join-career-advisor">Volunteer as Career Advisor</Link></li> */}
                </ul>
              </li>

              <Link to="/student-interest-form">
                  <button className={`${styles.btn} login`} type="button">{t('get-started')}</button>
              </Link>

            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};