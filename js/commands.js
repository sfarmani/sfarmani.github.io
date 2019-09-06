// Load different parts of the pages
$(function () {

    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
    
    $.getJSON("json/commands.json", function (json) {
        $('#commands').DataTable({
            responsive: true,
            language: { search: "Quick Search:", processing: "Loading Commands..." },
            processing: true,
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
});