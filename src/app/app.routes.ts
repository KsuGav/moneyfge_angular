import { Routes } from '@angular/router';

import { LoggedInGuard } from './services/logged-in.guard';

import { LoginComponent } from './login/login';
import { LoginConfirmComponent } from './login/confirm';
import { SiteRecoveryComponent } from './site/recovery';
import { SiteRegisterComponent } from './site/register';
import { SiteConfirmComponent } from './site/confirm';
import { SitePasswordComponent } from './site/password';
import { CabinetComponent } from './cabinet';
import { CabinetMainComponent } from './cabinet/main';
import { CabinetPaymentComponent } from './cabinet/payment';
import { CabinetTransferComponent } from './cabinet/transfer';
import { TransferDefaultComponent } from './cabinet/transfer/default';
import { TransferAccountComponent } from './cabinet/transfer/account';
import { CabinetFillComponent } from './cabinet/fill';
import { CabinetScoreComponent } from './cabinet/score';
import { ScoreIndexComponent } from './cabinet/score/default';
import { ScoreCreateComponent } from './cabinet/score/create';
import { CabinetOutmoneyComponent } from './cabinet/outmoney';
import { OutmoneyDefaultComponent } from './cabinet/outmoney/default';
import { OutmoneyListComponent } from './cabinet/outmoney/list';
import { CabinetSettingsComponent} from './cabinet/settings';
import { SettingsProfileComponent } from './cabinet/settings/profile';
import { SettingsPasswordComponent } from './cabinet/settings/password';
import { NoContentComponent } from './no-content';

// New template components
import { AboutComponent } from './home-new/static/about/about.component';
import { Article1Component } from './home-new/static/article/article-1/article-1.component';
import { Article2Component } from './home-new/static/article/article-2/article-2.component';
import { Article3Component } from './home-new/static/article/article-3/article-3.component';
import { BusinessComponent } from './home-new/business/business.component';
import { IndexComponent } from './home-new/index/index.component';
import { KomissiaComponent } from './home-new/static/komissia/komissia.component';
import { CareersComponent } from './home-new/static/careers/careers.component';

import { StaticComponent } from './home-new/static/static.component';
import { MoneyTransferComponent } from './home-new/static/money-transfer/money-transfer.component';
import { MobilePaymentsComponent } from './home-new/static/mobile-payments/mobile-payments.component';
import { CreditPaymentsComponent } from './home-new/static/credit-payments/credit-payments.component';
import { GamesIntertainmentComponent } from './home-new/static/games-intertainment/games-intertainment.component';
import { InternetTvComponent } from './home-new/static/internet-tv/internet-tv.component';
import { OnlinePaymentsComponent } from './home-new/static/online-payments/online-payments.component';
import { BillsComponent } from './home-new/static/bills/bills.component';

import { ContactComponent } from './home-new/static/contact/contact.component';
import { DashboardComponent } from './cabinet-new/dashboard/dashboard.component';


export const ROUTES: Routes = [
  // { path: '', component: HomeComponent }
  { path: '', component: IndexComponent }
  , { path: 'business', component: BusinessComponent }
  , { path: 'static',
    component: StaticComponent,
    children: [
      { path: 'bills', component: BillsComponent }
      , { path: 'online', component: OnlinePaymentsComponent }
      , { path: 'internet', component: InternetTvComponent }
      , { path: 'games', component: GamesIntertainmentComponent }
      , { path: 'credit-payments', component: CreditPaymentsComponent }
      , { path: 'money-transfer', component: MoneyTransferComponent }
      , { path: 'mobile-payments', component: MobilePaymentsComponent }
      , { path: 'about', component: AboutComponent }
      , { path: 'careers', component: CareersComponent }
      , { path: 'commission', component: KomissiaComponent }
      , { path: 'contacts', component: ContactComponent }
      , { path: 'article-1', component: Article1Component }
      , { path: 'article-2', component: Article2Component }
      , { path: 'article-3', component: Article3Component }
    ]}
  , { path: 'user/sign-in/login', component: LoginComponent }
  , { path: 'user/sign-in/confirm', component: LoginConfirmComponent }
  , { path: 'site/reset-password', component: SiteRecoveryComponent }
  , { path: 'site/register', component: SiteRegisterComponent }
  , { path: 'site/confirm', component: SiteConfirmComponent }
  , { path: 'site/password', component: SitePasswordComponent }
  , {path: 'user/dashboard', component: DashboardComponent, canActivate: [ LoggedInGuard ]}
  , {
    path: 'user/cabinet',
    component: CabinetComponent,
    canActivate: [ LoggedInGuard ],
    children: [
      {path: '', component: CabinetMainComponent},
      {path: 'categories', component: CabinetPaymentComponent},
      {
        path: 'transfer',
        component: CabinetTransferComponent,
        children: [
          {path: 'index', component: TransferDefaultComponent},
          {path: 'account', component: TransferAccountComponent}
        ]
      },
      {path: 'fill', component: CabinetFillComponent},
      {
        path: 'score',
        component: CabinetScoreComponent,
        children: [
          {path: 'index', component: ScoreIndexComponent},
          {path: 'create', component: ScoreCreateComponent}
        ]
      },
      {
        path: 'outmoney',
        component: CabinetOutmoneyComponent,
        children: [
          {path: '', component: OutmoneyDefaultComponent},
          {path: 'list', component: OutmoneyListComponent}
        ]
      },
      {
        path: 'settings',
        component: CabinetSettingsComponent,
        children: [
          {path: 'profile', component: SettingsProfileComponent},
          {path: 'password', component: SettingsPasswordComponent}
        ]
      }
    ]
  }
  , { path: '**',    component: NoContentComponent }
];
