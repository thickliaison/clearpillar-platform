import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from 'styles/BootcampRegister.module.css';

export default function BootcampRegisterSuccess() {
  const { t } = useTranslation('bootcampRegister');

  return (
    <section className={styles.section}>
      <div className={`${styles.container} ${styles.success}`}>
        <h1>{t('success-title')}</h1>
        <p>{t('success-message')}</p>
        <Link to="/" className={`btn ${styles.submitBtn}`}>{t('success-home')}</Link>
      </div>
    </section>
  );
}
