$(function () {

    if (!$('div.adsbygoogle').length) {
        $('div#yLBWgYVzweDb').addClass("show-modal");
        $('body').addClass("modal-open");
    }

    $('.close-button').on('click', function () {
        $('div#yLBWgYVzweDb').removeClass("show-modal");
        $('body').removeClass("modal-open");
    });
});