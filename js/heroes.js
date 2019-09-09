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

    $.getJSON(heroes_url, function (json) {
        json = sortByKeyAsc(json, "heroClass");
        var heroes = _.groupBy(json, "mainstat");
        
        data = [];
        ["STR", "AGI", "INT"].forEach(function(mainstat){
            children = [];
            heroes[mainstat].forEach(function (hero, index) {
                children.push({ "id": index, "text": hero.heroClass });
            });
            data.push({ "text": mainstat, "children": children });
        });

        //// create select2 ////
        var heroSelect = $('select.hero-select').select2(
            {
                theme: "default",
                data: data,
                width: "35%",
                placeholder: "Select a Hero",
                allowClear: true
            }
        );

        heroSelect.data('select2').$selection.css('height', "10%");

    });

    $.getJSON(skills_url, function (json) {

    });
    
});

function sortByKeyDesc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x > y) ? -1 : ((x < y) ? 1 : 0));
    });
}

function sortByKeyAsc(array, key) {
    return array.sort(function (a, b) {
        var x = a[key]; var y = b[key];
        return ((x < y) ? -1 : ((x > y) ? 1 : 0));
    });
}