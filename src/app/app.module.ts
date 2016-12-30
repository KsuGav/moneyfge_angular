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
import { APP_RESOLVER_PROVIDERS } from './app.resolver';
import { AppState, InternalStateType } from './app.service';
import { User } from './services/service.user';
import { ModalService } from './services/modal.service';
import { AccountService } from './services/account.service';
import { OutbidService } from './services/outbid.service';
import { LoggedInGuard } from './services/logged-in.guard';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home';
import { HomeHeaderComponent } from './home/header';
import { HomeFooterComponent } from './home/footer';
import { HomeAboutComponent } from './home/about';
import { LoginComponent } from './login/login';
import { LoginConfirmComponent } from './login/confirm';
import { SiteRecoveryComponent } from './site/recovery';
import { SiteRegisterComponent } from './site/register';
import { SiteConfirmComponent } from './site/confirm';
import { SitePasswordComponent } from './site/password';
//import { CabinetComponent } from './cabinet';
//import { CabinetHeaderComponent } from './cabinet/header';
//import { CabinetFooterComponent } from './cabinet/footer';
//import { CabinetMainComponent } from './cabinet/main';
//import { CabinetPaymentComponent } from './cabinet/payment';
//import { CabinetTransferComponent } from './cabinet/transfer';
//import { TransferDefaultComponent } from './cabinet/transfer/default';
//import { TransferAccountComponent } from './cabinet/transfer/account';
//import { CabinetFillComponent } from './cabinet/fill';
//import { CabinetScoreComponent } from './cabinet/score';
//import { ScoreIndexComponent } from './cabinet/score/default';
//import { ScoreCreateComponent } from './cabinet/score/create';
//import { CabinetOutmoneyComponent } from './cabinet/outmoney';
//import { OutmoneyDefaultComponent } from './cabinet/outmoney/default';
//import { OutmoneyListComponent } from './cabinet/outmoney/list';
//import { CabinetSettingsComponent } from './cabinet/settings';
//import { SettingsProfileComponent } from './cabinet/settings/profile';
//import { PhoneFormComponent } from './cabinet/settings/profile/phone-form';
//import { EmailFormComponent } from './cabinet/settings/profile/email-form';
//import { SettingsPasswordComponent } from './cabinet/settings/password';
//import { NoAccountComponent } from './cabinet/common/no-account';
//import { SmsCodeDialogComponent } from './common/sms-code-dialog/sms-code-dialog.component';
//import { ConfirmDialogComponent } from './common/confirm-dialog';
//import { AlertDialogComponent } from './common/alert-dialog/alert-dialog.component';
//import { LinkCounterComponent } from './common/link-counter/link-counter.component';
//import { AlertComponent } from './common/alert';
//import { NoContentComponent } from './no-content';

// New template components
import { AboutComponent } from './home-new/static/about/about.component';
import { Article1Component } from './home-new/static/article/article-1/article-1.component';
import { Article2Component } from './home-new/static/article/article-2/article-2.component';
import { Article3Component } from './home-new/static/article/article-3/article-3.component';
import { BusinessComponent } from './home-new/business/business.component';
import { BusinessHeaderComponent } from './home-new/business-header/business-header.component';
import { CareersComponent } from './home-new/static/careers/careers.component';
import { FooterComponent } from './home-new/footer/footer.component';
import { IndexComponent } from './home-new/index/index.component';
import { KomissiaComponent } from './home-new/static/komissia/komissia.component';
import { LogoLineComponent } from './home-new/logo-line/logo-line.component';
import { NavLineComponent } from './home-new/nav-line/nav-line.component';
import { NewsComponent } from './home-new/news/news.component';
import { PrivateHeaderComponent } from './home-new/private-header/private-header.component';
import { SimpleHeaderComponent } from './home-new/simple-header/simple-header.component';
import { TopLineComponent } from './home-new/top-line/top-line.component';

import {StaticComponent } from './home-new/static/static.component';
import { MobilePaymentsComponent } from './home-new/static/mobile-payments/mobile-payments.component';
import { MoneyTransferComponent } from './home-new/static/money-transfer/money-transfer.component';
import { CreditPaymentsComponent } from './home-new/static/credit-payments/credit-payments.component';
import { GamesIntertainmentComponent } from './home-new/static/games-intertainment/games-intertainment.component';
import { InternetTvComponent } from './home-new/static/internet-tv/internet-tv.component';
import { OnlinePaymentsComponent } from './home-new/static/online-payments/online-payments.component';
import { BillsComponent } from './home-new/static/bills/bills.component';

import { ContactComponent } from './home-new/static/contact/contact.component';
import { NewCabinetHeaderComponent } from './cabinet-new/header/cabinet-header.component';
import { DashboardComponent } from './cabinet-new/dashboard/dashboard.component';

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
    , LoginComponent
    , LoginConfirmComponent
    , SiteRecoveryComponent
    , SiteRegisterComponent
    , SiteConfirmComponent
    , SitePasswordComponent
    //, CabinetComponent
    //, CabinetHeaderComponent
    //, CabinetFooterComponent
    //, CabinetMainComponent
    //, CabinetPaymentComponent
    //, CabinetTransferComponent
    //, TransferDefaultComponent
    //, TransferAccountComponent
    //, CabinetFillComponent
    //, CabinetScoreComponent
    //, ScoreIndexComponent
    //, ScoreCreateComponent
    //, CabinetOutmoneyComponent
    //, OutmoneyDefaultComponent
    //, OutmoneyListComponent
    //, CabinetSettingsComponent
    //, SettingsProfileComponent
    //, PhoneFormComponent
    //, EmailFormComponent
    //, SettingsPasswordComponent
    //, SmsCodeDialogComponent
    //, ConfirmDialogComponent
    //, AlertDialogComponent
    //, LinkCounterComponent
    //, AlertComponent
    //, NoAccountComponent
    //, NoContentComponent

    // New template components
    , AboutComponent
    , Article1Component
    , Article2Component
    , Article3Component
    , BusinessComponent
    , BusinessHeaderComponent
    , CareersComponent
    , FooterComponent
    , IndexComponent
    , KomissiaComponent
    , LogoLineComponent
    , NavLineComponent
    , NewsComponent
    , PrivateHeaderComponent
    , SimpleHeaderComponent
    , TopLineComponent
    , StaticComponent
    , MobilePaymentsComponent
    , MoneyTransferComponent
    , CreditPaymentsComponent
    , GamesIntertainmentComponent
    , InternetTvComponent
    , OnlinePaymentsComponent
    , BillsComponent
    , ContactComponent
    , NewCabinetHeaderComponent
    , DashboardComponent
  ],
  imports: [ // import Angular's modules
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
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

