import { FC } from 'react'; 
import { Modal } from "react-bootstrap"; 
import { Coop } from "../../../../../declarations/coop_manager/coop_manager.did";

type Props = {
  showDescriptionModal: boolean; 
  setShowDescriptionModal: (showDescriptionModal: boolean) => void;
  coop: Coop | null;
};

const DescriptionModal: FC<Props> = ({ showDescriptionModal, setShowDescriptionModal, coop }) => {
  const safeDescription = coop?.description ? String(coop.description) : '';
  const handleClose = () => setShowDescriptionModal(false); 
  
  return ( 
    <Modal
    show={showDescriptionModal}
    onHide={handleClose}
    // centered 
    size="xl"
  >
    <Modal.Header closeButton>
      <Modal.Title>Coop Description</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <p
        className="font-15"
        dangerouslySetInnerHTML={{ __html: safeDescription }}
      ></p>
    </Modal.Body>
  </Modal>
  ); 
}
export default DescriptionModal; 