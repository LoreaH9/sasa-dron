
function login() {
    var email = $("#email").val();
    var password = $("#password").val();

    var url="controller/cLogin.php";
    var data= {'email':email, 'password':password}

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(data),
        headers:{'content-type': 'application/json'}
    }).then(res => res.json()).then(result=>{
        if (result.usuario.admin==1){
            $("#btnBanca").css('display', 'block');
            $('#login').modal('toggle');
            $("#nomUsu").text(result.usuario.nombre);
        }
    })
  }
  
  