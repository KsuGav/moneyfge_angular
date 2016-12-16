import { Routes, RouterModule } from '@angular/router';

// import { LoggedInGuard } from './services/logged-in.guard';
import { HomeComponent } from './home/home';
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
import { CabinetMainComponent } from './cabinet/main';
import { ProfileComponent } from './profile';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '', component: HomeComponent }
  , { path: 'en/site/about', component: HomeAboutComponent }
  , { path: 'en/current-account/page1', component: MobilePaymentsComponent }
  , { path: 'en/current-account/page2', component: MoneyTransferComponent }
  , { path: 'en/current-account/page3', component: CreditPaymentsComponent }
  , { path: 'en/current-account/page4', component: GamesEntertainmentComponent }
  , { path: 'en/current-account/page5', component: InternetTvComponent }
  , { path: 'en/current-account/page7', component: OnlinePaymentsComponent }
  , { path: 'en/current-account/page8', component: BillsComponent }
  , { path: 'en/site/contacts', component: ContactsComponent }
  , { path: 'en/user/sign-in/login', component: LoginComponent }
  , { path: 'en/user/sign-in/confirm', component: LoginConfirmComponent }
  , { path: 'en/site/reset-password', component: SiteRecoveryComponent }
  , { path: 'en/site/register', component: SiteRegisterComponent }
  , { path: 'en/site/confirm', component: SiteConfirmComponent }
  , { path: 'en/user/cabinet', component: CabinetMainComponent }
  , { path: 'user/profile', component: ProfileComponent }
  , { path: '**',    component: NoContentComponent }
];
