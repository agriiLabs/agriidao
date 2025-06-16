import { FC, useEffect, useState } from "react";
import { CampaignTaskRequest } from "../../../../../../declarations/bounty/bounty.did";
import { useAuth } from "../../../../hooks/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { Modal } from "react-bootstrap";
import { setCampaignTaskRequest } from "../../../../redux/slices/app";
import { SettingsData } from "../../../../../../declarations/settings/settings.did";
import AddCampaignTaskPreview from "./AddCampaignTaskPreview";

type Props = {
  showAddCampaignTaskModal: boolean;
  setShowAddCampaignTaskModal: (showAddCampaignTaskModal: boolean) => void;
};

type FormData = {
  task: string;
  allocation: number;
};

const AddCampaignTask: FC<Props> = ({
  showAddCampaignTaskModal,
  setShowAddCampaignTaskModal,
}) => {
  const { bountyActor, settingsActor } = useAuth();
  const { id } = useParams();
  const dispatch = useDispatch();
  const [categories, setCategories] = useState<SettingsData[] | null>(null);
  const [currentStep, setCurrentStep] = useState(1);

  let acTypeName = "Task";

  const schema = z.object({
    task: z.string().min(1, { message: "Task required" }),
    allocation: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, received a string",
    }),
  });

  useEffect(() => {
    getAcTypeCategories();
  }, []);

  const getAcTypeCategories = async () => {
    try {
      if (!settingsActor) {
        console.error("settingsActor is not available");
        return;
      }
      const res = await settingsActor.getCategoryByCName(acTypeName);
      if ("ok" in res) {
        setCategories([res.ok]);
      } else if ("err" in res) {
        console.error("Failed to fetch categories:", res.err);
        setCategories(null);
      } 
    } catch (error) {
      console.log("Error when fetching categories", error);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });


  const handleSave = async (data: FormData) => {
    if (!bountyActor || !id) {
      console.error("bountyActor is null");
      return;
    }

    try {
      let body: CampaignTaskRequest = {
        campaignId: id,
        task: data.task,
        allocation: Number(data.allocation),
      };
      dispatch(setCampaignTaskRequest(body));
      setCurrentStep(2);
    } catch (error) {
      console.log("There was an error creating task", error);
      toast.error("There was an error saving task.");
    }
  };

  return (

    <Modal
      show={showAddCampaignTaskModal}
      onHide={() => setShowAddCampaignTaskModal(false)}
      size="lg"
      centered
      >
      <Modal.Header closeButton>
        <Modal.Title>Add Campaign Task</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        { currentStep === 1 ? (
          <form onSubmit={handleSubmit(handleSave)}>
            <div className="input-style no-borders input-required">
              <select
                id="task"
                {...register("task")}
                className="select form-control">
                {categories?.map((category) => (
                  <option key={category.id} value={category.category}>
                    {category.category}
                  </option>
                ))}
              </select>
              {errors.task && (
                <span className="text-red-600">
                  {errors.task.message}
                </span>
              )}
            </div>
            <div className="input-style no-borders input-required">
              <label
                htmlFor="allocation"
                className="col-form-label requiredField"
              >
                Allocation
                <span className="asteriskField">*</span>
              </label>
              <input
                type="number"
                id="allocation"
                {...register("allocation")}
                className={`textinput textInput form-control ${
                  errors.allocation ? "is-invalid" : ""
                }`}
              />
              {errors.allocation && (
                <span className="text-red-600">
                  {errors.allocation.message}
                </span>
              )}
            </div>
            <button
              type="submit"
              className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2">
              Next
            </button>
          </form>
        ) : (
          <AddCampaignTaskPreview setCurrentStep={setCurrentStep} />
        )}
      </Modal.Body>
    </Modal>
  );
}

export default AddCampaignTask;

