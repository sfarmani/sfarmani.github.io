
// Load different parts of the pages
$(function () {
    var trolls = ['[HEALED]', '[Air]'];
    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-sm-4 col-md-2'f><'col-sm-6 col-md-3'l><'col-sm-4 col-md-7'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
    // var bullet = "∴";
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
    $.getJSON("json/commands.json", function (json) {
        $('#commands').DataTable({
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

        $('#items thead tr').clone(true).appendTo('#items thead');
        $('#items thead tr:eq(1) th').each(function (i) {
            var title = $(this).text();
            $(this).html('<input type="text" placeholder="Search ' + title + '" />');

            $('input', this).on('keyup change', function () {
                if (table.column(i).search() !== this.value) {
                    table
                        .column(i)
                        .search(this.value)
                        .draw();
                }
            });
        });

        var items_table = $('#items').DataTable({
            data: json,
            dom: dom,
            orderCellsTop: true,
            fixedHeader: true,
            columns: [
                { data: "name", title: "Name", searchable: true },
                { data: "koreanname", title: "Korean Name", searchable: true, defaultContent: "<i>none</i>", visible: false },
                { data: "droprate", title: "Drop Rate", searchable: false,
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        data = Math.round(data * 10000) / 100;
                        return data + "%";
                    } 
                },
                { data: "type", title: "Item Type", searchable: true },
                { data: "dropped_by", title: "Dropped By", searchable: true, visible: false,
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        return data.join(" / ");
                    }
                },
                { data: "required_by", title: "Used In", searchable: false, visible: false,
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        return data.join(" / ");
                    }
                },
                { data: "stats", title: "Stats", searchable: true, width: "10%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
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
                            if (stat == 'damage') str.push(`${plusminus}${val} Damage`);
                            if (stat == 'armor') str.push(`${plusminus}${val} Armor`);
                            if (stat == 'mainstat') str.push(`${plusminus}${val} Main Stat`);
                            if (stat == 'allstat') str.push(`${plusminus}${val} All Stats`);
                            if (stat == 'strength') str.push(`${plusminus}${val} STR`);
                            if (stat == 'agility') str.push(`${plusminus}${val} AGI`);
                            if (stat == 'intelligence') str.push(`${plusminus}${val} INT`);
                            if (stat == 'hp') str.push(`${plusminus}${val} HP`);
                            if (stat == 'mp') str.push(`${plusminus}${val} MP`);
                            if (stat == 'attackspeedpercent') str.push(`${plusminus}${val}% Attack Speed`);
                            if (stat == 'movespeed') str.push(`${plusminus}${val} Movement Speed`);
                            if (stat == 'movespeedpercent') str.push(`${plusminus}${val}% Movement Speed`);
                            if (stat == 'dodgechancepercent') str.push(`${plusminus}${val}% Dodge Chance`);
                            if (stat == 'skilldamagepercent') str.push(`${plusminus}${val}% Skill Damage`);
                            if (stat == 'critchancepercent') str.push(`${plusminus}${val}% Crit Chance`);
                            if (stat == 'critmultiplier') str.push(`${plusminus}${val}x Crit Multiplier`);
                            if (stat == 'periodicdamagepercent') str.push(`${plusminus}${val}% Periodic Damage`);
                            if (stat == 'mdpercent') str.push(`${plusminus}${val}% Magic Defense`);
                            if (stat == 'drpercent') str.push(`${plusminus}${val}% Damage Reduction`);
                            if (stat == 'dtpercent') str.push(`${plusminus}${val}% Damage Taken`);
                            if (stat == 'healingpercent') str.push(`${plusminus}${val}% Healing`);
                            if (stat == 'healreceivedpercent') str.push(`${plusminus}${val}% Healing Received`);
                            if (stat == 'hpregen') str.push(`${plusminus}${val} HP regen`);
                            if (stat == 'mpregen') str.push(`${plusminus}${val} MP regen`);
                            if (stat == 'affinityiwpercent') str.push(`${plusminus}${val}% Ice/Water Affinity`);
                            if (stat == 'affinityflamepercent') str.push(`${plusminus}${val}% Flame Affinity`);
                            if (stat == 'affinityearthpercent') str.push(`${plusminus}${val}% Earth Affinity`);
                            if (stat == 'affinitywlpercent') str.push(`${plusminus}${val}% Wind/Lightning Affinity`);
                            if (stat == 'expreceivedpercent') str.push(`${plusminus}${val}% EXP Received`);
                            if (stat == 'revivaltimepercent') str.push(`${plusminus}${val}% Revival Time`);
                        });
                        return str.join('<br>');
                    }
                },
                { data: "stats.passive", title: "Passive", searchable: true, width: "20%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        let str = [];
                        data.forEach(function (ps) {
                            str.push(ps);
                        });
                        return str.join("<br>");
                    }
                },
                { data: "stats.active", title: "Active", searchable: true, width: "20%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        let str = [];
                        data.forEach(function (as) {
                            str.push(as);
                        });
                        return str.join("<br>");
                    }
                },
                { data: "stats.spec", title: "Character Specialties", searchable: true, width: "20%", visible: false,
                    render: function (data) {
                        if (!data) return "<i>none</i>";
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
                { data: "recipe", title: "Recipe", searchable: true, width: "20%",
                    render: function (data) {
                        if (!data) return "<i>none</i>";
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
                        return str.join(" + ");
                    }
                }
            ]
        });
    });
});

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}