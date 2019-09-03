
// Load different parts of the pages
$(function () {
    var trolls = ['[HEALED]', '[Air]'];
    var bullet = "∴";
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
    $.getJSON("json/commands.json", function (json) {
        $('#commands').DataTable({
            data: json,
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
        $('#items').DataTable({
            data: json,
            columns: [
                { data: "name", title: "Name", searchable: true },
                { data: "koreanname", title: "Korean Name", searchable: true, defaultContent: "<i>none</i>" },
                { data: "droprate", title: "Drop Rate", searchable: false,
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        data = Math.round(data * 10000) / 100;
                        return data + "%";
                    } 
                },
                { data: "type", title: "Item Type", searchable: true },
                { data: "dropped_by", title: "Dropped By", searchable: true,
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        return data.join(" / ");
                    }
                },
                { data: "required_by", title: "Required By", searchable: false,
                    render: function (data) {
                        if (!data) return "<i>none</i>";
                        return data.join(" / ");
                    }
                },
                { data: "stats", title: "Stats", searchable: false,
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
                            if (stat == 'damage') str.push(`${bullet} ${plusminus}${val} Damage`);
                            if (stat == 'armor') str.push(`${bullet} ${plusminus}${val} Armor`);
                            if (stat == 'mainstat') str.push(`${bullet} ${plusminus}${val} Main Stat`);
                            if (stat == 'allstat') str.push(`${bullet} ${plusminus}${val} All Stats`);
                            if (stat == 'strength') str.push(`${bullet} ${plusminus}${val} STR`);
                            if (stat == 'agility') str.push(`${bullet} ${plusminus}${val} AGI`);
                            if (stat == 'intelligence') str.push(`${bullet} ${plusminus}${val} INT`);
                            if (stat == 'hp') str.push(`${bullet} ${plusminus}${val} HP`);
                            if (stat == 'mp') str.push(`${bullet} ${plusminus}${val} MP`);
                            if (stat == 'attackspeedpercent') str.push(`${bullet} ${plusminus}${val}% Attack Speed`);
                            if (stat == 'movespeed') str.push(`${bullet} ${plusminus}${val} Movement Speed`);
                            if (stat == 'movespeedpercent') str.push(`${bullet} ${plusminus}${val}% Movement Speed`);
                            if (stat == 'dodgechancepercent') str.push(`${bullet} ${plusminus}${val}% Dodge Chance`);
                            if (stat == 'skilldamagepercent') str.push(`${bullet} ${plusminus}${val}% Skill Damage`);
                            if (stat == 'critchancepercent') str.push(`${bullet} ${plusminus}${val}% Crit Chance`);
                            if (stat == 'critmultiplier') str.push(`${bullet} ${plusminus}${val}x Crit Multiplier`);
                            if (stat == 'periodicdamagepercent') str.push(`${bullet} ${plusminus}${val}% Periodic Damage`);
                            if (stat == 'mdpercent') str.push(`${bullet} ${plusminus}${val}% Magic Defense`);
                            if (stat == 'drpercent') str.push(`${bullet} ${plusminus}${val}% Damage Reduction`);
                            if (stat == 'dtpercent') str.push(`${bullet} ${plusminus}${val}% Damage Taken`);
                            if (stat == 'healingpercent') str.push(`${bullet} ${plusminus}${val}% Healing`);
                            if (stat == 'healreceivedpercent') str.push(`${bullet} ${plusminus}${val}% Healing Received`);
                            if (stat == 'hpregen') str.push(`${bullet} ${plusminus}${val} HP regen`);
                            if (stat == 'mpregen') str.push(`${bullet} ${plusminus}${val} MP regen`);
                            if (stat == 'affinityiwpercent') str.push(`${bullet} ${plusminus}${val}% Ice/Water Affinity`);
                            if (stat == 'affinityflamepercent') str.push(`${bullet} ${plusminus}${val}% Flame Affinity`);
                            if (stat == 'affinityearthpercent') str.push(`${bullet} ${plusminus}${val}% Earth Affinity`);
                            if (stat == 'affinitywlpercent') str.push(`${bullet} ${plusminus}${val}% Wind/Lightning Affinity`);
                            if (stat == 'expreceivedpercent') str.push(`${bullet} ${plusminus}${val}% EXP Received`);
                            if (stat == 'revivaltimepercent') str.push(`${bullet} ${plusminus}${val}% Revival Time`);
                        });
                        return str.join('\n')
                    }
                }
            ]
        });
    });
});

function isFloat(n) {
    return Number(n) === n && n % 1 !== 0;
}