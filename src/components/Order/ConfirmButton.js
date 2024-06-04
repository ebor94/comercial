import React, { useEffect, useState } from 'react';
import '../../assets/css/ConfirmButton.css';
import { Modal, Button, Form, Spinner } from 'react-bootstrap';
import { serviceInvoice } from '../../service/invoice';
import ModalMessage from '../Modal/ModalMessage';

const ConfirmButton = ({offer, phoneNumber,  phoneNumberSeller, colorButtonConfirm}) => {

  const [show, setShow] = useState(false);
  const [message, setMessage] = useState("")
  const [view, setView] = useState(false);
  const [code, setCode] = useState('');
  const [codeInput, setCodeInput] = useState('');
  const [disabledButton, setdisabledButton] = useState(false);
  const [titleButtonaprob, settitleButtonaprob ]= useState('Confirmar Cotizacion')
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [isLoading, setLoading] = useState(false);

  useEffect( () => {

    const postData = async () => {

      const resServiceInvoice = await serviceInvoice("99",offer,"0","","","","");
      //let datainvoice = await resServiceInvoice.
      if(resServiceInvoice[0].aprobcte ){
        setdisabledButton(true);
        settitleButtonaprob('proforma ya aprobada....');
      }
    }   
   
    postData()
  }, [offer])
  
  
   
  const handleClick =  async (message) => {
    setLoading(true); 
    const pin = Math.floor(Math.random() * 10000);
    let textPin = pin.toString();
    let textApproved = `Token ${textPin} para aprobar la proforma ${message}`
    setCode(textPin)
    let resMensage = await sendMessage(phoneNumber,textApproved)
    const reswp =  JSON.parse(resMensage)
    await sendMessage(phoneNumberSeller,textApproved) 
    console.log(resMensage)
    
    if(reswp.sent){
      const resServiceInvoice = await serviceInvoice("07",offer,"0","",textPin,resMensage,""); // actualizamos respuesta del envio de whatsapp 
      console.log("******respuesta de whatsapp*******",reswp)
      console.log("*****envio whatsapp(07)********",resServiceInvoice)    
      handleShow();

    }else{
        alert("error al enviar el mensaje validar con tecnologias de la informacion", phoneNumber)
    }
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
      let messageApproved = `la proforma  ${offer} ha sido aprobada con el token ${code} `;
      let resmessage = await sendMessage(phoneNumber,messageApproved); 
      await sendMessage(phoneNumberSeller,messageApproved); 
      const responseInvoice = await serviceInvoice("03",offer,"0",localStorage.getItem('margenInterno'),code,resmessage,""); // actualizamos el estado de la aprobacion
      console.log("*****aprobacion cliente(03)********",responseInvoice)
      setMessage("Aprobacion Exitosa...")
      setdisabledButton(true)
      settitleButtonaprob('proforma ya aprobada')
      handleShowModal();
      
    }else{
      alert('pin incorrecto');
    }
    
  }

  const handleShowModal = () => {      
    setLoading(false);  
    setView(true);
  };

  const handleCloseModal = () => {
    setView(false);

  };

  return (
    <>
    <button  disabled={disabledButton}  className={colorButtonConfirm} onClick={() => handleClick(offer)} >      
      {isLoading ?  <Spinner animation="border" />:  titleButtonaprob}
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
      <ModalMessage
    show={view}
    handleClose={handleCloseModal}
    title={"mensaje"}
    message={message}    
    />
  </>
  );
};

export default ConfirmButton;