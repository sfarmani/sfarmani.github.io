// Load different parts of the pages
$(function () {
    var items_url = "https://raw.githubusercontent.com/sfarmani/twrpg-info/master/items.json";

    // 0 = Icons
    // 1 = Level
    // 2 = Worth
    // 3 = Name
    // 4 = Korean Name
    // 5 = Drop Rate
    // 6 = Item Grade
    // 7 = Item Type
    // 8 = Dropped By
    // 9 = Used In
    // 10 = Stats
    // 11 = Passive
    // 12 = Active
    // 13 = Character Specialties
    // 14 = Recipe
    // 15 = Drops
    // 16 = Notes

    localStorage.clear();
    if ([null, "null"].includes(localStorage.getItem("items_columns"))){
        localStorage.setItem("items_columns", JSON.stringify([3, 5, 6, 7, 10, 11, 12, 14]));
    }
    var possibleStats =
        [
            'damage', 'armor', 'mainstat', 'allstat', 'strength', 'agility', 'intelligence', 'hp', 'mp', 'attackspeedpercent', 'movespeed', 'movespeedpercent',
            'dodgechancepercent', 'skilldamagepercent', 'critchancepercent', 'critmultiplier', 'periodicdamagepercent', 'mdpercent', 'drpercent', 'dtpercent', 'dt',
            'healingpercent', 'healingreceivedpercent', 'hpregen', 'mpregen', 'affinityiwpercent', 'affinityflamepercent', 'affinityearthpercent', 'affinitywlpercent',
            'expgainpercent', 'revivaltimepercent', 'damagedealtpercent', 'aadamagepercent'
        ];

    var grades = {
        1: {
            name: 'Deltirama',
            color: 'C39BE1'
        },
        2: {
            name: 'Neptinos',
            color: '9BE1E1'
        },
        3: {
            name: 'Gnosis',
            color: 'DC143C'
        },
        4: {
            name: 'Alteia',
            color: '99FF99'
        }
    };

    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
    
    var items;

    $.ajaxSetup({ async: false });
    $.getJSON(items_url, function (json) { items = json });
    $.ajaxSetup({ async: true });

    var items_table = $('#items').DataTable({
        responsive: true,
        columnDefs: [
            { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>", width: "10%" }
        ],
        language: { search: "Quick Search:", processing: "Loading Items..." },
        data: items,
        dom: dom,
        order: [],
        orderCellsTop: false,
        processing: true,
        initComplete: function() {

            var this_table = this.api();
            var item_column_names = this_table.columns().header().toArray().map(x => x.innerText);
            //// replace headers with input boxes ////
            $('#items thead th').each(function (i) {
                var title = $(this).text();
                if (title == 'Icons' || title == 'Name') return;
                $(this).html('<input type="text"class="form-control form-control-sm" placeholder="Search ' + title + '" />');
            });

            //// Create an array of objects to insert into select2 ////
            var data = [];
            item_column_names.forEach(function (column_name, index) {
                if (column_name == "Icons") return;
                var selected = JSON.parse(localStorage.getItem("items_columns")).includes(parseInt(index));
                var column = this_table.column(index);
                data.push({ "id": index, "text": column_name, "selected": selected });
                column.visible(['Name', 'Korean Name', 'Item Type'].includes(column_name) ? true : selected);
            });

            //// create select2 ////
            $('select.items-select').select2(
                {
                    theme: "default",
                    data: data,
                    width: "50%",
                    placeholder: "Select columns to toggle",
                    closeOnSelect: false
                }
            );

            //// enabling searching for individual columns ////
            this_table.columns().every(function () {
                var that = this;

                $('input', this.header()).on('keyup change clear click', function (e) {
                    e.stopPropagation();
                    if (that.search() !== this.value) {
                        that.search(this.value).draw();
                    }
                });
            });

            //// Name, Korean Name, Item Type ////
            var column_ids = [3, 4, 6, 7];

            //// Replace 3 above headers to dropdowns and enable searching for them ////
            column_ids.forEach(function(id){
                var column = this_table.column(id);
                var column_name = item_column_names[id];
                var column_name_altered = column_name.replace(/\s+/gi, '_').toLowerCase();
                var select = $(`<select class="${column_name_altered}-select"><option value=""></option></select>`)
                    .appendTo($(column.header()).empty())
                    .on('change', function () {
                        var val = $.fn.dataTable.util.escapeRegex($(this).val());
                        column.search(val ? '^' + val + '$' : '', true, false).draw();
                    });
                column.data().unique().sort().each(function (d, j) {
                    select.append('<option value="' + d + '">' + d + '</option>');
                });

                //// create select2 ////
                $(`select.${column_name_altered}-select`).select2(
                    {
                        theme: "default",
                        allowClear: true,
                        width: "100%",
                        placeholder: `Search ${column_name}`
                    }
                );
                var selected = JSON.parse(localStorage.getItem("items_columns")).includes(parseInt(id));
                column.visible(selected);

            });
            this_table.columns.adjust().draw(false);
            
            //// Disable sorting when clicked on dropdown ////
            $('#items th').on('focus click change', 'span.select2', function (e) { e.stopPropagation(); });
        },
        columns: [
            { title: "Icons", width: "5%", orderable: false,
                render: function (data, type, row) {
                    var url_name = row.name;
                    if (row.type === "Token") url_name = "Token";
                    if (row.name.match(/Sealed\s/) && !["Sealed Weapon"].includes(row.name)) url_name = row.name.replace(/Sealed\s/, '');
                    var img_url = encodeURI(`https://raw.githubusercontent.com/sfarmani/twicons/master/${url_name}`);
                    return `<img width="100%" src="${img_url}.jpg" alt="${url_name}">`;
                }
            },
            { data: "level", title: "Level",
                render: function(data, type){
                    if (type == "sort" || type == "type") return !data ? 0 : data;
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    return `<font color="#ffff00">Lv. ${data}</font>`;
                }
            },
            { data: "worth", title: "Worth",
                render: function (data, type) {
                    if (type == "sort" || type == "type") return !data ? 0 : data;
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    return `<font color="#ffff00">${data} Prius Silver Coin${data > 1 ? 's' : ''}</font>`;
                }
            },
            { data: "name", title: "Name",
                render: function(data, type, row){
                    return `<font color="#${row.color}">${data}</font>`;
                }
            },
            { data: "koreanname", title: "Korean Name",
                render: function(data, type, row){
                    return `<font color="#${row.color}">${data}</font>`;
                }
            },
            { data: "droprate", title: "Drop Rate",
                render: function (data, type) {
                    if (type == "sort" || type == "type") return !data ? 0 : data;
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    let str = [];
                    if (Array.isArray(data)) {
                        data.forEach(function(droprate){
                            str.push(`<font color="#4e9396">${(Math.round(droprate * 10000) / 100)}%</font>`);
                        });
                    }
                    else {
                        str.push(`<font color="#4e9396">${(Math.round(data * 10000) / 100)}%</font>`);
                    }
                    return str.join('<br>');
                } 
            },
            { data: "grade", title: "Item Grade", 
                render: function(data){
                    var color = grades[data.grade].color;
                    return `<font color="#${color}">${data}</font>`;
                }
            },
            { data: "type", title: "Item Type", 
                render: function(data){
                    return `<font color="#fff">${data}</font>`;
                }
            },
            { data: "dropped_by", title: "Dropped By",
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    return data.join("<br>");
                }
            },
            { data: "required_by", title: "Used In",
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    return data.join(" / ");
                }
            },
            { data: "stats", title: "Stats",
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    if (diff(possibleStats, Object.keys(data)).length <= 0) return "<i style='color: #5a7da0'>none</i>";
                    let str = [];
                    Object.keys(data).forEach(function (stat) {
                        let val = data[stat];
                        let plusminus = ""
                        if (Number.isInteger(val) || isFloat(val)) {
                            if (val >= 0) plusminus = "+";
                            if (!['critmultiplier', 'hpregen', 'mpregen'].includes(stat)) {
                                if (isFloat(val)) val = Math.round(val * 10000) / 100;
                            }
                        }
                        if (stat === 'damage') str.push(`<font color="#ff8c00">${plusminus}${val} Damage</font>`);
                        if (stat === 'aadamagepercent') str.push(`<font color="#ff8c00">${plusminus}${val}% Auto-attack Damage</font>`);
                        if (stat === 'armor') str.push(`<font color="#ff8c00">${plusminus}${val} Armor</font>`);
                        if (stat === 'mainstat') str.push(`<font color="#ff8c00">${plusminus}${val} Main Stat</font>`);
                        if (stat === 'allstat') str.push(`<font color="#ff8c00">${plusminus}${val} All Stats</font>`);
                        if (stat === 'str') str.push(`<font color="#ff8c00">${plusminus}${val} STR</font>`);
                        if (stat === 'agi') str.push(`<font color="#ff8c00">${plusminus}${val} AGI</font>`);
                        if (stat === 'int') str.push(`<font color="#ff8c00">${plusminus}${val} INT</font>`);
                        if (stat === 'hp') str.push(`<font color="#ff8c00">${plusminus}${val} HP</font>`);
                        if (stat === 'mp') str.push(`<font color="#ff8c00">${plusminus}${val} MP</font>`);
                        if (stat === 'attackspeedpercent') str.push(`<font color="#ff8c00">${plusminus}${val}% Attack Speed</font>`);
                        if (stat === 'movespeed') str.push(`<font color="#ff8c00">${plusminus}${val} Movement Speed</font>`);
                        if (stat === 'movespeedpercent') str.push(`<font color="#ff8c00">${plusminus}${val}% Movement Speed</font>`);
                        if (stat === 'dodgechancepercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Dodge Chance</font>`);
                        if (stat === 'skilldamagepercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Skill Damage</font>`);
                        if (stat === 'critchancepercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Crit Chance</font>`);
                        if (stat === 'critmultiplier') str.push(`<font color="#40e0d0">${plusminus}${val}x Crit Multiplier</font>`);
                        if (stat === 'periodicdamagepercent') str.push(`<font color="#ff1493">${plusminus}${val}% Periodic Damage</font>`);
                        if (stat === 'mdpercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Magic Defense</font>`);
                        if (stat === 'drpercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Damage Reduction</font>`);
                        if (stat === 'dtpercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Damage Taken</font>`);
                        if (stat === 'dt') str.push(`<font color="#40e0d0">${plusminus}${val} Damage Taken</font>`);
                        if (stat === 'damagedealtpercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Damage Dealt</font>`);
                        if (stat === 'healingpercent') str.push(`<font color="#ff8c00">${plusminus}${val}% Healing Done</font>`);
                        if (stat === 'healreceivedpercent') str.push(`<font color="#ff1493">${plusminus}${val}% Healing Received</font>`);
                        if (stat === 'hpregen') str.push(`<font color="#40e0d0">${plusminus}${val} HP regen</font>`);
                        if (stat === 'mpregen') str.push(`<font color="#40e0d0">${plusminus}${val} MP regen</font>`);
                        if (stat === 'affinityiwpercent') str.push(`<font color="#bae0fc">${plusminus}${val}% Ice/Water Affinity</font>`);
                        if (stat === 'affinityflamepercent') str.push(`<font color="#f8ae9c">${plusminus}${val}% Flame Affinity</font>`);
                        if (stat === 'affinityearthpercent') str.push(`<font color="#dfbf9f">${plusminus}${val}% Earth Affinity</font>`);
                        if (stat === 'affinitywlpercent') str.push(`<font color="#b5fbba">${plusminus}${val}% Wind/Lightning Affinity</font>`);
                        if (stat === 'expgainpercent') str.push(`<font color="#40e0d0">${plusminus}${val}% EXP Gain</font>`);
                        if (stat === 'revivaltimepercent') str.push(`<font color="#40e0d0">${plusminus}${val}% Revival Time</font>`);
                    });
                    return str.join('<br>');
                }
            },
            { data: "stats.passive", title: "Passive",
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    let str = [];
                    data.forEach(function (ps) {
                        str.push(`<font color="#40e0d0">${ps}</font>`);
                    });
                    return str.join("<br>");
                }
            },
            { data: "stats.active", title: "Active",
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    let str = [];
                    data.forEach(function (as) {
                        str.push(`<font color="#40e0d0">${as}</font>`);
                    });
                    return str.join("<br>");
                }
            },
            { data: "stats.spec", title: "Character Specialties",
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    let str = [];
                    data.forEach(function (ss, index) {
                        if (index == 0) { return; }
                        if (ss.match(/\s-\s/)) {
                            let specSplit = ss.split(' - ');
                            str.push(`${specSplit[0]} - ${specSplit[1]}`);
                        }
                        else {
                            str.push(ss);
                        }
                    });
                    return str.join("<br>");
                }
            },
            { data: "recipe", title: "Recipe",
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    let str = [];
                    data.forEach(function (rec) {
                        if (Object.keys(rec).length > 1) {
                            let color0 = $.grep(items, function(x){ return x.name === Object.keys(rec)[0] })[0].color;
                            let color1 = $.grep(items, function(x){ return x.name === Object.keys(rec)[1] })[0].color;
                            str.push(`<u><font color="#${color0}">${Object.keys(rec)[0]}</font>/<font color="#${color1}">${Object.keys(rec)[1]}</font></u>`);
                        }
                        else {
                            let count = rec[Object.keys(rec)] > 1 ? ` <font color="#fff">x</font><font color="#ff8c00">${rec[Object.keys(rec)]}</font>` : '';
                            let color = $.grep(items, function (x) { return x.name === Object.keys(rec)[0] })[0].color;
                            str.push(`<font color="#${color}">${Object.keys(rec)}</font>${count}`);
                        }
                    });
                    return str.join(' + ');
                }
            },
            { data: "drops", title: "Drops", 
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    return data.join("<br>");
                }
            },
            { data: "notes", title: "Notes", 
                render: function (data) {
                    if (!data) return "<i style='color: #5a7da0'>none</i>";
                    return data.join("<br>");
                }
            }
        ]
    });

    jQuery('.load_message').toggle();

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

    //// toggle columns from the dropdown menu ////
    $('select.items-select').on('select2:select select2:unselect', function (e) {
        var column_id = parseInt(e.params.data.id);
        var column = items_table.column(e.params.data.id);
        column.visible(!column.visible());
        $('#items th').on('focus click change', 'span.select2', function (e) { e.stopPropagation(); });
        var selectedColumns = JSON.parse(localStorage.getItem("items_columns"));
        if (selectedColumns.includes(column_id)) {
            selectedColumns.splice($.inArray(column_id, selectedColumns), 1);
            localStorage.setItem("items_columns", JSON.stringify(selectedColumns));
        }
        else {
            selectedColumns.push(column_id);
            localStorage.setItem("items_columns", JSON.stringify(selectedColumns));
        }
        items_table.columns.adjust().draw(false);
    });

    //// Refresh column widths on click ////
    jQuery('.refreshColumns').on('click', function () {
        items_table.columns.adjust().draw(false);
        items_table.colResize.redraw();
    });
});

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}

function diff(arr1, arr2) {
    var ret = [];
    for (var i in arr1) {
        if (arr2.indexOf(arr1[i]) > -1) {
            ret.push(arr1[i]);
        }
    }
    return ret;
}