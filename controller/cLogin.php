<?php
require_once "../model/usuarioModel.php";

$data=json_decode(file_get_contents("php://input"),true);

$email=$data['email'];
$password=$data['password'];

$response=array();
$user=new usuarioModel();

if ($email!=null && $password!=null){
    $user->email=$email;
    $user->contrasenia=$password;
    
    if ($user->findUser()){
        session_start();
        $_SESSION['user']=$user;
        $_SESSION['nombre']=$user->nombre;
        $response['error']="no error";

    }else{
        $response['error']="incorrect user";
    }
}else{
    $response['error']="insert data";
}
    $response['usuario']=$user;

    echo json_encode($response);
    unset($response);