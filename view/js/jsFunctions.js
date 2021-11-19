
$(document).ready(sessionVarsView);

function sessionVarsView() {
    var url = "controller/cSessionVarsView.php";
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(result => {
        console.log(result);
        $("#btnBanca").css('display', 'none');

        if (result.error == "no error") {
            $("#ddLg").css('display', 'none');
            $("#ddReg").css('display', 'none');
            $("#ddLo").css('display', 'block');
            $('#nomUsu').removeAttr('data-bs-target');
            $("#nomUsu").text(result.usuario.nombre);

            if (result.usuario.admin == 1) {
                $("#btnBanca").css('display', 'block');
            }
        }
    })
}

jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is('a, button, :input, [tabindex]');
    }
});

$(document).on('keydown', ':focusable', function (e) {
    if (e.which == 13) {
        e.preventDefault();
        // Get all focusable elements on the page
        var $canfocus = $(':focusable');
        var index = $canfocus.index(this) + 1;
        if (index >= $canfocus.length) index = 0;
        $canfocus.eq(index).focus();
    }
});

function login() {
    var email = $("#email").val();
    var contrasenia = $("#contrasenia").val();

    var url = "controller/cLogin.php";
    var data = { 'email': email, 'contrasenia': contrasenia }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: { 'content-type': 'application/json' }
    }).then(res => res.json()).then(result => {
        console.log(result);
        if (result.error == "no error") {
            $("#errorLogin").text("");

            $("#ddLg").css('display', 'none');
            $("#ddReg").css('display', 'none');
            $("#ddLo").css('display', 'block');
            $('#login').modal('toggle');
            $('#nomUsu').removeAttr('data-bs-target');
            $("#nomUsu").text(result.usuario.nombre);

            if (result.usuario.admin == 1) {
                $("#btnBanca").css('display', 'block');

            }
        }
        if (result.error == 'incorrect user') {
            $("#errorLogin").html("El correo o contraseña introducido es incorrecto.</br> <a onclick='forgotPassword()'>He olvidado la contraseña.</a>");

        } else if (result.error == 'insert data') {
            $("#errorLogin").text("Inserte datos en todos los campos por favor.");
        }
        console.log(result)
    })
}
function forgotPassword() {
    alert("Por favor relajese, dese un paseo e intente recordar su contraseña :)");

}
function register() {
    var url = "controller/cRegister.php";

    var nombre = $('#nameRegister').val();
    var email = $('#emailRegister').val();
    var contrasenia1 = $('#passwordRegister1').val();
    var contrasenia2 = $('#passwordRegister2').val();

    if (checkPassword(contrasenia1, contrasenia2)) {
        var data = { 'nombre': nombre, 'contrasenia': contrasenia1, 'email': email };

        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Cotent-Type': 'application/json' }
        }).then(res => res.json()).then(result => {
            console.log(result);
            if (result.error) {
                $("#errorRegister").text("Este usuario ya ha sido registrado, inicie sesion.")
            }
        })
    } else if (nombre == NULL || email == NULL || contrasenia1 == NULL) {
        $("#errorRegister").text("Rellene todos los campos por favor.");
    } else {
        $("#errorRegister").text("Las contraseñas introducidas no coinciden.");

    }
}

function checkPassword(c1, c2) {
    var regex = /[^a-z0-9\x20]/i;

    if (c1 == c2 && c1 != "") {
        return true;
    }
    return false;
}
function logout() {
    var url = "controller/cLogout.php";
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(result => {
        console.log(result);
        if (result.error == "no error") {
            $("#errorLogin").text("");
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