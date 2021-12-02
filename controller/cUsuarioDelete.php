<?php
require_once "../model/usuarioModel.php";
session_start();

$usuario = new usuarioModel();
$usuario=$_SESSION['usuario'];

$response=array();
$response['error']=$usuario->deleteUser();

echo json_encode($response);
unset ($usuario);
?>