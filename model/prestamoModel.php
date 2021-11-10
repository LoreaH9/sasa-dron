<?php
include_once "connect_data.php";
include_once "prestamoClass.php";

class prestamoModel extends prestamoClass{

    private $link;
    public function OpenConnect(){
        $cd=new connect_data();
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

        $sql = "select * from prestamo";

        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newPrestamo=new prestamoModel();

            $newPrestamo->id=$row['id'];
            $newPrestamo->anual=$row['anual'];
            $newPrestamo->interes=$row['interes'];
            $newPrestamo->cuota=$row['cuota'];
            $newPrestamo->capital=$row['capital'];
            $newPrestamo->deuda=$row['deuda'];
            
            array_push($list, $newLeasing);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
    
}
?>