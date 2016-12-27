import { TRANSLATIONS, TRANSLATIONS_FORMAT, LOCALE_ID} from '@angular/core';

export function getTranslationProviders(): Object[]{
  //Get the locale from browser
  let locale = detectLocale(['ru', 'uk', 'tr'], 'en');

  //No locale, no messages, or en: no translation providers
  if((!locale || locale === 'en')){
    return [];
  }
  else {
    let translate = null;
    switch (locale) {
      case 'ru':
        translate = require('./locale/messages.ru.xlf');
        break;
      case 'tr':
        translate = require('./locale/messages.tr.xlf');
        break;
      case 'uk':
        translate = require('./locale/messages.uk.xlf');
        break;
      default:
        break;
    }
    return[
      {provide: TRANSLATIONS, useValue: translate},
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

