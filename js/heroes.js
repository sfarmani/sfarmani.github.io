// Load different parts of the pages
$(function () {
    let heroes_url = "json/heros.json";
    let skills_url = "json/skills.json";

    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');


    var heroes_json;
    var skills_json;

    $.when($.getJSON(heroes_url)).done(function(json){
        heroes_json = json;
    });
    $.when($.getJSON(skills_url)).done(function (json) {
        skills_json = json;
    });

    
});