import { Routes, RouterModule } from '@angular/router';

import { LoggedInGuard } from './services/logged-in.guard';
import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { Login1Component } from './login1';
import { ProfileComponent } from './profile';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent }
  , { path: 'home',  component: HomeComponent }
  , { path: 'user/login', component: LoginComponent }
  , { path: 'user/login1', component: Login1Component }
  , { path: 'user/profile', component: ProfileComponent, canActivate: [ LoggedInGuard ] }
  // , { path: 'about', component: AboutComponent }
  // , {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  //     .then((comp: any) => comp.default),
  // }
  , { path: '**',    component: NoContentComponent }
];
