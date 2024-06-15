import React, { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate, useParams } from "react-router-dom";
import { Response } from "../../utils/Types";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import { Campaign, UserSocialMediaRequest } from "../../../../declarations/bounty/bounty.did"

type FormData = {
    userName: string
};

const AddUserSocial = () => {
    const navigate = useNavigate();
    const {bountyActor, identity, temporaryVal} = useAuth();
    const { id } = useParams();
    const [saving, setSaving] = useState(false);
    const [camapign, setCampaign] = useState<Campaign | null>(null)
    const principal = identity?.getPrincipal();

    const schema = z.object({
        userName: z
        .string()
        .min(3, { message: "Name must be 3 or more characters long" })
        .max(40, { message: "Name must be less than 40 chararcters long" })
    });

    const {
        register, 
        handleSubmit,
        formState: { errors },
    } = useForm<FormData>({ resolver: zodResolver(schema) });


    
    let userId = identity?.getPrincipal();

    const handleSave = async (data: FormData) => {
        if (!temporaryVal){
            console.error("social media id not available")
            return
        }
        setSaving(true);

        try {
            if (!userId) {
                throw new Error('User ID is undefined. Please make sure the user is logged in.');
            }

            let body: UserSocialMediaRequest = {
                userId: userId,  
                userName: data.userName,
                socialMediaId: temporaryVal,  
            };

            await bountyActor?.addUserSocialMedia(body);
            navigate('/reward-summary')
            console.log("Social media username successfully saved.", {
                autoClose: 5000,
                position: "top-center",
                hiddenProgressBar: true,
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
                <a className="header-title">Register Account</a>
                <a href="#" data-back-button className="header-icon header-icon-1"><i
                        className="fas fa-arrow-left"></i></a>
                <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
            </div>

            <div className="page-content header-clear-medium">
                <div className="card card-style">
                    <div className="content mb-0">
                        <form onSubmit={handleSubmit(handleSave)}>


                            <div className="input-style input-style-2 input-required">
                                <span className="color-highlight">What is your { camapign?.campaignType } username?</span>
                                <em>(required)</em>
                                <input
                                    type="text"
                                    id="userName"
                                    {...register("userName")}
                                    className="textinput textInput form-control"
                                    />
                
                                <div className="col-12">
                                    <button type="submit"
                                        className="col-12 btn btn-full btn-m bg-blue-dark rounded-sm text-uppercase font-800 mt-3">Preview</button>
                                </div>
                            </div>
                            <br />
                        </form>
                    </div>
                </div>
            </div>
        </>
        
    )
}

export default AddUserSocial




