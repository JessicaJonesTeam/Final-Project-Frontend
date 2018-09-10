$(document).ready(function (ev) {



    <!-- ============================================================== -->
    <!-- Unpaid Bills -->
    <!-- ============================================================== -->
    $('#list-unpaid_bills-button').click(function (ev) {

        ev.preventDefault();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/bank/bills',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        }).done((data) => {
            data = JSON.parse(data)
            var json_obj = data;
            $('main')
                .html(
                    <!-- ============================================================== -->
                    <!-- table -->
                    <!-- ============================================================== -->
                    '<table class="table table-hover" id="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col">ID</th>' +
                    '<th scope="col">Subscriber</th>' +
                    '<th scope="col">Phone Number</th>' +
                    '<th scope="col">Service</th>' +
                    '<th scope="col">Start Date</th>' +
                    '<th scope="col">End Date</th>' +
                    '<th scope="col">Amount</th>' +
                    '<th scope="col">Currency</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>');
            for (var i in json_obj) {
                $('table')
                    .append(
                        '<tr >' +
                        '<td>' + json_obj[i].id + '</td>' +
                        '<td>' + json_obj[i].subscriber + '</td>' +
                        '<td>' + json_obj[i].phoneNumber + '</td>' +
                        '<td>' + json_obj[i].service + '</td>' +
                        '<td>' + json_obj[i].startDate + '</td>' +
                        '<td>' + json_obj[i].endDate + '</td>' +
                        '<td>' + json_obj[i].amount + '</td>' +
                        '<td>' + json_obj[i].currency + '</td>' +
                        '<td><button type="button mr-auto" class="btn btn-secondary pay-bill-button" >Pay</button></td>' +
                        '</tr>'
                    )
            }
            $('table')
                .append(
                    '</tbody>' +
                    '</table>');
        }).fail(function (xhr, status, error) {
            new Noty({
                text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                layout: 'topCenter',
                type: 'error',
                theme: 'mint',
                timeout: 3000
            }).show();
        });

        <!-- ============================================================== -->
        <!-- PayBill Button -->
        <!-- ============================================================== -->
        $('main').off().on('click', '.pay-bill-button', function (e) {
            e.preventDefault();

            let currow = $(this).closest('tr');
            let userID = currow.find('td:eq(0)').text();
            let phoneNumber = currow.find('td:eq(2)').text();
            let service = currow.find('td:eq(3)').text();


            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/bank/subscribers/pay/' + phoneNumber + '/' + userID,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }).done(function (body) {
                new Noty({
                    text: "SUCCESSFULLY PAY FOR - " + service + "ON" + phoneNumber,
                    layout: 'topCenter',
                    type: 'success',
                    theme: 'mint',
                    timeout: 3000
                }).show();
            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();

            });
            $(main).empty();

        });


    });
    <!-- ============================================================== -->
    <!-- Unpaid Bills By Phone Number -->
    <!-- ============================================================== -->

    $('#list-unpaid_bills_subscriber-button').click(function (ev) {


        $('main')
            .html(
                '<br>'+
                '<br>'+
                '<div class="container">' +
                '<div class="container">' +
                '<div id="login-row" class="row justify-content-center align-items-center">' +
                '<div id="login-box" class="col-md-12">' +
                '<form id="login-form" class="form" action="" method="post">' +
                '<h3 class="text-center">Enter Subscriber Phone Number</h3>' +
                '<div class="form-group">' +
                '<label for="phoneNumber" >Phone Number:</label>' +
                '<br>' +
                '<input type="text" name="phoneNumber" id="phoneNumber" class="form-control">' +
                '</div>' +
                '<div class="form-group">' +
                '<button id = "submit-phone-button" type="button" class="btn btn-secondary" name="submit" value="submit">Submit</button>' +
                '</div>'
            );


        <!-- ============================================================== -->
        <!-- Submit Button -->
        <!-- ============================================================== -->
        $('.tier1').off().on('click', '#submit-phone-button', function (ev) {

            ev.preventDefault();

            let phoneNumber = $('#phoneNumber').val();


            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/bank/bills/unpaid/' + phoneNumber,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }

            }).done((data) => {
                data = JSON.parse(data)
                let json_obj = data;
                $('main')
                    .html(
                        <!-- ============================================================== -->
                        <!-- table -->
                        <!-- ============================================================== -->
                        '<table class="table table-hover" id="table">' +
                        '<thead>' +
                        '<tr>' +
                        '<th scope="col">ID</th>' +
                        '<th scope="col">Subscriber</th>' +
                        '<th scope="col">Phone Number</th>' +
                        '<th scope="col">Service</th>' +
                        '<th scope="col">Start Date</th>' +
                        '<th scope="col">End Date</th>' +
                        '<th scope="col">Amount</th>' +
                        '<th scope="col">Currency</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>');
                for (let i in json_obj) {
                    $('table')
                        .append(
                            '<tr >' +
                            '<td>' + json_obj[i].id + '</td>' +
                            '<td>' + json_obj[i].subscriber + '</td>' +
                            '<td>' + json_obj[i].phoneNumber + '</td>' +
                            '<td>' + json_obj[i].service + '</td>' +
                            '<td>' + json_obj[i].startDate + '</td>' +
                            '<td>' + json_obj[i].endDate + '</td>' +
                            '<td>' + json_obj[i].amount + '</td>' +
                            '<td>' + json_obj[i].currency + '</td>' +
                            '<td><button type="button mr-auto" class="btn btn-secondary pay-bill-button" >Pay</button></td>' +
                            '</tr>'
                        )
                }
                $('table')
                    .append(
                        '</tbody>' +
                        '</table>');
            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();
            });
            <!-- ============================================================== -->
            <!-- PayBill Button -->
            <!-- ============================================================== -->
            $('main').off().on('click', '.pay-bill-button', function (e) {
                e.preventDefault();

                let currow = $(this).closest('tr');
                let userID = currow.find('td:eq(0)').text();
                let phoneNumber = currow.find('td:eq(2)').text();
                let service = currow.find('td:eq(3)').text();


                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/bank/subscribers/pay/' + phoneNumber + '/' + userID,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                }).done(function (body) {
                    new Noty({
                        text: "SUCCESSFULLY PAY FOR - " + service + "ON" + phoneNumber,
                        layout: 'topCenter',
                        type: 'success',
                        theme: 'mint',
                        timeout: 3000
                    }).show();
                }).fail(function (xhr, status, error) {
                    new Noty({
                        text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                        layout: 'topCenter',
                        type: 'error',
                        theme: 'mint',
                        timeout: 3000
                    }).show();

                });
                $(main).empty();

            })
            ;

        });


    });

    <!-- ============================================================== -->
    <!-- List All Subscribers -->
    <!-- ============================================================== -->
    $('#list-subscribers-button').click(function (ev) {

        ev.preventDefault();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/bank/subscribers',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        }).done((data) => {

            $('main')
                .html(
                    '<table class="table table-hover" id="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col">ID</th>' +
                    '<th scope="col">Full Name</th>' +
                    '<th scope="col">EGN</th>' +
                    '<th scope="col">Phone Number</th>' +
                    '<th scope="col">Services</th>' +
                    '<th scope="col">Total paid</th>' +
                    '<th scope="col">EGN</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>');
            let json_obj = JSON.parse(data);
            for (let i in json_obj) {
                $('table')
                    .append(
                        '<tr >' +
                        '<td>' + json_obj[i].id + '</td>' +
                        '<td>' + json_obj[i].fullName + '</td>' +
                        '<td>' + json_obj[i].egn + '</td>' +
                        '<td>' + json_obj[i].phoneNumber + '</td>' +
                        '<td>' + json_obj[i].services[0] + " " +
                        json_obj[i].services[1] + " " +
                        json_obj[i].services[2] + '</td>' +
                        '<td>' + json_obj[i].totalPaid + " BGN" + '</td>' +
                        '<td>' + json_obj[i].egn + '</td>' +
                        '<td>' +
                        '<button type="button mr-auto" class="btn btn-secondary" id="subscriber-pay_all_payments-button">Pay All</button>' +
                        '<button type="button mr-auto" class="btn btn-secondary" id="subscriber-pending_payments-button">Pending</button>' +
                        '<button type="button mr-auto" class="btn btn-secondary" id="subscriber-all_payments-button">History</button>' +
                        '<td>' +
                        '</tr>'
                    )
            }
            $('table')
                .append(
                    '</tbody>' +
                    '</table>');
        }).fail(function (xhr, status, error) {
            new Noty({
                text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                layout: 'topCenter',
                type: 'error',
                theme: 'mint',
                timeout: 3000
            }).show();

        });

        <!-- ============================================================== -->
        <!-- Pending Paiments Button -->
        <!-- ============================================================== -->
        $('.tier1').on('click', '#subscriber-pending_payments-button', function (e) {

            e.preventDefault();

            let currow = $(this).closest('tr');
            let userPhoneNumber = currow.find('td:eq(3)').text();


            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/bank/bills/unpaid/' + userPhoneNumber,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }).done((data) => {
                data = JSON.parse(data)
                let json_obj = data;
                $('main')
                    .html(
                        <!-- ============================================================== -->
                        <!-- table -->
                        <!-- ============================================================== -->
                        '<table class="table table-hover" id="table">' +
                        '<thead>' +
                        '<tr>' +
                        '<th scope="col">ID</th>' +
                        '<th scope="col">Subscriber</th>' +
                        '<th scope="col">Phone Number</th>' +
                        '<th scope="col">Service</th>' +
                        '<th scope="col">Start Date</th>' +
                        '<th scope="col">End Date</th>' +
                        '<th scope="col">Amount</th>' +
                        '<th scope="col">Currency</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>');
                for (let i in json_obj) {
                    $('table')
                        .append(
                            '<tr >' +
                            '<td>' + json_obj[i].id + '</td>' +
                            '<td>' + json_obj[i].subscriber + '</td>' +
                            '<td>' + json_obj[i].phoneNumber + '</td>' +
                            '<td>' + json_obj[i].service + '</td>' +
                            '<td>' + json_obj[i].startDate + '</td>' +
                            '<td>' + json_obj[i].endDate + '</td>' +
                            '<td>' + json_obj[i].amount + '</td>' +
                            '<td>' + json_obj[i].currency + '</td>' +
                            '<td><button type="button mr-auto" class="btn btn-secondary pay-bill-button" >Pay</button></td>' +
                            '</tr>'
                        )
                }
                $('table')
                    .append(
                        '</tbody>' +
                        '</table>');
            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();
            });

            <!-- ============================================================== -->
            <!-- PayBill Button -->
            <!-- ============================================================== -->
            $('.tier1').off().on('click', '.pay-bill-button', function (e) {
                e.preventDefault();


                let currow = $(this).closest('tr');
                let userID = currow.find('td:eq(0)').text();
                let phoneNumber = currow.find('td:eq(2)').text();
                let service = currow.find('td:eq(3)').text();


                $.ajax({
                    type: 'GET',
                    url: 'http://localhost:8000/bank/subscribers/pay/' + phoneNumber + '/' + userID,
                    headers: {
                        "Content-Type": "application/json",
                        "Authorization": localStorage.getItem("token")
                    }
                }).done(function (body) {

                    new Noty({
                        text: "SUCCESSFULLY PAY FOR - " + service + "ON" + phoneNumber,
                        layout: 'topCenter',
                        type: 'success',
                        theme: 'mint',
                        timeout: 3000

                    }).show();
                }).fail(function (xhr, status, error) {
                    new Noty({
                        text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                        layout: 'topCenter',
                        type: 'error',
                        theme: 'mint',
                        timeout: 3000
                    }).show();

                });

            });


        });
        <!-- ============================================================== -->
        <!-- PayAll Button -->
        <!-- ============================================================== -->
        $('main').off().on('click', '#subscriber-pay_all_payments-button', function (e) {
            e.preventDefault();


            let currow = $(this).closest('tr');
            let phoneNumber = currow.find('td:eq(2)').text();
            alert(phoneNumber)

            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/bank/subscribers/pay/' + phoneNumber,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }).done(function (body) {
                new Noty({
                    text: "SUCCESSFULLY PAY ALL BILLS ON - " + phoneNumber,
                    layout: 'topCenter',
                    type: 'success',
                    theme: 'mint',
                    timeout: 3000
                }).show();
            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();

            });
        });

        <!-- ============================================================== -->
        <!-- Subscriber History -->
        <!-- ============================================================== -->
        $('main').on('click', '#subscriber-all_payments-button', function (e) {
            e.preventDefault();

            let currow = $(this).closest('tr');
            let userPhoneNumber = currow.find('td:eq(2)').text();


            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/bank/subscribers/history/' + userPhoneNumber,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }
            }).done((data) => {
                data = JSON.parse(data)
                let json_obj = data;
                $('main')
                    .html(
                        '<table class="table table-hover" id="table">' +
                        '<thead>' +
                        '<tr>' +
                        '<th scope="col">ID</th>' +
                        '<th scope="col">Subscriber</th>' +
                        '<th scope="col">Phone Number</th>' +
                        '<th scope="col">Service</th>' +
                        '<th scope="col">Start Date</th>' +
                        '<th scope="col">End Date</th>' +
                        '<th scope="col">Payment Date</th>' +
                        '<th scope="col">Amount</th>' +
                        '<th scope="col">Currency</th>' +
                        '</tr>' +
                        '</thead>' +
                        '<tbody>');
                for (let i in json_obj) {
                    $('table')
                        .append(
                            '<tr >' +
                            '<td>' + json_obj[i].id + '</td>' +
                            '<td>' + json_obj[i].subscriber + '</td>' +
                            '<td>' + json_obj[i].phoneNumber + '</td>' +
                            '<td>' + json_obj[i].service + '</td>' +
                            '<td>' + json_obj[i].startDate + '</td>' +
                            '<td>' + json_obj[i].endDate + '</td>' +
                            '<td>' + json_obj[i].paymentDate + '</td>' +
                            '<td>' + json_obj[i].amount + '</td>' +
                            '<td>' + json_obj[i].currency + '</td>' +
                            '</tr>'
                        )
                }
                $('table')
                    .append(
                        '</tbody>' +
                        '</table>');

            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();
            });
        });
    });

    <!-- ============================================================== -->
    <!-- Calculations -->
    <!-- ============================================================== -->
    $('#average_payment_sum_subscriber-button').click(function () {

        $('main')
            .html(
                '<br>'+
                '<br>'+
                '<div class="container">' +
                '<div id="login-row" class="row justify-content-center align-items-center">' +
                '<div id="login-column" class="col-md-6">' +
                '<div id="login-box" class="col-md-12">' +
                '<form id="login-form" class="form" action="" method="post">' +
                '<h3 class="text-center">Enter Subscriber Phone Number</h3>' +
                '<div class="form-group">' +
                '<label for="phoneNumber" >Phone Number:</label>' +
                '<br>' +
                '<input type="text" name="phoneNumber" id="phoneNumber" class="form-control">' +
                '</div>' +
                '<h3 class="text-center">Enter Start Date:</h3>' +
                '<div class="form-group">' +
                '<label for="startDate" >Start Date:</label>' +
                '<br>' +
                '<input type="date" name="startDate" id="startDate" class="form-control">' +
                '</div>' +
                '<h3 class="text-center">Enter End Date:</h3>' +
                '<div class="form-group">' +
                '<label for="endDate" >End Date:</label>' +
                '<br>' +
                '<input type="date" name="endDate" id="endDate" class="form-control">' +
                '</div>' +
                '<div class="form-group">' +
                '<button id = "avg-phone_and_time_interval-button" type="button" class="btn btn-secondary" name="submit" value="submit">AVG</button>' +
                '<button id = "max-phone_and_time_interval-button" type="button" class="btn btn-secondary" name="submit"  value="submit">MAX</button>' +
                '</div>'
            );

        <!-- ============================================================== -->
        <!-- Average -->
        <!-- ============================================================== -->
        $('main').on('click', '#avg-phone_and_time_interval-button', function (ev) {

            ev.preventDefault();


            let phoneNumber = $('#phoneNumber').val();
            let startDate = $('#startDate').val();
            let endDate = $('#endDate').val();


            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/bank/subscribers/average/' + phoneNumber + '/' + startDate + ',' + endDate,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }


            }).done((data) => {
                data = JSON.parse(data);
                let json_obj = data;
                alert(json_obj);
                $('.container')
                    .append(
                        '<div id="login-row" class="row justify-content-center align-items-center">' +
                        '<div id="login-column" class="col-md-6">' +
                        '<div id="login-box" class="col-md-12">' +
                        '<h3 class="text-center">Average Sum:</h3>' +
                        '<div class="form-group">' +
                        // '<label for="averageSum" >Start Date:</label>' +
                        '<br>' +
                        '<input type="text" name="averageSum" id="averageSum" value = "' + (json_obj) + '" class="form-control">' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );
            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();
            });


        });
        <!-- ============================================================== -->
        <!-- Max -->
        <!-- ============================================================== -->
        $('main').on('click', '#max-phone_and_time_interval-button', function (ev) {

            ev.preventDefault();


            let phoneNumber = $('#phoneNumber').val();
            let startDate = $('#startDate').val();
            let endDate = $('#endDate').val();


            $.ajax({
                type: 'GET',
                url: 'http://localhost:8000/bank/subscribers/max/' + phoneNumber + '/' + startDate + ',' + endDate,
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": localStorage.getItem("token")
                }


            }).done((data) => {
                data = JSON.parse(data);
                let json_obj = data;
                alert(json_obj);
                $('.container')
                    .append(
                        '<div id="login-row" class="row justify-content-center align-items-center">' +
                        '<div id="login-column" class="col-md-6">' +
                        '<div id="login-box" class="col-md-12">' +
                        '<h3 class="text-center">Max Sum:</h3>' +
                        '<div class="form-group">' +
                        // '<label for="averageSum" >Start Date:</label>' +
                        '<br>' +
                        '<input type="text" name="maxSum" id="maxSum" value = "' + (json_obj) + '" class="form-control">' +
                        '</div>' +
                        '</div>' +
                        '</div>'
                    );
            }).fail(function (xhr, status, error) {
                new Noty({
                    text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                    layout: 'topCenter',
                    type: 'error',
                    theme: 'mint',
                    timeout: 3000
                }).show();
            });

        });

    });

    <!-- ============================================================== -->
    <!-- Recent Payments -->
    <!-- ============================================================== -->
    $('#recent_payments-button').click(function (ev) {

        ev.preventDefault();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/bank/bills/recent',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        }).done((data) => {
            data = JSON.parse(data)
            var json_obj = data;
            $('main')
                .html(
                    '<table class="table table-hover" id="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col">ID</th>' +
                    '<th scope="col">Subscriber</th>' +
                    '<th scope="col">Phone Number</th>' +
                    '<th scope="col">Service</th>' +
                    '<th scope="col">Start Date</th>' +
                    '<th scope="col">End Date</th>' +
                    '<th scope="col">Payment Date</th>' +
                    '<th scope="col">Amount</th>' +
                    '<th scope="col">Currency</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>');
            for (var i in json_obj) {
                $('table')
                    .append(
                        '<tr >' +
                        '<td>' + json_obj[i].id + '</td>' +
                        '<td>' + json_obj[i].subscriber + '</td>' +
                        '<td>' + json_obj[i].phoneNumber + '</td>' +
                        '<td>' + json_obj[i].service + '</td>' +
                        '<td>' + json_obj[i].startDate + '</td>' +
                        '<td>' + json_obj[i].endDate + '</td>' +
                        '<td>' + json_obj[i].paymentDate + '</td>' +
                        '<td>' + json_obj[i].amount + '</td>' +
                        '<td>' + json_obj[i].currency + '</td>' +
                        '</tr>'
                    )
            }
            $('table')
                .append(
                    '</tbody>' +
                    '</table>');
        }).fail(function (xhr, status, error) {
            new Noty({
                text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                layout: 'topCenter',
                type: 'error',
                theme: 'mint',
                timeout: 3000
            }).show();
        });
    });

    <!-- ============================================================== -->
    <!-- Top Payers -->
    <!-- ============================================================== -->
    $('#top_paid_sum-button').click(function (ev) {

        ev.preventDefault();

        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/bank/subscribers/top',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }

        }).done((data) => {
            $('main')
                .html(
                    '<table class="table table-hover" id="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col">ID</th>' +
                    '<th scope="col">Full Name</th>' +
                    '<th scope="col">EGN</th>' +
                    '<th scope="col">Phone Number</th>' +
                    '<th scope="col">Total paid</th>' +
                    '<th scope="col">EGN</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>');
            let json_obj = JSON.parse(data);
            for (let i in json_obj) {
                $('table')
                    .append(
                        '<tr >' +
                        '<td>' + json_obj[i].id + '</td>' +
                        '<td>' + json_obj[i].fullName + '</td>' +
                        '<td>' + json_obj[i].egn + '</td>' +
                        '<td>' + json_obj[i].phoneNumber + '</td>' +
                        '<td>' + json_obj[i].totalPaid + " BGN" + '</td>' +
                        '<td>' + json_obj[i].egn + '</td>' +
                        '<td>' +
                        '<td>' +
                        '</tr>'
                    )
            }
            $('table')
                .append(
                    '</tbody>' +
                    '</table>');
        }).fail(function (xhr, status, error) {
            new Noty({
                text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                layout: 'topCenter',
                type: 'error',
                theme: 'mint',
                timeout: 3000
            }).show();

        });

    });

    <!-- ============================================================== -->
    <!-- Payment History Desc -->
    <!-- ============================================================== -->
    $('#show-payments-history-descending').click( function (e) {
        e.preventDefault();

        let currow = $(this).closest('tr');
        let userPhoneNumber = currow.find('td:eq(2)').text();


        $.ajax({
            type: 'GET',
            url: 'http://localhost:8000/bank/bills/history',
            headers: {
                "Content-Type": "application/json",
                "Authorization": localStorage.getItem("token")
            }
        }).done((data) => {
            data = JSON.parse(data)
            let json_obj = data;
            $('main')
                .html(
                    '<table class="table table-hover" id="table">' +
                    '<thead>' +
                    '<tr>' +
                    '<th scope="col">ID</th>' +
                    '<th scope="col">Subscriber</th>' +
                    '<th scope="col">Phone Number</th>' +
                    '<th scope="col">Service</th>' +
                    '<th scope="col">Start Date</th>' +
                    '<th scope="col">End Date</th>' +
                    '<th scope="col">Payment Date</th>' +
                    '<th scope="col">Amount</th>' +
                    '<th scope="col">Currency</th>' +
                    '</tr>' +
                    '</thead>' +
                    '<tbody>');
            for (let i in json_obj) {
                $('table')
                    .append(
                        '<tr >' +
                        '<td>' + json_obj[i].id + '</td>' +
                        '<td>' + json_obj[i].subscriber + '</td>' +
                        '<td>' + json_obj[i].phoneNumber + '</td>' +
                        '<td>' + json_obj[i].service + '</td>' +
                        '<td>' + json_obj[i].startDate + '</td>' +
                        '<td>' + json_obj[i].endDate + '</td>' +
                        '<td>' + json_obj[i].paymentDate + '</td>' +
                        '<td>' + json_obj[i].amount + '</td>' +
                        '<td>' + json_obj[i].currency + '</td>' +
                        '</tr>'
                    )
            }
            $('table')
                .append(
                    '</tbody>' +
                    '</table>');

        }).fail(function (xhr, status, error) {
            new Noty({
                text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
                layout: 'topCenter',
                type: 'error',
                theme: 'mint',
                timeout: 3000
            }).show();
        });
    });

    <!-- ============================================================== -->
    <!-- Logout -->
    <!-- ============================================================== -->

    $('#logout').click(function () {

        localStorage.clear();
        window.location.href = "/index.html";
    });
});
