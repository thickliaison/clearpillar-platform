import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from 'styles/JoinTheTeam.module.css'

export default function JoinLiaison() {
    const { t } = useTranslation('joinLiaison');

    const [flipped, setFlipped] = useState({
        join1: false,
        join2: false,
        join3: false,
        join4: false
    });

    const handleFlip = (card) => {
        setFlipped({
            ...flipped,
            [card]: !flipped[card],
        });
    };

    return (
        <div className={styles.page}>
            <div className={styles.section}>
                <div className={styles.content}>
                    <h2>{t('title')}</h2>
                    <p>{t('title-content1')}</p>
                    <p>{t('title-content2')}</p>

                    <div className={styles.info}>
                        <div className={styles.text}>
                            <h3>{t('who')}</h3>
                            <p>{t('answer')}</p>
                        </div>
                    </div>

                    <div>
                        <h3>{t('why')}</h3>
                        <div className="row">
                            <div className="col-md-4">
                                <div className={`${styles["feature-box"]} ${flipped.join1 ? styles.flipped : ''}`} onClick={() => handleFlip('join1')}>
                                    <div className={styles["feature-box-inner"]}>
                                        <div className={styles["feature-box-front"]}>
                                            <h3>{t('card1')}</h3>
                                        </div>
                                        <div className={styles["feature-box-back"]}>
                                            <p>{t('card1-flipped1')}</p>
                                            <p>{t('card1-flipped2')}</p>
                                            <p>{t('card1-flipped3')}</p>
                                            <p>{t('card1-flipped4')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={`${styles["feature-box"]} ${flipped.join2 ? styles.flipped : ''}`} onClick={() => handleFlip('join2')}>
                                    <div className={styles["feature-box-inner"]}>
                                        <div className={styles["feature-box-front"]}>
                                            <h3>{t('card2')}</h3>
                                        </div>
                                        <div className={styles["feature-box-back"]}>
                                            <p>{t('card2-flipped1')}</p>
                                            <p>{t('card2-flipped2')}</p>
                                            <p>{t('card2-flipped3')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className={`${styles["feature-box"]} ${flipped.join3 ? styles.flipped : ''}`} onClick={() => handleFlip('join3')}>
                                    <div className={styles["feature-box-inner"]}>
                                        <div className={styles["feature-box-front"]}>
                                            <h3>{t('card3')}</h3>
                                        </div>
                                        <div className={styles["feature-box-back"]}>
                                            <p>{t('card3-flipped1')}</p>
                                            <p>{t('card3-flipped2')}</p>
                                            <p>{t('card3-flipped3')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mb-5 mt-5'>
                        <h2 className="text-center">{t('req')}</h2>
                        <div className="container mt-5">
                            <div className="row g-5">
                                <div className="col position-relative">
                                    <h1 className="text-center">01</h1>
                                    <h3 className="text-center">{t('req-step1-title')}</h3>
                                    <p>{t('req-step1')}</p>
                                    <div className={styles.divider}></div>
                                </div>
                                <div className="col position-relative">
                                    <h1 className="text-center">02</h1>
                                    <h3 className="text-center">{t('req-step2-title')}</h3>
                                    <p>{t('req-step2')}</p>
                                    <div className={styles.divider}></div>
                                </div>
                                <div className="col position-relative">
                                    <h1 className="text-center">03</h1>
                                    <h3 className="text-center">{t('req-step3-title')}</h3>
                                    <p>{t('req-step3')}</p>
                                    <div className={styles.divider}></div>
                                </div>
                                <div className="col position-relative">
                                    <h1 className="text-center">04</h1>
                                    <h3 className="text-center">{t('req-step4-title')}</h3>
                                    <p>{t('req-step4')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='mt-5'>
                        <h2 className="text-center">{t('res')}</h2>
                        <div className="container mt-5">
                            <div className="row g-5">
                                <div className="col position-relative">
                                    <h1 className="text-center">01</h1>
                                    <h3 className="text-center">{t('res-step1-title')}</h3>
                                    <p>{t('res-step1')}</p>
                                    <div className={styles.divider}></div>
                                </div>
                                <div className="col position-relative">
                                    <h1 className="text-center">02</h1>
                                    <h3 className="text-center">{t('res-step2-title')}</h3>
                                    <p>{t('res-step2')}</p>
                                    <div className={styles.divider}></div>
                                </div>
                                <div className="col position-relative">
                                    <h1 className="text-center">03</h1>
                                    <h3 className="text-center">{t('res-step3-title')}</h3>
                                    <p>{t('res-step3')}</p>
                                    <div className={styles.divider}></div>
                                </div>
                                <div className="col position-relative">
                                    <h1 className="text-center">04</h1>
                                    <h3 className="text-center">{t('res-step4-title')}</h3>
                                    <p>{t('res-step4')}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <h3>{t('how')}</h3>
                    <ol>
                        <li><strong>{t('how1-strong')}</strong> {t('how1-content')}</li>
                        <li><strong>{t('how2-strong')}</strong> {t('how2-content')}</li>
                        <li><strong>{t('how3-strong')}</strong> {t('how3-content')}</li>
                    </ol>

                    <h3>{t('ready')}</h3>
                    <p>{t('ready-content')}</p>

                    <p><b>{t('ending')}</b></p>

                    <div className={styles.container}>
                        <Link to="/opportunities/application-form" className={`btn ${styles.btn}`}>{t('button')}</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}