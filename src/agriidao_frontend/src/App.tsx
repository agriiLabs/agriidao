import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
  useLocation
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
import GetStarted from "./pages/GetStarted";
import UserProfileUpdate from "./pages/profile/UserProfileUpdate";
import { useDispatch } from "react-redux";
import { setProfile, setUser } from "./redux/slices/app";
import UserProfileCreate from "./pages/profile/UserProfileCreate";
import Leaderboard from "./pages/bounty/Leaderboard";
import Stokvels from "./pages/stokvels/Stokvels";
import UpdateUserSocial from "./pages/bounty/UpdateUserSocial";
import DaoLayout from "./components/agriidao/DaoLayout";
import DaoHome from "./pages/agriidao/DaoHome";
import Profile from "./pages/profile/Profile";
import DaoMore from "./pages/agriidao/DaoMore";
import FoodSystemChallenge from "./pages/agriidao/DaoFoodSystemChallenge";
import HowItWorks from "./pages/agriidao/DaoHowItWorks";
import Ecosystem from "./pages/agriidao/DaoEcosystem";
import Esg from "./pages/agriidao/DaoEsg";
import Initiatives from "./pages/agriidao/DaoInitiatives";
import Protocol from "./pages/agriidao/DaoProtocol";
import Club from "./pages/agriidao/DaoClub";
import Market from "./pages/agriidao/DaoMarket";
import Price from "./pages/agriidao/DaoPrice";
import Trace from "./pages/agriidao/DaoTrace";
import ScrollToTop from "./components/ScrollToTop";
import UpdateUsername from "./pages/profile/UpdateUsername";
import ReferralLanding from "./pages/profile/ReferralLanding";
import CommodityList from "./pages/agriiprice/agent/CommodityList";
import AgentMarketList from "./pages/agriiprice/agent/AgentMarkets";
import AddCommodityPrice from "./pages/agriiprice/agent/AddCommodityPrice";
import MarketPrices from "./pages/agriiprice/MarketPrices";
import CommodityDetail from "./pages/agriiprice/CommodityDetail";
import CoopHome from "./pages/coops/CoopHome";
import MemberCoop from "./pages/coops/MemberCoop";
import Coops from "./pages/coops/Coops";
import CoopDetail from "./pages/coops/CoopDetail";
import CoopUnitsPreview from "./pages/coops/CoopUnitsPreview";
import CoopUnits from "./pages/coops/CoopUnits";
import MemberActivity from "./pages/coops/MemberActivity";

export interface Response {
  err?: any;
  ok?: any;
}

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userActor, identity, logout } = useAuth();
  
  type Result = { ok: User } | { err: string };

  
  

  useEffect(() => {
    if (isAuthenticated && identity && userActor) {
      (async () => {
        const _user = await userActor.getUserByCaller();
          if (_user && "ok" in _user) {
            // Type guard to check if the 'ok' property exists
            dispatch(setUser(_user.ok)); // Set the user object to the redux global state            
          } else {
            const user: User = {
              id: identity.getPrincipal(),
              username: [],
              referralCode: [],
              referralLink: [],
              referredBy: [],
              userType: {
                member: true,
                farmer: false,
                agent: false,
                trader: false,
              },
              dapp: {
                agriiclub: {timeStamp: []},
                agriiprice: {timeStamp: []}, 
                agriiMarket: {timeStamp: []},
              },
              isDelete: false,
              timeStamp: BigInt(Date.now())
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
    <ScrollToTop />
      <Routes>
        {/* DAO */}
        <Route element={<DaoLayout />}>
            <Route index element={<DaoHome />} />
            <Route path="/home" element={<DaoHome />} />
            <Route path="/referral" element={<ReferralLanding />} />
            
            <Route path="/more" element={<DaoMore />} />
            <Route path="/african-food-systems-challenges" element={<FoodSystemChallenge />} />
            <Route path="/how-it-works" element={<HowItWorks />} />
            <Route path="/ecosystem" element={<Ecosystem />} />
            <Route path="/esg" element={<Esg />} />
            <Route path="/environmental-social-governance" element={<Navigate to="/esg" replace />} />
            <Route path="/initiatives" element={<Initiatives />} />
            <Route path="/protocol" element={<Protocol />} />
            <Route path="/club" element={<Club />} />
            <Route path="/market" element={<Market />} />
            <Route path="/price" element={<Price />} />
            <Route path="/trace" element={<Trace />} /> 
            <Route path="/rewards-leaderboard" element={<Leaderboard />} />  
            <Route path="/reward-campaigns" element={<RewardCampaigns />} />
            <Route path="/reward-campaign-detail/:id" element={<CampaignDetail />} />
            <Route path="/markets" element={<MarketPrices />} />
            <Route path="/market-price/:id" element={<CommodityDetail data={[]} />} />
            <Route path="/coop" element={<CoopHome />} />
            <Route path="/coop-portfolio/:id" element={<MemberCoop />} />
            <Route path="/coops" element={<Coops />} />
            <Route path="/coop-detail/:id" element={<CoopDetail />} />
            <Route path="/coop-units/:id" element={<CoopUnits />} />
            <Route path="/coop-units-preview/:id" element={<CoopUnitsPreview />} />
            <Route path="all-coop-activity/:id" element={<MemberActivity />} />



            <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route path="/profile/profile-create" element={<UserProfileCreate />} />
            <Route path="/profile/profile-update" element={<UserProfileUpdate />} />
            <Route path="/update-username" element={<UpdateUsername />} />
            
            <Route path="/reward-summary" element={<RewardSummary />} />
            <Route path="/total-submissions" element={<TotalSubmission />} />
            <Route path="/total-pending" element={<TotalPending />} />
            <Route path="/total-rejected" element={<TotalRejected />} />
            <Route path="/total-accepted" element={<TotalAccepted />} />
            
            <Route path="/add-social-media" element={<AddUserSocial />} />
            <Route path="/add-social-media-preview" element={<AddUserSocialPreview />} />
            <Route path="/update-social-media" element={<UpdateUserSocial />} />
            <Route path="/campaign-submission/:id" element={<CampaignSubmission />} />
            <Route path="/campaign-submission-preview" element={<CampaignSubmissionPreview />} />

            <Route path="commodity-list/:id" element={<CommodityList />} />
            <Route path="/market-agents/:id" element={<AgentMarketList />} />
            <Route path="/add-commodity-price/:id" element={<AddCommodityPrice />} />

            
            </Route>
        </Route>
        <Route element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/club/home" element={<Home />} />
            <Route path="/stokvels" element={<Stokvels />} />
            
            <Route path="club/more" element={<More />} />
            <Route element={<ProtectedRoutes />}>  
              
              
              
              {/* <Route path="/club/profile" element={<UserProfile />} /> */}
              
              <Route path="/get-started" element={<GetStarted />} />
            </Route>
          </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
