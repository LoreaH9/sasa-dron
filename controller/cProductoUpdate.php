<?php

include_once ("../model/articuloModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$id=$data['id'];
$nombre=$data['nombre'];
$precio=$data['precio'];
$img1=$data['img1'];
$img2=$data['img2'];
$img3=$data['img3'];
$descripcion=$data['descripcion'];

$articulo=new articuloModel();

$articulo->id=$id;
$articulo->nombre=$nombre;
$articulo->precio=$precio;
$articulo->img1=$img1;
$articulo->img2=$img2;
$articulo->img3=$img3;
$articulo->descripcion=$descripcion;
 
$response=array();
$response['error']=$articulo->update(); 

echo json_encode($response);

unset ($articulo);
?>