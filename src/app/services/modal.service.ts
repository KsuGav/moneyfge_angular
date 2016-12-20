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

  showLoader(selector) {
    $(`#${selector}`).waitMe({
      effect: 'roundBounce',
      text: 'Please waiting...',
      bg: 'rgba(255,255,255,0.85)',
      color: '#000',
      sizeW: '',
      sizeH: '',
      source: '',
      onClose: function() {}

    });
  }

  hideLoader(selector) {
    $(`#${selector}`).waitMe('hide');
  }
}
