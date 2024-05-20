import React, { useState } from 'react';
import '../../assets/css/ConfirmButton.css';
import { Modal, Button, Form } from 'react-bootstrap';

const ConfirmButton = ({offer, phoneNumber,  phoneNumberSeller, colorButtonConfirm}) => {

  const [show, setShow] = useState(false);
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
   
  const handleClick =   (message) => {
    const pin = Math.floor(Math.random() * 10000);
    let textPin = pin.toString();
    let textApproved = `Token ${textPin} for the quote ${message}`
    setCode(textPin)
    sendMessage("3165217418",textApproved)    
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
      let messageApproved = `se Approved la quote ${offer} with token ${code} `;
      sendMessage(phoneNumberSeller,messageApproved);  
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