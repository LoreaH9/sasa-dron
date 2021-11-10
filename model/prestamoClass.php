<?php
    class prestamoClass{
        public $id;
        public $anual;
        public $interes;
        public $cuota;
        public $capital;
        public $deuda;
        

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
         * Get the value of anual
         */ 
        public function getAnual()
        {
                return $this->anual;
        }

        /**
         * Set the value of anual
         *
         * @return  self
         */ 
        public function setAnual($anual)
        {
                $this->anual = $anual;

                return $this;
        }

        /**
         * Get the value of interes
         */ 
        public function getInteres()
        {
                return $this->interes;
        }

        /**
         * Set the value of interes
         *
         * @return  self
         */ 
        public function setInteres($interes)
        {
                $this->interes = $interes;

                return $this;
        }

        /**
         * Get the value of cuota
         */ 
        public function getCuota()
        {
                return $this->cuota;
        }

        /**
         * Set the value of cuota
         *
         * @return  self
         */ 
        public function setCuota($cuota)
        {
                $this->cuota = $cuota;

                return $this;
        }

        /**
         * Get the value of capital
         */ 
        public function getCapital()
        {
                return $this->capital;
        }

        /**
         * Set the value of capital
         *
         * @return  self
         */ 
        public function setCapital($capital)
        {
                $this->capital = $capital;

                return $this;
        }

        /**
         * Get the value of deuda
         */ 
        public function getDeuda()
        {
                return $this->deuda;
        }

        /**
         * Set the value of deuda
         *
         * @return  self
         */ 
        public function setDeuda($deuda)
        {
                $this->deuda = $deuda;

                return $this;
        }
    }
?>