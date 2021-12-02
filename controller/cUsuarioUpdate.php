<?php
require_once "../model/usuarioModel.php";
session_start();
$data=json_decode(file_get_contents("php://input"),true);

$usuario = new usuarioModel();
$usuario=$_SESSION['usuario'];
$usuario->nombre=$data['nombre'];
$usuario->updateUsername();

$response=array();
$response['usuario']=$usuario;
$_SESSION['usuario']=$usuario;
$_SESSION['nombre']=$usuario->nombre;

echo json_encode($response);
unset ($usuario);
?>