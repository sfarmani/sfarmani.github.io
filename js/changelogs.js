$(function () {

    var changelog_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/changelog.json";
    var items_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/items.json";
    var heroes_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/heros.json";
    // var bosses_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/bosses.json";

    var bugs_misc_dom = "<'row'<'col-sm-12'tr>>";

    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";

    var changelogs;
    var items;
    var heroes;
    // var bosses;
    $.ajaxSetup({ async: false });
    $.getJSON(changelog_url, function (json) { changelogs = json });
    $.getJSON(items_url, function (json) { items = json });
    $.getJSON(heroes_url, function (json) { heroes = json });
    // $.getJSON(bosses_url, function (json) { bosses = json });
    $.ajaxSetup({ async: true });
    var selectdata = [];

    changelogs.forEach(function(changelog){
        selectdata.push(
            {
                "id": changelog.name,
                "text": changelog.name
            }
        )
    });

    //// create select2 ////
    $('select.changelog-select').select2(
        {
            theme: "default",
            data: selectdata,
            width: "35%",
            placeholder: "Select a Version"
        }
    );


    var bug_misc_table;
    var items_table;
    var events_table;
    var monsters_table;
    var hereoes_table;
    $('select.changelog-select').on('select2:select', function (e) {
        var version = e.params.data.text;
        var selected_version = changelogs.filter(x => x.name == version);
        
        if (selected_version[0].notes) {
            var notes = selected_version[0].notes.join("<br>");
            if ($('.notes_wrapper').hasClass('d-none')) {
                $('.notes_wrapper').removeClass('d-none');
            }
            $('.notes').html(notes);
        }
        ////////////////////////////////////////////// for bugs and misc table //////////////////////////////////////////////
        if ($.type(selected_version[0].bugs) != "undefined" || $.type(selected_version[0].misc) != "undefined"){
            $('.bugs_wrapper').removeClass('d-none');
            $('.bugs_table_wrapper').removeClass('d-none');
            if (!$.fn.DataTable.isDataTable('#bugs_and_misc')) {
                bug_misc_table = $('#bugs_and_misc').DataTable({
                    responsive: true,
                    columnDefs: [
                        { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
                    ],
                    language: { search: "Quick Search:", processing: "Loading Change Log..." },
                    data: selected_version,
                    dom: bugs_misc_dom,
                    ordering: false,
                    order: [],
                    orderCellsTop: false,
                    processing: true,
                    columns: [
                        { data: "bugs", title: "Bug Fixes", render: function (data) { return print_array(data, '#00ff66') } },
                        { data: "misc", title: "Misc", render: function (data) { return print_array(data, '#00dcff') } }
                    ]
                });
            }
            else {
                bug_misc_table.clear().draw();
                bug_misc_table.rows.add(selected_version);
                bug_misc_table.columns.adjust().draw();
            }
        }
        else if ($.fn.DataTable.isDataTable('#bugs_and_misc')) {
            $('.bugs_wrapper').addClass('d-none');
            $('.bugs_table_wrapper').addClass('d-none');
            bug_misc_table.destroy();
            $('table#bugs_and_misc').children().remove();
        }
        ////////////////////////////////////////////// for bugs and misc table END //////////////////////////////////////////////

        ////////////////////////////////////////////// for events table //////////////////////////////////////////////
        if ($.type(selected_version[0].events) != "undefined") {
            $('.events_wrapper').removeClass('d-none');
            $('.events_table_wrapper').removeClass('d-none');
            if (!$.fn.DataTable.isDataTable('#events')) {
                events_table = $('#events').DataTable({
                    responsive: true,
                    columnDefs: [
                        { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
                    ],
                    language: { search: "Quick Search:", processing: "Loading Change Log..." },
                    data: selected_version[0].events,
                    dom: dom,
                    order: [],
                    orderCellsTop: false,
                    processing: true,
                    columns: [
                        {
                            data: "name", title: "Event Name(s)",
                            render: function (data) {
                                if (!data) return "<i style='color: #5a7da0'>none</i>";
                                var str = [];
                                var names = data.split(' / ');
                                names.forEach(function (name) {
                                    str.push(`<span>${name}</span>`);
                                });
                                return str.join(' / ');
                            }
                        },
                        {
                            data: "changes", title: "Event Change(s)",
                            render: function (data) {
                                return print_array(data, '#ea3588');
                            }
                        }
                    ]
                });
            }
            else {
                events_table.clear().draw();
                events_table.rows.add(selected_version[0].events);
                events_table.columns.adjust().draw();
            }
        }
        else if ($.fn.DataTable.isDataTable('#events')) {
            $('.events_wrapper').addClass('d-none');
            $('.events_table_wrapper').addClass('d-none');
            events_table.destroy();
            $('table#events').children().remove();
        }
        ////////////////////////////////////////////// for events END //////////////////////////////////////////////

        ////////////////////////////////////////////// for items table //////////////////////////////////////////////
        if ($.type(selected_version[0].items) != "undefined") {
            $('.items_wrapper').removeClass('d-none');
            $('.items_table_wrapper').removeClass('d-none');
            if (!$.fn.DataTable.isDataTable('#items')) {
                items_table = $('#items').DataTable({
                    responsive: true,
                    columnDefs: [
                        { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
                    ],
                    language: { search: "Quick Search:", processing: "Loading Change Log..." },
                    data: selected_version[0].items,
                    dom: dom,
                    order: [],
                    orderCellsTop: false,
                    processing: true,
                    columns: [
                        { data: "name", title: "Item Name(s)",
                            render: function (data) {
                                if (!data) return "<i style='color: #5a7da0'>none</i>";
                                var str = [];
                                var names = data.split(' / ');
                                names.forEach(function(name){
                                    var color = items.filter(x => x.name === name).length === 0 ? 'fff' : items.filter(x => x.name === name)[0].color;
                                    str.push(`<span style="color: #${color}">${name}</span>`);
                                });
                                return str.join(' / ');
                            }
                        },
                        { data: "changes", title: "Item Change(s)",
                            render: function (data) {
                                return print_array(data, '#ea3588');
                            }
                        }
                    ]
                });
            }
            else {
                items_table.clear().draw();
                items_table.rows.add(selected_version[0].items);
                items_table.columns.adjust().draw();
            }
        }
        else if ($.fn.DataTable.isDataTable('#items')) {
            $('.items_wrapper').addClass('d-none');
            $('.items_table_wrapper').addClass('d-none');
            items_table.destroy();
            $('table#items').children().remove();
        }
        ////////////////////////////////////////////// for items table END //////////////////////////////////////////////

        ////////////////////////////////////////////// for monsters table //////////////////////////////////////////////
        if ($.type(selected_version[0].monsters) != "undefined") {
            $('.monsters_wrapper').removeClass('d-none');
            $('.monsters_table_wrapper').removeClass('d-none');
            if (!$.fn.DataTable.isDataTable('#monsters')) {
                monsters_table = $('#monsters').DataTable({
                    responsive: true,
                    columnDefs: [
                        { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
                    ],
                    language: { search: "Quick Search:", processing: "Loading Change Log..." },
                    data: selected_version[0].monsters,
                    dom: dom,
                    order: [],
                    orderCellsTop: false,
                    processing: true,
                    columns: [
                        { data: "name", title: "Monster Name(s)",
                            render: function (data) {
                                if (!data) return "<i style='color: #5a7da0'>none</i>";
                                var str = [];
                                var names = data.split(' / ');
                                names.forEach(function(name){
                                    // var color = bosses.filter(x => x.name === name).length === 0 ? 'fff' : bosses.filter(x => x.name === name)[0].color;
                                    var color = 'fff';
                                    str.push(`<span style="color: #${color}">${name}</span>`);
                                });
                                return str.join(' / ');
                            }
                        },
                        { data: "changes", title: "Monster Change(s)",
                            render: function (data) {
                                return print_array(data, '#ff8100');
                            }
                        }
                    ]
                });
            }
            else {
                monsters_table.clear().draw();
                monsters_table.rows.add(selected_version[0].monsters);
                monsters_table.columns.adjust().draw();
            }
        }
        else if ($.fn.DataTable.isDataTable('#monsters')) {
            $('.monsters_wrapper').addClass('d-none');
            $('.monsters_table_wrapper').addClass('d-none');
            monsters_table.destroy();
            $('table#monsters').children().remove();
        }
        ////////////////////////////////////////////// for monsters table END //////////////////////////////////////////////

        ////////////////////////////////////////////// for heroes table //////////////////////////////////////////////
        if ($.type(selected_version[0].heroes) != "undefined") {
            $('.heroes_wrapper').removeClass('d-none');
            $('.heroes_table_wrapper').removeClass('d-none');
            if (!$.fn.DataTable.isDataTable('#heroes')) {
                hereoes_table = $('#heroes').DataTable({
                    responsive: true,
                    columnDefs: [
                        { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
                    ],
                    language: { search: "Quick Search:", processing: "Loading Change Log..." },
                    data: selected_version[0].heroes,
                    dom: dom,
                    order: [],
                    orderCellsTop: false,
                    processing: true,
                    columns: [
                        { data: "name", title: "Hero Name(s)",
                            render: function (data) {
                                if (!data) return "<i style='color: #5a7da0'>none</i>";
                                var str = [];
                                var names = data.split(' / ');
                                names.forEach(function(name){
                                    var color = heroes.filter(x => x.heroClass === name).length === 0 ? 'fff' : heroes.filter(x => x.heroClass === name)[0].color;
                                    str.push(`<span style="color: #${color}">${name}</span>`);
                                });
                                return str.join(' / ');
                            }
                        },
                        { data: "changes", title: "Hero Change(s)",
                            render: function (data) {
                                return print_array(data, '#ea89da');
                            }
                        }
                    ]
                });
            }
            else {
                hereoes_table.clear().draw();
                hereoes_table.rows.add(selected_version[0].heroes);
                hereoes_table.columns.adjust().draw();
            }
        }
        else if ($.fn.DataTable.isDataTable('#heroes')) {
            $('.heroes_wrapper').addClass('d-none');
            $('.heroes_table_wrapper').addClass('d-none');
            hereoes_table.destroy();
            $('table#heroes').children().remove();
        }
        ////////////////////////////////////////////// for heroes table END //////////////////////////////////////////////
        jQuery('.refreshColumns').on('click', function () {
            bug_misc_table.columns.adjust().draw(false);
            items_table.columns.adjust().draw(false);
            monsters_table.columns.adjust().draw(false);
            hereoes_table.columns.adjust().draw(false);
        });
        $.fn.dataTable.tables({ api: true }).search($('.search_all input').val()).draw();
        if ($.fn.DataTable.isDataTable('#bugs_and_misc') || $.fn.DataTable.isDataTable('#items') || $.fn.DataTable.isDataTable('#monsters') || $.fn.DataTable.isDataTable('#heroes')) {
            if ($('.search_all').hasClass('d-none')) {
                $('.search_all').removeClass('d-none');
            }
        }
        else {
            $('.search_all').addClass('d-none');
        }
    });

    $('.search_all input').on('keyup change search', function(e){
        $.fn.dataTable.tables({ api: true }).search($(this).val()).draw();
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

function print_array(array, color=''){
    if (!array) return "<i style='color: #5a7da0'>none</i>";
    var style = color ? ` style="color: ${color}"` : '';
    var result = [`<ul${style}>`];
    array.forEach(function(str){
        if ($.type(str) === "array") {
            result.push(print_array(str));
        }
        else{
            result.push(`<li>${str}</li>`);
        }
    });
    result.push("</ul>");
    return result.join('');
}

function render_items(array){
    if (!array) return "<i style='color: #5a7da0'>none</i>";
    return array;
}

function render_item_changes(array) {
    if (!array) return "<i style='color: #5a7da0'>none</i>";
    return array;
}