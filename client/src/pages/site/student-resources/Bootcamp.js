import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import styles from "styles/Bootcamp.module.css";
import { fetchBootcampSessionSegments } from "utils/bootcampSheetData";

// Sessions with full content filled in from the program brief. Sessions not
// listed here still only have a title and render as the simple summary row,
// until their dates/descriptions/speakers are confirmed.
const EXPANDABLE_PARTS = ["part1", "part2"];

// Sessions whose content Rachel edits directly in the Bootcamp Sessions /
// Bootcamp Speakers Google Sheets instead of in code. Maps the part key to
// the sessionNumber used in those sheets.
const SHEET_BACKED_PARTS = { part3: 3 };

export default function Bootcamp() {
  const { t, i18n } = useTranslation("bootcamp");
  const [expandedPart, setExpandedPart] = useState(null);
  const [sheetSegments, setSheetSegments] = useState({});

  const parts = ["part1", "part2", "part3", "part4"];

  const toggleExpanded = (part) => {
    setExpandedPart((prev) => (prev === part ? null : part));
  };

  useEffect(() => {
    Object.entries(SHEET_BACKED_PARTS).forEach(([part, sessionNumber]) => {
      fetchBootcampSessionSegments(sessionNumber)
        .then((segments) => {
          setSheetSegments((prev) => ({ ...prev, [part]: segments }));
        })
        .catch((error) => {
          console.error(`Failed to load ${part} from sheet:`, error);
          setSheetSegments((prev) => ({ ...prev, [part]: null }));
        });
    });
  }, []);

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

        <div className={styles.topCta}>
          <Link
            to="/resources/bootcamp/register"
            className={styles.btn}
          >
            <i className="fa-solid fa-user-plus pe-2"></i>
            {t("register-button")}
          </Link>
        </div>

        <div className={styles.parts}>
          {parts.map((part, index) => {
            const isSheetBacked = part in SHEET_BACKED_PARTS;
            const isExpandable = EXPANDABLE_PARTS.includes(part);
            const isOpen = expandedPart === part;

            if (isSheetBacked) {
              const segments = sheetSegments[part];

              if (!segments) {
                return (
                  <div key={part} className={styles.part}>
                    <span className={styles.partNumber}>{index + 1}</span>
                    <h3>{t(`${part}.title`)}</h3>
                  </div>
                );
              }

              const first = segments[0];
              const last = segments[segments.length - 1];
              const overallTitle = segments.map((s) => s.title).join(" / ");
              const overallShortDescription = segments
                .map((s) => s.shortDescription)
                .filter(Boolean)
                .join(" / ");

              return (
                <div
                  key={part}
                  className={`${styles.partExpanded} ${isOpen ? styles.partExpandedOpen : ""}`}
                >
                  <button
                    type="button"
                    className={styles.partExpandedHeader}
                    onClick={() => toggleExpanded(part)}
                    aria-expanded={isOpen}
                  >
                    <div className={styles.partExpandedTopRow}>
                      <div className={styles.partExpandedHeading}>
                        <span className={styles.partNumber}>{index + 1}</span>
                        <div>
                          <h3>{overallTitle}</h3>
                          <p className={styles.partShortDescription}>
                            {overallShortDescription}
                          </p>
                        </div>
                      </div>
                      <div className={styles.partMeta}>
                        <span>{first.date}</span>
                        <span>
                          {first.startTime} – {last.endTime}
                        </span>
                        <span>{first.location}</span>
                        <i
                          className={`fa-solid fa-chevron-down ${styles.partChevron}`}
                        ></i>
                      </div>
                    </div>
                  </button>

                  {isOpen && (
                    <div className={styles.partExpandedBody}>
                      {segments.map((segment, si) => (
                        <div key={si} className={styles.segmentBlock}>
                          <h4 className={styles.segmentHeading}>
                            {segment.segment
                              ? `${segment.segment}: ${segment.title}`
                              : segment.title}
                          </h4>
                          <p className={styles.partFormat}>
                            {segment.startTime} – {segment.endTime}
                            {segment.language ? ` · ${segment.language}` : ""}
                          </p>

                          {segment.fullDescription.map((paragraph, i) => (
                            <p key={i} className={styles.partParagraph}>
                              {paragraph}
                            </p>
                          ))}

                          {segment.studentsWillLearn.length > 0 && (
                            <>
                              <h4>{t("studentsWillLearnTitle")}</h4>
                              <ul className={styles.partList}>
                                {segment.studentsWillLearn.map((item, i) => (
                                  <li key={i}>{item}</li>
                                ))}
                              </ul>
                            </>
                          )}

                          {segment.speakers.length > 0 && (
                            <>
                              <h4>{t("speakersTitle")}</h4>
                              <div className={styles.speakers}>
                                {segment.speakers.map((speaker, i) => (
                                  <div key={i} className={styles.speakerCard}>
                                    <div className={styles.speakerCardHeader}>
                                      <div
                                        className={
                                          styles.speakerPhotoPlaceholder
                                        }
                                      />
                                      <div>
                                        <h5>{speaker.name}</h5>
                                        <p className={styles.speakerRole}>
                                          {speaker.role}
                                        </p>
                                      </div>
                                    </div>
                                    {speaker.bio.map((paragraph, j) => (
                                      <p key={j} className={styles.speakerBio}>
                                        {paragraph}
                                      </p>
                                    ))}
                                  </div>
                                ))}
                              </div>
                            </>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              );
            }

            if (!isExpandable) {
              return (
                <div key={part} className={styles.part}>
                  <span className={styles.partNumber}>{index + 1}</span>
                  <h3>{t(`${part}.title`)}</h3>
                </div>
              );
            }

            return (
              <div
                key={part}
                className={`${styles.partExpanded} ${isOpen ? styles.partExpandedOpen : ""}`}
              >
                <button
                  type="button"
                  className={styles.partExpandedHeader}
                  onClick={() => toggleExpanded(part)}
                  aria-expanded={isOpen}
                >
                  <div className={styles.partExpandedTopRow}>
                    <div className={styles.partExpandedHeading}>
                      <span className={styles.partNumber}>{index + 1}</span>
                      <div>
                        <h3>{t(`${part}.title`)}</h3>
                        <p className={styles.partShortDescription}>
                          {t(`${part}.shortDescription`)}
                        </p>
                      </div>
                    </div>
                    <div className={styles.partMeta}>
                      <span>{t(`${part}.date`)}</span>
                      <span>{t(`${part}.time`)}</span>
                      <span>{t(`${part}.location`)}</span>
                      <i
                        className={`fa-solid fa-chevron-down ${styles.partChevron}`}
                      ></i>
                    </div>
                  </div>
                </button>

                {isOpen && (
                  <div className={styles.partExpandedBody}>
                    <p className={styles.partFormat}>{t(`${part}.format`)}</p>

                    {t(`${part}.fullDescription`, {
                      returnObjects: true,
                    }).map((paragraph, i) => (
                      <p key={i} className={styles.partParagraph}>
                        {paragraph}
                      </p>
                    ))}

                    {i18n.exists(`${part}.dataTopics`, { ns: "bootcamp" }) && (
                      <>
                        <h4>{t(`${part}.dataTopicsTitle`)}</h4>
                        <ul className={styles.partList}>
                          {t(`${part}.dataTopics`, {
                            returnObjects: true,
                          }).map((topic, i) => (
                            <li key={i}>{topic}</li>
                          ))}
                        </ul>
                      </>
                    )}

                    <h4>{t(`${part}.studentsWillLearnTitle`)}</h4>
                    <ul className={styles.partList}>
                      {t(`${part}.studentsWillLearn`, {
                        returnObjects: true,
                      }).map((item, i) => (
                        <li key={i}>{item}</li>
                      ))}
                    </ul>

                    {i18n.exists(`${part}.guidedActivity`, {
                      ns: "bootcamp",
                    }) && (
                      <>
                        <h4>{t(`${part}.guidedActivityTitle`)}</h4>
                        <p className={styles.partParagraph}>
                          {t(`${part}.guidedActivity`)}
                        </p>
                      </>
                    )}

                    <h4>{t(`${part}.speakersTitle`)}</h4>
                    <div className={styles.speakers}>
                      {t(`${part}.speakers`, { returnObjects: true }).map(
                        (speaker, i) => (
                          <div key={i} className={styles.speakerCard}>
                            <div className={styles.speakerCardHeader}>
                              <div className={styles.speakerPhotoPlaceholder} />
                              <div>
                                <h5>{speaker.name}</h5>
                                <p className={styles.speakerRole}>
                                  {speaker.role}
                                </p>
                              </div>
                            </div>
                            {speaker.bio.map((paragraph, j) => (
                              <p key={j} className={styles.speakerBio}>
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        ),
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className={styles.cta}>
          <Link
            to="/resources/bootcamp/register"
            className={styles.btn}
          >
            <i className="fa-solid fa-user-plus pe-2"></i>
            {t("register-button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
