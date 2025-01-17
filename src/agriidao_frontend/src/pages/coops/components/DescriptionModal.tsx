import { FC } from 'react'; 
import Modal from 'react-bootstrap/Modal'; 
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";

type Props = {
  showDescriptionModal : boolean, 
  setShowDescriptionModal : (showDescriptionModal : boolean) => void,
  coop : Coop | null
}

const DescriptionModal : FC<Props> = ({showDescriptionModal, setShowDescriptionModal, coop}) => { 
  const safeDescription = coop?.description ? String(coop.description) : '';
  const handleClose = () => setShowDescriptionModal(false); 
  
  return ( 
      <Modal  
        show={showDescriptionModal}  
        onHide={handleClose}  
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
        size='xl'
      > 
        <Modal.Dialog  
          style={{ width: '100%', maxWidth: 'none', margin: 0 }} 
        > 
          <Modal.Header closeButton> 
            <Modal.Title>Coop Description</Modal.Title> 
          </Modal.Header> 
          <Modal.Body> 
          <p className="font-15" dangerouslySetInnerHTML={{ __html: safeDescription }}></p>
          </Modal.Body> 
          
        </Modal.Dialog> 
      </Modal> 
  ); 
}
export default DescriptionModal; 