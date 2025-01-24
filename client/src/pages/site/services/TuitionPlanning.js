import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from 'styles/Services.module.css'

export default function TuitionPlanning() {
    const { t } = useTranslation('tuition'); 
    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <div className={styles.header}>
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
                        <h3>{t('expert')}</h3>
                        <p>{t('planning')}</p>
                    </section>
                    <section className={styles.section}>
                        <h3>{t('your')}</h3>
                        <p>{t('liaison')}</p>
                    </section>
                    <section className={styles.section}>
                        <h3>{t('css')}</h3>
                        <p>{t('detailed')}</p>
                    </section>
                    <Link to="/student-interest-form" className={`btn ${styles.btn}`}>{t('button')}</Link>
                </div>
            </div>
        </div>
    );
}