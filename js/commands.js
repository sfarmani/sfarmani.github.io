// Load different parts of the pages
$(function () {

    var dom =
        "<'row'<'col-sm-4 col-md-2'i>>" +
        "<'row'<'col-auto mr-3 ml-3'f><'col-md-1 mr-md-auto'l><'col-auto'p>>" +
        "<'row'<'col-sm-12'tr>>" +
        "<'row'<'col-sm-12 col-md-5'i><'col-sm-12 col-md-7'p>>";
        
    $.getJSON("json/commands.json", function (json) {
        $('#commands').DataTable({
            responsive: true,
            language: { search: "Quick Search:", processing: "Loading Commands..." },
            processing: true,
            // colReorder: true,
            data: json,
            dom: dom,
            columns: [
                { data: "command", title: "Command", 
                    render: function(data){
                        return `<font color="#eade2c">${data}</font>`;
                    }
                },
                { data: "usage", title: "Usage", 
                    render: function(data){
                        return `<font color="#e48282">${data}</font>`;
                    }
                },
                { data: "desc", title: "Description", 
                    render: function(data){
                        return `<font color="#fff">${data}</font>`;
                    }
                },
                { data: "aliases", title: "Aliases", 
                    render: function(data){
                        return `<font color="#22bacc">${data}</font>`;
                    }
                },
                { data: "category", title: "Category", 
                    render: function(data){
                        return `<font color="#22bacc">${data}</font>`;
                    }
                },
                { data: "cooldown", title: "Cooldown" }
            ]
        });
    });

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


});