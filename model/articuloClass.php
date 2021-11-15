<?php
class articuloClass {
    public $id;
    public $nombre;
    public $precio;
    public $img;
    
    public function getId() {
        return $this->id;
    }
    public function getNombre() {
        return $this->nombre;
    }
    public function getPrecio() {
        return $this->precio;
    }
    public function getImg() {
        return $this->img;
    }
    
    public function setId($id) {
        $this->id = $id;
    }
    public function setNombre($nombre) {
        $this->nombre = $nombre;
    }
    public function setPrecio($precio) {
        $this->precio = $precio;
    }
    public function setImg($img) {
        $this->img = $img;
    }
}
?>