import { Component, ViewChild } from '@angular/core';

import { NewAccountDialogComponent } from '../new-account-dialog/new-account-dialog.component';

@Component({
  selector: 'sidebar-component',
  templateUrl: 'sidebar.component.html'
})
export class SidebarComponent {

  @ViewChild('newAccountDialog') newAccountDialog: NewAccountDialogComponent;

  newAccount() {
    this.newAccountDialog.open();
  }

}
