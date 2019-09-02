
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
                { title: "Command" },
                { title: "Usage" },
                { title: "Description" },
                { title: "Aliases" }
            ]
        });
    });
});