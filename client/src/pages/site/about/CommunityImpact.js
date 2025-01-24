import { useTranslation } from 'react-i18next';
import styles from "styles/CommunityImpact.module.css"

export default function CommunityImpact() {
    const { t } = useTranslation('community');

    return (
        <div className={styles.page}>
            <div className={styles.container}>
                <section className={styles.section}>
                    <h2>{t('community')}</h2>
                    <p>{t('community-content')}</p>
                </section>

                <section className={styles.section}>
                    <h2>{t('reserve')}</h2>
                    <p>{t('reserve-content1')}<a href='https://www.jaxconnect.org/'>JaxConnect</a>{t('reserve-content2')}</p>
                </section>

                <section className={styles.section}>
                    <h2>{t('impact')}</h2>
                    <div>
                        <p>
                            <strong>{t('impact-content1-strong')}</strong>
                            {t('impact-content1')}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>{t('impact-content2-strong')}</strong>
                            {t('impact-content2')}
                        </p>
                    </div>
                    <div>
                        <p>
                            <strong>{t('impact-content3-strong')}</strong>
                            {t('impact-content3')}
                        </p>
                    </div>
                </section>

                <section className={styles.section}>
                    <h2>{t('connection')}</h2>
                    <p>{t('connection-content1')}</p>
                    <p>{t('connection-content2')}</p>
                </section>

                {/* <section className={styles.section}>
                    <h2>{t('faq')}</h2>
                    <p>{t('determined')}</p>
                </section> */}
            </div>
        </div>
    );
}
