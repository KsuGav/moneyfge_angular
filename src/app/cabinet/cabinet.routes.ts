import { Routes } from '@angular/router';

import { LoggedInGuard } from '../services/logged-in.guard';
import { CabinetComponent } from '../cabinet/cabinet.component';
import { CabinetMainComponent } from '../cabinet/main/cabinet-main.component';
import { CabinetPaymentComponent } from '../cabinet/payment/cabinet-payment.component';
import { CabinetTransferComponent } from '../cabinet/transfer/cabinet-transfer.component';
import { TransferDefaultComponent } from '../cabinet/transfer/default/transfer-default.component';
import { TransferAccountComponent } from '../cabinet/transfer/account/transfer-account.component';
import { CabinetFillComponent } from '../cabinet/fill/cabinet-fill.component';
import { FillOzonComponent } from '../cabinet/fill/ozon/fill-ozon.component';
import { CabinetScoreComponent } from '../cabinet/score/cabinet-score.component';
import { ScoreIndexComponent } from '../cabinet/score/default/score-index.component';
import { ScoreCreateComponent } from '../cabinet/score/create/score-create.component';
import { CabinetOutmoneyComponent } from '../cabinet/outmoney/cabinet-outmoney.component';
import { OutmoneyDefaultComponent } from '../cabinet/outmoney/default/outmoney-default.component';
import { OutmoneyListComponent } from '../cabinet/outmoney/list/outmoney-list.component';
import { CabinetSettingsComponent} from '../cabinet/settings/cabinet-settings.component';
import { SettingsProfileComponent } from '../cabinet/settings/profile/settings-profile.component';
import { SettingsPasswordComponent } from '../cabinet/settings/password/settings-password.component';

export const ROUTES: Routes = [
  {
    path: '',
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
      {path: 'fill/ozon', component: FillOzonComponent},
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
];
