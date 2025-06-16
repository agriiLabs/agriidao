import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../../redux/store";
import { useAuth } from "../../../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { toastError, toastSuccess } from "../../../../utils/Utils";
import { setCampaignRequest } from "../../../../redux/slices/app";

const AddCampaignPreview = ({ setCurrentStep }: { setCurrentStep: (step: number) => void }) => {
    const { bountyActor } = useAuth();
    const { id } = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { campaignRequest } = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);
    const handleSave = async () => {
        if (!bountyActor) {
            console.error("bountyActor is null");
            return;
        }
        setSaving(true);
        try {
            if (!campaignRequest) {
                console.error("Campaign request is null, cannot proceed.");
                setSaving(false);
                return;
            }
            const res = await bountyActor.addCampaign(campaignRequest);
            if (res && "ok" in res) {
                setSaving(false);
                dispatch(setCampaignRequest(null));
                toastSuccess("Campaign successfully added");
                navigate(`/d/campaigns/${id}`);
            } else {
                throw new Error("Failed to add campaign");
            }
        } catch (error) {
            setSaving(false);
            toastError("Error adding campaign");
            console.error("Error adding campaign:", error);
        }
    };

    return (
        <div>
            <p>Review Campaign</p>
            <p><strong>Name:</strong> {campaignRequest?.name}</p>
            <p><strong>URL:</strong> {campaignRequest?.url}</p>
            <p><strong>Type:</strong> {campaignRequest?.campaignType}</p>
            <p><strong>Campaign Pic</strong> {campaignRequest?.campaignPic}</p>
            <p><strong>Total Value:</strong> {campaignRequest?.totalValue}</p>
            <p><strong>Rules:</strong> {campaignRequest?.rules}</p>
            <p><strong>Notes:</strong> {campaignRequest?.notes}</p>
            <div className="d-flex justify-content-between">
                <button onClick={() => setCurrentStep(1)} className="btn btn-outline-dark">
                    Back
                </button>
                <button onClick={handleSave} className="btn btn-success">
                    {saving ? "Submitting..." : "Confirm"}
                </button>
                </div>
        </div>
    )
}
export default AddCampaignPreview;