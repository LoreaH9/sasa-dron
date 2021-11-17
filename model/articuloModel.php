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
            
            $new -> setId($row['id']);
            $new -> setNombre($row['nombre']);
            $new -> setPrecio($row['precio']);
            $new -> setImg($row['img']);
            
            array_push($list, $new);   
        }
       mysqli_free_result($result); 
       $this -> CloseConnect();
       return $list;
    }
    
    public function showUpdate() {
        $this -> OpenConnect();  // konexio zabaldu  - abrir conexión
        
        $id = $this -> id;
        
        //$sql = "CALL spShowUpdate($id)"; // SQL sententzia - sentencia SQL
        
        $sql = "select * from peliculas where idPelicula = $id";
        
        $result = $this -> link -> query($sql);
        
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $this -> titulo = $row['TituloPelicula'];
            $this -> anio = $row['Anio'];
            $this -> director = $row['Director'];
            $this -> cartel = $row['cartel'];
            return true;
        }
        else {
            return false;
        }
        mysqli_free_result($result);
        $this -> CloseConnect();
        
    }
    
    public function insert() {
        $this -> OpenConnect();
        
        $titulo = $this -> titulo;
        $anio = $this -> anio;
        $director = $this -> director;
        $cartel = $this -> cartel;
        
        //$sql = "CALL spInsert('$titulo', '$autor', $numPag)";
        
        $sql ="insert into peliculas(TituloPelicula, Anio, Director, cartel) values ('$titulo', '$anio', '$director', '$cartel')";
        
        $this -> link -> query($sql);
        
        if ($this -> link -> affected_rows == 1){
            return "La pelicula se ha insertado con exito. Num de inserts: ".$this->link->affected_rows;
        }
        else {
            return "Fallo al insertar una pelicula nueva: (" . $this -> link -> errno . ") " . $this -> link -> error;
        }
        
        $this -> CloseConnect();
    }
    
    public function update() {
        $this->OpenConnect();
        
        $id = $this -> getId();
        $titulo = $this -> titulo;
        $anio = $this -> anio;
        $director = $this -> director;
        $cartel = $this -> cartel;
        
        //$sql = "CALL spUpdate($id,'$titulo', '$autor', $numPag)";
        
        $sql ="update peliculas
             set peliculas.TituloPelicula = '$titulo',
             peliculas.Anio = $anio,
             peliculas.Director = $director,
             peliculas.cartel = '$cartel'
             where peliculas.idPelicula = $id";
        
        $this -> link -> query($sql);
        
        if($this->link->affected_rows == 1) {
            return $sql."La pelicula se ha modificado con exito.Num modificados: ".$this->link->affected_rows;
        }
        else {
            return $sql."Falla la modificacion de la pelicula: (" . $this -> link -> errno . ") " . $this -> link -> error;
        }
        
        $this -> CloseConnect();
    }
    
    public function delete() {
        $this -> OpenConnect();
        
        $id = $this -> id;
        
        //$sql = "CALL spDelete( $id)";
        
        $sql = "delete from peliculas where idPelicula = $id";
        
        $this -> link -> query($sql);
        
        if($this -> link -> affected_rows == 1) {
            return "La pelicula se ha borrado con exito.Num borrados: ".$this -> link -> affected_rows;
        }
        else {
            return "Falla el borrado de la pelicula: (" . $this -> link -> errno . ") " . $this -> link -> error;
        }
        
        $this -> CloseConnect();
    }
}