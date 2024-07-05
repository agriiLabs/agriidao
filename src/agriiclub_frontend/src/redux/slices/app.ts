import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 
import { CampaignUserRequest, UserSocialMediaRequest, BountyPoint } from "../../../../declarations/bounty/bounty.did";
import { Profile, ProfileRequest, User } from "../../../../declarations/user/user.did";


export interface GlobalState { 
 campaignUserRequest : CampaignUserRequest | null,
 userSocialMediaRequest : UserSocialMediaRequest | null,
 user : User | null,
 profileRequest : ProfileRequest | null,
 profile : Profile | null,
 bountyPoints : BountyPoint[] | null,
}; 
 
const initialState: GlobalState = { 
  campaignUserRequest: null,
  userSocialMediaRequest: null,
  user: null,
  profileRequest: null,
  profile: null,
  bountyPoints: null,
}; 
 
export const appSlice = createSlice({ 
  name: "app", 
  initialState, 
  reducers: { 
    setCampaignUserRequest: (state, action: PayloadAction<CampaignUserRequest | null>) => {
      state.campaignUserRequest = action.payload;
      },
    setUserSocialMediaRequest: (state, action: PayloadAction<UserSocialMediaRequest | null>) => {
      state.userSocialMediaRequest = action.payload;
      },
    setUser: (state, action: PayloadAction<User | null>) => {
      state.user = action.payload;
      },
    setProfileRequest: (state, action: PayloadAction<ProfileRequest | null>) => {
      state.profileRequest = action.payload;
      },
    setProfile: (state, action: PayloadAction<Profile | null>) => {
      state.profile = action.payload;
      },
      setBountyPoints: (state, action: PayloadAction<BountyPoint[] | null>) => {
        state.bountyPoints = action.payload;
      }
  }, 
}); 
 
export const { 
  setCampaignUserRequest,
  setUserSocialMediaRequest,
  setUser,
  setProfileRequest,
  setProfile, 
  setBountyPoints,
} = appSlice.actions; 
 
export default appSlice.reducer;