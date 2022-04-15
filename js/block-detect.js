$(function () {

    if (!$('.adsbygoogle').children('ins').length || $('.adsbygoogle').is(':hidden')) {
        $('div#yLBWgYVzweDb').addClass("show-modal");
        $('body').addClass("modal-open");
    }

    $('.close-button').on('click', function () {
        $('div#yLBWgYVzweDb').removeClass("show-modal");
        $('body').removeClass("modal-open");
    });
});