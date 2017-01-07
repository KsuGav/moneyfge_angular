import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { ROUTES } from './cabinet.routes';
import { CABINET } from '../app.modules/cabinet.module';

@NgModule({
  imports: [
    RouterModule.forChild(ROUTES)
  ],
  declarations: CABINET
})
export class CabinetModule { }
