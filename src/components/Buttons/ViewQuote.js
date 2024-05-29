import React, { useEffect, useState } from 'react'
import Spinner from 'react-bootstrap/Spinner';
import ModalViewQuote from '../Modal/ModalViewQuote'
import { Button } from 'react-bootstrap';
import {  AiFillEye } from "react-icons/ai";

export default function ViewQuote({cte, quote}) {

    const [modalShow, setModalShow] = useState(false);
   
    const [isLoading, setLoading] = useState(false);
    const [responseData, setResponseData] = useState([]);
    const [error, setError] = useState(null);

   
        const postData = async () => {
       
          // Datos que vamos a enviar en el cuerpo de la solicitud
          const raw = JSON.stringify({
            "LCODIGO": quote,
            "LTIPO": "C",
            "TPROCESO": "S",
            "PCODSOLICITANTE": "",
            "PHANDLE": "",
            "FECHAINI": "",
            "FECHAFIN": "",
            "cte": cte
          });
    
          try {
            // Realizando la solicitud POST
            const response = await fetch('https://lilix.ceramicaitalia.com:3001/clientes/invoice/ ', {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw})
              // Verificando si la solicitud fue exitosa
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            // Obteniendo los datos de la respuesta
            const result = await response.json();            
           setResponseData(result); // Actualizando el estado con los datos de la respuesta
          
          } catch (error) {
            console.error('There was a problem with the fetch operation:', error);
            setError(error);
          }
          finally {
              setLoading(false);
              setModalShow(true);
            }           
        };        
        
        
    

    const handleClickViewQuote = async () =>{
        //postData();
        setLoading(true)    
       
   }           
   
   const handleCloseModal = () => {
        setModalShow(false);                
        setLoading(false)
      };
       
  return (
    <>
    <Button
    alt="Enviar"
    variant='primary'
    onClick={() => handleClickViewQuote()}
    >
   {isLoading ?  <Spinner animation="border" size="sm" />: <AiFillEye />}
   </Button>
   <ModalViewQuote
   show={modalShow}
   handleClose={handleCloseModal}
   //quote={responseData}
   
   />
   </>
  )
}
