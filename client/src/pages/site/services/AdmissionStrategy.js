import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from 'styles/Services.module.css'
import stylesAdmission from 'styles/ServicesAdmissions.module.css'

export default function AdmissionStrategy() {
    const { t } = useTranslation('admission'); 

    return (
        <div>
            {/* admission strategy */}
            <div className={styles.page}>
                <div className={styles.container}>

                    <div className={styles.header} >
                        <h1>{t('title')}</h1>
                    </div>
                    <div className={styles.content}>
                        <section className={styles.section}>
                            <h3 className={styles.motto}>{t('motto')}</h3>
                            <p>{t('paragraph')}</p>
                        </section>
                        <div className={styles.banner}>
                            <h2>{t('what')}</h2>
                        </div>
                        <section className={styles.section}>
                            <h3>{t('personal')}</h3>
                            <p>{t('network')}</p>
                            <p>{t('liaison')}</p>
                        </section>

                        <div className={stylesAdmission.notepad}>
                            <h4>{t('insider')}</h4>
                            <p>{t('gain')}</p>
                            <h4>{t('tailored')}</h4>
                            <p>{t('receive')}</p>
                            <h4>{t('effecient')}</h4>
                            <p>{t('our')}</p>
                        </div>

                        <Link to="/student-interest-form" className={`btn ${styles.btn}`}>{t('button')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}