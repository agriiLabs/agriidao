import { useState } from "react";
import { useAuth } from "../../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../../declarations/user/user.did";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../redux/store";
import { toastError, toastSuccess } from "../../../utils/Utils";
import { setUser } from "../../../redux/slices/app";
import GenerateReferralCode from "../../profile/component/GenerateReferralCode";

function DUpdateUsername() {
    const { userActor } = useAuth();
    const {user} = useSelector((state: RootState) => state.app);
    const [saving, setSaving] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [username, setUsername] = useState<string>(
      user && user.username.length != 0 ? user.username[0] : ""
    );
  
    const handleSave = async (e: any) => {
      e.preventDefault();
      if (!userActor) {
        console.error("userActor is null");
        return;
      }
      if (!user) {
        console.error("user is null");
        return;
      }
      if (!checkUsername(username)) {
        toastError("Please enter a valid username");
        return;
      }
      if (username == "") {
        toastError("Please fill in username");
        return;
      }
      setSaving(true);
  
      // Retrieve the referral code the user signed up with
      const signupReferralCode = localStorage.getItem('referralCode');
  
      // Clear after retrieval
      if (signupReferralCode) {
        localStorage.removeItem("referralCode"); 
      }
  
      let code;
      const generateReferralLink = (code: string) => {
        return `https://agriidao.org/login?referralCode=${code}`;
      };
      try {
        const principalId = user.id; 
        if (!principalId) {
          throw new Error("User ID is not available.");
        }
        code = await GenerateReferralCode(principalId.toString());
        console.log("Generated Referral Code:", code);
      } catch (error) {
        setSaving(false);
        toastError("Error generating referral code");
        console.error("Error generating referral code", error);
        return;
      }
  
      const body: User = {
        ...user,
        username: username ? [username] :[],
        referralCode: [code],
        referralLink: [generateReferralLink(code)],
        referredBy: signupReferralCode ? [signupReferralCode] : [],
      };
      try {
        const res = await userActor.updateUser(body);
        console.log("Response from updateUser:", res);
        if ("ok" in res) {
          dispatch(setUser(res.ok));
          navigate(`/d/profile`);
          toastSuccess("Username successfully updated");
        } else if ("err" in res) {
          toastError("Username already exists");
          throw new Error(res.err);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (error) {
        setSaving(false);
        // toastError("Error updating username");
        console.error("Error updating username", error);
      }
    };
  
    const checkUsername = (username: string) => {
      // Username should be between 3 and 20 characters and can contain letters, numbers, underscores, and dots
      const usernameRegex = /^[a-zA-Z0-9._]{3,20}$/;
      return usernameRegex.test(username);
    };
    
  return (
    <>
          <div className="d-flex align-items-center justify-content-between">
            <div>
              <h5 className="mb-0">Update My Username</h5>
            </div>
          </div>
    
          <div className="row">
            <div className="col-xl-8">
              <div className="col-xl-12 mt-4">
                <div className="card rounded shadow border-0 p-4">
                  <div className="d-flex justify-content-between mb-4">
                    <h5 className="mb-0">Username</h5>
                  </div>
                  <form onSubmit={handleSave}>
                  <div className="input-style no-borders input-required mb-4">
                        <input
                            placeholder="What is your username?"
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className=" textinput textInputform-control"
                        />
                        </div>
                        <button
                        type="submit"
                        disabled={saving}
                        className="btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-2"
                        >
                        {saving ? "Updating..." : "Update"}
                        </button>
                    </form>
                </div>
              </div>
            </div>
          </div>
    
          <div className="col-xl-8 mt-4">
            <div className="card border-0"></div>
          </div>
        </>
  )
}

export default DUpdateUsername