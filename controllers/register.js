$(document).ready(() => {
    $("#registerForm").submit((event) => {
        event.preventDefault();
        register()
    });

    function register() {
        let username = $("#username");
        let password = $("#password");
        let fieldset = $("#registerFieldset");

        fieldset.prop('disabled', true);

        let data = {
            username: username.val(),
            password: password.val()
        };

        $.ajax({
            type: 'POST',
            contentType: "application/json",
            url: "http://localhost:3000/api/account",
            data: JSON.stringify(data),
            dataType: "json",
            error: (error) => {
                showErrorNotification("Registration failed.")
            },
            complete: (jq, status) => {
                fieldset.prop('disabled', false);
            }
        });

        username.val("");
        password.val("");
        $("#rePassword").val("")
    }
});