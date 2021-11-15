<?php
require_once '../model/usuarioModel.php';

$response=array();
$user= new usuarioModel();

session_start();

if (isset($_SESSION['user'])){
    $user=$_SESSION['user'];
    $response['error']="no error";
    
} else{  
    $response['user']= $user;
    $response['error']="You are not logged";
}

$response['user']= $user;

echo json_encode($response);

unset($response);
