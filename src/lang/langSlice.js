import { createSlice } from '@reduxjs/toolkit';

export const languages = [
  { code: 'EN', locale: 'en-US', direction: 'ltr' },
  { code: 'ES', locale: 'es-ES', direction: 'ltr' },
  { code: 'DE', locale: 'de-DE', direction: 'ltr' },
  { code: 'TR', locale: 'tr-TR', direction: 'ltr' },  // TR dilini ekledik
];

// Tarayıcı dilini al
const navigatorLang = (navigator.languages && navigator.languages[0]) || navigator.language || navigator.userLanguage;
console.log('Tarayıcı dili:', navigatorLang);  // Tarayıcı dilini kontrol ediyoruz

// Belirtilen dil kodunu veya varsayılan dili bul
const findOrDefault = (key) => {
  return languages.find((x) => x.locale === key || x.code === key) || languages[0];
};

// Eğer tarayıcı dili Türkçe ise varsayılan dil olarak Türkçe'yi seç
const defaultLang = navigatorLang.startsWith('tr') ? findOrDefault('tr-TR') : findOrDefault(navigatorLang);
console.log('Varsayılan dil:', defaultLang);  // TR dilinin doğru seçilip seçilmediğini kontrol edin

const initialState = {
  languages,
  currentLang: defaultLang,
};

const langSlice = createSlice({
  name: 'lang',
  initialState,
  reducers: {
    changeLang(state, action) {
      state.currentLang = findOrDefault(action.payload);
    },
  },
});

export const { changeLang } = langSlice.actions;
const langReducer = langSlice.reducer;

export default langReducer;
