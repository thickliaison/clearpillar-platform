import React from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import studentAdvisorImage from 'images/gradstudent.jpeg';
import styles from 'styles/JoinTheTeam.module.css'

export default function JoinStudentAdvisor() {
    const { t } = useTranslation('joinAdvisor'); 
    return (
        <div className={styles.page}>
            <div className={styles.section}>
                <div className={styles.content}>
                    <h2>{t('title')}</h2>
                    <p>{t('paragraph')}</p>

                    <div className={styles.info}>
                        <div className={styles.text}>
                            <h3>{t('what')}</h3>
                            <p>{t('answer')}</p>
                        </div>
                        <div className={styles.image}>
                            <img src={studentAdvisorImage} alt="Student Advisor" />
                        </div>
                    </div>

                    <div className={styles.notepad}>
                        <h3>{t('learn')}</h3>
                        <ul>
                            <li><strong>{t('learn1-strong')}</strong>{t('learn1')}</li>
                            <li><strong>{t('learn2-strong')}</strong>{t('learn2')}</li>
                            <li><strong>{t('learn3-strong')}</strong>{t('learn3')}</li>
                            <li><strong>{t('learn4-strong')}</strong>{t('learn4')}</li>
                            <li><strong>{t('learn5-strong')}</strong>{t('learn5')}</li>
                        </ul>
                    </div>

                    <h3>{t('how')}</h3>
                    <ol>
                        <li><strong>{t('how1-strong')}</strong>{t('how1')}</li>
                        <li><strong>{t('how2-strong')}</strong>{t('how2')}</li>
                        <li><strong>{t('how3-strong')}</strong>{t('how3')}</li>
                        <li><strong>{t('how4-strong')}</strong>{t('how4')}</li>
                    </ol>
                    <p>{t('our')}</p>

                    <h3>{t('join')}</h3>

                    <h4>{t('why')}</h4>
                    <ul>
                        <li><strong>{t('why1-strong')}</strong>{t('why1')}</li>
                        <li><strong>{t('why2-strong')}</strong>{t('why2')}</li>
                        <li><strong>{t('why3-strong')}</strong>{t('why3')}</li>
                        <li><strong>{t('why4-strong')}</strong>{t('why4')}</li>
                    </ul>

                    <p><strong>{t('difference')}</strong></p>

                    <div className={styles.container}>
                        <Link to="/opportunities/application-form" className={`btn ${styles.btn}`}>{t('button')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}