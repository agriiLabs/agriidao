import { useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";
import {
  ProfileRequest,
} from "../../../../declarations/user/user.did";
import { toastError, toastSuccess } from "../../utils/Utils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  mobile: string;
};

const UserProfileCreate = () => {
  const { userActor } = useAuth();
  const [saving, setSaving] = useState(false);
  const [dob, setDob] = useState("");
  const navigate = useNavigate();

  const schema = z.object({
    firstName: z.string().min(3, { message: "Name must be 3 or more characters long" }).max(40),
    lastName: z.string().min(3, { message: "Name must be 3 or more characters long" }).max(40),
    email: z.string().email({ message: "Please enter a valid email address" }),
    mobile: z.string().min(10, { message: "Mobile number must be 10 digits long" }).max(11),
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
        console.error("userActor is null. Cannot proceed.");
        setSaving(false);
        return;
      }
  
      let body: ProfileRequest = {
        firstName: data.firstName,
        lastName: data.lastName,
        dob: dob || "", 
        email: data.email ? [data.email] : [], 
        mobile: data.mobile ? [data.mobile] : [], 
        countryId: [],
        profilePic: [], 
      };
    
      const res = await userActor.addProfile(body);
  
  
      toastSuccess("Profile created successfully!");
      setSaving(false);
      navigate("/profile");
    } catch (error) {
      setSaving(false);
      toastError("Error creating profile");
      console.error("Error creating profile:", error);
    }
  };
  

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">Complete My Profile</a>
        <button onClick={() => navigate(`/profile/`)} className="header-icon header-icon-1">
          <i className="fas fa-arrow-left"></i>
        </button>
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <form onSubmit={handleSubmit(handleSave)}>
              <div className="input-style no-borders input-required">
                <input placeholder="First Name" type="text" {...register("firstName")} className="form-control" />
                {errors.firstName && <p className="text-red-600">{errors.firstName.message}</p>}
              </div>

              <div className="input-style no-borders input-required">
                <input placeholder="Last Name" type="text" {...register("lastName")} className="form-control" />
                {errors.lastName && <p className="text-red-600">{errors.lastName.message}</p>}
              </div>

              <div className="input-style no-borders input-required">
                <input placeholder="Date of Birth" type="date" value={dob} onChange={(e) => setDob(e.target.value)} className="form-control" />
              </div>

              <div className="input-style no-borders input-required">
                <input placeholder="Email" type="text" {...register("email")} className="form-control" />
                {errors.email && <p className="text-red-600">{errors.email.message}</p>}
              </div>

              <div className="input-style no-borders input-required">
                <input placeholder="Mobile No" type="text" {...register("mobile")} className="form-control" />
                {errors.mobile && <p className="text-red-600">{errors.mobile.message}</p>}
              </div>

              <div className="col-12">
                <button type="submit" className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3">
                  {saving ? "Creating Profile..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};


export default UserProfileCreate;
