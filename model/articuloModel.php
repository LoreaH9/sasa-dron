<?php
if ($_SERVER['SERVER_NAME']== "bi.zerbitzaria.net") {
    include_once ("connectDataServ.php");
}
else {
    include_once ("connectData.php");
}

include_once ("articuloClass.php");

class articuloModel extends articuloClass {
    private $link;  
        
    public function OpenConnect() {
        $konDat = new connectData();
        try {
            $this->link = new mysqli($konDat->host, $konDat->userbbdd, $konDat->passbbdd, $konDat->ddbbname);
        }
        catch(Exception $e) {
            echo $e->getMessage();
        }
        
        $this->link->set_charset("utf8");
    }                   
    	 
    public function CloseConnect() {
        mysqli_close($this->link);
    }
     
    public function setList() {
        $this->OpenConnect(); 
            
       $sql = "SELECT * from articulo;";
        
        $result = $this->link->query($sql);
        
        $list = array();
        
        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)) {
            $new = new articuloClass();
            
            $new->id=$row['id'];
            $new->nombre=$row['nombre'];
            $new->precio=$row['precio'];
            $new->img1=$row['img1'];
            $new->img2=$row['img2'];
            $new->img3=$row['img3'];
            $new->descripcion=$row['descripcion'];
            
            array_push($list, $new);   
        }
       mysqli_free_result($result); 
       $this -> CloseConnect();
       return $list;
    }  
    
    public function insert() {
        $this -> OpenConnect();
        
        $nombre = $this -> nombre;
        $precio = $this -> precio;
        $img1 = $this -> img1;
        $img2 = $this -> img2;
        $img3 = $this -> img3;
        $descripcion = $this -> decripcion;

        $sql ="INSERT INTO articulo(nombre, precio, img1, img2, img3, descripcion) 
        VALUES ('$nombre', '$precio', '$img1', '$img2', '$img3', '$descripcion')";
        
        $this -> link -> query($sql);
        
        if ($this -> link -> affected_rows == 1){
            return "El articulo se ha insertado con EXITO.";
        }
        else {
            return "FALLO al insertar un nuevo articulo.";
        }
        
        $this -> CloseConnect();
    }
    
    public function update() {
        $this->OpenConnect();
        
        $id = $this -> id;
        $nombre = $this -> nombre;
        $precio = $this -> precio;
        $img1 = $this -> img1;
        $img2 = $this -> img2;
        $img3 = $this -> img3;
        $descripcion = $this -> decripcion;
                
        $sql ="UPDATE articulo SET nombre = '$nombre', precio = $precio, img1 = '$img1',
            img2 = '$img2' img3 = '$img3' WHERE id = $id";
        
        $this -> link -> query($sql);
        
        if($this->link->affected_rows == 1) {
            return $sql."El articulo se ha editado con EXITO.";
        }
        else {
            return $sql."Falla la modificacion de la pelicula";
        }
        
        $this -> CloseConnect();
    }
    
    public function delete() {
        $this -> OpenConnect();
        
        $id = $this -> id;
        
        //$sql = "CALL spDelete( $id)";
        
        $sql = "delete from articulo where id = $id";
        
        $this -> link -> query($sql);
        
        if($this -> link -> affected_rows == 1) {
            return "El articulo ha sido eliminado";
        }
        else {
            return "Falla el borrado de la pelicula: (" . $this -> link -> errno . ") " . $this -> link -> error;
        }
        
        $this -> CloseConnect();
    }
}