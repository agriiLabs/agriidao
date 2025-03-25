export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const CampaignUser = IDL.Record({
    'id' : IDL.Text,
    'url' : IDL.Text,
    'status' : IDL.Variant({
      'pending' : IDL.Null,
      'rejected' : IDL.Null,
      'accepted' : IDL.Null,
    }),
    'campaignTaskId' : IDL.Text,
    'timeStamp' : Time,
    'userId' : IDL.Principal,
    'createdBy' : IDL.Text,
    'campaignId' : IDL.Text,
    'isPaid' : IDL.Bool,
    'updatedBy' : IDL.Text,
    'isDelete' : IDL.Bool,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const AllocationRequest = IDL.Record({
    'name' : IDL.Text,
    'bountyId' : IDL.Text,
    'currency' : IDL.Text,
    'amount' : IDL.Float64,
  });
  const BountyRequest = IDL.Record({
    'endDate' : IDL.Text,
    'availableBal' : IDL.Float64,
    'name' : IDL.Text,
    'bountyPool' : IDL.Float64,
    'acCategoryId' : IDL.Text,
    'startDate' : IDL.Text,
  });
  const CampaignRequest = IDL.Record({
    'url' : IDL.Text,
    'totalValue' : IDL.Float64,
    'name' : IDL.Text,
    'bountyId' : IDL.Text,
    'availBal' : IDL.Float64,
    'notes' : IDL.Text,
    'campaignPic' : IDL.Text,
    'campaignType' : IDL.Text,
    'rules' : IDL.Text,
  });
  const CampaignTaskRequest = IDL.Record({
    'task' : IDL.Text,
    'campaignId' : IDL.Text,
    'allocation' : IDL.Float64,
  });
  const CampaignUserRequest = IDL.Record({
    'url' : IDL.Text,
    'campaignTaskId' : IDL.Text,
    'campaignId' : IDL.Text,
  });
  const Tier = IDL.Record({
    'id' : IDL.Text,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'campaignId' : IDL.Text,
    'percent' : IDL.Float64,
    'followTo' : IDL.Int,
    'isDelete' : IDL.Bool,
    'amount' : IDL.Float64,
    'followFrom' : IDL.Int,
  });
  const UserSocialMediaRequest = IDL.Record({
    'userName' : IDL.Text,
    'userId' : IDL.Principal,
    'socialMediaId' : IDL.Text,
  });
  const Bounty__1 = IDL.Record({
    'id' : IDL.Text,
    'endDate' : IDL.Text,
    'availableBal' : IDL.Float64,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'bountyPool' : IDL.Float64,
    'isLive' : IDL.Bool,
    'acCategoryId' : IDL.Text,
    'isDelete' : IDL.Bool,
    'startDate' : IDL.Text,
  });
  const Campaign = IDL.Record({
    'id' : IDL.Text,
    'url' : IDL.Text,
    'totalValue' : IDL.Float64,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'bountyId' : IDL.Text,
    'availBal' : IDL.Float64,
    'isLive' : IDL.Bool,
    'notes' : IDL.Text,
    'isDelete' : IDL.Bool,
    'campaignPic' : IDL.Text,
    'campaignType' : IDL.Text,
    'rules' : IDL.Text,
  });
  const CampaignTask = IDL.Record({
    'id' : IDL.Text,
    'timeStamp' : Time,
    'createdBy' : IDL.Text,
    'task' : IDL.Text,
    'campaignId' : IDL.Text,
    'allocation' : IDL.Float64,
    'isDelete' : IDL.Bool,
  });
  const UserSocialMedia = IDL.Record({
    'id' : IDL.Text,
    'userName' : IDL.Text,
    'timeStamp' : Time,
    'userId' : IDL.Principal,
    'createdBy' : IDL.Text,
    'socialMediaId' : IDL.Text,
    'isDelete' : IDL.Bool,
  });
  const Allocation = IDL.Record({
    'id' : IDL.Text,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'bountyId' : IDL.Text,
    'currency' : IDL.Text,
    'isDelete' : IDL.Bool,
    'amount' : IDL.Float64,
  });
  const BountyPoint = IDL.Record({
    'id' : IDL.Text,
    'balance' : IDL.Float64,
    'timeStamp' : Time,
    'userId' : IDL.Opt(IDL.Principal),
    'totalIn' : IDL.Float64,
    'campaignId' : IDL.Opt(IDL.Text),
    'totalOut' : IDL.Float64,
  });
  const Result_1 = IDL.Variant({ 'ok' : UserSocialMedia, 'err' : IDL.Text });
  const Result_8 = IDL.Variant({ 'ok' : Allocation, 'err' : IDL.Text });
  const Result_7 = IDL.Variant({ 'ok' : Bounty__1, 'err' : IDL.Text });
  const Result_4 = IDL.Variant({ 'ok' : BountyPoint, 'err' : IDL.Text });
  const Result_6 = IDL.Variant({ 'ok' : Campaign, 'err' : IDL.Text });
  const Result_5 = IDL.Variant({ 'ok' : CampaignUser, 'err' : IDL.Text });
  const Result_3 = IDL.Variant({ 'ok' : CampaignTask, 'err' : IDL.Text });
  const Result_2 = IDL.Variant({ 'ok' : Tier, 'err' : IDL.Text });
  const Bounty = IDL.Service({
    'acceptCampaignUserSubmission' : IDL.Func([CampaignUser], [Result], []),
    'addAllocation' : IDL.Func([AllocationRequest, IDL.Text], [], []),
    'addBounty' : IDL.Func([BountyRequest], [], []),
    'addBountyPointUser' : IDL.Func([IDL.Principal], [], []),
    'addCampaign' : IDL.Func([CampaignRequest], [], []),
    'addCampaignTask' : IDL.Func([CampaignTaskRequest], [], []),
    'addCampaignUser' : IDL.Func([CampaignUserRequest], [Result], []),
    'addTier' : IDL.Func([Tier], [], []),
    'addUserSocialMedia' : IDL.Func([UserSocialMediaRequest], [Result], []),
    'checkCampaignSubmission' : IDL.Func(
        [IDL.Text, IDL.Principal, IDL.Text],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'deleteAllocation' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'deleteBounty' : IDL.Func([Bounty__1], [], []),
    'deleteCampaign' : IDL.Func([Campaign], [], []),
    'deleteCampaignTask' : IDL.Func([CampaignTask], [], []),
    'deleteCampaignUser' : IDL.Func([IDL.Text], [IDL.Bool], []),
    'deleteTier' : IDL.Func([Tier], [], []),
    'deleteUserSocialMedia' : IDL.Func([UserSocialMedia], [], []),
    'getAllAllocations' : IDL.Func([], [IDL.Vec(Allocation)], ['query']),
    'getAllCampaignsLatest' : IDL.Func([], [IDL.Vec(Campaign)], ['query']),
    'getAllLatestBountyCampaignsByName' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Campaign)],
        ['query'],
      ),
    'getAllLatestBountyPointUsers' : IDL.Func(
        [],
        [IDL.Vec(BountyPoint)],
        ['query'],
      ),
    'getAllLatestBountyPoints' : IDL.Func(
        [],
        [IDL.Vec(BountyPoint)],
        ['query'],
      ),
    'getAllLatestCampaignTasks' : IDL.Func(
        [],
        [IDL.Vec(CampaignTask)],
        ['query'],
      ),
    'getAllLatestCampaignUsers' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getAllLatestCampaignUsersAccepted' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getAllLatestCampaignUsersPending' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getAllLatestCampaignUsersRejected' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getAllLatestTiersByName' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Tier)],
        ['query'],
      ),
    'getAllLatestUserSocialMedias' : IDL.Func(
        [],
        [IDL.Vec(UserSocialMedia)],
        [],
      ),
    'getAllLatestUserSocialMediasByUserId' : IDL.Func(
        [IDL.Text],
        [Result_1],
        ['query'],
      ),
    'getAllTiersLatest' : IDL.Func([], [IDL.Vec(Tier)], ['query']),
    'getAllocation' : IDL.Func([IDL.Text], [Result_8], ['query']),
    'getBountyCampaigns' : IDL.Func([IDL.Text], [IDL.Vec(Campaign)], ['query']),
    'getBountyLatest' : IDL.Func([IDL.Text], [Result_7], ['query']),
    'getBountyPointByCampaignId' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'getBountyPointByUserId' : IDL.Func([], [Result_4], ['query']),
    'getCampaignCampaignTasks' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(CampaignTask)],
        ['query'],
      ),
    'getCampaignLatest' : IDL.Func([IDL.Text], [Result_6], ['query']),
    'getCampaignTiers' : IDL.Func([IDL.Text], [IDL.Vec(Tier)], ['query']),
    'getCampaignUser' : IDL.Func([IDL.Text], [Result_5], ['query']),
    'getCampaignUsersByCampaignId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getLatestBountyPoint' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'getLatestCampaignTaskById' : IDL.Func([IDL.Text], [Result_3], ['query']),
    'getTierLatest' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'getUserCampaignUsers' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getUserCampaignsAccepted' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getUserCampaignsByUserId' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getUserCampaignsPending' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getUserCampaignsRejected' : IDL.Func(
        [],
        [IDL.Vec(CampaignUser)],
        ['query'],
      ),
    'getUserSocialMediaBySocialMediaId' : IDL.Func(
        [IDL.Text],
        [Result_1],
        ['query'],
      ),
    'getUserSocialMediaLatestById' : IDL.Func(
        [IDL.Text],
        [Result_1],
        ['query'],
      ),
    'rejectCampaignUserSubmission' : IDL.Func([CampaignUser], [], []),
    'socialMediaCheck' : IDL.Func([IDL.Text], [IDL.Bool], ['query']),
    'updateAllocation' : IDL.Func([Allocation], [], []),
    'updateBounty' : IDL.Func([Bounty__1], [], []),
    'updateCampaign' : IDL.Func([Campaign], [], []),
    'updateCampaignTask' : IDL.Func([CampaignTask], [], []),
    'updateTier' : IDL.Func([Tier], [], []),
    'updateUserSocialMedia' : IDL.Func([UserSocialMedia], [Result], []),
  });
  return Bounty;
};
export const init = ({ IDL }) => { return []; };
