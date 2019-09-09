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
        json = sortByKeyDesc(json, "heroClass");
        var heroes = _.groupBy(json, "mainstat");
        
        data = [];
        Object.keys(heroes).forEach(function(mainstat){
            children = [];
            heroes[mainstat].forEach(function (hero, index) {
                children.push({ "id": index, "text": hero.heroClass });
            });
            data.push({ "text": mainstat, "children": children });
        });
        console.log(data);

        //// create select2 ////
        $('select.hero-select').select2(
            {
                theme: "default",
                data: data,
                width: "50%",
                placeholder: "Select a Hero",
                allowClear: true
            }
        );
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