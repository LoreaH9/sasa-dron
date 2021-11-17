<?php
include_once "usuarioClass.php";
include_once "connect_data.php";
class usuarioModel extends usuarioClass {
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

    public function findUser(){
        $this->OpenConnect();

        $email=$this->email;
        $password=$this->contrasenia;

        $sql= "SELECT * FROM usuario WHERE email='$email' AND contrasenia='$password'";
        $result= $this->link->query($sql);

        $exist=false;

        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $exist=true;
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->admin=$row['admin'];
        }
        mysqli_free_result($result);
        $this->CloseConnect();
        return $exist;

    }

    public function deleteUser(){
        $this->OpenConnect();

        $id=$this->id;
        $delete=false;

        $sql = "UPDATE usuario SET eliminado = 1 WHERE id=$id";
        $result=$this->link->query($sql);

        if($result){
            $delete = true;
        }
        return $delete;
    public function findUserByEmail(){
        $this->OpenConnect();

        $email=$this->email;

        $sql= "SELECT * FROM usuario WHERE email='$email'";
        $result= $this->link->query($sql);
        if ($row = mysqli_fetch_array($result, MYSQLI_ASSOC)){
            $this->id=$row['id'];
            $this->nombre=$row['nombre'];
            $this->admin=$row['admin'];
            $passwordEncripted=$row['contrasenia'];
            
            $exist = password_verify($this->contrasenia, $passwordEncripted)?true:false;
            return $exist;
        } 
        mysqli_free_result($result);
        $this->CloseConnect();     
    }

    public function createUser(){
        $this->OpenConnect();

        $email=$this->email;
        $contrasenia=$this->contrasenia;
        $nombre=$this->nombre;

        $sql="insert into usuario (email, contrasenia, nombre) values ('$email','$contrasenia','$nombre')";
        $result= $this->link->query($sql);
        mysqli_free_result($result);
        $this->CloseConnect();
    }

}