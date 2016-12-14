import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home';
import { LoginComponent } from './login';
import { NoContentComponent } from './no-content';

import { DataResolver } from './app.resolver';


export const ROUTES: Routes = [
  { path: '',      component: HomeComponent }
  , { path: 'home',  component: HomeComponent }
  , { path: 'user/login', component: LoginComponent }
  // , { path: 'about', component: AboutComponent }
  // , {
  //   path: 'detail', loadChildren: () => System.import('./+detail')
  //     .then((comp: any) => comp.default),
  // }
  , { path: '**',    component: NoContentComponent }
];
