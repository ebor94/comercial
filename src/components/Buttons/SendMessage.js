import { Button } from 'react-bootstrap';
import { AiOutlineSend } from "react-icons/ai";
import React, { useState } from 'react'
import ModalMessage from '../Modal/ModalMessage';
import Spinner from 'react-bootstrap/Spinner';
import { TelDirComercial } from '../../hooks/GetDirComercial';


function SendMessage({data}) {


    const [modalShow, setModalShow] = useState(false);
    const [modalTitle, setModalTitle] = useState('Mensaje');
    const [modalMessage, setModalMessage] = useState('');
    const [isLoading, setLoading] = useState(false);
    const url = window.location.origin;

const handleClickSendMessage = async (data) => {
    console.log(data)
    setLoading(true);   
 const {telefono, margeninterno, aprobgte,  documento ,identificacion} = data;
    if(telefono){
        if(margeninterno < 42 && !aprobgte ){
            let messageApproved = `la proforma ${documento} necesita ser aprobada porque no cumple con el margen esperado ver proforma en ${url}/quotegte/?LCODIGO=${documento}&cte=${identificacion}`;
            let telAprobacion  = await  TelDirComercial()
            let resmessage = await sendMessage(telAprobacion,messageApproved); 
            const result =  JSON.parse(resmessage)
            
            if(result.sent){
                setModalMessage(`proforma enviada aprobación, porque no cumple con el margen esperado `)
                setLoading(false);
                handleShowModal()
            }else{
                setModalMessage("error al enviar el mensaje validar con tecnologias de la informacion")
                setLoading(false);
                handleShowModal()
            }
            return
        }
        let messageApprovedcte = `Ceramica italia ha generado la proforma ${documento} y necesita ser aprobada,  ver proforma en ${url}/quotecte/?LCODIGO=${documento}&cte=${identificacion}`;
        let resmessagecte = await sendMessage(telefono,messageApprovedcte); 
        const reswp =  JSON.parse(resmessagecte)
        
        if(reswp.sent){
          setModalMessage(`proforma enviada al cliente, para su respectiva aprobacion`)
          setLoading(false);
          handleShowModal()
      }else{
          setModalMessage("error al enviar el mensaje validar con tecnologias de la informacion")
          setLoading(false);
          handleShowModal()
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