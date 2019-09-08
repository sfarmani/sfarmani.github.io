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

        var heroes = [];
        var str = json.filter(x => x.mainstat == "STR");
        var agi = json.filter(x => x.mainstat == "AGI");
        var int = json.filter(x => x.mainstat == "INT");

        $.merge(heroes, str);
        $.merge(heroes, agi);
        $.merge(heroes, int);
        
        console.log(heroes);

        data = [];
        data.push({})
        str.forEach(function(hero, index){
            data.push({"id": index, "text": hero.name});
        });

        //// create select2 ////
        $('select.items-select').select2(
            {
                theme: "classic",
                data: data,
                width: "50%",
                placeholder: "Select columns to toggle",
                closeOnSelect: false
            }
        );
    });

    $.getJSON(skills_url, function (json) {

    });
    
});