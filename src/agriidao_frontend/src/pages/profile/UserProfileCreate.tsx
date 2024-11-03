import { useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";

import {
  ProfileRequest,
} from "../../../../declarations/user/user.did";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toastError, toastSuccess } from "../../utils/Utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
  // dob: string;
};

const UserProfileCreate = () => {
  const { userActor } = useAuth();
  const { user, profileRequest } = useSelector((state: RootState) => state.app);
  const [saving, setSaving] = useState(false);
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const schema = z.object({
    firstName: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" })
      .max(40, { message: "Name must be less than 40 chararcters long" }),
    lastName: z
      .string()
      .min(3, { message: "Name must be 3 or more characters long" })
      .max(40, { message: "Name must be less than 40 chararcters long" }),
    email: z.string().email({ message: "Please enter a valid email address" }),
    mobile: z
      .string()
      .min(10, { message: "Mobile number must be 10 digits long" })
      .max(11, { message: "Mobile number must be 10 digits long" }),
    // dob: z.string().min(8, { message: "Date of birth required" }),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  const handleSave = async (data: FormData) => {
    setSaving(true);
    try {
      if (!userActor) {
        console.error("userActor is null");
        setSaving(false);
        return;
      }
      
      let body: ProfileRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: dob,
        email: [data.email],
        mobile: [data.mobile],
        countryId: [],
        profilePic: [],
      };    
        await userActor.addProfile(body);
        toastSuccess("Profile created successfully");
        setSaving(false);
        navigate("/profile");
      } catch (error) {
        setSaving(false);
        toastError("Error creating profile");
        console.error("Error creating profile", error);
    }
  };

  // go back
  const handleBack = () => {
    navigate(`/profile/`);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Complete My Profile
        </a>
        <button
          onClick={handleBack}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        {/* <a href="#" data-toggle-theme className="header-icon header-icon-4">
          <i className="fas fa-lightbulb"></i>
        </a> */}
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
                  placeholder="What is your first name?"
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="textinput textInput form-control"
                />
                {errors.firstName && (
                    <p className="text-red-600">{errors.firstName.message}</p>
                  )}
              </div>
              <div className="input-style no-borders input-required">
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                {/* <em>(required)</em> */}
                <input
                  placeholder="What is your last name?"
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="textinput textInput form-control"
                />
                {errors.lastName && (
                    <p className="text-red-600">{errors.lastName.message}</p>
                  )}
              </div>
              <div className="input-style no-borders input-required">
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                {/* <em>(required)</em> */}
                <input
                      placeholder="What is your date of birth?"
                      type="date"
                      id="dob"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="textinput textInput form-control"
                    />
              </div>
              <div className="input-style no-borders input-required">
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                {/* <em>(required)</em> */}
                <input
                  placeholder="What is your email?"
                  type="text"
                  id="email"
                  {...register("email")}
                  className="textinput textInput form-control"
                />
                {errors.email && (
                    <p className="text-red-600">{errors.email.message}</p>
                  )}
              </div>
              <div className="input-style no-borders input-required">
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                {/* <em>(required)</em> */}
                <input
                  placeholder="What is your mobile no?"
                  type="number"
                  id="mobile"
                  {...register("mobile")}
                  className="textinput textInput form-control"
                />
                {errors.mobile && (
                    <p className="text-red-600">{errors.mobile.message}</p>
                  )}
              </div>

              <div className="col-12">
                <button
                  type="submit"
                  
                  className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                >
                  {saving ? "Creating Profile..." : "Create"}
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

export default UserProfileCreate;
