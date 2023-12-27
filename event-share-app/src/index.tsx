import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux'; //Redux
import { store } from './store/index'

import i18n from './i18n'; //Internationalization
import { I18nextProvider } from 'react-i18next'; //Internationalization

import * as serviceWorkerRegistration from './serviceWorkerRegistration'; //Progressive Web Application

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <I18nextProvider i18n={i18n}> {/*Internationalization*/}
      <App />
      </I18nextProvider>
    </Provider>
  </React.StrictMode>
);

serviceWorkerRegistration.register(); //Invoking register function for PWA

reportWebVitals();
