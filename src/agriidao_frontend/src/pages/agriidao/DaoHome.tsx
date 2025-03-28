import { useEffect } from "react";
import { User } from "../../../../declarations/user/user.did";
import DesktopLandingPage from "../DesktopHome";

interface ExtendedUser extends User {
  isLoggedIn: boolean;
}

const LandingPage = () => {

  useEffect(() => {
    import("../../assets/landing/styles/style.min.css");
  }, []);

  return <DesktopLandingPage /> ;
};

export default LandingPage;
