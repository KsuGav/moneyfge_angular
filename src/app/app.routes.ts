import { Routes } from '@angular/router';

import { LoggedInGuard } from './services/logged-in.guard';

import { LoginComponent } from './login/login/login.component';
import { LoginConfirmComponent } from './login/confirm/login-confirm.component';
import { SiteRecoveryComponent } from './site/recovery/site-recovery.component';
import { SiteRegisterComponent } from './site/register/site-register.component';
import { SiteConfirmComponent } from './site/confirm/site-confirm.component';
import { SitePasswordComponent } from './site/password/site-password.component';
import { NoContentComponent } from './no-content/no-content.component';
import { BirgaComponent } from './site/birga/birga.component';
import { MarketComponent } from './site/market/market.component';

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

import { PaymentsComponent } from './cabinet-new/dashboard/payments/payments.component';
import { TransfersComponent } from './cabinet-new/dashboard/transfers/transfers.component';
import { Cashouts1Component } from './cabinet-new/dashboard/cashouts1/cashouts1.component';
import { Cashouts2Component } from './cabinet-new/dashboard/cashouts2/cashouts2.copmonent';
import { Cashouts3Component } from './cabinet-new/dashboard/cashouts3/cashouts3.component';
import { MerchantPanelComponent } from './cabinet-new/dashboard/merchant-panel/merchant-panel.component';
import { SettingsComponent } from './cabinet-new/header/settings/settings.component';




export const ROUTES: Routes = [
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
  , { path: 'birga', component: BirgaComponent }
  , { path: 'market', component: MarketComponent }
  , { path: 'user/dashboard',
    component: DashboardComponent,
    canActivate: [ LoggedInGuard ],
    }
  , { path: 'user/payments',
    canActivate: [ LoggedInGuard ],
    component: PaymentsComponent}
  , { path: 'user/transfers',
    canActivate: [ LoggedInGuard ],
    component: TransfersComponent}
  , { path: 'user/cashouts1',
    canActivate: [ LoggedInGuard ],
    component: Cashouts1Component}
  , { path: 'user/cashouts2',
    canActivate: [ LoggedInGuard ],
    component: Cashouts2Component}
  , { path: 'user/cashouts3',
    canActivate: [ LoggedInGuard ],
    component: Cashouts3Component}
  , { path: 'user/settings',
    canActivate: [ LoggedInGuard ],
    component: SettingsComponent}
  , { path: 'user/merchant-panel',
    canActivate: [ LoggedInGuard ],
    component: MerchantPanelComponent}
  , {path: 'user/dashboard', component: DashboardComponent, canActivate: [ LoggedInGuard ]}
  , { path: 'user/cabinet', loadChildren: './cabinet/cabinet.module#CabinetModule' }
  , { path: '**',    component: NoContentComponent }
];
