<?php
    class leasingClass{
        public $id;
        public $cuota;
        public $iva;
        public $limpia;
        public $interes;
        public $amortizacion;
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
         * Get the value of iva
         */ 
        public function getIva()
        {
                return $this->iva;
        }

        /**
         * Set the value of iva
         *
         * @return  self
         */ 
        public function setIva($iva)
        {
                $this->iva = $iva;

                return $this;
        }

        /**
         * Get the value of limpia
         */ 
        public function getLimpia()
        {
                return $this->limpia;
        }

        /**
         * Set the value of limpia
         *
         * @return  self
         */ 
        public function setLimpia($limpia)
        {
                $this->limpia = $limpia;

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
         * Get the value of amortizacion
         */ 
        public function getAmortizacion()
        {
                return $this->amortizacion;
        }

        /**
         * Set the value of amortizacion
         *
         * @return  self
         */ 
        public function setAmortizacion($amortizacion)
        {
                $this->amortizacion = $amortizacion;

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