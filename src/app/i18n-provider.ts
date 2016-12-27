import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID} from '@angular/core';

export function getTranslationProviders(): Object[]{
  //Get the locale from browser
  let locale = detectLocale(['ru', 'uk', 'tr'], 'en');

  //Load messages by webpack
  let translations = {
    'ru': require('./locale/messages.ru.xlf'),
    'uk': require('./locale/messages.uk.xlf'),
    'tr': require('./locale/messages.tr.xlf')
  };

  //No locale, no messages, or en: no translation providers
  if((!locale || locale === 'en') && !translations[locale]){
    return [];
  }
  else {
    return[
      {provide: TRANSLATIONS, useValue: translations[locale]},
      {provide: TRANSLATIONS_FORMAT, useValue: 'xlf'},
      {provide: LOCALE_ID, useValue: locale}
    ];
  }
}

//Detected locale from browser
//Pick one from list or return base.

//@param available
//@param base
//@return {string}

function detectLocale( available: string[], base: string){
  let w: any = window;
  let language = sessionStorage.getItem('locale') || w.navigator.language;
  if(language.indexOf('-') !== -1){
    language = language.split('-')[0];
  }
  if(language.indexOf('_') !== -1){
    language = language.split('_')[0];
  }
  if(language && available.indexOf(language) !== -1){
    return language;
  }
  else{
    return base;
  }
}

