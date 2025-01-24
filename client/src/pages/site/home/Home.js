import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import CollegesAd from '@home/CollegesAd';
import styles from 'styles/Home.module.css'

export default function Home() {
  /* flipping cards */
  const [flipped, setFlipped] = useState({
    pillar1: false,
    pillar2: false,
    pillar3: false,
  });

  const handleFlip = (card) => {
    setFlipped({
      ...flipped,
      [card]: !flipped[card],
    });
  };

  const { t } = useTranslation('home'); // specified namespace

  return (
    <div className="fullscreen-div">
      {/* Hero Header Section */}
      <section className={`${styles.hero} py-5`}>
        <div className={styles.overlay}></div>
        <div className={`${styles.container} container`}>
          <h1 className={styles["empower-title"]}>
            {t('title1')}<br />{t('title2')}
          </h1>
          <br />
          <br />
          <p className="lead mb-2">{t('description1')}</p>
          <p className="lead mb-4">{t('description2')}</p>
          <Link to="/student-interest-form" className={`${styles.btn} btn mt-4`}>{t('button')}</Link>
        </div>
      </section>

      {/* Experts Section */}
      <div className={styles.experts}>
        <section className='text-center'>
          <div className={`${styles.container} container`}>
            <h2>{t('education')}</h2>
            <p>{t('education-content')}</p>
          </div>
        </section>

        {/* Step 1, 2, 3 */}
        <div className="container text-center py-5">
          <div className="row g-5">
            <div className="col position-relative">
              <h2 className="pb-2">01</h2>
              <p>{t('step1')}</p>
              <div className={styles.divider}></div>
            </div>
            <div className="col position-relative">
              <h2 className="pb-2">02</h2>
              <p>{t('step2')}</p>
              <div className={styles.divider}></div>
            </div>
            <div className="col position-relative">
              <h2 className="pb-2">03</h2>
              <p>{t('step3')}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Our Pillars */}
      <section className={`text-center py-5 ${styles.pillars}`}>
        <div className={`${styles.container} container`}>
          <div className={styles.center}>
            <div className={styles["star-container"]}>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h2>{t('our-pillars')}</h2>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
          <p><i>{t('click')}</i></p>
          <div className="row">
            <div className="col-md-4">
              <div className={`${styles["feature-box"]} ${flipped.pillar1 ? styles.flipped : ''}`} onClick={() => handleFlip('pillar1')}>
                <div className={styles["feature-box-inner"]}>
                  <div className={styles["feature-box-front"]}>
                    <h3>{t('card1')}</h3>
                  </div>
                  <div className={styles["feature-box-back"]}>
                    <p>{t('card1-flipped1')}</p>
                    <p>{t('card1-flipped2')}</p>
                    <p>{t('card1-flipped3')}</p>
                    <p>{t('card1-flipped4')}</p>
                    <Link to="/services/admissions-strategy">{t('click')}</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`${styles["feature-box"]} ${flipped.pillar2 ? styles.flipped : ''}`} onClick={() => handleFlip('pillar2')}>
                <div className={styles["feature-box-inner"]}>
                  <div className={styles["feature-box-front"]}>
                    <h3>{t('card2')}</h3>
                  </div>
                  <div className={styles["feature-box-back"]}>
                    <p>{t('card2-flipped1')}</p>
                    <p>{t('card2-flipped2')}</p>
                    <p>{t('card2-flipped2')}</p>
                    <Link to="/services/essay-assistance">{t('click')}</Link>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className={`${styles["feature-box"]} ${flipped.pillar3 ? styles.flipped : ''}`} onClick={() => handleFlip('pillar3')}>
                <div className={styles["feature-box-inner"]}>
                  <div className={styles["feature-box-front"]}>
                    <h3>{t('card3')}</h3>
                  </div>
                  <div className={styles["feature-box-back"]}>
                    <p>{t('card3-flipped1')}</p>
                    <p>{t('card3-flipped2')}</p>
                    <p>{t('card3-flipped3')}</p>
                    <Link to="/services/tuition-planning">{t('click')}</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Scrolling Colleges*/}
      <CollegesAd />

      <section className={`${styles.join} py-5`}>
        <div className={`${styles.container} container mb-5`}>
          <Link to="/student-interest-form" className={`${styles.btn} btn mt-4`}>{t('button')}</Link>
        </div>
      </section>
    </div>
  );
};
