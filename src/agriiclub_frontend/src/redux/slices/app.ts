import { PayloadAction, createSlice } from "@reduxjs/toolkit"; 
import { CampaignUserRequest } from "../../../../declarations/bounty/bounty.did";


export interface GlobalState { 
 campaignUserRequest : CampaignUserRequest | null 
} 
 
const initialState: GlobalState = { 
  campaignUserRequest: null,
}; 
 
export const appSlice = createSlice({ 
  name: "app", 
  initialState, 
  reducers: { 
    setCampaignUserRequest: (state, action: PayloadAction<CampaignUserRequest | null>) => {
      state.campaignUserRequest = action.payload;
      },
  }, 
}); 
 
export const { 
  setCampaignUserRequest,
} = appSlice.actions; 
 
export default appSlice.reducer;