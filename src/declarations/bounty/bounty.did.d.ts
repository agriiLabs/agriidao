import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Allocation {
  'id' : string,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'bountyId' : string,
  'currency' : string,
  'isDelete' : boolean,
  'amount' : number,
}
export interface AllocationRequest {
  'name' : string,
  'bountyId' : string,
  'currency' : string,
  'amount' : number,
}
export interface Bounty {
  'acceptCampaignUserSubmission' : ActorMethod<[CampaignUser], Result>,
  'addAllocation' : ActorMethod<[AllocationRequest, string], undefined>,
  'addBounty' : ActorMethod<[BountyRequest], undefined>,
  'addBountyPointUser' : ActorMethod<[Principal], undefined>,
  'addCampaign' : ActorMethod<[CampaignRequest], undefined>,
  'addCampaignTask' : ActorMethod<[CampaignTaskRequest], undefined>,
  'addCampaignUser' : ActorMethod<[CampaignUserRequest], Result>,
  'addTier' : ActorMethod<[Tier], undefined>,
  'addUserSocialMedia' : ActorMethod<[UserSocialMediaRequest], Result>,
  'checkCampaignSubmission' : ActorMethod<
    [string, Principal, string],
    Array<CampaignUser>
  >,
  'deleteAllocation' : ActorMethod<[string], boolean>,
  'deleteBounty' : ActorMethod<[Bounty__1], undefined>,
  'deleteCampaign' : ActorMethod<[Campaign], undefined>,
  'deleteCampaignTask' : ActorMethod<[CampaignTask], undefined>,
  'deleteCampaignUser' : ActorMethod<[string], boolean>,
  'deleteTier' : ActorMethod<[Tier], undefined>,
  'deleteUserSocialMedia' : ActorMethod<[UserSocialMedia], undefined>,
  'getAllAllocations' : ActorMethod<[], Array<Allocation>>,
  'getAllBountyPointVersions' : ActorMethod<[string], Array<BountyPoint>>,
  'getAllCampaignTaskVersionsById' : ActorMethod<[string], Array<CampaignTask>>,
  'getAllCampaignVersions' : ActorMethod<[string], Array<Campaign>>,
  'getAllCampaignsLatest' : ActorMethod<[], Array<Campaign>>,
  'getAllLatestBounties' : ActorMethod<[], Array<Bounty__1>>,
  'getAllLatestBountyCampaignsByName' : ActorMethod<[string], Array<Campaign>>,
  'getAllLatestBountyPointUsers' : ActorMethod<[], Array<BountyPoint>>,
  'getAllLatestBountyPoints' : ActorMethod<[], Array<BountyPoint>>,
  'getAllLatestCampaignTasks' : ActorMethod<[], Array<CampaignTask>>,
  'getAllLatestCampaignUsers' : ActorMethod<[], Array<CampaignUser>>,
  'getAllLatestCampaignUsersAccepted' : ActorMethod<[], Array<CampaignUser>>,
  'getAllLatestCampaignUsersPending' : ActorMethod<[], Array<CampaignUser>>,
  'getAllLatestCampaignUsersRejected' : ActorMethod<[], Array<CampaignUser>>,
  'getAllLatestTiersByName' : ActorMethod<[string], Array<Tier>>,
  'getAllLatestUserSocialMedias' : ActorMethod<[], Array<UserSocialMedia>>,
  'getAllLatestUserSocialMediasByUserId' : ActorMethod<[string], Result_1>,
  'getAllTierVersions' : ActorMethod<[string], Array<Tier>>,
  'getAllTiersLatest' : ActorMethod<[], Array<Tier>>,
  'getAllocation' : ActorMethod<[string], Result_8>,
  'getBountyCampaigns' : ActorMethod<[string], Array<Campaign>>,
  'getBountyLatest' : ActorMethod<[string], Result_7>,
  'getBountyPointByCampaignId' : ActorMethod<[string], Result_4>,
  'getBountyPointByUserId' : ActorMethod<[], Result_4>,
  'getBountyVersions' : ActorMethod<[string], Array<Bounty__1>>,
  'getCampaignCampaignTasks' : ActorMethod<[string], Array<CampaignTask>>,
  'getCampaignLatest' : ActorMethod<[string], Result_6>,
  'getCampaignTiers' : ActorMethod<[string], Array<Tier>>,
  'getCampaignUser' : ActorMethod<[string], Result_5>,
  'getCampaignUserVersions' : ActorMethod<[string], Array<CampaignUser>>,
  'getCampaignUsersByCampaignId' : ActorMethod<[string], Array<CampaignUser>>,
  'getLatestBountyPoint' : ActorMethod<[string], Result_4>,
  'getLatestCampaignTaskById' : ActorMethod<[string], Result_3>,
  'getTierLatest' : ActorMethod<[string], Result_2>,
  'getUserCampaignUsers' : ActorMethod<[Principal], Array<CampaignUser>>,
  'getUserSocialMediaBySocialMediaId' : ActorMethod<[string], Result_1>,
  'getUserSocialMediaLatestById' : ActorMethod<[string], Result_1>,
  'getUserSocialMediaVersions' : ActorMethod<[string], Array<UserSocialMedia>>,
  'rejectCampaignUserSubmission' : ActorMethod<[CampaignUser], undefined>,
  'socialMediaCheck' : ActorMethod<[string], boolean>,
  'updateAllocation' : ActorMethod<[Allocation], undefined>,
  'updateBounty' : ActorMethod<[Bounty__1], undefined>,
  'updateCampaign' : ActorMethod<[Campaign], undefined>,
  'updateCampaignTask' : ActorMethod<[CampaignTask], undefined>,
  'updateTier' : ActorMethod<[Tier], undefined>,
  'updateUserSocialMedia' : ActorMethod<[UserSocialMedia], Result>,
}
export interface BountyPoint {
  'id' : string,
  'balance' : number,
  'timeStamp' : Time,
  'userId' : [] | [Principal],
  'totalIn' : number,
  'campaignId' : [] | [string],
  'totalOut' : number,
}
export interface BountyRequest {
  'endDate' : string,
  'availableBal' : number,
  'name' : string,
  'bountyPool' : number,
  'acCategoryId' : string,
  'startDate' : string,
}
export interface Bounty__1 {
  'id' : string,
  'endDate' : string,
  'availableBal' : number,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'bountyPool' : number,
  'isLive' : boolean,
  'acCategoryId' : string,
  'isDelete' : boolean,
  'startDate' : string,
}
export interface Campaign {
  'id' : string,
  'url' : string,
  'totalValue' : number,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'bountyId' : string,
  'availBal' : number,
  'isLive' : boolean,
  'notes' : string,
  'isDelete' : boolean,
  'campaignPic' : string,
  'campaignType' : string,
  'rules' : string,
}
export interface CampaignRequest {
  'url' : string,
  'totalValue' : number,
  'name' : string,
  'bountyId' : string,
  'availBal' : number,
  'notes' : string,
  'campaignPic' : string,
  'campaignType' : string,
  'rules' : string,
}
export interface CampaignTask {
  'id' : string,
  'timeStamp' : Time,
  'createdBy' : string,
  'task' : string,
  'campaignId' : string,
  'allocation' : number,
  'isDelete' : boolean,
}
export interface CampaignTaskRequest {
  'task' : string,
  'campaignId' : string,
  'allocation' : number,
}
export interface CampaignUser {
  'id' : string,
  'url' : string,
  'status' : { 'pending' : null } |
    { 'rejected' : null } |
    { 'accepted' : null },
  'campaignTaskId' : string,
  'timeStamp' : Time,
  'userId' : Principal,
  'createdBy' : string,
  'campaignId' : string,
  'isPaid' : boolean,
  'updatedBy' : string,
  'isDelete' : boolean,
}
export interface CampaignUserRequest {
  'url' : string,
  'campaignTaskId' : string,
  'campaignId' : string,
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : UserSocialMedia } |
  { 'err' : string };
export type Result_2 = { 'ok' : Tier } |
  { 'err' : string };
export type Result_3 = { 'ok' : CampaignTask } |
  { 'err' : string };
export type Result_4 = { 'ok' : BountyPoint } |
  { 'err' : string };
export type Result_5 = { 'ok' : CampaignUser } |
  { 'err' : string };
export type Result_6 = { 'ok' : Campaign } |
  { 'err' : string };
export type Result_7 = { 'ok' : Bounty__1 } |
  { 'err' : string };
export type Result_8 = { 'ok' : Allocation } |
  { 'err' : string };
export interface Tier {
  'id' : string,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'campaignId' : string,
  'percent' : number,
  'followTo' : bigint,
  'isDelete' : boolean,
  'amount' : number,
  'followFrom' : bigint,
}
export type Time = bigint;
export interface UserSocialMedia {
  'id' : string,
  'userName' : string,
  'timeStamp' : Time,
  'userId' : Principal,
  'createdBy' : string,
  'socialMediaId' : string,
  'isDelete' : boolean,
}
export interface UserSocialMediaRequest {
  'userName' : string,
  'userId' : Principal,
  'socialMediaId' : string,
}
export interface _SERVICE extends Bounty {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
