// $(document).ready(function (ev) {
//
//
//
//     //<!-------------------ADMIN MODULE-----TESTED----------------!>
//
//
//     let auth = null;
//     let role = null;
//
//     $('#login-button').click(function (ev) {
//         ev.preventDefault();
//         let username = $('#username').val();
//         let password = $('#password').val();
//
//         $.ajax({
//             type: 'POST',
//             url: 'http://localhost:8080/login',
//             headers: {
//                 "Content-Type": "application/json"
//             },
//             data: JSON.stringify({
//                 "username": username,
//                 "password": password
//             })
//         }).done(function (body) {
//             auth = body["Authorization"];
//             localStorage.setItem("token", auth);
//             role = body["Role"];
//
//             if (role === "ROLE_USER") {
//                 window.location.href = "/bank";
//             } else {
//                 window.location.href = "/admin";
//             }
//         }).fail(function (xhr, status, error) {
//             new Noty({
//                 text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                 layout: 'topCenter',
//                 type: 'error',
//                 theme: 'mint',
//                 timeout: 3000
//             }).show();
//             // .fail()
//
//         });
//     });
//
//
//     $('#list-users-button').click(function (ev) {
//         $('main').empty()
//         ev.preventDefault();
//
//
//         $.ajax({
//             type: 'GET',
//             url: 'http://localhost:8080/admin/users',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": localStorage.getItem("token")
//             }
//
//         }).done((data) => {
//
//             $('main')
//                 .append(
//                     '<table class="table table-hover">' +
//                     '<thead>' +
//                     '<tr>' +
//                     '<th scope="col">ID</th>' +
//                     '<th scope="col">Username</th>' +
//                     '<th scope="col">Email</th>' +
//                     '<th scope="col">EIK</th>' +
//                     '<th scope="col">Roles</th>' +
//                     '</tr>' +
//                     '</thead>' +
//                     '<tbody>');
//             let json_obj = JSON.parse(data);
//             for (let i in json_obj) {
//                 $('table')
//                     .html(
//                         '<tr class="table-active">' +
//                         '<td>' + json_obj[i].id + '</td>' +
//                         '<td>' + json_obj[i].username + '</td>' +
//                         '<td>' + json_obj[i].email + '</td>' +
//                         '<td>' + json_obj[i].EIK + '</td>' +
//                         '<td>' + json_obj[i].role + '</td>' +
//                         // check
//                         '<td><button type="button mr-auto" class="btn btn-secondary" id="edit-user-button">Edit</button></td>' +
//                         '<td><button type="button mr-auto" class="btn btn-secondary" id="delete-user-button">Delete</button></td>' +
//                         '</tr>' +
//                         '</th>'
//                     )
//             }
//             $('table')
//                 .append(
//                     '</tbody>' +
//                     '</table>');
//         }).fail(function (xhr, status, error) {
//             new Noty({
//                 text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                 layout: 'topCenter',
//                 type: 'error',
//                 theme: 'mint',
//                 timeout: 3000
//             }).show();
//             // .fail()
//
//         });
//
//
//         $('main').off().on('click', '#delete-user-button', function (e) {
//             e.preventDefault();
//
//             var currow = $(this).closest('tr');
//             var userID = currow.find('td:eq(0)').text();
//             var username = currow.find('td:eq(1)').text();
//
//             $.ajax({
//                 type: 'POST',
//                 url: 'http://localhost:8080/admin/users/delete/' + userID,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 }
//             }).done(function (body) {
//                 new Noty({
//                     text: "Successfully deleted user - " + username + "!",
//                     layout: 'topCenter',
//                     type: 'success',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//
//             });
//             $(main).empty();
//
//         });
//
//         $('main').on('click', '#edit-user-button', function (e) {
//             e.preventDefault();
//
//             var currow = $(this).closest('tr');
//             var userID = currow.find('td:eq(0)').text();
//
//             $.ajax({
//                 type: 'GET',
//                 url: 'http://localhost:8080/admin/users/' + userID,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 }
//             }).done((data) => {
//                 var item = JSON.parse(data);
//                 $('main')
//                     .html(
//                         '<div class="container">' +
//                         '<div id="login-row" >' +
//                         // '<div id="login-column" class="col-md-6">' +
//                         // '<div id="login-box" class="col-md-12">' +
//                         '<form id="login-form" class="form" action="" method="post">' +
//                         '<h3 class="text-center>Edit user</h3>' +
//                         '<div class="form-group row">' +
//                         '<label for="id" >ID:</label>' +
//                         '<br>' +
//                         '<input type="text" name="id" id="id" value = "' + item.id + '" class="form-control" disabled>' +
//                         '</div>' +
//                         '<div class="form-group">' +
//                         '<label for="username" >Username:</label>' +
//                         '<br>' +
//                         '<input type="text" name="username" id="username" value = "' + item.username + '" class="form-control">' +
//                         '</div>' +
//                         '<div class="form-group">' +
//                         '<label for="password" >Password:</label>' +
//                         '<br>' +
//                         '<input type="password" name="password" id="password" value = "' + item.password + '" class="form-control">' +
//                         '</div>' +
//                         '<div class="form-group">' +
//                         '<label for="eik" >EIK:</label>' +
//                         '<br>' +
//                         '<input type="text" name="eik" id="eik" value = "' + item.EIK + '" class="form-control">' +
//                         '</div>' +
//                         '<div class="form-group">' +
//                         '<label for="email" >Email:</label>' +
//                         '<br>' +
//                         '<input type="email" name="email" id="email" value = "' + item.email + '" class="form-control">' +
//                         '</div>' +
//                         '<div class="form-group">' +
//                         '<button id = "save-user-button" type="button" name="submit" class=btn btn-primary" value="submit">Submit</button>' +
//                         '</div>' +
//                         '</form>' +
//                         '</div>' +
//                         '</div>' +
//                         '</div>' +
//                         '</div>'
//                     );
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//
//             });
//
//             $('main').off().on('click', '#save-user-button', function (ev) {
//                 ev.preventDefault();
//                 let id = $('#id').val();
//                 let username = $('#username').val();
//                 let password = $('#password').val();
//                 let eik = $('#eik').val();
//                 let email = $('#email').val();
//
//
//                 $.ajax({
//                     type: 'POST',
//                     url: 'http://localhost:8080/admin/users/update',
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": localStorage.getItem("token")
//                     },
//                     data: JSON.stringify({
//                         "id": id,
//                         "username": username,
//                         "password": password,
//                         "eik": eik,
//                         "email": email,
//                         // "roles": [{
//                         //     "authority": "ROLE_ADMIN"
//                         // }]
//
//                     })
//
//                 }).done(function (body) {
//                     new Noty({
//                         text: "Successfully edit user - " + username + "!",
//                         layout: 'topCenter',
//                         type: 'success',
//                         theme: 'mint',
//                         timeout: 3000
//                     }).show();
//                 }).fail(function (xhr, status, error) {
//                     new Noty({
//                         text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                         layout: 'topCenter',
//                         type: 'error',
//                         theme: 'mint',
//                         timeout: 3000
//                     }).show();
//                 });
//                 $(main).empty();
//
//             });
//         });
//
//
//     });
//
//     $('#create-users-button').click(function (ev) {
//
//         $('main')
//             .html(
//                 '<div class="container">' +
//                 '<div id="login-row" class="row justify-content-center align-items-center">' +
//                 '<div id="login-column" class="col-md-6">' +
//                 '<div id="login-box" class="col-md-12">' +
//                 '<form id="login-form" class="form" action="" method="post">' +
//                 '<h3 class="text-center">Create user</h3>' +
//                 '<div class="form-group">' +
//                 '<label for="username" >Username:</label>' +
//                 '<br>' +
//                 '<input type="text" name="username" id="username" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="password" >Password:</label>' +
//                 '<br>' +
//                 '<input type="password" name="password" id="password" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="eik" >EIK:</label>' +
//                 '<br>' +
//                 '<input type="text" name="eik" id="eik" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="email" >Email:</label>' +
//                 '<br>' +
//                 '<input type="email" name="email" id="email" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="role_category" >Authority:</label>' +
//                 '<br>' +
//                 '<select class="form-control" id = "role" name = "role">' +
//                 '<option value="ROLE_ADMIN">Admin</option>' +
//                 '<option value="ROLE_USER">User</option>' +
//                 '</select>' +
//                 '<br>' +
//                 '<div class="form-group">' +
//                 '<button id = "submit-users-button" type="button" name="submit" class=btn btn-primary" value="submit">Submit</button>' +
//                 '</div>' +
//                 '</form>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>'
//             );
//
//
//         $('main').off().on('click', '#submit-users-button', function (ev) {
//
//             ev.preventDefault();
//
//
//             let username = $('#username').val();
//             let password = $('#password').val();
//             let eik = $('#eik').val();
//             let email = $('#email').val();
//             let roles = [{
//                 "authority": $('#role').val()
//             }]
//
//
//             $.ajax({
//                 type: 'POST',
//                 url: 'http://localhost:8080/admin/users/create',
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 },
//                 data: JSON.stringify({
//                     "username": username,
//                     "password": password,
//                     "eik": eik,
//                     "email": email,
//                     roles: roles
//
//                 })
//
//             }).done(function (body) {
//                 new Noty({
//                     text: "Successfully create user - " + username + "!",
//                     layout: 'topCenter',
//                     type: 'success',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             });
//             $(main).empty();
//
//         });
//     });
//
//
// // $('#update-users-button').click(function (ev) {
// //     ev.preventDefault();
// //
// //     $.ajax({
// //         type: 'POST',
// //         url: 'http://localhost:8080/admin/users/update',
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Authorization": localStorage.getItem("token")
// //         },
// //         data: JSON.stringify({
// //             "username": username,
// //             "password": password,
// //             "eik": eik,
// //             "email": email
// //         })
// //
// //     }).done(function (body) {
// //         // create user
// //
// //     }).fail(function (xhr, status, error) {
// //         new Noty({
// //             text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
// //             layout: 'topCenter',
// //             type: 'error',
// //             theme: 'mint',
// //             timeout: 3000
// //         }).show();
// //     });
// // });
//
//     $('#create-bill-button').click(function (ev) {
//         // ev.preventDefault();
//         $('main').empty()
//
//         $('main')
//             .html(
//                 '<div class="container">' +
//                 '<div id="login-row" class="row justify-content-center align-items-center">' +
//                 '<div id="login-column" class="col-md-6">' +
//                 '<div id="login-box" class="col-md-12">' +
//                 '<form id="login-form" class="form" action="" method="post">' +
//                 '<h3 class="text-center">Create Bill</h3>' +
//                 '<div class="form-group">' +
//                 '<label for="subscriberPhone">Subscriber`s Phone number:</label>' +
//                 '<br>' +
//                 '<input type="text" name="subscriberPhone" id="subscriberPhone" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="service">Service:</label>' +
//                 '<br>' +
//                 '<select class="form-control" id = "service" name = "service">' +
//                 '<option value="television">Television</option>' +
//                 '<option value="internet">Internet</option>' +
//                 '<option value="telephone">Telephone</option>' +
//                 '</select>' +
//                 '</div>' +
//
//                 '<div class="form-group">' +
//                 '<label for="startDate" >Start Date:</label>' +
//                 '<br>' +
//                 '<input type="date" name="startDate" id="startDate" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="endDate" >End Date:</label>' +
//                 '<br>' +
//                 '<input type="date" name="endDate" id="endDate" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="amount">amount:</label>' +
//                 '<br>' +
//                 '<input type="text" name="amount" id="amount" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<label for="currency" >Currency:</label>' +
//                 '<br>' +
//                 '<select class="form-control" id = "currency" name = "currency">' +
//                 '<option value="bgn">Bgn</option>' +
//                 '<option value="usd">Usd</option>' +
//                 '<option value="eur">Eur</option>' +
//                 '</select>' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<button id = "submit-bill-button" type="button" name="submit" class=btn btn-primary" value="submit">Submit</button>' +
//                 '</div>' +
//                 '</form>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>' +
//                 '</div>'
//             );
//
//         $('main').off().on('click', '#submit-bill-button', function (ev) {
//             ev.preventDefault();
//
//
//             let subscriberPhone = $('#subscriberPhone').val();
//             let service = $('#service').val();
//             let startDate = $('#startDate').val();
//             let endDate = $('#endDate').val();
//             let amount = $('#amount').val();
//             let currencyName = $('#currency').val();
//
//
//             $.ajax({
//                 type: 'POST',
//                 url: 'http://localhost:8080/admin/bills/create',
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 },
//                 data: JSON.stringify({
//                     "subscriberPhone": subscriberPhone,
//                     "service": service,
//                     "startDate": startDate,
//                     "endDate": endDate,
//                     "amount": amount,
//                     "currencyName": currencyName
//
//                 })
//
//             }).done(function (body) {
//                 new Noty({
//                     text: "Successfully create new payment for - " + subscriberPhone + "!",
//                     layout: 'topCenter',
//                     type: 'success',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//
//             });
//             $(main).empty();
//
//         });
//     });
//
//
// //<!-------------------BANK MODULE------TESTED---------------!>
//
//
//     $('#list-unpaid_bills-button').click(function (ev) {
//         // $('main').empty()
//
//         ev.preventDefault();
//
//         $.ajax({
//             type: 'GET',
//             url: 'http://localhost:8080/bank/bills',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": localStorage.getItem("token")
//             }
//
//         }).done((data) => {
//             data = JSON.parse(data)
//             var json_obj = data;
//             $('main')
//                 .html(
//                     '<table class="table table-hover">' +
//                     '<thead>' +
//                     '<tr>' +
//                     '<th scope="col">ID</th>' +
//                     '<th scope="col">Subscriber</th>' +
//                     '<th scope="col">Phone Number</th>' +
//                     '<th scope="col">Service</th>' +
//                     '<th scope="col">Start Date</th>' +
//                     '<th scope="col">End Date</th>' +
//                     '<th scope="col">Amount</th>' +
//                     '<th scope="col">Currency</th>' +
//                     '</tr>' +
//                     '</thead>' +
//                     '<tbody>');
//             for (var i in json_obj) {
//                 $('table')
//                     .append(
//                         '<tr class="table-active">' +
//                         '<td>' + json_obj[i].id + '</td>' +
//                         '<td>' + json_obj[i].subscriber + '</td>' +
//                         '<td>' + json_obj[i].phoneNumber + '</td>' +
//                         '<td>' + json_obj[i].service + '</td>' +
//                         '<td>' + json_obj[i].startDate + '</td>' +
//                         '<td>' + json_obj[i].endDate + '</td>' +
//                         '<td>' + json_obj[i].amount + '</td>' +
//                         '<td>' + json_obj[i].currency + '</td>' +
//                         '<td><button type="button mr-auto" class="btn btn-secondary pay-bill-button" >Pay</button></td>' +
//                         '</tr>'
//                     )
//             }
//             $('table')
//                 .append(
//                     '</tbody>' +
//                     '</table>');
//         }).fail(function (xhr, status, error) {
//             new Noty({
//                 text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                 layout: 'topCenter',
//                 type: 'error',
//                 theme: 'mint',
//                 timeout: 3000
//             }).show();
//         });
//
//         $('main').off().on('click', '.pay-bill-button', function (e) {
//             e.preventDefault();
//
//             let currow = $(this).closest('tr');
//             let userID = currow.find('td:eq(0)').text();
//             let phoneNumber = currow.find('td:eq(2)').text();
//             let service = currow.find('td:eq(3)').text();
//
//
//             $.ajax({
//                 type: 'GET',
//                 url: 'http://localhost:8080/bank/subscribers/pay/' + phoneNumber + '/' + userID,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 }
//             }).done(function (body) {
//                 new Noty({
//                     text: "Successfully pay for - " + service + "for" + phoneNumber,
//                     layout: 'topCenter',
//                     type: 'success',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//
//             });
//             $(main).empty();
//
//         });
//
//
//     });
//
//
//     $('#list-unpaid_bills_subscriber-button').click(function (ev) {
//
//         // ev.preventDefault();
//
//         $('main')
//             .html(
//                 '<div class="container">' +
//                 '<div id="login-row" class="row justify-content-center align-items-center">' +
//                 '<div id="login-column" class="col-md-6">' +
//                 '<div id="login-box" class="col-md-12">' +
//                 '<form id="login-form" class="form" action="" method="post">' +
//                 '<h3 class="text-center">Enter Subscriber Phone Number</h3>' +
//                 '<div class="form-group">' +
//                 '<label for="phoneNumber" >Phone Number:</label>' +
//                 '<br>' +
//                 '<input type="text" name="phoneNumber" id="phoneNumber" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<button id = "submit-phone-button" type="button" name="submit" class=btn btn-primary" value="submit">Submit</button>' +
//                 '</div>'
//             );
//
//         $('main').off().on('click', '#submit-phone-button', function (ev) {
//
//             ev.preventDefault();
//
//             let phoneNumber = $('#phoneNumber').val();
//
//             $(main).empty();
//
//             $.ajax({
//                 type: 'GET',
//                 url: 'http://localhost:8080/bank/bills/unpaid/' + phoneNumber,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 }
//
//             }).done((data) => {
//                 data = JSON.parse(data)
//                 let json_obj = data;
//                 $('main')
//                     .html(
//                         '<table class="table table-hover">' +
//                         '<thead>' +
//                         '<tr>' +
//                         '<th scope="col">ID</th>' +
//                         '<th scope="col">Subscriber</th>' +
//                         '<th scope="col">Phone Number</th>' +
//                         '<th scope="col">Service</th>' +
//                         '<th scope="col">Start Date</th>' +
//                         '<th scope="col">End Date</th>' +
//                         '<th scope="col">Amount</th>' +
//                         '<th scope="col">Currency</th>' +
//                         '</tr>' +
//                         '</thead>' +
//                         '<tbody>');
//                 for (let i in json_obj) {
//                     $('table')
//                         .append(
//                             '<tr class="table-active">' +
//                             '<td>' + json_obj[i].id + '</td>' +
//                             '<td>' + json_obj[i].subscriber + '</td>' +
//                             '<td>' + json_obj[i].phoneNumber + '</td>' +
//                             '<td>' + json_obj[i].service + '</td>' +
//                             '<td>' + json_obj[i].startDate + '</td>' +
//                             '<td>' + json_obj[i].endDate + '</td>' +
//                             '<td>' + json_obj[i].amount + '</td>' +
//                             '<td>' + json_obj[i].currency + '</td>' +
//                             '<td><button type="button mr-auto" class="btn btn-secondary pay-bill-button" >Pay</button></td>' +
//                             '</tr>'
//                         )
//                 }
//                 $('table')
//                     .append(
//                         '</tbody>' +
//                         '</table>');
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             });
//
//             $('main').off().on('click', '.pay-bill-button', function (e) {
//                 e.preventDefault();
//
//                 let currow = $(this).closest('tr');
//                 let userID = currow.find('td:eq(0)').text();
//                 let phoneNumber = currow.find('td:eq(2)').text();
//                 let service = currow.find('td:eq(3)').text();
//
//
//                 $.ajax({
//                     type: 'GET',
//                     url: 'http://localhost:8080/bank/subscribers/pay/' + phoneNumber + '/' + userID,
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": localStorage.getItem("token")
//                     }
//                 }).done(function (body) {
//                     new Noty({
//                         text: "Successfully pay for - " + service + "for" + phoneNumber,
//                         layout: 'topCenter',
//                         type: 'success',
//                         theme: 'mint',
//                         timeout: 3000
//                     }).show();
//                 }).fail(function (xhr, status, error) {
//                     new Noty({
//                         text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                         layout: 'topCenter',
//                         type: 'error',
//                         theme: 'mint',
//                         timeout: 3000
//                     }).show();
//
//                 });
//                 $(main).empty();
//
//             })
//             ;
//
//         });
//
//
//     });
//
//
//     $('#list-subscribers-button').click(function (ev) {
//         // $('main').empty()
//
//         ev.preventDefault();
//
//         $.ajax({
//             type: 'GET',
//             url: 'http://localhost:8080/bank/subscribers',
//             headers: {
//                 "Content-Type": "application/json",
//                 "Authorization": localStorage.getItem("token")
//             }
//
//         }).done((data) => {
//
//             $('main')
//                 .html(
//                     '<table class="table table-hover">' +
//                     '<thead>' +
//                     '<tr>' +
//                     '<th scope="col">ID</th>' +
//                     '<th scope="col">Full Name</th>' +
//                     '<th scope="col">EGN</th>' +
//                     '<th scope="col">Phone Number</th>' +
//                     '<th scope="col">EGN</th>' +
//                     '</tr>' +
//                     '</thead>' +
//                     '<tbody>');
//             let json_obj = JSON.parse(data);
//             for (let i in json_obj) {
//                 $('table')
//                     .append(
//                         '<tr class="table-active">' +
//                         '<td>' + json_obj[i].id + '</td>' +
//                         '<td>' + json_obj[i].fullName + '</td>' +
//                         '<td>' + json_obj[i].egn + '</td>' +
//                         '<td>' + json_obj[i].phoneNumber + '</td>' +
//                         '<td>' + json_obj[i].egn + '</td>' +
//                         // check
//                         '<td><button type="button mr-auto" class="btn btn-secondary" id="subscriber-pending_payments-button">Pending Payments</button></td>' +
//                         '<td><button type="button mr-auto" class="btn btn-secondary" id="subscriber-all_payments-button">All Payments</button></td>' +
//                         '</tr>'
//                     )
//             }
//             $('table')
//                 .append(
//                     '</tbody>' +
//                     '</table>');
//         }).fail(function (xhr, status, error) {
//             new Noty({
//                 text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                 layout: 'topCenter',
//                 type: 'error',
//                 theme: 'mint',
//                 timeout: 3000
//             }).show();
//
//         });
//
//
//         $('main').off().on('click', '#subscriber-pending_payments-button', function (e) {
//             e.preventDefault();
//
//             let currow = $(this).closest('tr');
//             let userPhoneNumber = currow.find('td:eq(3)').text();
//
//             $(main).empty();
//
//             $.ajax({
//                 type: 'GET',
//                 url: 'http://localhost:8080/bank/bills/unpaid/' + userPhoneNumber,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 }
//             }).done((data) => {
//                 data = JSON.parse(data)
//                 let json_obj = data;
//                 $('main')
//                     .html(
//                         '<table class="table table-hover">' +
//                         '<thead>' +
//                         '<tr>' +
//                         '<th scope="col">ID</th>' +
//                         '<th scope="col">Subscriber</th>' +
//                         '<th scope="col">Phone Number</th>' +
//                         '<th scope="col">Service</th>' +
//                         '<th scope="col">Start Date</th>' +
//                         '<th scope="col">End Date</th>' +
//                         '<th scope="col">Amount</th>' +
//                         '<th scope="col">Currency</th>' +
//                         '</tr>' +
//                         '</thead>' +
//                         '<tbody>');
//                 for (let i in json_obj) {
//                     $('table')
//                         .append(
//                             '<tr class="table-active">' +
//                             '<td>' + json_obj[i].id + '</td>' +
//                             '<td>' + json_obj[i].subscriber + '</td>' +
//                             '<td>' + json_obj[i].phoneNumber + '</td>' +
//                             '<td>' + json_obj[i].service + '</td>' +
//                             '<td>' + json_obj[i].startDate + '</td>' +
//                             '<td>' + json_obj[i].endDate + '</td>' +
//                             '<td>' + json_obj[i].amount + '</td>' +
//                             '<td>' + json_obj[i].currency + '</td>' +
//                             '<td><button type="button mr-auto" class="btn btn-secondary pay-bill-button" >Pay</button></td>' +
//                             '</tr>'
//                         )
//                 }
//                 $('table')
//                     .append(
//                         '</tbody>' +
//                         '</table>');
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             });
// //bug: does not remove html from main
//             $('main').off().on('click', '.pay-bill-button', function (e) {
//                 e.preventDefault();
//
//
//                 let currow = $(this).closest('tr');
//                 let userID = currow.find('td:eq(0)').text();
//                 let phoneNumber = currow.find('td:eq(2)').text();
//                 let service = currow.find('td:eq(3)').text();
//
//
//                 $(main).empty();
//
//
//                 $.ajax({
//                     type: 'GET',
//                     url: 'http://localhost:8080/bank/subscribers/pay/' + phoneNumber + '/' + userID,
//                     headers: {
//                         "Content-Type": "application/json",
//                         "Authorization": localStorage.getItem("token")
//                     }
//                 }).done(function (body) {
//                     new Noty({
//                         text: "Successfully pay for - " + service + "for" + phoneNumber,
//                         layout: 'topCenter',
//                         type: 'success',
//                         theme: 'mint',
//                         timeout: 3000
//                     }).show();
//                 }).fail(function (xhr, status, error) {
//                     new Noty({
//                         text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                         layout: 'topCenter',
//                         type: 'error',
//                         theme: 'mint',
//                         timeout: 3000
//                     }).show();
//
//                 });
//             });
//
//
//         });
//
//         $('main').on('click', '#subscriber-all_payments-button', function (e) {
//             e.preventDefault();
//
//             let currow = $(this).closest('tr');
//             let userPhoneNumber = currow.find('td:eq(2)').text();
//
//             $(main).empty();
//
//             $.ajax({
//                 type: 'GET',
//                 url: 'http://localhost:8080/bank/bills/' + userPhoneNumber,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 }
//             }).done((data) => {
//                 data = JSON.parse(data)
//                 let json_obj = data;
//                 $('main')
//                     .html(
//                         '<table class="table table-hover">' +
//                         '<thead>' +
//                         '<tr>' +
//                         '<th scope="col">ID</th>' +
//                         '<th scope="col">Subscriber</th>' +
//                         '<th scope="col">Phone Number</th>' +
//                         '<th scope="col">Service</th>' +
//                         '<th scope="col">Start Date</th>' +
//                         '<th scope="col">End Date</th>' +
//                         '<th scope="col">Payment Date</th>' +
//                         '<th scope="col">Amount</th>' +
//                         '<th scope="col">Currency</th>' +
//                         '</tr>' +
//                         '</thead>' +
//                         '<tbody>');
//                 for (let i in json_obj) {
//                     $('table')
//                         .append(
//                             '<tr class="table-active">' +
//                             '<td>' + json_obj[i].id + '</td>' +
//                             '<td>' + json_obj[i].subscriber + '</td>' +
//                             '<td>' + json_obj[i].phoneNumber + '</td>' +
//                             '<td>' + json_obj[i].service + '</td>' +
//                             '<td>' + json_obj[i].startDate + '</td>' +
//                             '<td>' + json_obj[i].endDate + '</td>' +
//                             '<td>' + json_obj[i].paymentDate + '</td>' +
//                             '<td>' + json_obj[i].amount + '</td>' +
//                             '<td>' + json_obj[i].currency + '</td>' +
//                             '</tr>'
//                         )
//                 }
//                 $('table')
//                     .append(
//                         '</tbody>' +
//                         '</table>');
//
//             }).fail(function (xhr, status, error) {
//                 new Noty({
//                     text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                     layout: 'topCenter',
//                     type: 'error',
//                     theme: 'mint',
//                     timeout: 3000
//                 }).show();
//             });
//         });
//     });
//
//     $('#average_payment_sum_subscriber-button').click(function (ev) {
//         // ev.preventDefault();
//
//         $('main')
//             .html(
//                 '<div class="container">' +
//                 '<div id="login-row" class="row justify-content-center align-items-center">' +
//                 '<div id="login-column" class="col-md-6">' +
//                 '<div id="login-box" class="col-md-12">' +
//                 '<form id="login-form" class="form" action="" method="post">' +
//                 '<h3 class="text-center">Enter Subscriber Phone Number</h3>' +
//                 '<div class="form-group">' +
//                 '<label for="phoneNumber" >Phone Number:</label>' +
//                 '<br>' +
//                 '<input type="text" name="phoneNumber" id="phoneNumber" class="form-control">' +
//                 '</div>' +
//                 '<h3 class="text-center">Enter Start Date:</h3>' +
//                 '<div class="form-group">' +
//                 '<label for="startDate" >Start Date:</label>' +
//                 '<br>' +
//                 '<input type="date" name="startDate" id="startDate" class="form-control">' +
//                 '</div>' +
//                 '<h3 class="text-center">Enter End Date:</h3>' +
//                 '<div class="form-group">' +
//                 '<label for="endDate" >End Date:</label>' +
//                 '<br>' +
//                 '<input type="date" name="endDate" id="endDate" class="form-control">' +
//                 '</div>' +
//                 '<div class="form-group">' +
//                 '<button id = "submit-phone_and_time_interval-button" type="button" name="submit" class=btn btn-primary" value="submit">Submit</button>' +
//                 '</div>'
//             );
//
//         $('main').off().on('click', '#submit-phone_and_time_interval-button', function (ev) {
//
//             ev.preventDefault();
//
//
//             let phoneNumber = $('#phoneNumber').val();
//             let startDate = $('#startDate').val();
//             let endDate = $('#endDate').val();
//
//
//             $.ajax({
//                 type: 'POST',
//                 url: 'http://localhost:8080/bank/subscribers/average/' + phoneNumber + '/' + startDate + ',' + endDate,
//                 headers: {
//                     "Content-Type": "application/json",
//                     "Authorization": localStorage.getItem("token")
//                 }
//             })
//
//         }).done((data) => {
//             data = JSON.parse(data)
//             let json_obj = data;
//             $('main')
//                 .append(
//                     '<h3 class="text-center">Average Sum:</h3>' +
//                     '<div class="form-group">' +
//                     // '<label for="averageSum" >Start Date:</label>' +
//                     '<br>' +
//                     '<input type="text" name="averageSum" id="averageSum" value = "' + json_obj + '" class="form-control">' +
//                     '</div>');
//         }).fail(function (xhr, status, error) {
//             new Noty({
//                 text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
//                 layout: 'topCenter',
//                 type: 'error',
//                 theme: 'mint',
//                 timeout: 3000
//             }).show();
//         });
//         $(main).empty();
//
//     });
// });
//
// // $('main')
// //     .html(
// //
// // $('main').off().on('click', '#submit-phone_and_time_interval-button', function (e) {
// //     e.preventDefault();
// //
// //     let phoneNumber = $('#phoneNumber').val();
// //     let startDate = $('#startDate').val();
// //     let endDate = $('#endDate').val();
// //
// //
// //     $('table').detach()
// //
// //     $.ajax({
// //         type: 'GET',
// //         url: 'http://localhost:8080/bank/subscribers/average/' + phoneNumber + '/' + startDate + ',' + endDate,
// //         headers: {
// //             "Content-Type": "application/json",
// //             "Authorization": localStorage.getItem("token")
// //         }
// //     }).done((data) => {
// //         data = JSON.parse(data)
// //         let json_obj = data;
// //
// //
// //         $('main')
// //             .append(
// //                 '<h3 class="text-center">Average Sum:</h3>' +
// //                 '<div class="form-group">' +
// //                 // '<label for="averageSum" >Start Date:</label>' +
// //                 '<br>' +
// //                 '<input type="text" name="averageSum" id="averageSum" value = "' + json_obj + '" class="form-control">' +
// //                 '</div>');
// //
// //     }).fail(function (xhr, status, error) {
// //         new Noty({
// //             text: 'ERROR [' + xhr['status'] + ']: ' + xhr['responseText'],
// //             layout: 'topCenter',
// //             type: 'error',
// //             theme: 'mint',
// //             timeout: 3000
// //         }).show();
// //     });
// //
// // });
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
