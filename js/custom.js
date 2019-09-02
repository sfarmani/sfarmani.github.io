
// Load different parts of the pages
$(function () {
    $('#load_headers').load('headers.html');
    $('#load_sidebar').load('sidebar.html');
    $('#load_banner').load('banner.html');
    $('#load_footer').load('footer.html');
    $.getJSON("../json/commands.json", function (json) {
        console.log("JSON Data received, name is " + json.name);
    });
    $('#commands').DataTable({
        data: dataSet,
        columns: [
            { title: "Command" },
            { title: "Usage" },
            { title: "Description" },
            { title: "Aliases" }
        ]
    });
});