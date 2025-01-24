import { useTranslation } from 'react-i18next';
import styles from 'styles/AboutUs.module.css'

export default function AboutUs() {
  const { t } = useTranslation('about');

  return (
    <div className={styles.page}>

      {/* Banner img */}
      <section className={styles.hero}>
        <div className={styles.overlay}></div>
      </section>

      {/* About Us */}
      <div className={styles.container}>
        <h1 className={styles.header}>{t('about')}</h1>
        <div className={styles.section}>

          {/* Our Story */}
          <div className={styles.center}>
            <div className={styles["star-container"]}>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h2>{t('our-story')}</h2>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
          <div className={styles["line-margin"]}>
            <hr className={styles.line} />
          </div>
          <p>{t('our-story-content1')}</p>
          <p>{t('our-story-content2')}</p>
          <p>{t('our-story-content3')}</p>
        </div>

        {/* ***IN FUTURE, ADD "TEAM"*** */}

        {/* Our Approach */}
        <div className={styles.section}>
          <div className={styles.center}>
            <div className={styles["star-container"]}>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h2>{t('our-approach')}</h2>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
          <div className={styles["line-margin"]}>
            <hr className={styles.line} />
          </div>
          <p className='mt-2'>{t('our-approach-content1')}</p>
          <p>{t('our-approach-content2')}</p>
        </div>

        {/* Our Iniviatives*/}
        <div className={styles.section}>
          <div className={styles.center}>
            <div className={styles["star-container"]}>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h2>{t('our-initiatives')}</h2>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
          <div className={styles["line-margin"]}>
            <hr className={styles.line} />
          </div>
          <div className="row">
            <div className="col-md-2">
              <div className={styles["initiative-item"]}>
                <div className={styles.icon}>
                  <i className="fa-3x fa-solid fa-user-tie"></i>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className={styles["initiative-text"]}>
                <h3>{t('advisor-specialization')}</h3>
                <p>{t('advisor-specialization-content')}</p>
              </div>
            </div>
            <hr className={styles["initiative-divider"]} />
          </div>
          <div className="row">
            <div className="col-md-2">
              <div className={styles["initiative-item"]}>
                <div className={styles.icon}>
                  <i className="fa-3x fa-solid fa-people-arrows"></i>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className={styles["initiative-text"]}>
                <h3>{t('client-matching')}</h3>
                <p>{t('client-matching-content')}</p>
              </div>
            </div>
            <hr className={styles["initiative-divider"]} />
          </div>
          <div className="row">
            <div className="col-md-2">
              <div className={styles["initiative-item"]}>
                <div className={styles.icon}>
                  <i className="fa-3x fa-solid fa-comment-dots"></i>
                </div>
              </div>
            </div>
            <div className="col-md-10">
              <div className={styles["initiative-text"]}>
                <h3>{t('client-feedback-system')}</h3>
                <p>{t('client-feedback-system-content')}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Our Commitment */}
        <div className={styles.section}>
          <div className={styles.center}>
            <div className={styles["star-container"]}>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
              <h2>{t('our-commitment')}</h2>
              <div className={styles["star-items"]}>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
                <i className="fa-solid fa-star"></i>
              </div>
            </div>
          </div>
          <div className={styles["line-margin"]}>
            <hr className={styles.line} />
          </div>
          <p className='mt-2'>{t('our-commitment-content')}</p>

          <div className="py-5">
            <div className="row g-5">
              <div className="col position-relative">
                <h2 className='text-center'>01</h2>
                <h3>{t('step1')}</h3>
                <p>{t('step1-content')}</p>
                <div className={styles.divider}></div>
              </div>
              <div className="col position-relative">
                <h2 className='text-center'>02</h2>
                <h3>{t('step2')}</h3>
                <p>{t('step2-content')}</p>
                <div className={styles.divider}></div>
              </div>
              <div className="col position-relative">
                <h2 className='text-center'>03</h2>
                <h3>{t('step3')}</h3>
                <p>{t('step3-content')}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};