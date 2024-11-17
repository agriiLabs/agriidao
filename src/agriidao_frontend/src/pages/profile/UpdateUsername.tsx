import { useState } from "react";
import { useAuth } from "../../hooks/Context";
import { useNavigate } from "react-router-dom";
import { User } from "../../../../declarations/user/user.did";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { toastError, toastSuccess } from "../../utils/Utils";
import { setUser } from "../../redux/slices/app";
import GenerateReferralCode from "./component/GenerateReferralCode";


function UpdateUsername() {
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
        navigate(`/profile`);
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
      <div className="header header-fixed header-logo-center">
        <a className="header-title">Update My Usersname</a>
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
            <form onSubmit={handleSave}>
              <div className="input-style input-style-2 input-required">
                <input
                  placeholder="What is your username?"
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="textinput textInput form-control"
                />

                <div className="col-12">
                  <button
                    type="submit"
                    disabled={saving}
                    className="col-12 btn btn-sm rounded-sm text-uppercase font-900 border-dark color-dark bg-theme mt-3"
                  >
                    {saving ? "Updating..." : "Update"}
                  </button>
                </div>
              </div>
              <br />
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default UpdateUsername;

