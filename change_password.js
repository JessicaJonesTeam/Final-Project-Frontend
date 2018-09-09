$(document).ready(function (ev) {


    $('#change_password').click(function (ev) {
        ev.preventDefault();
        let password = $('#passwordOne').val();
        let passwordTwo = $('#passwordTwo').val();


        if (password !== passwordTwo) {
            alert("Passwords do not match");
            window.location.href = "/change_password";
        }

            $.ajax({
                type: 'POST',
                url: 'http://localhost:8000/change_password',
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                },
                data: JSON.stringify({
                    password
                })
            }).done(function (body) {

                // localStorage.clear()

                window.location.href = "/index.html";
            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();


            });
        }

    );
});