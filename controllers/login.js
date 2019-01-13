$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        login()
    });

    function login() {
        const loginFieldset = $("#loginFieldset");
        const username = $("#username");
        const password = $("#password");

        loginFieldset.prop('disabled', true);

        const data = {
            username: username.val(),
            password: password.val()
        };

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:3000/api/account",
            data: data,
            dataType: "json",
            success: () => {
                location.reload(true);
            },
            error: function (error) {
                showErrorNotification("Incorrect username or password.");
            },
            complete: function (jq, status) {
                loginFieldset.prop('disabled', false);
            }
        });

        username.val("");
        password.val("");
    }
});