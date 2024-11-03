import { useEffect, useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Campaign, UserSocialMediaRequest } from "../../../../declarations/bounty/bounty.did"
import { useDispatch } from "react-redux";
import { setUserSocialMediaRequest } from "../../redux/slices/app";
import { AcCategory } from "../../../../declarations/settings/settings.did";

type FormData = {
    userName: string
};

const AddUserSocial = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { settingsActor, identity, temporaryVal} = useAuth();
    const [socialMedia, setSocialMedia] = useState<AcCategory | null>(null);

    useEffect(() => {
        getSocialMedia();
      }, [temporaryVal]);
    
      //get social Media name
      const getSocialMedia = async () => {
        if (!settingsActor) {
          console.error("settingsActor is null");
          return;
        }
        try {
          const res = await settingsActor.getAcCategoryLatest(temporaryVal || "");
          if ("ok" in res) {
            setSocialMedia(res.ok);
          } else {
            console.error("Error getting social media name: ", res.err);
          }
        } catch (error) {
          console.error("Error getting social media name: ", error);
        }
      };
    
      let socialName = socialMedia?.name; // set social media name
    


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
        };

        if (!userId) {
            throw new Error('User ID is undefined. Please make sure the user is logged in.');
        };

        let body: UserSocialMediaRequest = {
            userId: userId,  
            userName: data.userName,
            socialMediaId: temporaryVal,  
        };
        dispatch(setUserSocialMediaRequest(body))
        navigate("/add-social-media-preview")
            

         
    };

    return (
        <>
            <div className="header header-fixed header-logo-center">
                <a className="header-title">{  socialName }</a>
                <a href="#" data-back-button className="header-icon header-icon-1"><i
                        className="fas fa-arrow-left"></i></a>
                <a href="#" data-toggle-theme className="header-icon header-icon-4"><i className="fas fa-lightbulb"></i></a>
            </div>

            <div className="page-content header-clear-medium">
                <div className="card card-style">
                    <div className="content mb-0">
                        <form onSubmit={handleSubmit(handleSave)}>


                            <div className="input-style input-style-2 input-required">
                                <input
                                    placeholder="What is your username?"
                                    type="text"
                                    id="userName"
                                    {...register("userName")}
                                    className="textinput textInput form-control"
                                    />
                
                                <div className="col-12">
                                    <button type="submit"
                                        className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3">Preview</button>
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




