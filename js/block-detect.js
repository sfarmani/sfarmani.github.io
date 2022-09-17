$(function () {

    if (!$('.adsbygoogle').not('.adsbygoogle-noablate').children('ins').length || $('.adsbygoogle').not('.adsbygoogle-noablate').is(':hidden')) {
        $('div#yLBWgYVzweDb').addClass("show-modal");
        $('body').addClass("modal-open");
    }

    $('.close-button, .ok-button').on('click', function () {
        $('div#yLBWgYVzweDb').removeClass("show-modal");
        $('body').removeClass("modal-open");
    });
});