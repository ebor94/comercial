import Modal from 'react-bootstrap/Modal';
import OrderItem2 from '../Order/OrderItem';
import { useState } from 'react';


export default function ModalViewQuote({show, handleClose}) {
  const [responseData, setResponseData] = useState([]);
  //setResponseData(quote)

  return (
    <>    
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
      <Modal.Header closeButton>
        <Modal.Title id="example-modal-sizes-title-lg">
          Large Modal
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
      <>
      <div className="App">
      <div className="logo-container">
        <img src="https://web.ceramicaitalia.com/log.png" alt="Logo" className="logo" />
      </div>
        <h1>Proforma De Pedido </h1>
      
      <div className="order-list">
       
      {/* {responseData.map((data, index) => (
          <OrderItem2
              key={index}
              image={`https://web.ceramicaitalia.com/temporada/${data.materi}.jpg`}
              name={data.descri}
              quantity={data.cntped}
              price={data.precio}
              totalPos={data.vneto}
              pvp ={data.pvp}
            />
          ))} */}
         
        </div> 
    
        
      </div>
     
      
      </>













      </Modal.Body>
    </Modal>
  </>
  )
}
