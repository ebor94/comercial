import { Button } from 'react-bootstrap';
import { AiOutlineSend } from "react-icons/ai";
import React, { useState } from 'react'
import ModalMessage from '../Modal/ModalMessage';
import Spinner from 'react-bootstrap/Spinner';
//import { TelDirComercial } from '../../hooks/GetDirComercial';
import { serviceInvoice } from '../../service/invoice';


function SendMessage({data}) {


    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('Mensaje');
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const url = window.location.origin;
    const margenEsperado = 43;

const handleClickSendMessage = async (data) => {
    console.log(data)
    setLoading(true);   
 const {telefono, margeninterno, aprobgte,  documento ,identificacion} = data;
    if(telefono){
        if(margeninterno < margenEsperado && !aprobgte ){
            let messageApproved = `la proforma ${documento} necesita ser aprobada porque no cumple con el margen esperado ver proforma en ${url}/quotegte/${documento}/${identificacion}`;
            //let telAprobacion  = await  TelDirComercial()
           // let resmessage = await sendMessage(telAprobacion,messageApproved); 
            let resmessage = sendMessageGoogle(messageApproved);
            const result =  JSON.parse(resmessage)
            console.log(result)
            if(result.status === 200){
                setModalMessage(`proforma enviada aprobación, porque no cumple con el margen esperado `)
                setLoading(false);
                const service = await serviceInvoice("11",documento,"0","0","","",""); // actualizamos la apertura del cliente 
                console.log ("*********ENVIADO APROBACION COMERCIAL****************",service)
                handleShowModal()
            }else{
                setModalMessage("error al enviar el mensaje validar con tecnologias de la informacion")
                setLoading(false);
                handleShowModal()
            }
            return
        }

        let numeroTelCte  = telefono.split("-") 
        console.log(numeroTelCte)
        for( const itNumero of numeroTelCte){
          console.log(itNumero)
          let messageApprovedcte = `Ceramica italia ha generado la proforma ${documento} y necesita ser aprobada,  ver proforma en ${url}/quote/${documento}/${identificacion}`;
        let resmessagecte = await sendMessage("57"+itNumero,messageApprovedcte); 
        const reswp =  JSON.parse(resmessagecte)
        console.log(reswp)
        
        if(reswp.sent){
          setModalMessage(`proforma enviada al cliente, para su respectiva aprobacion`)
          setLoading(false);
          const service = await serviceInvoice("12",documento,"0","0","","",""); // actualizamos la apertura del cliente 
          console.log ("*********ENVIADO APROBACION DEL CLIENTE****************",service)
          handleShowModal()
      }else{
          setModalMessage("error al enviar el mensaje validar con tecnologias de la informacion *****")
          setLoading(false);
          handleShowModal()
      }

        }

    }else{
        setModalMessage('Por favor ingrese un numero de telefono')
        setLoading(false);
        handleShowModal()
    }

}
const handleShowModal = () => {   
    setModalTitle('Mensaje');
    setModalShow(true);
  };

  const handleCloseModal = () => {
    setModalShow(false);
    setModalTitle('');
    setModalMessage('');
  };


const sendMessage = async(phoneNumber, message) =>{
    const raw = JSON.stringify({ "phoneNumber": phoneNumber, "message": message, platform:"W"  })
     return await fetch("https://lilix.ceramicaitalia.com:3001/mensajeria", {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw})
     .then((response) => response.text())
     .then((result) =>{      
       //console.log(result)
       return result
     })
     .catch((error) => console.error(error));    
   }
   const sendMessageGoogle = async( message) =>{
    const raw = JSON.stringify({ "param1": "kkmRkgAAAAE", "message": message, "key":"AIzaSyDdI0hCZtE6vySjMm-WEfRq3CPzqKqqsHI", "token": "q6JbtPP4lcF0qpw5gpepgUevLzJ8xwVCbLlQZtyjGhc"  })
     return await fetch("https://lilix.ceramicaitalia.com:3001/mensajeria/google", {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw})
     .then((response) => response.text())
     .then((result) =>{      
       //console.log(phoneNumber)
       return result
     })
     .catch((error) => console.error(error));    
   }

  return (<>
    <Button
     alt="Enviar"
     variant='success'
     onClick={() => handleClickSendMessage(data)}
     >
    {isLoading ?  <Spinner animation="border" size="sm" />: <AiOutlineSend />}
    </Button>
    <ModalMessage
    show={modalShow}
    handleClose={handleCloseModal}
    title={modalTitle}
    message={modalMessage}
    
    />
    </>
  )
}

export default SendMessage