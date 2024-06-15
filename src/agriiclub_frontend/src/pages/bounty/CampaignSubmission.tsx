import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useParams } from "react-router-dom";
import { Response } from "../../utils/Types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Campaign, CampaignTask, CampaignUserRequest } from "../../../../declarations/bounty/bounty.did"


type FormData = {
    url: string
    campaignTaskId: string
};

const AddCampaignSub = () => {
    const {bountyActor, identity} = useAuth();
    const { id } = useParams();
    const [saving, setSaving] = useState(false);
    const [campaign, setCampaign] = useState<Campaign | null>(null)
    const [campaignTasks, setCampaignTasks] = useState<CampaignTask[] | null>(null)
    const principal = identity?.getPrincipal();

    const schema = z.object({
        url: z
        .string()
        .min(3, { message: "Name must be 3 or more characters long" })
        .max(40, { message: "Name must be less than 40 chararcters long" }),
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
            console.log(res.err)
        }
    };

    const getCampaignCampaignTasks = async () => {
        if (!id || !bountyActor) {
            console.error("ID or bountyActor is null");
            return;
        }

        const res = await bountyActor.getCampaignCampaignTasks(id);
        setCampaignTasks(res)
    };

    let campaignId = campaign?.id
    let userId = identity?.getPrincipal();

    const handleSave = async (data: FormData) => {
        setSaving(true);

        try {
            const selectedTask = campaignTasks?.find((task) => task.task === data.campaignTaskId)
            if (!selectedTask) {
                toast.error("No category found", {
                  autoClose: 5000,
                  position: "top-center",
                  hideProgressBar: true,
                });
                setSaving(false)
                return;
            }

            let body: CampaignUserRequest = {
                campaignId: String(campaignId), 
                campaignTaskId: data.campaignTaskId,
                url: data.url
            };

            await bountyActor?.addCampaignUser(body);
            console.log("user saved")
            toast.success("Social media task successfully saved.", {
                autoClose: 5000,
                position: "top-center",
            });
            setSaving(false);

        } catch (error) {
            console.error('Error saving user social media:', error);
            toast.error("There was an error saving user social media.", {
                autoClose: 5000,
                position: "top-center",
                hideProgressBar: true,
            });
            setSaving(false);
        }
    };

    return (
        <>
            <div className="header header-fixed header-logo-center">
                <a className="header-title">Join Campaign</a>
                <a href="#" data-back-button className="header-icon header-icon-1"><i className="fas fa-arrow-left"></i></a>
                <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
            </div>

            <div className="page-content header-clear-medium">
                <div className="card card-style">
                    <div className="content mb-0">
                        <form onSubmit={handleSubmit(handleSave)}>                    

                            <div className="input-style no-borders input-required">
                                <label htmlFor="url">What is the web link?</label>
                                <i className="fa fa-check disabled valid color-green-dark"></i>
                                <i className="fa fa-check disabled invalid color-red-dark"></i>
                                <em>(required)</em>
                                <input
                                    placeholder="What is the web link?"
                                    type="text"
                                    id="url"
                                    {...register("url")}
                                    className="textinput textInput form-control"
                                    />
                            </div>

                            <div className="input-style input-style-2 input-required">
                                <em>(required)</em>
                                <i className="fa fa-check disabled valid color-green-dark"></i>
                                <i className="fa fa-check disabled invalid color-red-dark"></i>
                                <select
                                    
                                    id="acCategory"
                                    {...register("campaignTaskId")}
                                    className="select form-control"
                                    >
                                        <option value="">Select task</option> 
                                    {campaignTasks?.map((task, index) => <option key={index} value={task.task}>{task.task}</option>)}
                                    
                                    </select>
                                
                            </div>

                            <div className="col-12">
                                <button type="submit"
                                    className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3">Preview</button>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </>
    )

}

export default AddCampaignSub
