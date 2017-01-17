import {Component, OnInit, OnDestroy, ViewChild} from '@angular/core';
import {Account} from "../../../app.models/Account.model";
import {LoaderComponent} from "../../../common-new/loader/loader.component";
import {n_AccountService} from "../../../app.services/Account.service";

declare const $: any;

@Component({
    selector: 'cashouts-component',
    templateUrl: 'cashouts.component.html'
})

export class CashoutsComponent implements OnInit, OnDestroy {

    activeAccounts: Account[];
    getAccountsSubscription;
    reqAccountsSubscription;

    toAccount: number;
    sum: number;
    sumToPay: string = '0.00';
    formValid: boolean;

    @ViewChild('accountLoader') accountLoader: LoaderComponent;

    constructor(
        public accountService: n_AccountService,
    ) {}

    ngOnInit(){
        this.activeLink();
        this.select();
        this.downloadFile();

        this.accountLoader.toggle(true);

        this.accountService.getAllAccounts();

        this.reqAccountsSubscription = this.accountService.requestAccounts
            .subscribe(() => {
                this.accountLoader.toggle(true);
            });

        this.getAccountsSubscription = this.accountService.receiveAccounts
            .subscribe(
                res => {
                    this.accountLoader.toggle(false);
                    this.activeAccounts = res.active;
                }
            )
    }

    ngOnDestroy(){
        this.unActiveLink();
    }

    activeLink(){
        $('#cashouts_link').addClass('active')
    }

    unActiveLink(){
        $('#cashouts_link').removeClass('active')
    }

    select(){
        $(".select-medium").select2({
            minimumResultsForSearch: Infinity,
            placeholder: 'Select account '
        });

        function formatTransfer (bill) {
            var $bill = $(
                '<span><img src="/assets/new_assets/img/favicon/favicon1.png" class="transfer-img" /> ' + bill.text + '</span>'
            );
            return $bill;
        };

        $(".transfer-select.bill").select2({
            templateResult: formatTransfer,
            templateSelection: formatTransfer,
            minimumResultsForSearch: Infinity,
            placeholder: 'Select account '
        });
    }

    downloadFile(){
            // Browser supports HTML5 multiple file?
            var multipleSupport = typeof $('<input/>')[0].multiple !== 'undefined',
                isIE = /msie/i.test( navigator.userAgent );

            $.fn.customFile = function() {

                return this.each(function() {

                    var $file = $(this).addClass('custom-file-upload-hidden'), // the original file input
                        $wrap = $('<div class="file-upload-wrapper">'),
                        $input = $('<input type="text" class="file-upload-input" disabled />'),
                        // Button that will be used in non-IE browsers
                        $button = $('<button type="button" class="btn btn-upload">Upload</button>'),
                        // Hack for IE
                        $label = $('<label class="file-upload-button" for="'+ $file[0].id +'">Select a File</label>');

                    // Hide by shifting to the left so we
                    // can still trigger events
                    $file.css({
                        position: 'absolute',
                        left: '-9999px'
                    });

                    $wrap.insertAfter( $file )
                        .append( $file, $input, ( isIE ? $label : $button ) );

                    // Prevent focus
                    $file.attr('tabIndex', -1);
                    $button.attr('tabIndex', -1);

                    $button.click(function () {
                        $file.focus().click(); // Open dialog
                    });

                    $file.change(function() {

                        var files = [], fileArr, filename;

                        // If multiple is supported then extract
                        // all filenames from the file array
                        if ( multipleSupport ) {
                            fileArr = $file[0].files;
                            for ( var i = 0, len = fileArr.length; i < len; i++ ) {
                                files.push( fileArr[i].name );
                            }
                            filename = files.join(', ');

                            // If not supported then just take the value
                            // and remove the path to just show the filename
                        } else {
                            filename = $file.val().split('\\').pop();
                        }

                        $input.val( filename ) // Set the value
                            .attr('title', filename) // Show filename in title tootlip
                            .focus(); // Regain focus

                    });

                    $input.on({
                        blur: function() { $file.trigger('blur'); },
                        keydown: function( e ) {
                            if ( e.which === 13 ) { // Enter
                                if ( !isIE ) { $file.trigger('click'); }
                            } else if ( e.which === 8 || e.which === 46 ) { // Backspace & Del
                                // On some browsers the value is read-only
                                // with this trick we remove the old input and add
                                // a clean clone with all the original events attached
                                $file.replaceWith( $file = $file.clone( true ) );
                                $file.trigger('change');
                                $input.val('');
                            } else if ( e.which === 9 ){ // TAB
                                return;
                            } else { // All other keys
                                return false;
                            }
                        }
                    });

                });

            };

            // Old browser fallback
            if ( !multipleSupport ) {
                $( document ).on('change', 'input.customfile', function() {

                    var $this = $(this),
                        // Create a unique ID so we
                        // can attach the label to the input
                        uniqId = 'customfile_'+ (new Date()).getTime(),
                        $wrap = $this.parent(),

                        // Filter empty input
                        $inputs = $wrap.siblings().find('.file-upload-input')
                            .filter(function(){ return !this.value }),

                        $file = $('<input type="file" id="'+ uniqId +'" name="'+ $this.attr('name') +'"/>');

                    // 1ms timeout so it runs after all other events
                    // that modify the value have triggered
                    setTimeout(function() {
                        // Add a new input
                        if ( $this.val() ) {
                            // Check for empty fields to prevent
                            // creating new inputs when changing files
                            if ( !$inputs.length ) {
                                $wrap.after( $file );
                                $file.customFile();
                            }
                            // Remove and reorganize inputs
                        } else {
                            $inputs.parent().remove();
                            // Move the input so it's always last on the list
                            $wrap.appendTo( $wrap.parent() );
                            $wrap.find('input').focus();
                        }
                    }, 1);
                });
            }
        $('input[type=file]').customFile();
    }

    onToChange(account) {
        this.toAccount = 0;
        if(account && account.length == 8) {
            this.toAccount = account;
        }
        this.validateForm();
    }

    onSumChange(sum) {
        sum = parseFloat(sum);
        this.sum = sum;
        this.validateForm();
        if(!sum || sum == 0) {
            this.sumToPay = this.formatMoney(0);
            return;
        }
        this.sumToPay = this.formatMoney(
            Math.max(1.05 * sum, sum + 0.01)
        );
    }

    validateForm() {
        this.formValid = (this.toAccount > 10000000 && this.toAccount < 99999999 &&
        this.sum > 0);
    }

    formatMoney(sum) {
        return sum.toFixed(2).replace(/./g, function(c, i, a) {
            return i && c !== "." && ((a.length - i) % 3 === 0) ? ',' + c : c;
        });
    }
}

