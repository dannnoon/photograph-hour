$(document).ready(() => {
    const logoutAction = $("#logout");

    logoutAction.click(() => {
        logoutAction.prop("disable", true);

        $.ajax({
            type: "GET",
            url: "http://localhost:3000/api/account/logout",
            success: (data) => {
                location.reload()
            },
            error: (data) => {
                showErrorNotification("Logging out failed.")
            },
            complete: () => {
                logoutAction.prop("disable", false);
            }
        });
    });

    $.ajax({
        type: "GET",
        url: "http://localhost:3000/api/geolocalization",
        dataType: "json",
        success: (data) => {
            $("#country").text(data.country);
            $("#city").text(data.city);
        },
        error: (error) => {
            $("#country").text("Unknown");
            $("#city").text("Unknown");
        }
    })
});