import { Routes, RouterModule } from '@angular/router';

// import { LoggedInGuard } from './services/logged-in.guard';
import { HomeComponent } from './home/home';
import { HomeAboutComponent } from './home/about';
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
  , { path: 'en/user/sign-in/login', component: LoginComponent }
  , { path: 'en/user/sign-in/confirm', component: LoginConfirmComponent }
  , { path: 'en/site/reset-password', component: SiteRecoveryComponent }
  , { path: 'en/site/register', component: SiteRegisterComponent }
  , { path: 'en/site/confirm', component: SiteConfirmComponent }
  , { path: 'en/user/cabinet', component: CabinetMainComponent }
  , { path: 'user/profile', component: ProfileComponent }
  , { path: '**',    component: NoContentComponent }
];
