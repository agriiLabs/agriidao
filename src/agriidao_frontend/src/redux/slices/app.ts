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
} from "../../../../declarations/agriidao_backend/agriidao_backend.did";
import {
  Project,
  ProjectRequest,
  ProjectOwner,
  ProjectIncomeRequest,
  ProjectExpenseRequest,
  MilestoneRequest,
} from "../../../../declarations/projects/projects.did";
import {
  CoopRecord,
  CoopRequest,
} from "../../../../declarations/coop_indexer/coop_indexer.did";
import { Country } from "../../../../declarations/settings/settings.did";
import {
  Proposal,
  ProposalRequest,
} from "../../../../declarations/proposals/proposals.did";

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
  projectRequest: ProjectRequest | null;
  coopRecord: CoopRecord[] | null;
  country: Country | null;
  coopRequest: CoopRequest | null;
  projectOwner: ProjectOwner | null;
  projectIncomeRequest: ProjectIncomeRequest | null;
  projectExpenseRequest: ProjectExpenseRequest | null;
  milestoneRequest: MilestoneRequest | null;
  proposalRequest: ProposalRequest | null;
  _project: Project | null;
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
  projectRequest: null,
  coopRecord: null,
  country: null,
  coopRequest: null,
  projectOwner: null,
  projectIncomeRequest: null,
  projectExpenseRequest: null,
  milestoneRequest: null,
  proposalRequest: null,
  _project: null,
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
    setMarketLocationAgent: (
      state,
      action: PayloadAction<MarketLocationAgent | null>
    ) => {
      state.marketLocationAgent = action.payload;
    },
    setSelectedMarketLocation: (
      state,
      action: PayloadAction<MarketLocation | null>
    ) => {
      state.selectedMarketLocation = action.payload;
    },
    setProjectRequest: (
      state,
      action: PayloadAction<ProjectRequest | null>
    ) => {
      state.projectRequest = action.payload;
    },
    setCoopRecord: (state, action: PayloadAction<CoopRecord[] | null>) => {
      state.coopRecord = action.payload;
    },
    setCountry: (state, action: PayloadAction<Country | null>) => {
      state.country = action.payload;
    },
    setCoopRequest: (state, action: PayloadAction<CoopRequest | null>) => {
      state.coopRequest = action.payload;
    },
    setProjectOwner: (state, action: PayloadAction<ProjectOwner | null>) => {
      state.projectOwner = action.payload;
    },
    setProjectIncomeRequest: (
      state,
      action: PayloadAction<ProjectIncomeRequest | null>
    ) => {
      state.projectIncomeRequest = action.payload;
    },
    setProjectExpenseRequest: (
      state,
      action: PayloadAction<ProjectExpenseRequest | null>
    ) => {
      state.projectExpenseRequest = action.payload;
    },
    setMilestoneRequest: (
      state,
      action: PayloadAction<MilestoneRequest | null>
    ) => {
      state.milestoneRequest = action.payload;
    },
    setProposalRequest: (
      state,
      action: PayloadAction<ProposalRequest | null>
    ) => {
      state.proposalRequest = action.payload;
    },
    _setProject: (state, action: PayloadAction<Project | null>) => {
      state._project = action.payload;
    }
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
  setProjectRequest,
  setCoopRecord,
  setCountry,
  setCoopRequest,
  setProjectOwner,
  setProjectIncomeRequest,
  setProjectExpenseRequest,
  setMilestoneRequest,
  setProposalRequest,
  _setProject,
} = appSlice.actions;

export default appSlice.reducer;
