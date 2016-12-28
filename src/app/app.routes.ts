import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './services/logged-in.guard';

// import { HomeComponent } from './home/home';
// import { HomeAboutComponent } from './home/about';
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
import { Article1Component } from './home-new/article/article-1/article-1.component';
import { Article2Component } from './home-new/article/article-2/article-2.component';
import { Article3Component } from './home-new/article/article-3/article-3.component';
import { BusinessComponent } from './home-new/business/business.component';
import { IndexComponent } from './home-new/index/index.component';
import { KomissiaComponent } from './home-new/komissia/komissia.component';
import { CareersComponent } from './home-new/careers/careers.component';

import { NewAboutComponent } from './home-new/main-menu/about/new-about.component';


export const ROUTES: Routes = [
  // { path: '', component: HomeComponent }
  { path: '', component: IndexComponent }
  , { path: 'business', component: BusinessComponent }
  , { path: 'article-1', component: Article1Component }
  , { path: 'article-2', component: Article2Component }
  , { path: 'article-3', component: Article3Component }
  , { path: 'careers', component: CareersComponent }
  , { path: 'commission', component: KomissiaComponent }
  , { path: 'site/about', component: NewAboutComponent }
  , { path: 'current-account/page1', component: MobilePaymentsComponent }
  , { path: 'current-account/page2', component: MoneyTransferComponent }
  , { path: 'current-account/page3', component: CreditPaymentsComponent }
  , { path: 'current-account/page4', component: GamesEntertainmentComponent }
  , { path: 'current-account/page5', component: InternetTvComponent }
  , { path: 'current-account/page7', component: OnlinePaymentsComponent }
  , { path: 'current-account/page8', component: BillsComponent }
  , { path: 'site/contacts', component: ContactsComponent }
  , { path: 'user/sign-in/login', component: LoginComponent }
  , { path: 'user/sign-in/confirm', component: LoginConfirmComponent }
  , { path: 'site/reset-password', component: SiteRecoveryComponent }
  , { path: 'site/register', component: SiteRegisterComponent }
  , { path: 'site/confirm', component: SiteConfirmComponent }
  , { path: 'site/password', component: SitePasswordComponent }
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
