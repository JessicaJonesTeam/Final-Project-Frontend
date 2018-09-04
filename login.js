$(document).ready(function (ev) {



    //<!-------------------ADMIN MODULE-----TESTED----------------!>


    let auth = null;
    let role = null;

    $('#login-button').click(function (ev) {
        ev.preventDefault();
        let username = $('#username').val();
        let password = $('#password').val();

        $.ajax({
            type: 'POST',
            url: 'http://localhost:8080/login',
            headers: {
                "Content-Type": "application/json"
            },
            data: JSON.stringify({
                "username": username,
                "password": password
            })
        }).done(function (body) {
            auth = body["Authorization"];
            localStorage.setItem("token", auth);
            role = body["Role"];

            if (role === "ROLE_USER") {
                window.location.href = "/bank";
            } else {
                window.location.href = "/admin";
            }
        }).fail(function (xhr, status, error) {
            new Noty({
                text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                layout: 'topCenter',
                type: 'error',
                theme: 'mint',
                timeout: 3000
            }).show();
            // .fail()

        });

    });
});
