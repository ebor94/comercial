import React, { useState } from 'react';
import './ConfirmButton.css';
import { Modal, Button, Form } from 'react-bootstrap';

const ConfirmButton = ({cotizacion, phoneNumber,  phoneNumberSeller}) => {

  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [codeInput, setcodeInput] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
   
  const handleClick =   (message) => {
    const pin = Math.floor(Math.random() * 10000);
    let textPin = pin.toString();
    let textAproved = `Codigo de aprobacion ${textPin} para la cotizacion ${message}`
    setCode(textPin)
    sendMessage("3165217418",textAproved)    
    handleShow();
  };
  const sendMessage = async(phoneNumber, message) =>{
   const raw = JSON.stringify({ "phoneNumber": phoneNumber, "message": message, platform:"W"  })
   fetch("https://lilix.ceramicaitalia.com:3001/mensajeria", {method: "POST", headers: {'Content-Type': 'application/json'}, body : raw})
    .then((response) => response.text())
    .then((result) => console.log(result))
    .catch((error) => console.error(error));    
  }

  const handleClickConfirmCode = (code,codeInput) => {
    console.log(code,codeInput)
    let codeI =  codeInput.trim()
    if(codeI === code){
      handleClose();
      let aprobacion = `se aprobó la cotizacion ${cotizacion} con codigo se seguridad ${code} `
      sendMessage(phoneNumberSeller,aprobacion)  
      alert('codigo correcto')
    }else{
      alert('codigo incorrecto')
    }
    
  }


  return (
    <>
    <button   className="confirm-button" onClick={() => handleClick(cotizacion)}>
    Confirmar Cotizacion
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
                onChange={(e) => setcodeInput(e.target.value)}               
                
              />
            </Form.Group>
         </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button  variant="danger" onClick={() => handleClickConfirmCode(code,codeInput)}>
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
  </>
  );
};

export default ConfirmButton;