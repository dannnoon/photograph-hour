function navigate(page) {
    var data = {
        page: page
    };

    $.ajax({
        type: 'GET',
        url: "http://localhost:3000/",
        data: data,
        success: (html) => {
            let newDoc = document.open("text/html", "replace");
            newDoc.write(html);
            newDoc.close();
        },
        error: (error) => {
            showErrorNotification("Couldn't load requested page.\n")
        }
    })
}

function showErrorNotification(message) {
    let errorBody = "<div class=\"alert alert-danger alert-dismissible fade show\" role=\"alert\">\n" +
        message +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>";

    $("#notification").append(errorBody)
}