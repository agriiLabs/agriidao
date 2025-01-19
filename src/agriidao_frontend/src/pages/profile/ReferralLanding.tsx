import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import QRCode from 'qrcode.react';
import { useAuth } from '../../hooks/Context';
import { useLocation, useNavigation } from 'react-router-dom';


const ReferralLanding = () => {
const { login, isAuthenticated, userActor } = useAuth();
const query = new URLSearchParams(useLocation().search);
const referralCode = query.get('referralCode');
const [isMobile, setIsMobile] = useState(false);
const navigate = useNavigate();

//   useEffect(() => {
//     // Function to validate the referral code
//     const validateReferralCode = async () => {
//       try {
//         if (userActor ) {
//           if (referralCode) {
//             const res = await userActor.validateReferralCode(referralCode);
//             if (res) {
//               setIsCodeValid(true);
//             } else {
//               setIsCodeValid(false);
//             }
//           } else {
//             setIsCodeValid(false);
//           }
//         } else {
//           console.error("userActor is null");
//           setIsCodeValid(false);
//         }
//       } catch (error) {
//         console.error("Error validating referral code:", error);
//       }
//     };

//     validateReferralCode();
//   }, [referralCode]);

useEffect(() => {
    // Store the referral code in localStorage for later retrieval
    if (referralCode) {
      localStorage.setItem('referralCode', referralCode);
    }
    // Detect mobile devices
    setIsMobile(/Mobi|Android/i.test(navigator.userAgent));
  }, [referralCode]);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/profile");
    }
  }, [isAuthenticated, navigate]);


  function useQuery() {
    return new URLSearchParams(useLocation().search);
  }

//   // Redirect mobile users directly to signup with the referral code
//   const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
//   const mobileSignupUrl = `http://localhost:3000/login?referral=${referralCode}`;

//   useEffect(() => {
//     if (isCodeValid && isMobile) {
//       navigate(mobileSignupUrl);
//     }
//   }, [isCodeValid, isMobile, navigate, mobileSignupUrl]);

//   // Display message if code is invalid
//   if (isCodeValid === false) {
//     return <div><h2>Invalid or Expired Referral Code</h2></div>;
//   }

  // Desktop view: Show QR code with referral link for mobile access
  return (
    <div>
      <h1>Welcome to Our App!</h1>
      {/* {isCodeValid && ( */}
        <div>
          <h2>You're invited! Use the code to get started.</h2>
          <p>Scan this QR code on your mobile device to sign up:</p>
          <button
                      className="btn bg-blue-dark"
                      onClick={() => {
                        login();
                      }}
                    >
                      Login with Internet ID
                    </button>
          {/* <QRCode value={mobileSignupUrl} size={256} /> */}
        </div>
      {/* )} */}
    </div>
  );
};

export default ReferralLanding;
