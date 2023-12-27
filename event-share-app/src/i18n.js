import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import HttpAPI from 'i18next-http-backend';

i18n.use(HttpAPI)

  .use(initReactI18next)

  .init({
    lng: 'en',
    fallbackLng: 'en',
    ns: ['common'],
    backend: {
        loadPath: '/i18n/{{lng}}/{{ns}}.json',
    },
    debug: true,

    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
    }
  });


export default i18n;