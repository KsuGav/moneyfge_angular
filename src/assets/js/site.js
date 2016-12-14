
$(document).ready(function () {

    $("#reg_lang.dropdown .dropdown-content a").click(function () {

        var thisImg = $(this).find("img");
        var thisSrc = thisImg.attr("src");
        var thisCode = thisImg.data("code");
        var oneImg = $(this.parentNode.parentNode).find("img.ic-this");

        thisImg.attr("src", oneImg.attr("src"));
        thisImg.data("code", oneImg.data("code"));
        oneImg.attr("src", thisSrc);
        oneImg.data("code", thisCode);

        $("#ic_phone").val(thisCode);
    });
    $("#reg_lang_login.dropdown-login .dropdown-content a").click(function () {

        var thisImg = $(this).find("img");
        var thisSrc = thisImg.attr("src");
        var thisCode = thisImg.data("code");
        var oneImg = $(this.parentNode.parentNode).find("img.ic-this");

        thisImg.attr("src", oneImg.attr("src"));
        thisImg.data("code", oneImg.data("code"));
        oneImg.attr("src", thisSrc);
        oneImg.data("code", thisCode);

        $("#phone_login").val(thisCode);
    });

    /*$('#feedback_form').submit(function(e) {
    //$('#feedback_submit').click(function(e) {

        e.preventDefault();
        var form = $(this);
        //var form = $("#feedback_form");
        $.ajax({
            url: form.attr("action"),
            method: "POST",
            data: form.serialize(),
            success: function (data) {

                if (data == 'ok')
                {
                    $("#feedback_modal .modal-footer").css("display", "none");
                    $("#feedback_modal .modal-body").html("<h2 class='result-ok'>" + form.data('ok') + "</h2>");
                }
            },
            error: function (data) {

                if (data == 'ok')
                {
                    $("#feedback_modal .modal-footer").css("display", "none");
                    $("#feedback_modal .modal-body").html("<h2 class='result-ok'>" + form.data('ok') + "</h2>");
                }
            }
        });
    });*/

});