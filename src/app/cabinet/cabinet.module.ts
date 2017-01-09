import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ROUTES } from './cabinet.routes';
import { CABINET } from '../app.modules/cabinet.module';
import { ShareModule } from '../common/share.module';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(ROUTES),
    ShareModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: CABINET
})
export class CabinetModule { }
