<?php
require_once "../model/usuarioModel.php";

$data=json_decode(file_get_contents("php://input"),true);

$email=$data['email'];
$contrasenia=$data['contrasenia'];

$response=array();
$user=new usuarioModel();

if ($email!=null){
    $user->email=$email;
    $user->contrasenia=$contrasenia;

    if ($user->findUserByEmail()){
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