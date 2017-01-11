import { Component, ViewChild } from '@angular/core';

import { DialogComponent } from '../dialog/dialog.component';
import { LoaderComponent } from '../loader/loader.component';

@Component({
    selector: 'success-component',
    templateUrl: 'success.component.html'
})

export class SuccessComponent {

    @ViewChild('dialog') dialog: DialogComponent;

    @ViewChild('loader') loader: LoaderComponent;

    open() {
        this.dialog.open();
    }

    handleOnClosed() {
        this.loader.toggle(false);
    }

    close(){
        this.dialog.close();
    }
}