import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { APP_RESOLVER_PROVIDERS } from './app.resolver'; // OLD
import { AppState, InternalStateType } from './app.service'; // OLD
import { AppService } from './app.services/App.service';
import { User } from './services/service.user'; // OLD
import { UserService } from './app.services/User.service';
import { CommonService } from './app.services/Common.service';
import { ModalService } from './services/modal.service'; // OLD
import { AccountService } from './services/account.service'; // OLD
import { ReplenishService } from './app.services/Replenish.service';
import { n_AccountService } from './app.services/Account.service';
import { OutbidService } from './services/outbid.service'; // OLD
import { BirgaComponent } from './site/birga/birga.component';
import { MarketComponent } from './site/market/market.component';
import { LoggedInGuard } from './services/logged-in.guard'; // OLD

import { HOMENEW } from './app.modules/home_new.module';
import { CABINETNEW } from './app.modules/cabinet_new.module';
// import { COMMON } from './app.modules/common.modules';
import { COMMON_NEW } from './app.modules/common_new.modules';

//import { ShareModule } from './common/share.module';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login/login.component';
import { LoginConfirmComponent } from './login/confirm/login-confirm.component';
import { SiteRecoveryComponent } from './site/recovery/site-recovery.component';
import { SiteRegisterComponent } from './site/register/site-register.component';
import { SiteConfirmComponent } from './site/confirm/site-confirm.component';
import { SitePasswordComponent } from './site/password/site-password.component';
import { NoContentComponent } from './no-content/no-content.component';

// Application wide providers
const APP_PROVIDERS = [
  ...APP_RESOLVER_PROVIDERS,
  AppState
];

type StoreType = {
  state: InternalStateType,
  restoreInputValues: () => void,
  disposeOldHosts: () => void
};

/**
 * `AppModule` is the main entry point into Angular2's bootstraping process
 */
@NgModule({
  bootstrap: [ AppComponent ],
  declarations: [
    AppComponent
    , LoginComponent
    , LoginConfirmComponent
    , SiteRecoveryComponent
    , SiteRegisterComponent
    , SiteConfirmComponent
    , SitePasswordComponent
    , BirgaComponent
    , MarketComponent
    , NoContentComponent

  ].concat(HOMENEW, CABINETNEW, COMMON_NEW),
  imports: [ // import Angular's modules
    BrowserModule
    , FormsModule
    , ReactiveFormsModule
    , HttpModule
    , RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
    , //ShareModule
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS // OLD
    , APP_PROVIDERS // OLD
    , User // OLD
    , UserService
    , CommonService
    , AppService
    , ReplenishService
    , LoggedInGuard // OLD
    , ModalService // OLD
    , AccountService // OLD
    , n_AccountService
    , OutbidService // OLD
  ]
})
export class AppModule {
  constructor(public appRef: ApplicationRef, public appState: AppState) {}

  hmrOnInit(store: StoreType) {
    if (!store || !store.state) return;
    console.log('HMR store', JSON.stringify(store, null, 2));
    // set state
    this.appState._state = store.state;
    // set input values
    if ('restoreInputValues' in store) {
      let restoreInputValues = store.restoreInputValues;
      setTimeout(restoreInputValues);
    }

    this.appRef.tick();
    delete store.state;
    delete store.restoreInputValues;
  }

  hmrOnDestroy(store: StoreType) {
    const cmpLocation = this.appRef.components.map(cmp => cmp.location.nativeElement);
    // save state
    const state = this.appState._state;
    store.state = state;
    // recreate root elements
    store.disposeOldHosts = createNewHosts(cmpLocation);
    // save input values
    store.restoreInputValues  = createInputTransfer();
    // remove styles
    removeNgStyles();
  }

  hmrAfterDestroy(store: StoreType) {
    // display new elements
    store.disposeOldHosts();
    delete store.disposeOldHosts;
  }

}

