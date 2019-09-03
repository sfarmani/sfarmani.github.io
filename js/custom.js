
// Load different parts of the pages
$(function () {
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
        $('#items').DataTable({
            data: json,
            columns: [
                { data: "name", title: "Name" },
                { data: "koreanname", title: "Korean Name" },
                { data: "droprate", title: "Drop Rate" },
                { data: "type", title: "Item Type" },
                { data: "dropped_by", title: "Dropped By" },
                { data: "required_by", title: "Required By" },
                { data: "stats", title: "Stats" }
            ]
        });
    });
});