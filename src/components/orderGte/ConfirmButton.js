import React, { useState } from 'react';
import '../../assets/css/ConfirmButton.css';
import { Modal, Button, Form } from 'react-bootstrap';
import { serviceInvoice } from '../../service/invoice';

const ConfirmButton = ({offer, phoneNumber,  phoneNumberSeller, colorButtonConfirm}) => {

  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
   
  const handleClick = async (message) => {
    const pin = Math.floor(Math.random() * 10000);
    let textPin = pin.toString();
    let textApproved = `Token ${textPin} for quote ${message}`
    setCode(textPin)
    let resMensage = await  sendMessage("3165217418",textApproved)    
    const resServiceInvoice = await serviceInvoice("07",offer,"0","",textPin,resMensage,""); // actualizamos respuesta del envio de whatsapp
    //console.log("******respuesta de whatsapp*******",resMensage)
    console.log("*****envio whatsapp(07)********",resServiceInvoice)
    handleShow();
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

  const handleClickConfirmCode = async (code,codeInput) => {
    console.log(code,codeInput)
    let codeI =  codeInput.trim()
    if(codeI === code){
      handleClose();
      let messageApproved = `the quote ${offer} has been  Approved with token ${code} `;
      let resmessage = await sendMessage("3165217418",messageApproved); 
      const responseInvoice = await serviceInvoice("02",offer,"0",localStorage.getItem('margenInterno'),code,resmessage,""); // actualizamos el estado de la aprobacion
      console.log("*****aprobacion comercial(02)********",responseInvoice)
     
      alert('code true');
    }else{
      alert('code false');
    }
    
  }


  return (
    <>
    <button   className={colorButtonConfirm} onClick={() => handleClick(offer)}>
    Aprobacion comercial
  </button>
  <Modal 
    show={show}
    onHide={handleClose}
    backdrop="static"
    size="sm"
    centered
    >
        <Modal.Header closeButton>
          <Modal.Title>Cofirmacion</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form >
            <Form.Group controlId="formBasicEmail">
              <Form.Label><b>Ingrese El codigo enviado a {phoneNumber}</b></Form.Label>
              <Form.Control 
                type="text"
                placeholder="Codigo de Cofirmacion"
                autoFocus
                onChange={(e) => setCodeInput(e.target.value)}               
                
              />
            </Form.Group>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="danger" onClick={() => handleClickConfirmCode(code,codeInput)}>
            Confirm
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
};

export default ConfirmButton;