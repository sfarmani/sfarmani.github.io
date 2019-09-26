// Load different parts of the pages
$(function () {
    var heroes_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/heros.json";
    var skills_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/skills.json";
    var items_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/items.json";
    var bullet2 = "※";

    var skillsDom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";

    var heroesDom = "<'row'<'col-sm-12'tr>>";
    
    //// Heroes Info ////
    var heroInfo;
    var heroSkills;
    var items;
    $.ajaxSetup({ async: false });
    $.getJSON(heroes_url, function (json) { heroInfo = json });
    $.getJSON(skills_url, function (json) { heroSkills = json });
    $.getJSON(items_url, function (json) { items = json });
    $.ajaxSetup({ async: true });

    //// Sort and group by the data ////
    heroInfo = sortByKeyAsc(heroInfo, "heroClass");
    var heroes = _.groupBy(heroInfo, "mainstat");

    //// build up data to use in select2 ////
    data = [];
    var index = 0;
    ["STR", "AGI", "INT"].forEach(function (mainstat) {
        children = [];
        heroes[mainstat].forEach(function (hero) {
            children.push({ "id": index, "text": hero.heroClass });
            index = index + 1;
        });
        data.push({ "text": mainstat, "children": children });
    });

    //// create select2 ////
    $('select.hero-select').select2(
        {
            theme: "default",
            data: data,
            width: "35%",
            placeholder: "Select a Hero"
        }
    );

    //// On select ////
    var heroInfo_table;
    var heroSkills_table;
    $('select.hero-select').on('select2:select', function (e) {
        var heroClass = e.params.data.text;
        var selectedHero = heroInfo.filter(x => x.heroClass === heroClass);
        var selectedSkills = heroSkills.filter(x => x.heroClass === heroClass);

        //// for hero-info table ////
        if (!$.fn.DataTable.isDataTable('#hero-info')) {
            heroInfo_table = $('#hero-info').DataTable({
                responsive: true,
                columnDefs: [
                    { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
                ],
                language: { search: "Quick Search:", processing: "Loading Hero..." },
                data: selectedHero,
                dom: heroesDom,
                ordering: false,
                order: [],
                orderCellsTop: false,
                processing: true,
                columns: [
                    { data: "icon", title: "Icons", width: "8%",
                        render: function (data) {
                            if (!data) return "<i style='color: #5a7da0'>none</i>";
                            var img_url = encodeURI(`https://raw.githubusercontent.com/sfarmani/twicons/master/${data}`);
                            return `<img width="100%" src="${img_url}.jpg" alt="${data}">`;
                        }
                    },
                    { data: "name", title: "Name",
                        render: function (data, type, row) {
                            return `<font color="#${row.color}">${data}</font>`;
                        }
                    },
                    { data: "role", title: "Role",
                        render: function (data) {
                            if (!data) return "<i style='color: #5a7da0'>none</i>";
                            let str = [];
                            data.forEach(function (roleinfo) {
                                str.push(`<font color="#0d9ea3">${roleinfo}</font>`);
                            });
                            return str.join("<br>");
                        }
                    },
                    { data: "wearable", title: "Wearable Item Types",
                        render: function (data) {
                            if (!data) return "<i style='color: #5a7da0'>none</i>";
                            let str = [];
                            data.forEach(function (itemtype) {
                                str.push(`<font color="#d9683f">${itemtype}</font>`);
                            });
                            return str.join(" / ");
                        }
                    },
                    { data: "spec", title: "Specialties",
                        render: function (data, type, row) {
                            let str = [];
                            let heroClass = row.heroClass;
                            data.forEach(function (charspec) {
                                if (charspec === "No Specs!") {
                                    str.push("<i style='color: #5a7da0'>No Specs!</i>");
                                    return false;
                                }
                                let item_name = charspec.split(' - ')[0];
                                var item = $.grep(items, function (x) { return x.name === item_name })[0];
                                var item_spec = item.stats.spec;
                                str.push(`<font color="#${item.color}">${charspec}</font>`);
                                item_spec.forEach(function (spec, index) {
                                    if (index == 0) return;
                                    var char_name = spec.split(' - ')[0];
                                    var spec_info = spec.split(' - ')[1];
                                    if (char_name != heroClass) return;
                                    str.push(`${bullet2} <font color="#9B9B9B">${spec_info}</font>`);
                                });
                            });
                            return str.join("<br>");
                        }
                    }
                ]
            });
        }
        else {
            heroInfo_table.clear().draw();
            heroInfo_table.rows.add(selectedHero);
            heroInfo_table.columns.adjust().draw();
        }
        //// for hero-info table END ////

        //// for hero-skills table ////
        if (!$.fn.DataTable.isDataTable('#hero-skills')) {
            heroSkills_table = $('#hero-skills').DataTable({
                responsive: true,
                order: [],
                columnDefs: [
                    { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
                ],
                language: { search: "Quick Search:", processing: "Loading Skills..." },
                data: selectedSkills,
                dom: skillsDom,
                orderCellsTop: false,
                processing: true,
                columns: [
                    { data: "icon", title: "Icons", width: "8%", orderable: false,
                        render: function (data) {
                            if (!data) return "<i style='color: #5a7da0'>none</i>";
                            var img_url = encodeURI(`https://raw.githubusercontent.com/sfarmani/twicons/master/${data}`);
                            return `<img width="100%" src="${img_url}.jpg">`;
                        }
                    },
                    {  data: "hotkey", title: "Hotkey",
                        render: function (data) {
                            return `<font color="#ffff00">${data}</font>`;
                        }
                    },
                    { data: "name", title: "Name",
                        render: function (data, type, row) {
                            return `<font color="#${row.color}">${data}</font>`;
                        }
                    },
                    { data: "passive", title: "Passive",
                        render: function (data) {
                            if (!data) return "<i style='color: #5a7da0'>none</i>";
                            let str = [];
                            str.push(data.slice(0, 1));
                            data.forEach(function (pass, index) {
                                if (index === 0) return;
                                if (index <= (data.length / 2)) {
                                    str.push(`<font color="#80ff00">${pass}</font>`);
                                }
                                else {
                                    str.push(`<font color="#cd96ff">${pass}</font>`);
                                }
                            });
                            return str.join("<br>");
                        }
                    },
                    { data: "active", title: "Active",
                        render: function (data) {
                            if (!data) return "<i style='color: #5a7da0'>none</i>";
                            let str = [];
                            str.push(data.slice(0, 1));
                            data.forEach(function (act, index) {
                                if (index === 0) return;
                                if (index <= (data.length / 2)) {
                                    str.push(`<font color="#80ff00">${act}</font>`);
                                }
                                else {
                                    str.push(`<font color="#cd96ff">${act}</font>`);
                                }
                            });
                            return str.join("<br>");
                        }
                    },
                    { data: "toggle", title: "Toggle",
                        render: function (data) {
                            if (!data) return "<i style='color: #5a7da0'>none</i>";
                            let str = [];
                            str.push(data.slice(0, 1));
                            data.forEach(function (tog, index) {
                                if (index === 0) return;
                                if (index <= (data.length / 2)) {
                                    str.push(`<font color="#80ff00">${tog}</font>`);
                                }
                                else {
                                    str.push(`<font color="#cd96ff">${tog}</font>`);
                                }
                            });
                            return str.join("<br>");
                        }
                    }
                ]
            });
        }
        else {
            heroSkills_table.clear().draw();
            heroSkills_table.rows.add(selectedSkills);
            heroSkills_table.columns.adjust().draw();
        }
        //// for hero-skills table END ////

        //// Refresh column widths on click ////
        jQuery('.refreshColumns').on('click', function () {
            heroInfo_table.columns.adjust().draw(false);
            heroSkills_table.columns.adjust().draw(false);
        });
    });

    var sidebar = $("#sidebar");
    var hamburger = $('#navTrigger');

    hamburger.click(function (e) {
        e.preventDefault();
        $(this).toggleClass('is-active');
        // This will add `sidebar-opened`
        $('#wrapper').toggleClass("sidebar-opened");
        // Remove magin left
        sidebar.toggleClass('ml-0');
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