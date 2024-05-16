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
import { Result, User, UserRequest } from "../../declarations/user/user.did";
import TotalSubmission from "./pages/bounty/TotalSubmission";
import TotalPending from "./pages/bounty/TotalPending";
import TotalRejected from "./pages/bounty/TotaRejected";
import TotalAccepted from "./pages/bounty/TotalAccepted";

export interface Response {
  err?: any;
  ok?: any;
}

const App = () => {
  const { isAuthenticated, userActor, identity, logout } = useAuth();
  const [authorized, setAuthorized] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  type Result = { ok: User } | { err: string };

  useEffect(() => {
    if (identity && userActor) {
      (async () => {
        const principalString = identity.getPrincipal().toString();
        const _user = await userActor.getUserLatest(principalString);
        console.log("user response", user);
          if (_user && "ok" in _user) {
            // Type guard to check if the 'ok' property exists
            setUser(_user.ok); // Set user state to the User object
          } else {
            const user: UserRequest = {
              principalId: identity.getPrincipal(),
              firstName: [],
              lastName: [],
              email: [],
              dob: [],
              mobile: [],
              profilePic: [],
              country: [],
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
                agriiprice: false, // change to same as agriiclub
                agriiMarket: false,
              },

              isDelete: false,
            };
            await userActor.addUser(user);
            const _user = await userActor.getUserLatest(principalString);
            if (_user && "ok" in _user) {
              // Type guard to check if the 'ok' property exists
              setUser(_user.ok);
            } else {
              console.error("Error adding user");
            }
          }
        
      })();
    }
  }, [identity, userActor]);
  
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
        <Route path="/login" element={<Login />} />

        <Route element={<Layout />}>
          <Route element={<ProtectedRoutes />}>
            <Route index element={<Home />} />
            <Route path="/home" element={<Home />} />
            <Route path="/reward-summary" element={<RewardSummary />} />
            <Route path="/total-submissions" element={<TotalSubmission />} />
            <Route path="/total-pending" element={<TotalPending />} />
            <Route path="/total-rejected" element={<TotalRejected />} />
            <Route path="/total-accepted" element={<TotalAccepted />} />
          </Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
