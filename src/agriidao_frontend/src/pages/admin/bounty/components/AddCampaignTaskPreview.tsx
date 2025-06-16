import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setCampaignTaskRequest } from "../../../../redux/slices/app";

const AddCampaignTaskPreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { bountyActor } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { campaignTaskRequest } = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);

    const handleSave = async () => {
        if (!bountyActor) {
            console.error("bountyActor is null");
            return;
        }
        setSaving(true);
        try {
            if (!campaignTaskRequest) {
                console.error("Campaign task request is null, cannot proceed.");
                setSaving(false);
                return;
            }
            const res = await bountyActor.addCampaignTask(campaignTaskRequest);
            if (res && "ok" in res) {
                setSaving(false);
                dispatch(setCampaignTaskRequest(null));
                toastSuccess("Campaign task successfully added");
                navigate(`/d/campaigns/${id}`);
            } else {
                throw new Error("Failed to add campaign task");
            }
        } catch (error) {
            setSaving(false);
            toastError("Error adding campaign task");
            console.error("Error adding campaign task:", error);
        }
    };

    return (
        <div>
            <p>Review Campaign Task:</p>
            <p><strong>Name:</strong> {campaignTaskRequest?.task}</p>
            <p><strong>Description:</strong> {campaignTaskRequest?.allocation}</p>
            <p><strong>Reward:</strong> {campaignTaskRequest?.campaignId}</p>
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
}

export default AddCampaignTaskPreview;