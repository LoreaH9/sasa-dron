<?php
include_once ("../model/articuloModel.php");

$articulos = new articuloModel();

$list = array();
$list = $articulos->setList(); 

$response = array();
$response['list'] = $list; 
$response['error'] = "Not error"; 

echo json_encode($response);

unset ($articulos);
unset ($list);
?>