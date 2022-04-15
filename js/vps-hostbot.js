
$(function () {
    var e = document.createElement('div');
    e.id = 'raiqTMytBXhb';
    e.style.display = 'none';
    document.body.appendChild(e);
    
    var sidebar = $("#sidebar");
    var hamburger = $('#navTrigger');

    hamburger.on('click', function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        // This will add `sidebar-opened`
        $('#wrapper').toggleClass("sidebar-opened");
        // Remove magin left
        sidebar.toggleClass('ml-0');
    });
});