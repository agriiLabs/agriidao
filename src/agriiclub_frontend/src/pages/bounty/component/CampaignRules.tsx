import { useState } from 'react'; 
import Button from 'react-bootstrap/Button'; 
import Modal from 'react-bootstrap/Modal'; 
 
function CampaignRules() { 
  const [show, setShow] = useState(false); 
 
  const handleClose = () => setShow(false); 
  const handleShow = () => setShow(true); 
 
  return ( 
    <> 
      <Button variant="primary" onClick={handleShow}> 
        Launch demo modal 
      </Button> 
 
      <Modal  
        show={show}  
        onHide={handleClose}  
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
      > 
        <Modal.Dialog  
          style={{ width: '100%', maxWidth: 'none', margin: 0 }} 
        > 
          <Modal.Header closeButton> 
            <Modal.Title>Modal heading</Modal.Title> 
          </Modal.Header> 
          <Modal.Body> 
            Woohoo, you are reading this text in a modal! 
          </Modal.Body> 
          <Modal.Footer> 
            <Button variant="secondary" onClick={handleClose}> 
              Close 
            </Button> 
            <Button variant="primary" onClick={handleClose}> 
              Save Changes 
            </Button> 
          </Modal.Footer> 
        </Modal.Dialog> 
      </Modal> 
    </> 
  ); 
} 
 
export default CampaignRules;