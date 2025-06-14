import { FC } from 'react'; 
import Modal from 'react-bootstrap/Modal'; 
import { Campaign } from '../../../../../../declarations/bounty/bounty.did';

type Props = {
  showRulesModal : boolean, 
  setShowRulesModal : (showRulesModal : boolean) => void,
  campaign : Campaign | null
}
 
const CampaignRules : FC<Props> = ({showRulesModal, setShowRulesModal, campaign}) => { 
  const safeRules = campaign?.rules ? String(campaign.rules) : '';
  const handleClose = () => setShowRulesModal(false); 
 
  return ( 
      <Modal  
        show={showRulesModal}  
        onHide={handleClose}  
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
        size='xl'
      > 
        <Modal.Dialog  
          style={{ width: '100%', maxWidth: 'none', margin: 0 }} 
        > 
          <Modal.Header closeButton> 
            <Modal.Title>Campaign Rules</Modal.Title> 
          </Modal.Header> 
          <Modal.Body> 
          <p className="font-15" dangerouslySetInnerHTML={{ __html: safeRules }}></p>
          </Modal.Body> 
          
        </Modal.Dialog> 
      </Modal> 
  ); 
} 
 
export default CampaignRules;

