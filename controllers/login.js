$(document).ready(function () {
    $("#loginForm").submit(function (event) {
        event.preventDefault();
        login()
    });

    function login() {
        var loginFieldset = $("#loginFieldset");
        var username = $("#username");
        var password = $("#password");

        loginFieldset.prop('disabled', true);

        var data = {
            username: username.val(),
            password: password.val()
        };

        $.ajax({
            type: "GET",
            contentType: "application/json",
            url: "http://localhost:3000/api/account",
            data: data,
            dataType: "json",
            error: function (error) {
                showErrorNotification("Incorrect username or password.")
            },
            complete: function (jq, status) {
                loginFieldset.prop('disabled', false);
            }
        });

        username.val("");
        password.val("");
    }

    $("#registerLink").on('click', () => {
        navigate('register')
    });
});