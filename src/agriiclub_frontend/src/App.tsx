import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import RewardSummary from "./pages/bounty/RewardSummary";
import { useAuth } from "./hooks/Context";
import { useState, useEffect } from "react";
import { User} from "../../declarations/user/user.did";
import TotalSubmission from "./pages/bounty/TotalSubmission";
import TotalPending from "./pages/bounty/TotalPending";
import TotalRejected from "./pages/bounty/TotalRejected";
import TotalAccepted from "./pages/bounty/TotalAccepted";
import RewardCampaigns from "./pages/bounty/RewardCampaigns";
import CampaignDetail from "./pages/bounty/CampaignDetail";
import AddUserSocial from "./pages/bounty/AddUserSocial";
import AddUserSocialPreview from "./pages/bounty/AddUserSocialPreview";
import CampaignSubmission from "./pages/bounty/CampaignSubmission";
import More from "./pages/more/More";
import CampaignSubmissionPreview from "./pages/bounty/CampaignSubmissionPreview";
import UserProfile from "./pages/more/UserProfile";
import GetStarted from "./pages/GetStarted";
import UserProfileUpdate from "./pages/more/UserProfileUpdate";
import { useDispatch } from "react-redux";
import { setProfile, setUser } from "./redux/slices/app";
import UserProfileCreate from "./pages/more/UserProfileCreate";
import Leaderboard from "./pages/bounty/Leaderboard";
import Stokvels from "./pages/stokvels/Stokvels";

export interface Response {
  err?: any;
  ok?: any;
}

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userActor, identity, logout } = useAuth();
  
  type Result = { ok: User } | { err: string };

  useEffect(() => {
    if (identity && userActor) {
      (async () => {
        const _user = await userActor.getUserByCaller();
          if (_user && "ok" in _user) {
            // Type guard to check if the 'ok' property exists
            dispatch(setUser(_user.ok)); // Set the user object to the redux global state            
          } else {
            const user: User = {
              id: identity.getPrincipal(),
              referralCode: [],
              referredBy: [],
              userType: {
                member: true,
                farmer: false,
                agent: false,
              },
              dapp: {
                agriiclub: {
                  timeStamp: [BigInt(Date.now())],
                },
                agriiprice: {timeStamp: []}, // change to same as agriiclub
                agriiMarket: {timeStamp: []},
              },
              isDelete: false,
            };
            
            await userActor.addUser(user);
            const _user = await userActor.getUserByCaller();
            
            if (_user && "ok" in _user) {
              // Type guard to check if the 'ok' property exists
              dispatch(setUser(_user.ok));
            } else {
              console.error("Error adding user", _user);
            }
          }
        
      })();
    }
  }, [identity, userActor]);

    useEffect(() => {
    if (identity && userActor) {
      (async () => {
        const _profile = await userActor.getProfileByCaller();
        if (_profile && "ok" in _profile) {
          dispatch(setProfile(_profile.ok));
        }
      })();
    }
  });
  
  const ProtectedRoutes = () => {
    if (isAuthenticated) {
      return <Outlet />;
    } else if (!isAuthenticated) {
      return <Navigate to="/login" />;
    }
  };

  return (
    <BrowserRouter>
      <Routes>
        

        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/home" element={<Home />} />
          <Route path="/stokvels" element={<Stokvels />} />
          <Route path="/rewards-leaderboard" element={<Leaderboard />} />
          <Route path="/reward-summary" element={<RewardSummary />} />
          <Route element={<ProtectedRoutes />}>
            <Route path="/more" element={<More />} />
            
            
            <Route path="/total-submissions" element={<TotalSubmission />} />
            <Route path="/total-pending" element={<TotalPending />} />
            <Route path="/total-rejected" element={<TotalRejected />} />
            <Route path="/total-accepted" element={<TotalAccepted />} />
            <Route path="/reward-campaigns" element={<RewardCampaigns />} />
            <Route path="/reward-campaign-detail/:id" element={<CampaignDetail />} />
            <Route path="/add-social-media" element={<AddUserSocial />} />
            <Route path="/add-social-media-preview" element={<AddUserSocialPreview />} />
            <Route path="/campaign-submission/:id" element={<CampaignSubmission />} />
            <Route path="/campaign-submission-preview" element={<CampaignSubmissionPreview />} />
            <Route path="/profile-create" element={<UserProfileCreate />} />
            <Route path="/profile" element={<UserProfile />} />
            <Route path="/profile-update" element={<UserProfileUpdate />} />
            <Route path="/get-started" element={<GetStarted />} />

          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
