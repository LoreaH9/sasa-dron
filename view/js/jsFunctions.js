document.addEventListener("DOMContentLoaded", function (event) {

    sessionVarsView();

});

function sessionVarsView() {
    var url = "controller/cSessionVarsView.php";
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(result => {
        console.log(result);
        if (result.user.admin == 1) {
            $("#btnBanca").css('display', 'block');
            $('#nomUsu').removeAttr('data-bs-target');
            $("#nomUsu").text(result.user.nombre);
            $("#ddLg").css('display', 'none');
            $("#ddReg").css('display', 'none');
            $("#ddLo").css('display', 'block');

        }

    })
}

function login() {
    var email = $("#email").val();
    var password = $("#password").val();

    var url = "controller/cLogin.php";
    var data = { 'email': email, 'password': password }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    }).then(res => res.json()).then(result => {
        if (result.usuario.admin == 1) {
            $("#btnBanca").css('display', 'block');
            $("#ddLg").css('display', 'none');
            $("#ddReg").css('display', 'none');
            $("#ddLo").css('display', 'block');
            $('#login').modal('toggle');
            $('#nomUsu').removeAttr('data-bs-target');
            $("#nomUsu").text(result.usuario.nombre);
        }
    })
}
function register() {
    var url = "controller/cRegister.php";

    var nombre= $('#nameRegister').val();
    var email = $('#emailRegister').val();
    var contrasenia1 = $('#passwordRegister1').val();
    var contrasenia2 = $('#passwordRegister2').val();
    if (contrasenia1===contrasenia2){
        var data = {'sda':nombre};
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Cotent-Type': 'application/json' }
        }).then(res => res.json()).then(result =>{
             console.log(result);
        })
    }

 

}

function logout() {
    var url = "controller/cLogout.php";
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(result => {
        console.log(result);
        if (result.error == "no error") {
            $("#btnBanca").css('display', 'none');
            $("#ddLg").css('display', 'block');
            $("#ddReg").css('display', 'block');
            $("#ddLo").css('display', 'none');
            $("#nomUsu").text("Login");
            $('#nomUsu').attr('data-bs-target', '#login');
            $("#email").val("");
            $("#password").val("");
        }

    })
}
