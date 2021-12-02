<?php
    include_once ("../model/articuloModel.php");
    $data=json_decode(file_get_contents("php://input"),true);
    
    $id=$data['id'];
    
    $articulo= new articuloModel();
    $articulo->id=$id;
    
    $response=array();
    $response['error']=$articulo->delete();
    
    echo json_encode($response);
    
    unset ($articulo);
?>