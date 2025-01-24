import qrCH from 'images/qr_ch.JPG';
import qrEng from 'images/qr_eng.JPG';
import { useTranslation } from 'react-i18next';

export default function Footer() {
  const { i18n, t } = useTranslation('footer');
  const showQR = () => {
    if (i18n.language === "en") {
      return (
        <div>
          <img src={qrEng} alt="English QR Code" width="100" height="100"></img>
        </div>
      )
    } else {
      return (
        <div>
          <img src={qrCH} alt="Chinese QR Code" width="100" height="100"></img>
        </div>

      )
    }
  }

  return (
    <footer className="footer py-4 mt-auto">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <h5>ClearPillar</h5>
            <p>{t('support')}</p>
          </div>
          <div className="col-md-4">
            <h5>{t('quick-links')}</h5>
            <ul className="list-unstyled">
              <li><a href="/">{t('home')}</a></li>
              <li><a href="/about-us">{t('about')}</a></li>
              <li><a href="/services/admissions-strategy">{t('services')}</a></li>
              <li><a href="/opportunities/business-model">{t('join-the-team')}</a></li>
            </ul>
          </div>
          <div className="col-md-4">
            <h5>{t('contact')}</h5>
            <p>{t('email')}: info@clearpillar.us</p>
            <p>{t('phone')}: +1 (347) 400-4166</p>
            <br />
            <div className="qr-codes">
              <p>{t('scan')}</p>
              {showQR()}
            </div>
            <h5>{t('social-media')}</h5>
            <div className="social-media-icons">
              <a href="https://www.linkedin.com/showcase/clearpillar/" target="_blank" rel="noreferrer noopener" className="me-3">
                <i className="fab fa-linkedin-in"></i>
              </a>
              {/* <a href="/" target="_blank" className="me-3">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="/" target="_blank" className="me-3">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="/" target="_blank" className="me-3">
                <i className="fab fa-twitter"></i>
              </a> */}
            </div>
          </div>
        </div>
        <div className="text-center mt-3">
          <p>&copy; {t('copyright')}</p>
        </div>
      </div>
    </footer>
  );
};