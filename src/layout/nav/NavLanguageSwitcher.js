import React, { useEffect } from 'react';
import { Dropdown } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
import { changeLang } from 'lang/langSlice';
import { layoutShowingNavMenu } from 'layout/layoutSlice';

const MENU_NAME = 'NavLanguageSwitcher';

const NavLanguageSwitcher = () => {
  const dispatch = useDispatch();

  const {
    behaviourStatus: { behaviourHtmlData },
    attrMobile,
    attrMenuAnimate,
  } = useSelector((state) => state.menu);
  
  const { color } = useSelector((state) => state.settings);
  const { showingNavMenu } = useSelector((state) => state.layout);
  const { languages, currentLang } = useSelector((state) => state.lang);
  const defaultLang = useSelector((state) => state.lang.currentLang);

  // Dilleri ve güncel dili kontrol edelim
  console.log('Languages:', languages);
  console.log('Current Language:', currentLang);

  // Tarayıcı diliyle varsayılan dilin eşleştiğinden emin olalım
  useEffect(() => {
    if (currentLang.code !== defaultLang.code) {
      dispatch(changeLang(defaultLang.code));
    }
  }, [dispatch, defaultLang, currentLang]);

  // Dil değiştirme fonksiyonu
  const onSelectLang = (code) => {
    console.log(`Dil seçildi: ${code}`);  // Seçilen dili kontrol et
    dispatch(changeLang(code));
  };

  // Dropdown menüsünü açma/kapama
  const onToggle = (status, event) => {
    if (event && event.stopPropagation) event.stopPropagation();
    else if (event && event.originalEvent && event.originalEvent.stopPropagation)
      event.originalEvent.stopPropagation();
    
    dispatch(layoutShowingNavMenu(status ? MENU_NAME : ''));
  };

  useEffect(() => {
    dispatch(layoutShowingNavMenu(''));
    // eslint-disable-next-line
  }, [attrMenuAnimate, behaviourHtmlData, attrMobile, color]);

  return (
    <div className="language-switch-container">
      <Dropdown onToggle={onToggle} show={showingNavMenu === MENU_NAME} align="end">
        <Dropdown.Toggle
          variant="empty"
          className={classNames('language-button', {
            show: showingNavMenu === MENU_NAME,
          })}
        >
          {currentLang.code} {/* Mevcut dili gösteriyoruz */}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          {languages.map((lang) => (
            <Dropdown.Item key={lang.locale} onClick={() => onSelectLang(lang.code)}>
              {lang.code} {/* Dil kodunu gösteriyoruz */}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </div>
  );
};

export default React.memo(NavLanguageSwitcher);
