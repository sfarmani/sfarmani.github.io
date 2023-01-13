$(function () {
    if ($('#aswift_0 iframe').length || ['none'].includes($('.adsbygoogle').css('display')) || $('.adsbygoogle').not('.adsbygoogle-noablate').is(':hidden')) {
        // $('div#yLBWgYVzweDb').addClass("show-modal");
        // $('body').addClass("modal-open");
        $('div#yLBWgYVzweDb').modal('show');
    }

    // $('.close-button, .ok-button').on('click', function () {
    //     $('div#yLBWgYVzweDb').removeClass("show-modal");
    //     $('body').removeClass("modal-open");
    // });
});