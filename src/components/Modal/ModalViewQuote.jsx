import Modal from 'react-bootstrap/Modal';
import OrderItem2 from '../Order/OrderItem';
import { useEffect, useState } from 'react';

export default function ModalViewQuote({show, handleClose, data, nameCte}) {
  const [quote, setQuote] = useState(data)
  useEffect(() => {
    setQuote(data)
  }, [data])
  

  return (
    <>    
    <Modal
      size="lg"
      show={show}
      onHide={handleClose}
      aria-labelledby="example-modal-sizes-title-lg"
    >
     
      <Modal.Body>
      <>
      <div className="App">
      <div className="logo-container">
        <img src="https://web.ceramicaitalia.com/log.png" alt="Logo" className="logo" />
      </div>
      <div className="logo-container">        
        <h3>{nameCte}</h3>
      </div>
       
      
      <div className="order-list">
        
       
      {quote.map((data, index) => (
          <OrderItem2
              key={index}
              image={`https://web.ceramicaitalia.com/temporada/${data.materi}.jpg`}
              name={data.descri}
              quantity={data.cntped}
              price={data.precio}
              totalPos={data.vneto}
              pvp ={data.pvp}
            />
          ))}
         
        </div> 
    
        
      </div>
     
      
      </>













      </Modal.Body>
    </Modal>
  </>
  )
}
