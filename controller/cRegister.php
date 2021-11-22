<?php
require_once "../model/usuarioModel.php";
$data=json_decode(file_get_contents("php://input"),true);

$response=array();

$usuario = new usuarioModel();

$usuario->nombre=$data['nombre'];
$usuario->email=$data['email'];
$usuario->findUserByEmail();
$exist = $usuario->findUserByEmail();
$response['exist']=$exist;

if ($exist){
    $response['error']=true;
}else{
    $usuario->contrasenia=password_hash($data['contrasenia'], PASSWORD_DEFAULT);
    $usuario->createUser();
}

$response['usuario']=$usuario;

echo json_encode($response);
