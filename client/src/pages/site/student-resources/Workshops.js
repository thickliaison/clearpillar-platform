import { Tab, Tabs, Container, Row, Col } from 'react-bootstrap';
import styles from 'styles/Workshops.module.css'
import { useTranslation } from 'react-i18next';

const Workshops = () => {
  const { t } = useTranslation('workshop');

// it might be better to use an API instead, which requires to be set up with Google Developer or something.
// currently these are just the IDs of the shared folders which will have flyers uploaded

  const upcomingEventsID = "1BxDz8waP0mCFDhmJQfDK5UIVEnC6UPp7"
  const pastEventsID = "1hxZWJ89XAgnbR_pv9173XmVmawK4CF23"

  return (
    <div className={styles.wrapper}>
      <Container>
        <Row>
          <Col>
            <h1>{t('title')}</h1>
            <p>{t('title-content')}</p>
            <Tabs defaultActiveKey="current" className={styles.tabs}>
              <Tab eventKey="current" title={t('current')}>
                  <iframe
                    src={`https://drive.google.com/embeddedfolderview?id=${upcomingEventsID}#grid`}
                    width="100%"
                    height="400"
                    title="Upcoming Events"
                  ></iframe>
              </Tab>
              <Tab eventKey="past" title={t('past')}>
                  <iframe
                    src={`https://drive.google.com/embeddedfolderview?id=${pastEventsID}#grid`}
                    width="100%"
                    height="400"
                    title="Past Events"
                  ></iframe>
              </Tab>
            </Tabs>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Workshops;