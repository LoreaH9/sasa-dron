<?php

include_once ("../model/articuloModel.php");

$data=json_decode(file_get_contents("php://input"),true);

$nombre=$data['nombre'];
$precio=$data['precio'];
$img1=$data['img1'];
$img2=$data['img2'];
$img3=$data['img3'];
$descripcion=$data['descripcion'];

$pelicula= new peliculaModel();

$pelicula->idPelicula=$idPelicula;
$pelicula->TituloPelicula=$TituloPelicula;
$pelicula->Anio=$Anio;
$pelicula->Director=$Director;
$pelicula->cartel=$cartel;

$response=array();
$response['error']=$pelicula->update();

echo json_encode($response);

unset ($pelicula);
?>