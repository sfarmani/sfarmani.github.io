
// Load different parts of the pages
$(function () {
    var trolls = ['[HEALED]', '[Air]'];
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
                { data: "droprate", title: "Drop Rate", searchable: false, defaultContent: "<i>none</i>" },
                { data: "type", title: "Item Type", searchable: true },
                { data: "dropped_by", title: "Dropped By", searchable: true, defaultContent: "<i>none</i>" },
                { data: "required_by", title: "Required By", searchable: false, defaultContent: "<i>none</i>" },
                { data: "stats", title: "Stats", searchable: false, defaultContent: "<i>none</i>" }
            ]
        });
    });
});