<?php
include_once "connect_data.php";
include_once "leasingClass.php";

class leasingModel extends leasingClass{

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

        $sql = "select * from leasing";

        $result = $this->link->query($sql);

        $list=array();

        while($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $newLeasing=new leasingModel();

            $newLeasing->id=$row['id'];
            $newLeasing->cuota=$row['cuota'];
            $newLeasing->iva=$row['iva'];
            $newLeasing->limpia=$row['limpia'];
            $newLeasing->interes=$row['interes'];
            $newLeasing->amortizacion=$row['amortizacion'];
            $newLeasing->deuda=$row['deuda'];
            array_push($list, $newLeasing);
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $list;
    }
}
?>