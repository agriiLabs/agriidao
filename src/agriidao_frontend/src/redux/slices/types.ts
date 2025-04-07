import { Time } from "../../../../declarations/bounty/bounty.did";
import { UserType } from "../../../../declarations/user/user.did";

export interface ReduxProfile {
  id: string;
  dob: string;
  timeStamp: Time;
  isDeactivated: boolean;
  email: [] | [string];
  countryId: [] | [string];
  mobile: [] | [string];
  profilePic: [] | [string];
  lastName: string;
  firstName: string;
}

export interface ReduxUser {
  id: string;
  userType: UserType;
  referralCode: [] | [string];
  referralLink: [] | [string];
  username: [] | [string];
  timeStamp: Time;
  dapp: {
    agriiprice: { timeStamp: [] | [Time] };
    agriiclub: { timeStamp: [] | [Time] };
    agriiMarket: { timeStamp: [] | [Time] };
  };
  referredBy: [] | [string];
  isDelete: boolean;
}
