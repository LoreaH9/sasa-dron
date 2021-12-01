$(document).ready(sessionVarsView);

function sessionVarsView() {
    var url = "controller/cSessionVarsView.php";
    fetch(url, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(result => {
        $("#btnBanca").css('display', 'none');

        if (result.error == "no error") {
            $("#btnProductos").css('display', 'block');

            $("#ddLg").css('display', 'none');
            $("#ddReg").css('display', 'none');
            $("#ddLo").css('display', 'block');
            $('#nomUsu').attr('data-bs-target', '#userModal');
            $("#nomUsu").text(result.usuario.nombre);
            
            $('#nameUser').val(result.usuario.nombre);
            $('#emailUser').val(result.usuario.email)

            if (result.usuario.admin == 1) {
                $("#btnBanca").css('display', 'block');
                $("#btnEliminar").css('display', 'block');
                $("#btnEditar").css('display', 'block');
                $("#btnInsertar").css('display', 'block');

            }
        }else{
            if(!window.location.href.includes("index.html")){
                window.location.href = "index.html";
            }        }
      
    })
}

//En el formulario al darle a enter que pase al siguiente input
jQuery.extend(jQuery.expr[':'], {
    focusable: function (el, index, selector) {
        return $(el).is(':input');
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

//Login 
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

        switch (result.error) {
            case "no error":
                $("#btnProductos").css('display', 'block');
                $("#errorLogin").text("");
                $("#ddLg").css('display', 'none');
                $("#ddReg").css('display', 'none');
                $("#ddLo").css('display', 'block');
                $('#login').modal('toggle');
                $('#nomUsu').attr('data-bs-target', '#userModal');
                $("#nomUsu").text(result.usuario.nombre);

                $('#nameUser').val(result.usuario.nombre);
                $('#emailUser').val(result.usuario.email)

                if (result.usuario.admin == 1) {
                    $("#btnBanca").css('display', 'block');
                }
                break;
            case "incorrect user":
                $("#errorLogin").html("El correo o contraseña introducido es incorrecto.</br> <a class='text-dark' onclick='forgotPassword()'>He olvidado la contraseña.</a>");
                break;
            default:
                $("#errorLogin").text("Inserte datos en todos los campos por favor.");
        }
    })
}

//REGISTER
function register() {
    var url = "controller/cRegister.php";

    var nombre = $('#nameRegister').val();
    var email = $('#emailRegister').val();
    var contrasenia1 = $('#passwordRegister1').val();
    var contrasenia2 = $('#passwordRegister2').val();

    console.log(nombre, email, contrasenia1, contrasenia2, validatePassword(contrasenia1))

    if (validatePassword(contrasenia1)) {
        var data = { 'nombre': nombre, 'contrasenia': contrasenia1, 'email': email };
        console.log(data);
        fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: { 'Cotent-Type': 'application/json' }
        }).then(res => res.json()).then(result => {
            if (!result.error) {
                $("#successRegister").text("MUY BIEEEN!! Este usuario ya ha sido registrado, inicie sesion.")
                $('#nomUsu').removeAttr('data-bs-target');
            }
        })
    } else if (nombre == NULL || email == NULL || contrasenia1 == NULL|| contrasenia2 == NULL) {
        $("#errorRegister").text("Rellene todos los campos por favor.");
    } else{
        $("#errorRegister").text("Las contraseñas introducidas no coinciden.");
    }
}


function delUser() {
    var url = "controller/cUsuarioDelete.php";
    if(confirm("¿Estás seguro de que quieres eliminar esta cuenta?")) {
    
    fetch(url, {
        method: 'POST',
        headers: { 'Cotent-Type': 'application/json' }
    }).then(res => res.json()).then(result => {
        console.log(result)
        if(result.error==true){
            $('#userModal').modal('toggle');
            loginModal();
        }
    })}
}
//Muestra las caracteristicas que tiene que tener la contraseña
function show() {
    $('#passwordHelpBlock').css('display', 'block')
}

//Oculta las caracteristicas que tiene que tener la contraseña
function hide() {
    $('#passwordHelpBlock').css('display', 'none')
}

//Valida una de las caracteristicas de la contraseña (pasada por parametro)
function valid(className) {
    className.classList.remove("invalid");
    className.classList.add("valid");
}

//Invalida una de las caracteristicas de la contraseña (pasada por parametro)
function invalid(className) {
    className.classList.remove("valid");
    className.classList.add("invalid");
}

//Valida la primera contraseña
var passwd = "";
var complete = false;
function validatePassword(p) {
    $("#passwordHelpBlock").css("display", "block")
    var lowerCaseLetters = /[a-z]/g;
    var upperCaseLetters = /[A-Z]/g;
    var numbers = /[0-9]/g;
    passwd = p;

    p.match(lowerCaseLetters) ? valid(letter) : invalid(letter);
    p.match(upperCaseLetters) ? valid(capital) : invalid(capital);
    p.match(numbers) ? valid(number) : invalid(number);
    p.length > 7 ? valid(length1) : invalid(length1);
    if (p.match(lowerCaseLetters) && p.match(upperCaseLetters) && p.match(numbers) && p.length > 7) {
        $('#passwordRegister1').css('background-color', 'rgba(102, 204, 97, 0.796)')
        return true
    } else {
        $('#passwordRegister1').css('background-color', 'rgba(245, 105, 105, 0.493)')
        return false

    }
}

//Valida la segunda contraseña
function validatePassword2(p2) {
    (passwd == p2 && passwd != "" ) ? $('#passwordRegister2').css('background-color', 'rgba(102, 204, 97, 0.796)') : $('#passwordRegister2').css('background-color', 'rgba(245, 105, 105, 0.493)')
}

//Valida el nombre
function validateName(name) {
    name.value !== "" ? $('#nameRegister').css('background-color', 'rgba(102, 204, 97, 0.796)') : $('#nameRegister').css('background-color', 'rgba(245, 105, 105, 0.493)');
}

//Valida el email
function validateEmail(e) {
    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    re.test(e.value) ? $('#emailRegister').css('background-color', 'rgba(102, 204, 97, 0.796)') : $('#emailRegister').css('background-color', 'rgba(245, 105, 105, 0.493)');
}

//Mensaje en caso de olvidar la contraseña
function forgotPassword() {
    alert("Por favor relajese, dese un paseo e intente recordar su contraseña :)");
}
function loginModal(){
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
            $("#contrasenia").val("");
            $('#userModal').modal('toggle');

        }
        if(!window.location.href.includes("index.html")){
            window.location.href = "index.html";
        }
    })
}
//LOGOUT
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
            $("#contrasenia").val("");
        }
        if(!window.location.href.includes("index.html")){
            window.location.href = "index.html";
        }
    })
}

function updateUsername(){
    var nombre = $("#nameUser").val();
    console.log(nombre)
    if (nombre!=""){
    var data = {'nombre': nombre}

    var url = "controller/cUsuarioUpdate.php";
    fetch(url, {
        method: 'POST',
        body:JSON.stringify(data),
        headers: { 'Content-Type': 'application/json' }
    }).then(res => res.json()).then(result => {
        console.log(result.usuario.nombre);
        if(result.usuario!=null){
            $("#nomUsu").text(result.usuario.nombre);
            $("#nameUser").attr('disabled', true);
        }
    })}else{
        $("#userError").text("Escribe un nombre por favor")
    }
}

function changeUsername(){
    console.log("aaaa");
    $("#nameUser").removeAttr('disabled');

}