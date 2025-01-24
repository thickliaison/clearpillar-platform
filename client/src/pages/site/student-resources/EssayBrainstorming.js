import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import styles from 'styles/EssayBrainstorming.module.css'

export default function EssayBrainstorming() {
  const { t } = useTranslation('essayBrainstorm');

  return (
    <div className={styles.section}>
      <div className={styles.container}>
        <div className={styles["header-encap"]}>
          <div className={styles.stars}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
          <div className={styles["header-content"]}><h1>{t('main-title')}</h1></div>
          <div className={styles.stars}>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
            <i className="fa-solid fa-star"></i>
          </div>
        </div>
        <div className={styles["line-div"]}>
          <hr className={styles.line} />
        </div>

        <div className={styles.content}>
          <div className="row">
            {/* Left Side */}
            <div className="col-md-6">
              <div className={`${styles["left-side"]} d-flex flex-column justify-content-between h-100`}>
                <div>
                  <h3>{t('left-title')}</h3>
                  <p>{t('left-content1')}</p>
                  <p>{t('left-content2')}</p>
                </div>
                <div className="text-center mt-3">
                  <button className={`btn ${styles.btn}`}>
                    <i className="fa-solid fa-pen pe-2"></i>{t('left-button')}
                  </button>
                </div>
              </div>
            </div>

            {/* Right Side */}
            <div className="col-md-6">
              <div className={`${styles["right-side"]} d-flex flex-column justify-content-between h-100`}>
                <div>
                  <h3>{t('right-title')}</h3>
                  <p>{t('right-content')}</p>
                </div>
                <div className="text-center mt-3">
                  <Link to="/student-interest-form" className={`btn ${styles.btn}`}>
                    <i className="fa-solid fa-user-graduate pe-2"></i>{t('right-button')}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
