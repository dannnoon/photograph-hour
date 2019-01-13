function showErrorNotification(message) {
    showNotification(message, "error")
}

function showSuccessNotification(message) {
    showNotification(message, "success")
}

function showNotification(message, type) {
    let alertType = "danger";

    switch (type) {
        case "error":
            alertType = "alert-danger";
            break;

        case "success":
            alertType = "alert-success";
            break;
    }

    let errorBody = "<div class=\"alert " + alertType + " alert-dismissible fade show\" role=\"alert\">\n" +
        message +
        "  <button type=\"button\" class=\"close\" data-dismiss=\"alert\" aria-label=\"Close\">\n" +
        "    <span aria-hidden=\"true\">&times;</span>\n" +
        "  </button>\n" +
        "</div>";

    $("#notification").append(errorBody)
}