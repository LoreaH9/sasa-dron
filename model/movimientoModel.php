<?php
include_once "connectData.php";
include_once "movimientoClass.php";

class movimientoModel extends movimientoClass{

    private $link;
    public function OpenConnect(){
        $cd=new connectData();
        try{
            $this->link=new mysqli($cd->host,$cd->userbbdd,$cd->passbbdd, $cd->ddbbname);    
        }catch(Exception $e){
            echo $e->getMessage();
        }
        $this->link->set_charset("utf8");

    }
    public function CloseConnect()
    {
        mysqli_close ($this->link);
    }

    public function setList()
    {
        $this->OpenConnect();

        $sql = "SELECT * from movimiento";
        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newMovimiento=new movimientoModel();

            $newMovimiento->id=$row['id'];
            $newMovimiento->fecha=$row['fecha'];
            $newMovimiento->fechaValor=$row['fechaValor'];
            $newMovimiento->concepto=$row['concepto'];
            $newMovimiento->importe=$row['importe'];
            $newMovimiento->saldo=$row['saldo'];
            $newMovimiento->dias=$row['dias'];
            $newMovimiento->idUsuario=$row['idUsuario'];
            $newMovimiento->idCredito=$row['idCredito'];
            $newMovimiento->idCorriente=$row['idCorriente'];
            
            array_push($list, $newMovimiento);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }

    public function insert() {
        $this -> OpenConnect();
        
        $idCorriente = $this -> idCorriente;
        $importe = $this -> importe;
        $concepto = $this -> concepto;
        $usu = 1;
        
        $sql ="INSERT INTO movimiento(fecha, fechaValor, concepto, importe, saldo, idCorriente, idUsuario)VALUES(CURDATE(), CURDATE(), '$concepto', $importe, (SELECT saldo FROM cuenta_corriente WHERE id = $idCorriente), $idCorriente, $usu)";
        $dias = "UPDATE movimiento SET dias = (SELECT DATEDIFF(NOW(), (SELECT fechaValor FROM movimiento ORDER BY id DESC LIMIT 1))) WHERE id = (SELECT id FROM movimiento ORDER BY id DESC LIMIT 1)";
        
        $this -> link -> query($dias);
        $this -> link -> query($sql);
        
        $this -> CloseConnect();
    }

    public function insertCredito() {
        $this -> OpenConnect();
        
        $idCredito = $this -> idCredito;
        $importe = $this -> importe;
        $concepto = $this -> concepto;
        $usu = 1;
        
        $dias = "UPDATE movimiento SET dias = (SELECT DATEDIFF(NOW(), (SELECT fechaValor FROM movimiento ORDER BY id DESC LIMIT 1))) WHERE id = (SELECT id FROM movimiento ORDER BY id DESC LIMIT 1)";
        $sql ="INSERT INTO movimiento(fecha, fechaValor, concepto, importe, saldo, idCredito, idUsuario)VALUES(CURDATE(), CURDATE(), '$concepto', $importe, (SELECT saldo FROM cuenta_credito WHERE id = $idCredito), $idCredito, $usu)";
        
        $this -> link -> query($dias);
        $this -> link -> query($sql);
        
        $this -> CloseConnect();
    }

    public function retiradaCorriente() {
        $this -> OpenConnect();
        
        $idCorriente = $this -> idCorriente;
        $importe = $this -> importe;
        $concepto = $this -> concepto;
        $usu = 1;
        
        $dias = "UPDATE movimiento SET dias = (SELECT DATEDIFF(NOW(), (SELECT fechaValor FROM movimiento ORDER BY id DESC LIMIT 1))) WHERE id = (SELECT id FROM movimiento ORDER BY id DESC LIMIT 1)";
        $sql ="INSERT INTO movimiento(fecha, fechaValor, concepto, importe, saldo, idCorriente, idUsuario)VALUES(CURDATE(), CURDATE(), '$concepto', -$importe, (SELECT saldo FROM cuenta_corriente WHERE id = $idCorriente), $idCorriente, $usu)";
        
        $this -> link -> query($dias);
        $this -> link -> query($sql);
        
        $this -> CloseConnect();
    }

    public function retiradaCredito() {
        $this -> OpenConnect();
        
        $idCredito = $this -> idCredito;
        $importe = $this -> importe;
        $concepto = $this -> concepto;
        $usu = 1;
        
        $dias = "UPDATE movimiento SET dias = (SELECT DATEDIFF(NOW(), (SELECT fechaValor FROM movimiento ORDER BY id DESC LIMIT 1))) WHERE id = (SELECT id FROM movimiento ORDER BY id DESC LIMIT 1)";
        $sql ="INSERT INTO movimiento(fecha, fechaValor, concepto, importe, saldo, idCredito, idUsuario)VALUES(CURDATE(), CURDATE(), '$concepto', -$importe, (SELECT saldo FROM cuenta_credito WHERE id = $idCredito), $idCredito, $usu)";
        
        $this -> link -> query($dias);
        $this -> link -> query($sql);
        
        $this -> CloseConnect();
    }
}
?>