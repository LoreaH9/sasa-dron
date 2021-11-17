<?php
require_once "../model/usuarioModel.php";
$data=json_decode(file_get_contents("php://input"),true);

$response=array();

$user = new usuarioModel();

$user->nombre=$data['nombre'];
$user->email=$data['email'];
$user->findUserByEmail();
$exist = $user->findUserByEmail();

if ($exist){
    $response['error']=true;
}else{
    $user->contrasenia=password_hash($data['contrasenia'], PASSWORD_DEFAULT);
    $user->createUser();
}

$response['user']=$user;

echo json_encode($response);
