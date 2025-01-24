import styles from 'styles/Roadmap.module.css'
import { useTranslation } from 'react-i18next';

export default function Timeline() {
    const { t } = useTranslation('roadmap');
    return (
        <section className={styles.section}>
            <div className={styles["header-container"]}>
                <h1>{t('title')}</h1>
                <br />
                <h4>{t('navigate')}</h4>
            </div>
            <div className={styles.container}>
                <div className={styles.item}>
                    <div className={styles.grade}><h4>{t('grade8')}</h4></div>
                    <div className={styles.star}><i className="fa-solid fa-star"></i></div>
                    <div className={styles.checklist}>
                        <ul>
                            <p>{t('academic')}</p>
                            <li>{t('develop')}</li>
                            <p>{t('extra')}</p>
                            <li>{t('explore')}</li>
                            <p>{t('high')}</p>
                            <li>{t('researching')}</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.grade}><h4>{t('grade9')}</h4></div>
                    <div className={styles.star}><i className="fa-solid fa-star"></i></div>
                    <div className={styles.checklist}>
                        <ul>
                            <p>{t('financial')}</p>
                            <li>{t('get')}</li>
                            <p>{t('developement')}</p>
                            <li>{t('strive')}</li>
                            <p>{t('activites')}</p>
                            <li>{t('deepen')}</li>
                            <p>{t('psat')}</p>
                            <li>{t('begin')}</li>
                            <p>{t('career')}</p>
                            <li>{t('exploring')}</li>
                        </ul>
                    </div>
                </div>
                <div className={styles.item}>
                    <div className={styles.grade}><h4>{t('grade11')}</h4></div>
                    <div className={styles.star}><i className="fa-solid fa-star"></i></div>
                    <div className={styles.checklist}>
                        <ul>
                            <p>{t('resume')}</p>
                            <li>{t('build')}</li>
                            <p>{t('college')}</p>
                            <li>{t('research')}</li>
                            <p>{t('sat')}</p>
                            <li>{t('prepare')}</li>
                            <p>{t('app')}</p>
                            <li>{t('ready')}</li>
                            <p>{t('aid')}</p>
                            <li>{t('complete')}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </section>
    );
}
