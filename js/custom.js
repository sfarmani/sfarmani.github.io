
// Load different parts of the pages
$(function () {
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
    var data = [];
    $.getJSON("json/commands.json", function (json) {
        console.log(json);
        data = json;
    });
    console.log(data);

    $('#commands').DataTable({
        data: data,
        columns: [
            { title: "Command" },
            { title: "Usage" },
            { title: "Description" },
            { title: "Aliases" }
        ]
    });
});