<?php
require_once '../model/usuarioModel.php';

$response=array();

session_start();

if (isset($_SESSION['user'])){
    
    $user= new usuarioModel();

    $user=$_SESSION['user'];
    
    $response['user']= $user;
    $response['error']="no error";
    
} else{  
    $response['error']="You are not logged";
}
echo json_encode($response);

unset($response);
