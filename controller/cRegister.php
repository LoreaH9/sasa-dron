<?php
require_once "../model/usuarioModel.php";

$response=array();

$user = new usuarioModel();
$user->nombre=$data['nombre'];
$user->email=$data['email'];
$user->contrasenia=$data['contrasenia'];

$response['error']=$user;


