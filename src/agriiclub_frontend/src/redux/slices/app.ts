import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 
import { CampaignUserRequest, UserSocialMediaRequest } from "../../../../declarations/bounty/bounty.did";


export interface GlobalState { 
 campaignUserRequest : CampaignUserRequest | null,
 userSocialMediaRequest : UserSocialMediaRequest | null,
} 
 
const initialState: GlobalState = { 
  campaignUserRequest: null,
  userSocialMediaRequest: null,
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
  }, 
}); 
 
export const { 
  setCampaignUserRequest,
  setUserSocialMediaRequest,
} = appSlice.actions; 
 
export default appSlice.reducer;