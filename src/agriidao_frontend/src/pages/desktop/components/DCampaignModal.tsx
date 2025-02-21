import { FC, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Campaign,
  CampaignTask,
  CampaignUserRequest,
} from "../../../../../declarations/bounty/bounty.did";
import { useDispatch } from "react-redux";
import { setCampaignUserRequest } from "../../../redux/slices/app";
import { useAuth } from "../../../hooks/Context";
import CampaignSubmissionPreview from "./DCampaignSubmissionPreview";

type Props = {
  showRewardModal: boolean;
  setShowRewardModal: (showRulesModal: boolean) => void;
  campaign: Campaign | null;
};

type FormData = {
  url: string;
  campaignTaskId: string;
};

const DCampaignSubmission: FC<Props> = ({
  showRewardModal,
  setShowRewardModal,
  campaign,
}) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bountyActor } = useAuth();
  const { id } = useParams();
  const [campaignTasks, setCampaignTasks] = useState<CampaignTask[] | null>(
    null
  );
  const [currentStep, setCurrentStep] = useState(1);

  const schema = z.object({
    url: z.string().url({ message: "Invalid URL" }),
    campaignTaskId: z.string().min(1, { message: "Task type required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getCampaignCampaignTasks();
  }, [id]);

  const getCampaignCampaignTasks = async () => {
    if (!id || !bountyActor) {
      console.error("ID or bountyActor is null");
      return;
    }
    const res = await bountyActor.getCampaignCampaignTasks(id);
    setCampaignTasks(res);
  };

  const handleSave = async (data: FormData) => {
    const selectedTask = campaignTasks?.find(
      (task) => task.task === data.campaignTaskId
    );
    if (!selectedTask) {
      toast.error("No task found", {
        autoClose: 5000,
        position: "top-center",
        hideProgressBar: true,
      });
      return;
    }

    const body: CampaignUserRequest = {
      campaignId: String(campaign?.id),
      campaignTaskId: selectedTask.id,
      url: data.url,
    };

    dispatch(setCampaignUserRequest(body));
    setCurrentStep(2);
  };

  return (
    <Modal
      show={showRewardModal}
      onHide={() => setShowRewardModal(false)}
      centered
      size="lg"
    >
      <Modal.Header closeButton>
        <Modal.Title>
          {currentStep === 1 ? "Submit Task" : "Confirm Submission"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body> 
      {currentStep === 1 ? (
        <form onSubmit={handleSubmit(handleSave)}>
          <div className="input-style no-borders input-required">
            <input
              placeholder="Link to the completed task"
              type="text"
              {...register("url")}
              className="textinput textInput form-control"
            />
            {errors.url && <span style={{ color: "red" }}>{errors.url.message}</span>}
          </div>

          <div className="input-style input-style-2 input-required">
            <select {...register("campaignTaskId")} className="select form-control">
              <option value="">Select task</option>
              {campaignTasks?.map((task, index) => (
                <option key={index} value={task.task}>
                  {task.task}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2">
            Next
          </button>
        </form>
      ) : (
        <CampaignSubmissionPreview setCurrentStep={setCurrentStep} />
      )}
    </Modal.Body> 
    </Modal>
  );
};

export default DCampaignSubmission;
