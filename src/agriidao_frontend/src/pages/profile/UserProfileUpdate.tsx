import { useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { Profile } from "../../../../declarations/user/user.did";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toastError, toastSuccess } from "../../utils/Utils";

const UserProfileUpdate = () => {
  const { userActor } = useAuth();
  const { profile } = useSelector((state: RootState) => state.app) 
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  const [email, setEmail] = useState<string>(
    profile && profile.email.length != 0 ? profile.email[0] : ""
  );

  const [mobile, setMobile] = useState<string>(
    profile && profile.mobile.length != 0 ? profile.mobile[0] : ""
  );

  const handleSave = async (e: any) => {
    e.preventDefault();
    if (!userActor) {
        console.error("userActor is null");
        return;
      }
    if (!profile) {
      console.error("user is null");
      return;
    }
    if (!checkEmailFormat(email)) {
      toastError("Please enter a valid email address");
      return;
    }
    if (!checkMobileFormat(parseInt(mobile))) {
      toastError("Please enter a valid mobile number");
      return;
    }
    if (email == "" || mobile == "") {
      toastError("Please fill in all the fields");
      return;
    }
    setSaving(true);

    const body: Profile = {
      ...profile, //values that will not be changed
      email: [email],
      mobile: [mobile],
    };
    try {
      await userActor.updateProfile(body);
        toastSuccess("Profile updated successfully");
        navigate("/profile");
    } catch (error){
        setSaving(false)
        toastError("Error updating profile");
        console.error("Error updating profile", error)
    };
  };

  const checkEmailFormat = (email: string) => {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    return emailRegex.test(email);
  };

  const checkMobileFormat = (mobile: number) => {
    const mobileRegex = /^[0-9]{10}$/;
    return mobileRegex.test(mobile.toString());
  }

  // go back
  const handleBack = () => {
    navigate(`/profile/`);
  };

  return (
    <>
      <div className="header header-fixed header-logo-center">
        <a href="#" className="header-title">
          Update My Profile
        </a>
        <button
          onClick={handleBack}
          data-back-button
          className="header-icon header-icon-1"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        
      </div>

      <div className="page-content header-clear-medium">
        <div className="card card-style">
          <div className="content mb-0">
            <form onSubmit={handleSave}>
              <div className="input-style no-borders input-required">
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                {/* <em>(required)</em> */}
                <input
                    placeholder="What is your email?"
                    type="text"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="textinput textInput form-control"
                />
              </div>
              <div className="input-style no-borders input-required">
                <i className="fa fa-check disabled valid color-green-dark"></i>
                <i className="fa fa-check disabled invalid color-red-dark"></i>
                {/* <em>(required)</em> */}
                <input
                    placeholder="What is your mobile no?"
                    type="number"
                    id="mobile"
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value)}
                    className="textinput textInput form-control"
                />
              </div>

              <div className="col-12">
                <button
                    type="submit"
                    disabled={saving}
                    className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                  >
                    {
                        saving ? "Updating..." : "Update"
                    }
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

export default UserProfileUpdate;
