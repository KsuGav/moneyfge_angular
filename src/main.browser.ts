/*
 * Angular bootstraping
 */
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { decorateModuleRef } from './app/environment';
import { bootloader } from '@angularclass/hmr';

import { getTranslationProviders } from './app/i18n-provider';
/*
 * App Module
 * our top level module that holds all of our components
 */
import { AppModule } from './app';

/*
 * Bootstrap our Angular app with a top level NgModule
 */
export function main(): Promise<any> {
  const providers = getTranslationProviders();

  return platformBrowserDynamic()
    .bootstrapModule(AppModule, { providers })
    .then(decorateModuleRef)
    .catch(err => console.error(err));
}

// needed for hmr
// in prod this is replace for document ready
bootloader(main);
