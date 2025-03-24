import {
  BrowserRouter,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import Layout from "./components/desktop/Layout";
import Login from "./pages/Login";
import RewardSummary from "./pages/bounty/RewardSummary";
import { useAuth } from "./hooks/Context";
import { useEffect } from "react";
import { User } from "../../declarations/user/user.did";
import TotalSubmission from "./pages/bounty/TotalSubmission";
import TotalPending from "./pages/bounty/TotalPending";
import TotalRejected from "./pages/bounty/TotalRejected";
import TotalAccepted from "./pages/bounty/TotalAccepted";
import RewardCampaigns from "./pages/bounty/RewardCampaigns";
import CampaignDetail from "./pages/bounty/CampaignDetail";
import AddUserSocial from "./pages/bounty/AddUserSocial";
import AddUserSocialPreview from "./pages/bounty/AddUserSocialPreview";
import CampaignSubmission from "./pages/bounty/CampaignSubmission";
import CampaignSubmissionPreview from "./pages/bounty/CampaignSubmissionPreview";
import GetStarted from "./pages/GetStarted";
import UserProfileUpdate from "./pages/profile/UserProfileUpdate";
import { useDispatch, useSelector } from "react-redux";
import { setProfile, setUser } from "./redux/slices/app";
import UserProfileCreate from "./pages/profile/UserProfileCreate";
import Leaderboard from "./pages/bounty/Leaderboard";
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
// import ReferralLanding from "./pages/profile/ReferralLanding";
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
import Projects from "./pages/projects/Projects";
import AddProjectOwner from "./pages/projects/ProjectOwner";
import AddProject from "./pages/projects/AddProject";
import AddProjectPreview from "./pages/projects/AddProjectPreview";
import StartProject from "./pages/projects/StartProject";
import DesktopLandingPage from "./pages/DesktopHome";
import DMarketPrices from "./pages/desktop/agriiPrice/DMarketPrices";
import DProfile from "./pages/desktop/profile/DProfile";
import DLeaderboard from "./pages/desktop/bounty/DLeaderboard";
import MyRewards from "./pages/desktop/bounty/MyRewards";
import DCampaigns from "./pages/desktop/bounty/DCampaigns";
import DCampaignDetail from "./pages/desktop/bounty/DCampaignDetail";
import DCoops from "./pages/desktop/agriiCoop/DCoops";
import DProfileCreate from "./pages/desktop/profile/DProfileCreate";
import DProfileDetail from "./pages/desktop/profile/DProfileDetail";
import DCoopDetail from "./pages/desktop/agriiCoop/DCoopDetail";
import DCoopUnits from "./pages/desktop/agriiCoop/DCoopUnits";
import DCoopCreate from "./pages/desktop/agriiCoop/DCoopCreate";
import DCoopCreatePreview from "./pages/desktop/agriiCoop/DCoopCreatePreview";
import DProjects from "./pages/desktop/projects/DProjects";
import DProjectDetail from "./pages/desktop/projects/DProjectDetail";
import DProjectCreate from "./pages/desktop/projects/DProjectCreate";
import DProjectCreatePreview from "./pages/desktop/projects/DProjectCreatePreview";
import DProjectManager from "./pages/desktop/projects/DProjectManager";
import DProjectForecast from "./pages/desktop/projects/DProjectForecast";
import DProjectMilestone from "./pages/desktop/projects/DProjectMilestone";
import DProjectMilestoneDetail from "./pages/desktop/projects/DProjectMilestoneDetail";
import DProjectProposals from "./pages/desktop/projects/DProjectProposals";
import DPortfolio from "./pages/desktop/DPortfolio";
import DProjectProposalDetail from "./pages/desktop/projects/DProjectProposalDetail";
import { RootState } from "./redux/store";
import DProjectTreasury from "./pages/desktop/projects/DProjectTreasury";
import DProjectBackers from "./pages/desktop/projects/DProjectBackers";
import DCoopProjects from "./pages/desktop/agriiCoop/DCoopProjects";
import DCoopProposals from "./pages/desktop/agriiCoop/DCoopProposals";
import DCoopProposalDetail from "./pages/desktop/agriiCoop/DCoopProposalDetail";
import DCoopMembers from "./pages/desktop/agriiCoop/DCoopMembers";
import DUpdateUsername from "./pages/desktop/profile/DUpdateUsername";

export interface Response {
  err?: any;
  ok?: any;
}

const App = () => {
  const dispatch = useDispatch();
  const { isAuthenticated, userActor, projectsActor, identity, logout } =
    useAuth();
  type Result = { ok: User } | { err: string };

  useEffect(() => {
    if (isAuthenticated && identity && userActor) {
      (async () => {
        const _user = await userActor.getUserByCaller();
        if (_user && "ok" in _user) {
          dispatch(setUser(_user.ok));
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
              agriiclub: { timeStamp: [] },
              agriiprice: { timeStamp: [] },
              agriiMarket: { timeStamp: [] },
            },
            isDelete: false,
            timeStamp: BigInt(Date.now()),
          };

          await userActor.addUser(user);
          const _user = await userActor.getUserByCaller();

          if (_user && "ok" in _user) {
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
          {/* <Route path="/referral" element={<ReferralLanding />} /> */}

          <Route path="/more" element={<DaoMore />} />
          <Route
            path="/african-food-systems-challenges"
            element={<FoodSystemChallenge />}
          />
          <Route path="/how-it-works" element={<HowItWorks />} />
          <Route path="/ecosystem" element={<Ecosystem />} />
          <Route path="/esg" element={<Esg />} />
          <Route
            path="/environmental-social-governance"
            element={<Navigate to="/esg" replace />}
          />
          <Route path="/initiatives" element={<Initiatives />} />
          <Route path="/protocol" element={<Protocol />} />
          <Route path="/club" element={<Club />} />
          <Route path="/market" element={<Market />} />
          <Route path="/price" element={<Price />} />
          <Route path="/trace" element={<Trace />} />
          <Route path="/rewards-leaderboard" element={<Leaderboard />} />
          <Route path="/reward-campaigns" element={<RewardCampaigns />} />
          <Route
            path="/reward-campaign-detail/:id"
            element={<CampaignDetail />}
          />
          <Route path="/markets" element={<MarketPrices />} />
          <Route
            path="/market-price/:id"
            element={<CommodityDetail data={[]} />}
          />
          <Route path="/coop" element={<CoopHome />} />
          <Route path="/coop-portfolio/:id" element={<MemberCoop />} />
          <Route path="/coops" element={<Coops />} />
          <Route path="/coop-detail/:id" element={<CoopDetail />} />
          <Route path="/coop-units/:id" element={<CoopUnits />} />
          <Route
            path="/coop-units-preview/:id"
            element={<CoopUnitsPreview />}
          />
          <Route path="all-coop-activity/:id" element={<MemberActivity />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/start-project" element={<StartProject />} />
          <Route path="/add-project-owner/" element={<AddProjectOwner />} />
          <Route path="/add-project/" element={<AddProject />} />
          <Route path="/add-project/preview/" element={<AddProjectPreview />} />

          <Route element={<ProtectedRoutes />}>
            <Route path="/profile" element={<Profile />} />
            <Route
              path="/profile/profile-create"
              element={<UserProfileCreate />}
            />
            <Route
              path="/profile/profile-update"
              element={<UserProfileUpdate />}
            />
            <Route path="/update-username" element={<UpdateUsername />} />
            <Route path="/reward-summary" element={<RewardSummary />} />
            <Route path="/total-submissions" element={<TotalSubmission />} />
            <Route path="/total-pending" element={<TotalPending />} />
            <Route path="/total-rejected" element={<TotalRejected />} />
            <Route path="/total-accepted" element={<TotalAccepted />} />
            <Route path="/add-social-media" element={<AddUserSocial />} />
            <Route
              path="/add-social-media-preview"
              element={<AddUserSocialPreview />}
            />
            <Route path="/update-social-media" element={<UpdateUserSocial />} />
            <Route
              path="/campaign-submission/:id"
              element={<CampaignSubmission />}
            />
            <Route
              path="/campaign-submission-preview"
              element={<CampaignSubmissionPreview />}
            />
            <Route path="commodity-list/:id" element={<CommodityList />} />
            <Route path="/market-agents/:id" element={<AgentMarketList />} />
            <Route
              path="/add-commodity-price/:id"
              element={<AddCommodityPrice />}
            />
          </Route>
        </Route>

        <Route element={<Layout />}>
          <Route index element={<DesktopLandingPage />} />
          <Route path="/d/markets" element={<DMarketPrices />} />
          <Route path="/d/leaderboard" element={<DLeaderboard />} />
          <Route path="/d/campaigns" element={<DCampaigns />} />
          <Route
            path="/d/campaigns/campaign-detail/:id"
            element={<DCampaignDetail />}
          />
          <Route path="/d/coops" element={<DCoops />} />
          <Route path="/d/coop/overview/:id" element={<DCoopDetail />} />
          <Route path="/d/coop/projects/:id" element={<DCoopProjects />} /> 
          <Route path="/d/coop/proposals/:id" element={<DCoopProposals />} />
          <Route path="/d/coop/proposal-detail/:id" element={<DCoopProposalDetail />} />
          <Route path="/d/coop/members/:id" element={<DCoopMembers />} />
          <Route path="/d/projects" element={<DProjects />} />
          <Route path="/d/projects/overview/:id" element={<DProjectDetail />} />
          <Route
            path="/d/projects/forecast/:id"
            element={<DProjectForecast />}
          />
          <Route
            path="/d/projects/milestones/:id"
            element={<DProjectMilestone />}
          />
          <Route
            path="/d/projects/milestone-detail/:id"
            element={<DProjectMilestoneDetail />}
          />
          <Route
            path="/d/projects/proposals/:id"
            element={<DProjectProposals />}
          />
          <Route
            path="/d/projects/proposal-detail/:id"
            element={<DProjectProposalDetail />}
          />
          <Route
            path="/d/projects/treasury/:id"
            element={<DProjectTreasury />}
          />
          <Route
            path="/d/projects/backers/:id"
            element={<DProjectBackers />}
          />

          <Route element={<ProtectedRoutes />}>
            <Route path="/d/portfolio" element={<DPortfolio />} />
            <Route path="/d/update-username" element={<DUpdateUsername />} />
            <Route path="/d/profile" element={<DProfile />} />
            <Route path="/d/profile-create" element={<DProfileCreate />} />
            <Route path="/d/profile-detail/" element={<DProfileDetail />} />
            <Route path="/d/rewards" element={<MyRewards />} />
            <Route path="/d/coop-units/:id" element={<DCoopUnits />} />
            <Route path="/d/start-coop" element={<DCoopCreate />} />
            <Route
              path="/d/start-coop/preview"
              element={<DCoopCreatePreview />}
            />
            <Route path="/d/start-project" element={<DProjectCreate />} />
            <Route
              path="/d/start-project/preview"
              element={<DProjectCreatePreview />}
            />
            <Route path="/d/projects/manager" element={<DProjectManager />} />

            {/* <Route path="/get-started" element={<GetStarted />} /> */}
          </Route>
        </Route>
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
