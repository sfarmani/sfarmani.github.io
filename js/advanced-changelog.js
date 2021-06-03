$(function () {

    var changelog_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/changelog.json";
    var items_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/items.json";
    var heroes_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/heros.json";
    // var bosses_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/bosses.json";

    // var bugs_misc_dom = "<'row'<'col-sm-12'tr>>";

    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-md-1 mr-md-auto'l><'col-auto'p>>" +
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



    var bugs_events_misc_table;
    var items_table;
    var monsters_table;
    var heroes_table;

    bugs_events_misc_table = $('#bugs_events_misc').DataTable({
        responsive: true,
        columnDefs: [
            { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
        ],
        language: { processing: "Loading Change Log..." },
        lengthMenu: [3, 5, 10, 20, 50, 100],
        data: changelogs,
        dom: dom,
        ordering: false,
        order: [],
        orderCellsTop: false,
        processing: true,
        columns: [
            { data: "name", title: "Version", width: "5%", render: function (data) { return render_text(data) } },
            { data: "bugs", title: "Bug Fixes", width: "50%", render: function (data) { return print_array(data, '#00ff66') } },
            { data: "events", title: "Events", width: "50%", render: function (data) { return print_array(data, '#00dcff') } },
            { data: "misc", title: "Misc", width: "50%", render: function (data) { return print_array(data, '#00dcff') } }
        ]
    });

    items_table = $('#items').DataTable({
        responsive: true,
        columnDefs: [
            { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
        ],
        language: { processing: "Loading Change Log..." },
        lengthMenu: [3, 5, 10, 20, 50, 100],
        data: changelogs,
        dom: dom,
        ordering: false,
        order: [],
        orderCellsTop: false,
        processing: true,
        columns: [
            { data: "name", title: "Version", width: "5%", render: function (data) { return render_text(data) } },
            { data: "items", title: "Item Changes", width: "50%", render: function (data) { return print_combined_array(data, '#00ff66') } }
        ]
    });

    monsters_table = $('#monsters').DataTable({
        responsive: true,
        columnDefs: [
            { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
        ],
        language: { processing: "Loading Change Log..." },
        lengthMenu: [3, 5, 10, 20, 50, 100],
        data: changelogs,
        dom: dom,
        ordering: false,
        order: [],
        orderCellsTop: false,
        processing: true,
        columns: [
            { data: "name", title: "Version", width: "5%", render: function (data) { return render_text(data) } },
            { data: "monsters", title: "Monster Changes", width: "50%", render: function (data) { return print_combined_array(data, '#00ff66') } }
        ]
    });

    heroes_table = $('#heroes').DataTable({
        responsive: true,
        columnDefs: [
            { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>" }
        ],
        language: { processing: "Loading Change Log..." },
        lengthMenu: [3, 5, 10, 20, 50, 100],
        data: changelogs,
        dom: dom,
        ordering: false,
        order: [],
        orderCellsTop: false,
        processing: true,
        columns: [
            { data: "name", title: "Version", width: "5%", render: function (data) { return render_text(data) } },
            { data: "heroes", title: "Hero Changes", width: "50%", render: function (data) { return print_combined_array(data, '#00ff66') } }
        ]
    });

    $('input.column-filter').on('keyup search', function(){
        filterColumn($(this).parents('div').attr('data-column'), $($(this).attr('data-table')), $(this).attr('id'), this);
    });

    $('.refreshColumns').on('click', function () {
        bugs_events_misc_table.columns.adjust().draw(false);
        items_table.columns.adjust().draw(false);
        monsters_table.columns.adjust().draw(false);
        heroes_table.columns.adjust().draw(false);
    });

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

function filterColumn(i, table, column, ele) {
    // Toggle tables
    $($(ele).attr('data-item')).collapse('show');
    if ($(ele).val() == '') {
        $($(ele).attr('data-item')).collapse('hide');
    }
    // Filter the columns
    table.DataTable().column(i).search( $(`#${column}`).val() ).draw();
}

function render_text(str){
    return `<span style='color: #fff'>${str}</span>`;
}

function print_combined_array(array, color=''){
    if (!array) return "<i style='color: #5a7da0'>none</i>";
    var style = color ? ` style="color: ${color}"` : '';
    var result = [`<ul${style}>`];
    array.forEach(function (str) {
        result.push(`<li>${str.name}</li>`);
        if (Array.isArray(str.changes)) {
            result.push(print_array(str.changes));
        }
    });
    result.push("</ul>");
    return result.join('');
}

function print_array(array, color = '') {
    if (!array) return "<i style='color: #5a7da0'>none</i>";
    var style = color ? ` style="color: ${color}"` : '';
    var result = [`<ul${style}>`];
    array.forEach(function (str) {
        if (Array.isArray(str)) {
            result.push(print_array(str));
        }
        else {
            result.push(`<li>${str}</li>`);
        }
    });
    result.push("</ul>");
    return result.join('');
}

function render_items(array) {
    if (!array) return "<i style='color: #5a7da0'>none</i>";
    return array;
}

function render_item_changes(array) {
    if (!array) return "<i style='color: #5a7da0'>none</i>";
    return array;
}