// Load different parts of the pages
$(function () {
    // localStorage.clear();
    $.fn.DataTable.ext.pager.numbers_length = 6;
    if ([null, "null"].includes(localStorage.getItem("items_columns"))){
        localStorage.setItem("items_columns", JSON.stringify([1, 3, 4, 5, 6, 7, 11]));
    }
    var trolls = ['[HEALED]', '[Air]'];
    var possibleStats =
        [
            'damage', 'armor', 'mainstat', 'allstat', 'strength', 'agility', 'intelligence', 'hp', 'mp', 'attackspeedpercent', 'movespeed', 'movespeedpercent',
            'dodgechancepercent', 'skilldamagepercent', 'critchancepercent', 'critmultiplier', 'periodicdamagepercent', 'mdpercent', 'drpercent', 'dtpercent',
            'healingpercent', 'healingreceivedpercent', 'hpregen', 'mpregen', 'affinityiwpercent', 'affinityflamepercent', 'affinityearthpercent', 'affinitywlpercent',
            'expreceivedpercent', 'revivaltimepercent'
        ];
    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
    // var bullet = "∴";
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
    $('#load_scripts').load('load_scripts.html');
    $.getJSON("json/commands.json", function (json) {
        $('#commands').DataTable({
            responsive: true,
            language: { search: "Quick Search:" },
            // colReorder: true,
            data: json,
            dom: dom,
            columns: [
                { data: "command", title: "Command" },
                { data: "usage", title: "Usage" },
                { data: "desc", title: "Description" },
                { data: "aliases", title: "Aliases" },
                { data: "cooldown", title: "Cooldown" }
            ]
        });
    });
    $.getJSON("json/items.json", function (json) {
        json = json.filter(x => !trolls.includes(x.type));

        var items_table = $('#items').DataTable({
            responsive: true,
            columnDefs: [
                { targets: '_all', defaultContent: "<i style='color: #5a7da0'>none</i>", width: "10%" }
            ],
            language: { search: "Quick Search:" },
            data: json,
            dom: dom,
            orderCellsTop: false,
            // fixedHeader: true,
            // colReorder: true,
            columns: [
                { data: "level", title: "Level",
                    render: function(data){
                        return `<span style="color: #ffff00">Lv. ${data}</span>`;
                    }
                },
                { data: "name", title: "Name",
                    render: function(data, type, row){
                        if (data == "Bag") console.log(json);
                        return `<span style="color: #${toHex(row.color)}">${data}</span>`;
                    }
                },
                { data: "koreanname", title: "Korean Name",
                    render: function(data, type, row){
                        return `<span style="color: #${toHex(row.color)}">${data}</span>`;
                    }
                },
                { data: "droprate", title: "Drop Rate",
                    render: function (data) {
                        if (!data) return "<i style='color: #5a7da0'>none</i>";
                        let str = [];
                        if (Array.isArray(data)) {
                            data.forEach(function(droprate){
                                str.push(`<span style="color: #4e9396">${(Math.round(droprate * 10000) / 100)}%</span>`);
                            });
                        }
                        else {
                            str.push(`<span style="color: #4e9396">${(Math.round(data * 10000) / 100)}%</span>`);
                        }
                        return str.join('<br>');
                    } 
                },
                { data: "type", title: "Item Type", 
                    render: function(data){
                        return `<span style="color: #fff">${data}</span>`;
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
                            if (stat == 'damage') str.push(`<span style="color: #ff8c00">${plusminus}${val} Damage</span>`);
                            if (stat == 'armor') str.push(`<span style="color: #ff8c00">${plusminus}${val} Armor</span>`);
                            if (stat == 'mainstat') str.push(`<span style="color: #ff8c00">${plusminus}${val} Main Stat</span>`);
                            if (stat == 'allstat') str.push(`<span style="color: #ff8c00">${plusminus}${val} All Stats</span>`);
                            if (stat == 'strength') str.push(`<span style="color: #ff8c00">${plusminus}${val} STR</span>`);
                            if (stat == 'agility') str.push(`<span style="color: #ff8c00">${plusminus}${val} AGI</span>`);
                            if (stat == 'intelligence') str.push(`<span style="color: #ff8c00">${plusminus}${val} INT</span>`);
                            if (stat == 'hp') str.push(`<span style="color: #ff8c00">${plusminus}${val} HP</span>`);
                            if (stat == 'mp') str.push(`<span style="color: #ff8c00">${plusminus}${val} MP</span>`);
                            if (stat == 'attackspeedpercent') str.push(`<span style="color: #ff8c00">${plusminus}${val}% Attack Speed</span>`);
                            if (stat == 'movespeed') str.push(`<span style="color: #ff8c00">${plusminus}${val} Movement Speed</span>`);
                            if (stat == 'movespeedpercent') str.push(`<span style="color: #ff8c00">${plusminus}${val}% Movement Speed</span>`);
                            if (stat == 'dodgechancepercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% Dodge Chance</span>`);
                            if (stat == 'skilldamagepercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% Skill Damage</span>`);
                            if (stat == 'critchancepercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% Crit Chance</span>`);
                            if (stat == 'critmultiplier') str.push(`<span style="color: #40e0d0">${plusminus}${val}x Crit Multiplier</span>`);
                            if (stat == 'periodicdamagepercent') str.push(`<span style="color: #ff1493">${plusminus}${val}% Periodic Damage</span>`);
                            if (stat == 'mdpercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% Magic Defense</span>`);
                            if (stat == 'drpercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% Damage Reduction</span>`);
                            if (stat == 'dtpercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% Damage Taken</span>`);
                            if (stat == 'healingpercent') str.push(`<span style="color: #ff8c00">${plusminus}${val}% Healing</span>`);
                            if (stat == 'healreceivedpercent') str.push(`<span style="color: #ff1493">${plusminus}${val}% Healing Received</span>`);
                            if (stat == 'hpregen') str.push(`<span style="color: #40e0d0">${plusminus}${val} HP regen</span>`);
                            if (stat == 'mpregen') str.push(`<span style="color: #40e0d0">${plusminus}${val} MP regen</span>`);
                            if (stat == 'affinityiwpercent') str.push(`<span style="color: #bae0fc">${plusminus}${val}% Ice/Water Affinity</span>`);
                            if (stat == 'affinityflamepercent') str.push(`<span style="color: #f8ae9c">${plusminus}${val}% Flame Affinity</span>`);
                            if (stat == 'affinityearthpercent') str.push(`<span style="color: #dfbf9f">${plusminus}${val}% Earth Affinity</span>`);
                            if (stat == 'affinitywlpercent') str.push(`<span style="color: #b5fbba">${plusminus}${val}% Wind/Lightning Affinity</span>`);
                            if (stat == 'expreceivedpercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% EXP Received</span>`);
                            if (stat == 'revivaltimepercent') str.push(`<span style="color: #40e0d0">${plusminus}${val}% Revival Time</span>`);
                        });
                        return str.join('<br>');
                    }
                },
                { data: "stats.passive", title: "Passive",
                    render: function (data) {
                        if (!data) return "<i style='color: #5a7da0'>none</i>";
                        let str = [];
                        data.forEach(function (ps) {
                            str.push(`<span style="color: #40e0d0">${ps}</span>`);
                        });
                        return str.join("<br>");
                    }
                },
                { data: "stats.active", title: "Active",
                    render: function (data) {
                        if (!data) return "<i style='color: #5a7da0'>none</i>";
                        let str = [];
                        data.forEach(function (as) {
                            str.push(`<span style="color: #40e0d0">${as}</span>`);
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
                                str.push(`<b><u>${Object.keys(rec)[0]}/${Object.keys(rec)[1]}</u></b>`);
                            }
                            else {
                                let count = rec[Object.keys(rec)] > 1 ? `x${rec[Object.keys(rec)]}` : '';
                                str.push(`${Object.keys(rec)} ${count}`);
                            }
                        });
                        return str.join(" <span style='color: #fff'>+</span> ");
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

        //// Get column names. ////
        var item_column_names = items_table.columns().header().toArray().map(x => x.innerText);

        //// replace headers with input boxes ////
        $('#items thead th').each(function (i) {
            var title = $(this).text();
            $(this).html('<input type="text"class="form-control form-control-sm" placeholder="Search ' + title + '" />');
        });

        //// Create an array of objects to insert into select2 ////
        var results = [];
        item_column_names.forEach(function (column_name, index) {
            var selected = JSON.parse(localStorage.getItem("items_columns")).includes(parseInt(index));
            var column = items_table.column(index);
            results.push({ "id": index, "text": column_name, "selected": selected});
            column.visible(selected);
        });
        items_table.columns.adjust().draw(false);

        //// create select2 ////
        $('select.items-select').select2(
            {
                theme: "classic",
                data: results,
                width: "50%",
                placeholder: "Select columns to toggle",
                closeOnSelect: false
            });

        //// enabling searching for individual columns ////
        items_table.columns().every(function () {
            var that = this;

            $('input', this.header()).on('keyup change clear click', function (e) {
                e.stopPropagation();
                if (that.search() !== this.value) {
                    that.search(this.value).draw();
                }
            });
        });

        //// toggle columns from the dropdown menu ////
        $('select.items-select').on('select2:select select2:unselect', function (e) {
            var column_id = parseInt(e.params.data.id);
            var column = items_table.column(e.params.data.id);
            column.visible(!column.visible());
            var selectedColumns = JSON.parse(localStorage.getItem("items_columns"));
            if (selectedColumns.includes(column_id)){
                selectedColumns.splice($.inArray(column_id, selectedColumns), 1);
                localStorage.setItem("items_columns", JSON.stringify(selectedColumns));
            }
            else {
                selectedColumns.push(column_id);
                localStorage.setItem("items_columns", JSON.stringify(selectedColumns));
            }
            items_table.columns.adjust().draw(false);
        });
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

function toHex(code) {
    let color = code.toString(16).padStart(6, 0);
    if (code == 16777215) color = 'BF4000'
    return color;
}