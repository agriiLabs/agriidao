import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  CampaignUserRequest,
  UserSocialMediaRequest,
  BountyPoint,
  UserSocialMedia,
  Campaign,
} from "../../../../declarations/bounty/bounty.did";
import {
  Profile,
  ProfileRequest,
  User,
} from "../../../../declarations/user/user.did";
import { 
  MarketLocationAgent, 
  MarketLocation, 
  MarketLocationCommodity,
 } from "../../../../declarations/commodity/commodity.did";

export interface GlobalState {
  selectedCampaign: Campaign | null;
  campaignUserRequest: CampaignUserRequest | null;
  userSocialMediaRequest: UserSocialMediaRequest | null;
  userSocialMedia: UserSocialMedia | null;
  user: User | null;
  profileRequest: ProfileRequest | null;
  profile: Profile | null;
  bountyPoints: BountyPoint[] | null;
  marketLocationAgent: MarketLocationAgent | null;
  selectedMarketLocation: MarketLocation | null;
}

const initialState: GlobalState = {
  selectedCampaign: null,
  campaignUserRequest: null,
  userSocialMediaRequest: null,
  userSocialMedia: null,
  user: null,
  profileRequest: null,
  profile: null,
  bountyPoints: null,
  marketLocationAgent: null,
  selectedMarketLocation: null,
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setSelectedCampaign(state, action: PayloadAction<Campaign | null>) {
      state.selectedCampaign = action.payload;
    },
    setCampaignUserRequest: (
      state,
      action: PayloadAction<CampaignUserRequest | null>
    ) => {
      state.campaignUserRequest = action.payload;
    },
    setUserSocialMediaRequest: (
      state,
      action: PayloadAction<UserSocialMediaRequest | null>
    ) => {
      state.userSocialMediaRequest = action.payload;
    },
    setUserSocialMedia: (
      state,
      action: PayloadAction<UserSocialMedia | null>
    ) => {
      state.userSocialMedia = action.payload;
    },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
    },
    setProfileRequest: (
      state,
      action: PayloadAction<ProfileRequest | null>
    ) => {
      state.profileRequest = action.payload;
    },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
    },
    setBountyPoints: (state, action: PayloadAction<BountyPoint[] | null>) => {
      state.bountyPoints = action.payload;
    },
    setMarketLocationAgent: (state,action: PayloadAction<MarketLocationAgent | null>) => {
      state.marketLocationAgent = action.payload;
    },
    setSelectedMarketLocation: (state, action: PayloadAction<MarketLocation | null>) => {
      state.selectedMarketLocation = action.payload;
      },
  },
});

export const {
  setSelectedCampaign,
  setCampaignUserRequest,
  setUserSocialMediaRequest,
  setUserSocialMedia,
  setUser,
  setProfileRequest,
  setProfile,
  setBountyPoints,
  setMarketLocationAgent,
  setSelectedMarketLocation,
} = appSlice.actions;

export default appSlice.reducer;
