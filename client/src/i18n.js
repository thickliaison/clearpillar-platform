import i18n from 'i18next';
import { initReactI18next  } from 'react-i18next';

const resources = {
  en: {
    home: require('locales/en/home.json'),
    navbar: require('locales/en/navbar.json'),
    footer: require('locales/en/footer.json'),
    about: require('locales/en/about.json'),
    community: require('locales/en/community.json'),
    privacy: require('locales/en/privacy.json'),
    admission: require('locales/en/admission.json'),
    essayAssistance: require('locales/en/essayAssistance.json'),    
    tuition: require('locales/en/tuition.json'),
    roadmap: require('locales/en/roadmap.json'),
    essayBrainstorm: require('locales/en/essayBrainstorm.json'),
    workshop: require('locales/en/workshop.json'),
    business: require('locales/en/business.json'),
    joinLiaison: require('locales/en/joinLiaison.json'),
    joinStrategist: require('locales/en/joinStrategist.json'),
    joinAdvisor: require('locales/en/joinAdvisor.json'),    
  },
  zh: {
    home: require('locales/zh/home.json'),
    navbar: require('locales/zh/navbar.json'),
    footer: require('locales/zh/footer.json'),
    about: require('locales/zh/about.json'),
    community: require('locales/zh/community.json'),
    privacy: require('locales/zh/privacy.json'),
    admission: require('locales/zh/admission.json'),
    essayAssistance: require('locales/zh/essayAssistance.json'),    
    tuition: require('locales/zh/tuition.json'),    
    roadmap: require('locales/zh/roadmap.json'),
    essayBrainstorm: require('locales/zh/essayBrainstorm.json'),
    workshop: require('locales/zh/workshop.json'),
    business: require('locales/zh/business.json'),
    joinLiaison: require('locales/zh/joinLiaison.json'),
    joinStrategist: require('locales/zh/joinStrategist.json'),
    joinAdvisor: require('locales/zh/joinAdvisor.json'),
  },
};

i18n
  .use(initReactI18next ) // passes i18n down to react-i18next
  .init({
    resources,
    lng: "en",
    fallbackLng: 'en',
    ns: ['home', 'navbar', 'footer', 'about', 'community', 'privacy', 'admission', 'essayAssistance', 'tuition', 'roadmap', 'essayBrainstorm', 'roadmap', 'workshop', 'business', 'joinLiaison', 'joinStrategist', 'joinAdvisor'], // list all namespaces (pages)

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
