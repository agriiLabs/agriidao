import { useDispatch, useSelector } from "react-redux";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { RootState } from "../../../redux/store";
import { useEffect, useState } from "react";
import { setCampaignUserRequest } from "../../../redux/slices/app";
import { CampaignTask } from "../../../../../declarations/bounty/bounty.did";
import { toast } from "react-toastify";

const CampaignSubmissionPreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { bountyActor } = useAuth();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { campaignUserRequest } = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);
    const [task, setTask] = useState<CampaignTask | null>(null);
  
    useEffect(() => {
      if (campaignUserRequest) {
        getTask();
      }
    }, [campaignUserRequest]);
  
    const getTask = async () => {
      if (!campaignUserRequest || !bountyActor) {
        console.error("campaign user request not found");
        return;
      }
      try {
        const res = await bountyActor.getLatestCampaignTaskById(campaignUserRequest.campaignTaskId);
        if ("ok" in res) {
          setTask(res.ok);
        } else {
          console.error(res.err);
        }
      } catch (error) {
        console.error("Error fetching campaign task: ", error);
      }
    };
  
    const handleSave = async () => {
      if (!campaignUserRequest) {
        console.error("campaign user request not found");
        return;
      }
      setSaving(true);
      try {
        await bountyActor?.addCampaignUser(campaignUserRequest);
        setSaving(false);
        dispatch(setCampaignUserRequest(null));
        toast.success("Congratulations! Task submitted");
        navigate("/reward-summary");
      } catch (error) {
        setSaving(false);
        console.error("Error saving campaign user request: ", error);
      }
    };
  
    return (
      <div>
        <p>Review your submission:</p>
        <p><strong>Task:</strong> {task?.task}</p>
        <p><strong>URL:</strong> {campaignUserRequest?.url}</p>
  
        <div className="d-flex justify-content-between">
          <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
            Back
          </button>
          <button onClick={handleSave} className="btn btn-success">
            {saving ? "Submitting..." : "Confirm"}
          </button>
        </div>
      </div>
    );
  };
  
  export default CampaignSubmissionPreview;