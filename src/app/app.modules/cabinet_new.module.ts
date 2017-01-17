import { NewCabinetHeaderComponent } from '../cabinet-new/header/cabinet-header.component';

import { SettingsComponent } from '../cabinet-new/header/settings/settings.component';
import { AccountOperationsComponent } from '../cabinet-new/header/settings/account_operations/account_operations.component';
import { ProfileSettingsComponent } from '../cabinet-new/header/settings/profile_settings/profile-settings.component';
import { SecuritySettingsComponent } from '../cabinet-new/header/settings/security_settings/security-settings.component';


import { HistoryComponent } from '../cabinet-new/header/history/history.component';

import { DashboardComponent } from '../cabinet-new/dashboard/dashboard.component';
import { SidebarComponent } from '../cabinet-new/dashboard/sidebar/sidebar.component';
import { AccountComponent } from '../cabinet-new/dashboard/account/account.component';
import { AccountsComponent } from '../cabinet-new/dashboard/accounts/accounts.component';
import { NewButtonComponent } from '../cabinet-new/dashboard/new-button/new-button.component';
import { CashPanelComponent } from '../cabinet-new/dashboard/cash-panel/cash-panel.component';
import { FastBtnsComponent } from '../cabinet-new/dashboard/fast-btns/fast-btns.component';
import { FillPhonePopupComponent } from '../cabinet-new/dashboard/fill-phone-popup/fill-phone-popup.component';
import { FillAccountPopupComponent } from '../cabinet-new/dashboard/fill-account-popup/fill-account-popup.component';
import { TransferPopupComponent } from '../cabinet-new/dashboard/transfer-popup/transfer-popup.component';
import { MoneyCourseComponent } from '../cabinet-new/dashboard/money-course/money-course.component';
import { AccountHistoryComponent } from '../cabinet-new/dashboard/accounts/account-history.component';


import { PaymentsComponent } from '../cabinet-new/dashboard/payments/payments.component';
import { TransfersComponent } from '../cabinet-new/dashboard/transfers/transfers.component';
import { RefillComponent } from '../cabinet-new/dashboard/refill/refill.component';
import { CashoutsComponent } from '../cabinet-new/dashboard/cashouts/cashouts.copmonent';
import { MerchantPanelComponent } from '../cabinet-new/dashboard/merchant-panel/merchant-panel.component';
import { SuccessComponent } from '../common-new/success/success.component';


import { NewAccountDialogComponent } from '../cabinet-new/dashboard/new-account-dialog/new-account-dialog.component';

export const CABINETNEW: any[]=[
  NewCabinetHeaderComponent
    ,SettingsComponent
    ,AccountOperationsComponent
    ,ProfileSettingsComponent
    ,SecuritySettingsComponent

    ,HistoryComponent

  , DashboardComponent
  , SidebarComponent
  , AccountComponent
  , AccountsComponent
  , NewButtonComponent
  , CashPanelComponent
  , FastBtnsComponent
  , FillPhonePopupComponent
  , FillAccountPopupComponent
  , TransferPopupComponent
  , MoneyCourseComponent
  , AccountHistoryComponent

    ,PaymentsComponent
    ,TransfersComponent
    ,RefillComponent
    ,CashoutsComponent
    ,SuccessComponent
    ,MerchantPanelComponent

  , NewAccountDialogComponent
];
