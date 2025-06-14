import { FC, useEffect, useState } from 'react'; 
import Modal from 'react-bootstrap/Modal'; 
import { Campaign, CampaignTask } from '../../../../../../declarations/bounty/bounty.did';
import { useAuth } from '../../../../hooks/Context';

type Props = {
  showRewardsModal : boolean, 
  setShowRewardsModal : (showRewardsModal : boolean) => void,
  campaign : Campaign | null
}
 
const CampaignRewards : FC<Props> = ({showRewardsModal, setShowRewardsModal, campaign}) => { 
  const { bountyActor } = useAuth();
  const [tasks, setTasks] = useState<CampaignTask[] | null>(null)

  useEffect(() => {
    if(bountyActor){
      getCampaignTasks()
    }
  }, [campaign, bountyActor])

  const getCampaignTasks = async () =>{
    try {
      if(bountyActor && campaign){
        const tasks = await bountyActor.getCampaignCampaignTasks(campaign.id)
        setTasks(tasks)
        }
    } catch (error) {
      console.error("Error fetching tasks: ", error)
    }
  }
  const handleClose = () => setShowRewardsModal(false); 
 
  return ( 
      <Modal  
        show={showRewardsModal}  
        onHide={handleClose}  
        style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }} 
        size='xl'
      > 
        <Modal.Dialog  
          style={{ width: '100%', maxWidth: 'none', margin: 0 }} 
        > 
          <Modal.Header closeButton> 
            <Modal.Title>Task Rewards</Modal.Title> 
          </Modal.Header> 
          <Modal.Body> 
              {tasks?.map((tasks, index) => (
                  <div className="row mb-0">
                  <div className="col-6">
                      <p className="font-15">{tasks.task}</p>
                  </div>
                  <div className="col-6">
                      <p className="font-15 text-end">{tasks.allocation}</p>
                  </div>
                  <div className="divider divider-margins w-100 mt-2 mb-2"></div>
                  </div>
              ))} 
          </Modal.Body> 
          
        </Modal.Dialog> 
      </Modal> 
  ); 
} 
 
export default CampaignRewards;

