<?php
class articuloClass {
    public $id;
    public $nombre;
    public $precio;
    public $img1;
    public $img2;
    public $img3;
    public $descripcion;
    


    /**
     * Get the value of id
     */ 
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set the value of id
     *
     * @return  self
     */ 
    public function setId($id)
    {
        $this->id = $id;

        return $this;
    }

    /**
     * Get the value of nombre
     */ 
    public function getNombre()
    {
        return $this->nombre;
    }

    /**
     * Set the value of nombre
     *
     * @return  self
     */ 
    public function setNombre($nombre)
    {
        $this->nombre = $nombre;

        return $this;
    }

    /**
     * Get the value of precio
     */ 
    public function getPrecio()
    {
        return $this->precio;
    }

    /**
     * Set the value of precio
     *
     * @return  self
     */ 
    public function setPrecio($precio)
    {
        $this->precio = $precio;

        return $this;
    }

    /**
     * Get the value of img1
     */ 
    public function getImg1()
    {
        return $this->img1;
    }

    /**
     * Set the value of img1
     *
     * @return  self
     */ 
    public function setImg1($img1)
    {
        $this->img1 = $img1;

        return $this;
    }

    /**
     * Get the value of img2
     */ 
    public function getImg2()
    {
        return $this->img2;
    }

    /**
     * Set the value of img2
     *
     * @return  self
     */ 
    public function setImg2($img2)
    {
        $this->img2 = $img2;

        return $this;
    }

    /**
     * Get the value of img3
     */ 
    public function getImg3()
    {
        return $this->img3;
    }

    /**
     * Set the value of img3
     *
     * @return  self
     */ 
    public function setImg3($img3)
    {
        $this->img3 = $img3;

        return $this;
    }

    /**
     * Get the value of descripcion
     */ 
    public function getDescripcion()
    {
        return $this->descripcion;
    }

    /**
     * Set the value of descripcion
     *
     * @return  self
     */ 
    public function setDescripcion($descripcion)
    {
        $this->descripcion = $descripcion;

        return $this;
    }
}
?>