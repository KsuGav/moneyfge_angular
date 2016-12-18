import { NgModule, ApplicationRef } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { removeNgStyles, createNewHosts, createInputTransfer } from '@angularclass/hmr';

/*
 * Platform and Environment providers/directives/pipes
 */
import { ENV_PROVIDERS } from './environment';
import { ROUTES } from './app.routes';
// App is our top level component
import { AppComponent } from './app.component';
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { User } from './services/service.user';
import { ModalService } from './services/modal.service';
import { AccountService } from './services/account.service';
import { OutbidService } from './services/outbid.service';
import { LoggedInGuard } from './services/logged-in.guard';

import { HomeComponent } from './home/home';
import { HomeHeaderComponent } from './home/header';
import { HomeFooterComponent } from './home/footer';
import { HomeAboutComponent } from './home/about';
import { MobilePaymentsComponent } from './home/mobile-payments';
import { MoneyTransferComponent } from './home/money-transfer';
import { CreditPaymentsComponent } from './home/credit-payments';
import { GamesEntertainmentComponent } from './home/games-entertainment';
import { InternetTvComponent } from './home/internet-tv';
import { OnlinePaymentsComponent } from './home/online-payments';
import { BillsComponent } from './home/bills';
import { ContactsComponent } from './home/contacts';
import { LoginComponent } from './login/login';
import { LoginConfirmComponent } from './login/confirm';
import { SiteRecoveryComponent } from './site/recovery';
import { SiteRegisterComponent } from './site/register';
import { SiteConfirmComponent } from './site/confirm';
import { SitePasswordComponent } from './site/password';
import { CabinetComponent } from './cabinet';
import { CabinetHeaderComponent } from './cabinet/header';
import { CabinetFooterComponent } from './cabinet/footer';
import { CabinetMainComponent } from './cabinet/main';
import { CabinetPaymentComponent } from './cabinet/payment';
import { CabinetTransferComponent } from './cabinet/transfer';
import { CabinetFillComponent } from './cabinet/fill';
import { CabinetScoreComponent } from './cabinet/score';
import { ScoreIndexComponent } from './cabinet/score/default';
import { ScoreCreateComponent } from './cabinet/score/create';
import { CabinetOutmoneyComponent } from './cabinet/outmoney';
import { OutmoneyDefaultComponent } from './cabinet/outmoney/default';
import { OutmoneyListComponent } from './cabinet/outmoney/list';
import { CabinetSettingsComponent } from './cabinet/settings';
import { SettingsProfileComponent } from './cabinet/settings/profile';
import { NoContentComponent } from './no-content';

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
    , HomeComponent
    , HomeHeaderComponent
    , HomeFooterComponent
    , HomeAboutComponent
    , MobilePaymentsComponent
    , MoneyTransferComponent
    , CreditPaymentsComponent
    , GamesEntertainmentComponent
    , InternetTvComponent
    , OnlinePaymentsComponent
    , BillsComponent
    , ContactsComponent
    , LoginComponent
    , LoginConfirmComponent
    , SiteRecoveryComponent
    , SiteRegisterComponent
    , SiteConfirmComponent
    , SitePasswordComponent
    , CabinetComponent
    , CabinetHeaderComponent
    , CabinetFooterComponent
    , CabinetMainComponent
    , CabinetPaymentComponent
    , CabinetTransferComponent
    , CabinetFillComponent
    , CabinetScoreComponent
    , ScoreIndexComponent
    , ScoreCreateComponent
    , CabinetOutmoneyComponent
    , OutmoneyDefaultComponent
    , OutmoneyListComponent
    , CabinetSettingsComponent
    , SettingsProfileComponent
    , NoContentComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    HttpModule,
    RouterModule.forRoot(ROUTES, { useHash: false, preloadingStrategy: PreloadAllModules })
  ],
  providers: [ // expose our Services and Providers into Angular's dependency injection
    ENV_PROVIDERS,
    APP_PROVIDERS,
    User,
    LoggedInGuard,
    ModalService,
    AccountService,
    OutbidService
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

