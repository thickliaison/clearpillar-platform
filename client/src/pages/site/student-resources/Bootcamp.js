import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "styles/Bootcamp.module.css";

export default function Bootcamp() {
  const { t } = useTranslation("bootcamp");

  const parts = ["part1", "part2", "part3", "part4"];

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h1>{t("title")}</h1>
          <p className={styles.subtitle}>{t("subtitle")}</p>
        </div>

        <div className={styles.communitySupport}>
          <h2>{t("community-support.title")}</h2>
          <p>{t("community-support.paragraph1")}</p>
          <p>{t("community-support.paragraph2")}</p>
          <hr className={styles.communitySupportDivider} />
          <p>{t("community-support.paragraph3")}</p>
        </div>

        <div className={styles.parts}>
          {parts.map((part, index) => (
            <div key={part} className={styles.part}>
              <span className={styles.partNumber}>{index + 1}</span>
              <h3>{t(`${part}.title`)}</h3>
            </div>
          ))}
        </div>

        <div className={styles.cta}>
          <Link
            to="/resources/bootcamp/register"
            className={`btn ${styles.btn}`}
          >
            <i className="fa-solid fa-user-plus pe-2"></i>
            {t("register-button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
