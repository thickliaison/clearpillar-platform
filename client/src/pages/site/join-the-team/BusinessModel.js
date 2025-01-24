import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import businessModelImage from 'images/businessModel.png'
import styles from 'styles/BussinessModel.module.css'

export default function BusinessModel() {
    const { t } = useTranslation('business');

    return (
        <div className={styles.container}>
            <div className={styles.section}>
                <h1 className='mt-5'>{t('title')}</h1>
                <p>{t('title-content')}</p>
            </div>

            <div className={styles.center}>
                    <Link to="/opportunities/application-form" className={`${styles.btn} btn mb-5`}>{t('button')}</Link>
            </div>

            <div className={styles.section}>
                <img src={businessModelImage} alt='business model'></img>
            </div>

            <div className={styles.section}>
                <h2>{t('target')}</h2>
                <p className={styles.center}>{t('target-content')}</p>
            </div>

            <div className={styles.section}>
                <h2>{t('services')}</h2>
                <div>
                    <ul>
                        <li>{t('services1')}</li>
                        <li>{t('services2')}</li>
                        <li>{t('services3')}</li>
                        <li>{t('services4')}</li>
                        <li>{t('services5')}</li>
                        <li>{t('services6')}</li>
                        <li>{t('services7')}</li>
                        <li>{t('services8')}</li>
                        <li>{t('services9')}</li>
                        <li>{t('services10')}</li>
                        <li>{t('services11')}</li>
                    </ul>
                </div>
            </div>

            <div className={styles.section}>
                <h2>{t('core')}</h2>
                <p>{t('core-content')}</p>
                <ol>
                    <li>{t('team1')}</li>
                    <li>{t('team2')}</li>
                    <li>{t('team3')}</li>
                    <li>{t('team4')}</li>
                    <li>{t('team5')}</li>
                </ol>
            </div>

            <div className={styles.section}>
                <h1>{t('motto')} <strong>{t('motto-content-strong')}</strong></h1>
                <p className={styles.center}>{t('motto-content')}<br />{t('motto-content2')}</p>
                <div className={styles.center}>
                    <Link to="/opportunities/application-form" className={`${styles.btn} btn mt-5`}>{t('button')}</Link>
                </div>
            </div>
        </div>
    );
}