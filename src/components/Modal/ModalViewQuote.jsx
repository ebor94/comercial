import Modal from 'react-bootstrap/Modal';
import OrderItem2 from '../Order/OrderItem';

export default function ModalViewQuote({show, handleClose, data}) {
  console.log(data)

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
       
      
      <div className="order-list">
       
      {data.map((data, index) => (
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
