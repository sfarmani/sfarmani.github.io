// Load different parts of the pages
$(function () {
    let heroes_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/heros.json?token=ADTE3XDNMLR5GY4CZYYVQP25OHPSE"
    let skills_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/skills.json?token=ADTE3XGMZXMB2YPLXYGSEQ25OHPSK"

    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
});