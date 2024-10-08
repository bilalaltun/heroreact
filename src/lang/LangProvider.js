import React from 'react';
import { IntlProvider } from 'react-intl';
import { useSelector } from 'react-redux';
import { messages } from './messages/messages';

const LangProvider = ({ children }) => {
  const { currentLang } = useSelector((state) => state.lang);
  const fallbackLocale = 'en-US'; // Varsayılan dil
  const locale = currentLang?.locale || fallbackLocale; // Eğer currentLang yoksa fallbackLocale kullanılır
  const localeMessages = messages[locale] || messages[fallbackLocale]; // Eğer çeviri yoksa varsayılan dil kullanılır

  return (
    <IntlProvider locale={locale} messages={localeMessages}>
      {children}
    </IntlProvider>
  );
};



export default LangProvider;
