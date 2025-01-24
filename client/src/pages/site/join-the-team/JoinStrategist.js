import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import styles from 'styles/JoinTheTeam.module.css'

export default function JoinSpecialist() {
    const { t } = useTranslation('joinStrategist');

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
                    <p>{t('title-content')}</p>

                    <div>
                        <h3>{t('available')}</h3>
                        <ol>
                            <li>{t('1-title')}</li>
                            <ul>
                                <li><b>{t('res')}</b>{t('1-res')}</li>
                                <li><b>{t('goal')}</b>{t('1-goal')}</li>
                            </ul>
                            <li>{t('2-title')}</li>
                            <ul>
                                <li><b>{t('res')}</b>{t('2-res')}</li>
                                <li><b>{t('goal')}</b>{t('2-goal')}</li>
                            </ul>
                            <li>{t('3-title')}</li>
                            <ul>
                                <li><b>{t('res')}</b>{t('3-res')}</li>
                                <li><b>{t('goal')}</b>{t('3-goal')}</li>
                            </ul>
                            <li>{t('4-title')}</li>
                            <ul>
                                <li><b>{t('res')}</b>{t('4-res')}</li>
                                <li><b>{t('goal')}</b>{t('4-goal')}</li>
                            </ul>
                            <li>{t('5-title')}</li>
                            <ul>
                                <li><b>{t('res')}</b>{t('5-res')}</li>
                                <li><b>{t('goal')}</b>{t('5-goal')}</li>
                            </ul>
                            <li>{t('6-title')}</li>
                            <ul>
                                <li><b>{t('res')}</b>{t('6-res')}</li>
                                <li><b>{t('goal')}</b>{t('6-goal')}</li>
                            </ul>
                            <li>{t('7-title')}</li>
                            <ul>
                                <li><b>{t('res')}</b>{t('7-res')}</li>
                                <li><b>{t('goal')}</b>{t('7-goal')}</li>
                            </ul>
                        </ol>
                    </div>

                    <hr />

                    <div>
                        <h2>{t('network')}</h2>
                        <p>{t('network-content')}</p>
                        <ul>
                            <li><b>{t('network1-bold')}</b>{t('network1')}</li>
                            <li><b>{t('network2-bold')}</b>{t('network2')}</li>
                            <li><b>{t('network3-bold')}</b>{t('network3')}</li>
                            <li><b>{t('network4-bold')}</b>{t('network4')}</li>
                            <li><b>{t('network5-bold')}</b>{t('network5')}</li>
                        </ul>
                    </div>

                    <hr />

                    <div>
                        <h3>{t('why')}</h3>
                        <div className="row">
                            <div className="col-md-5">
                                <div className={`${styles["feature-box"]} ${flipped.join1 ? styles.flipped : ''}`} onClick={() => handleFlip('join1')}>
                                    <div className={styles["feature-box-inner"]}>
                                        <div className={styles["feature-box-front"]}>
                                            <h3>{t('card1')}</h3>
                                        </div>
                                        <div className={styles["feature-box-back"]}>
                                            <p>{t('card1-flipped')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className={`${styles["feature-box"]} ${flipped.join2 ? styles.flipped : ''}`} onClick={() => handleFlip('join2')}>
                                    <div className={styles["feature-box-inner"]}>
                                        <div className={styles["feature-box-front"]}>
                                            <h3>{t('card2')}</h3>
                                        </div>
                                        <div className={styles["feature-box-back"]}>
                                            <p>{t('card2-flipped')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className={`${styles["feature-box"]} ${flipped.join3 ? styles.flipped : ''}`} onClick={() => handleFlip('join3')}>
                                    <div className={styles["feature-box-inner"]}>
                                        <div className={styles["feature-box-front"]}>
                                            <h3>{t('card3')}</h3>
                                        </div>
                                        <div className={styles["feature-box-back"]}>
                                            <p>{t('card3-flipped')}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-5">
                                <div className={`${styles["feature-box"]} ${flipped.join4 ? styles.flipped : ''}`} onClick={() => handleFlip('join4')}>
                                    <div className={styles["feature-box-inner"]}>
                                        <div className={styles["feature-box-front"]}>
                                            <h3>{t('card4')}</h3>
                                        </div>
                                        <div className={styles["feature-box-back"]}>
                                            <p>{t('card4-flipped')}</p>
                                        </div>
                                    </div>
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