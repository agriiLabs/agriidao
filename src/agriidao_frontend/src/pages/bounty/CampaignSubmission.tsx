import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Response } from "../../utils/Types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import {
  Campaign,
  CampaignTask,
  CampaignUserRequest,
} from "../../../../declarations/bounty/bounty.did";
import { useDispatch } from "react-redux";
import { setCampaignUserRequest } from "../../redux/slices/app";

type FormData = {
  url: string;
  campaignTaskId: string;
};

const AddCampaignSub = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { bountyActor } = useAuth();
  const { id } = useParams();
  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [campaignTasks, setCampaignTasks] = useState<CampaignTask[] | null>(null);

  const schema = z.object({
    url: z
      .string().url({ message: "Invalid url" }),
    campaignTaskId: z.string().min(1, { message: "Task type required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    getCampaignLatest();
    getCampaignCampaignTasks();
  }, [id]);

  const getCampaignLatest = async () => {
    if (!id || !bountyActor) {
      console.error("ID or bountyActor is null");
      return;
    }

    const res: Response = await bountyActor.getCampaignLatest(id);

    if (res.ok) {
      setCampaign(res.ok);
    } else {
      console.error(res.err);
    }
  };

  const getCampaignCampaignTasks = async () => {
    if (!id || !bountyActor) {
      console.error("ID or bountyActor is null");
      return;
    }

    const res = await bountyActor.getCampaignCampaignTasks(id);
    setCampaignTasks(res);
  };

  let campaignId = campaign?.id;

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
      campaignId: String(campaignId),
      campaignTaskId: selectedTask.id,
      url: data.url,
    };
    dispatch(setCampaignUserRequest(body));
    navigate("/campaign-submission-preview");
  };


  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Join Campaign</a>
        <button
          onClick={() => window.history.back()}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="input-style no-borders input-required">
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                {/* <em>(required)</em> */}
                <input
                  placeholder="Link to the completed task"
                  type="text"
                  id="url"
                  {...register("url")}
                  className="textinput textInput form-control"
                />
                {errors.url && (
                    <span style={{color: "red"}}>{errors.url.message}</span>
                  )}
              </div>

              <div className="input-style input-style-2 input-required">
                {/* <em>(required)</em> */}
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                <select
                  id="acCategory"
                  {...register("campaignTaskId")}
                  className="select form-control"
                >
                  <option value="">Select task</option>
                  {campaignTasks?.map((task, index) => (
                    <option key={index} value={task.task}>
                      {task.task}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
                >
                  Preview
                </button>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddCampaignSub;
