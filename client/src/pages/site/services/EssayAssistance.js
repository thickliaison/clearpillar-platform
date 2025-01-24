import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from 'styles/Services.module.css'

export default function EssayAssistance() {
    const { t } = useTranslation('essayAssistance');  

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
                    <section className={styles.section}>
                        <h3>{t('why')}</h3>
                        <p>{t('explanation')}</p>

                        <h3>{t('proven')}</h3>
                        <p>{t('we')}</p>
                        <p>{t('here')}</p>

                        <ul>
                            <li><strong>{t('d')}</strong>{t('dd')}</li>
                            <li><strong>{t('e')}</strong>{t('ee')}</li>
                            <li><strong>{t('a')}</strong>{t('aa')}</li>
                            <li><strong>{t('h')}</strong>{t('hh')}</li>
                        </ul>

                        <h3>{t('commitment')}</h3>
                        <p>{t('these')}</p>

                        <h3>{t('unique')}</h3>
                        <p>{t('at')}</p>

                        <h3>{t('trsut')}</h3>
                        <p>{t('when')}</p>

                        <h3>{t('ready')}</h3>
                        <p>{t('reach')}</p>
                    </section>

                    <div className={styles.banner}>
                        <h2>{t('how')}</h2>
                    </div>
                    <section className={styles.section}>
                        <p>{t('essay')}</p>
                        <ul>
                            <li>{t('brainstorm')}</li>
                            <li>{t('develop')}</li>
                            <li>{t('revise')}</li>
                        </ul>
                    </section>

                    <Link to="/student-interest-form" className={`btn ${styles.btn}`}>{t('button')}</Link>
                </div>
            </div>
        </div>
    );
}