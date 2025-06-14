import React, { useEffect, useState } from "react";
import { CampaignTaskRequest } from "../../../../../declarations/bounty/bounty.did";
import { useAuth } from "../../../hooks/Context";
import { toast } from "react-toastify";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

type FormData = {
  task: string;
  allocation: number;
};

const AddCampaignTask = ({ setOpenForm, campaign, setTaskAllocationSaved }) => { 
  const { bountyActor, settingsActor } = useAuth(); // call userBackend
  const [saving, setSaving] = useState(false);
  const [categories, setCategories] = useState<any[]|null>(null);

  let acTypeName = "Task"

  const schema = z.object({
    task: z.string().min(1, {message: "Task required"}),
    allocation: z.string().refine((val) => !Number.isNaN(parseInt(val, 10)), {
      message: "Expected number, recieved a string",
    })
  });

  const {
    register, 
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getAcTypeCategories()
  }, []);

  const getAcTypeCategories = async () => {
      try {
        const res = await settingsActor.getAllLatestAcTypeCategoriesByName(acTypeName);
        setCategories(res)
      } catch (error) {
        console.log("Error when fetching categories", error)
      }
    }
  

  const handleSave = async (data: FormData) => {
    setSaving(true);

    try {
      let body: CampaignTaskRequest = {
        campaignId: campaign.id,
        task: data.task,
        allocation: Number(data.allocation),
      };

    await bountyActor.addCampaignTask(body);
    toast.success("Task successfully saved.", {
      autoClose: 5000,
      position: "top-center",
      hideProgressBar: true,
    });
    setTaskAllocationSaved(true);
    setOpenForm(false);
    setSaving(false);
  } catch (error) {
    console.log("there was an error creating task", error);
    toast.error("There was an error saving task.", {
      autoClose: 5000,
      position: "top-center",
      hideProgressBar: true,
    });
    setSaving(false);
    }
};

  
  return (
    <div className="form-modal">
      <div className="container-fluid modal-child">
        <div className="row">
          <div className="col-12">
            <div className="page-title-box">
              <div className="page-title-right">
                <ol className="breadcrumb m-0">
                  <li className="breadcrumb-item">
                    <a href="javascript: void(0);">InventoryClub</a>
                  </li>
                  <li className="breadcrumb-item">
                    <a href="{% url 'bounty:bounty_list' %}">Bounties</a>
                  </li>
                  <li className="breadcrumb-item active">Add Bounty</li>
                </ol>
              </div>
              <h4 className="page-title">Add Bounty</h4>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-12">
            <div className="card-box">
              <h5 className="text-uppercase bg-light p-2 mt-0 mb-3">General</h5>
              <form onSubmit={handleSubmit(handleSave)}>
                <div className="form-group mb-3">
                  <div className="form-group">
                    <label
                      htmlFor="campaignType"
                      className="col-form-label requiredField"
                    >
                      Task
                      <span className="asteriskField">*</span>
                    </label>

                    <select
                      id="task"
                      {...register("task")}
                      className="select form-control"
                    >
                      {categories?.map((category) => <option>{category.name}</option>)}
                    </select>
                  </div>
                  {errors.task && (
                    <span className="text-red-600">
                      {errors.task.message}
                    </span>
                  )}
                </div>

                <div className="form-group mb-3">
                  <div className="form-group">
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
                      className="textinput textInput form-control"
                    />
                  </div>
                  {errors.allocation && (
                    <span className="text-red-600">
                      {errors.allocation.message}
                    </span>
                  )}
                </div>

                
                <div className="col-12">
                  <div className="text-center mb-3">
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        setOpenForm(false);
                      }}
                      className="btn w-sm btn-light waves-effect"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="btn w-sm btn-success waves-effect waves-light"
                    >
                      {saving ? "Saving Campaign Task..." : "Save"}
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCampaignTask;
function setSaving(arg0: boolean) {
  throw new Error("Function not implemented.");
}

