import { Injectable } from '@angular/core';

declare const $: any;

@Injectable()
export class ModalService {
  constructor() {}

  showUnderConstruction() {
    $(document).ready(function() {
      const modal = $('.error_modal');

      modal.find('div.modal_close').on('click', function() {
        modal.modal('hide');
      });

      $('.under-construction').on('click', function(event) {
        event.preventDefault();
        modal.modal().show();
      })
    });
  }
}
