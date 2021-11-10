<?php
require_once "../model/usuarioModel.php";

$data=json_decode(file_get_contents("php://input"),true);

$email=$data['email'];
$password=$data['password'];

$response=array();

if ($email!=null && $password!=null){
    $user=new usuarioModel();
    $user->email=$email;
    $user->contrasenia=$password;

    if ($user->findUser()){
        session_start();
        $_SESSION['user']=$user;

        $_SESSION['nombre']=$user->nombre;

        $response['usuario']=$user;
        $response['error']="no error";
    }else{
        $response['error']="incorrect user";
    }
    echo json_encode($response);
    unset($response);
}
