// Load different parts of the pages
$(function () {
    let heroes_url = "json/heros.json";
    let skills_url = "json/skills.json";

    var skillsDom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";

    var heroesDom =
        "<'row'<'col-sm-12'tr>>";

    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');

    $.getJSON(heroes_url, function (json) {
        //// Sort and group by the data ////
        json = sortByKeyAsc(json, "heroClass");
        var heroes = _.groupBy(json, "mainstat");
        
        //// build up data to use in select2 ////
        data = [];
        ["STR", "AGI", "INT"].forEach(function(mainstat){
            children = [];
            heroes[mainstat].forEach(function (hero, index) {
                children.push({ "id": index, "text": hero.heroClass });
            });
            data.push({ "text": mainstat, "children": children });
        });

        //// create select2 ////
        $('select.hero-select').select2(
            {
                theme: "default",
                data: data,
                width: "35%",
                placeholder: "Select a Hero",
                allowClear: true
            }
        );

        //// On select ////
        $('select.hero-select').on('select2:select', function (e) {
            var heroClass = e.params.data.text
            var selectedHero = json.filter(x => x.heroClass == heroClass);

            if (!$.fn.DataTable.isDataTable('#hero-info')){
                var heroInfo_table = $('#hero-info').DataTable({
                    responsive: true,
                    columnDefs: [
                        { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>", width: "10%" }
                    ],
                    language: { search: "Quick Search:", processing: "Loading Hero..." },
                    data: selectedHero,
                    dom: heroesDom,
                    ordering: false,
                    orderCellsTop: false,
                    processing: true,
                    columns: [
                        { data: "name", title: "Name" },
                        {
                            data: "role", title: "Role",
                            render: function (data) {
                                if (!data) return "<i style='color: #5a7da0'>none</i>";
                                return data.join("<br>");
                            }
                        },
                        {
                            data: "wearable", title: "Wearable Item Types",
                            render: function (data) {
                                if (!data) return "<i style='color: #5a7da0'>none</i>";
                                return data.join(" / ");
                            }
                        },
                        {
                            data: "spec", title: "Specialties",
                            render: function (data) {
                                if (!data) return "<i style='color: #5a7da0'>none</i>";
                                return data.join("<br>");
                            }
                        },
                    ]
                });
            }
            else {
                heroInfo_table.clear().draw();
                heroInfo_table.rows.add(selectedHero);
                heroInfo_table.columns.adjust().draw();
            }
        });

        //// On unselect ////
        $('select.hero-select').on('select2:unselect', function (e) {
            e.params.data.text
        });

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