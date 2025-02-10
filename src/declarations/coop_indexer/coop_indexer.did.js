export const idlFactory = ({ IDL }) => {
  const Time = IDL.Int;
  const MembershipRecord = IDL.Record({
    'id' : IDL.Text,
    'userId' : IDL.Principal,
    'isActive' : IDL.Bool,
    'timestamp' : Time,
    'coopId' : IDL.Principal,
  });
  const CoopRequest = IDL.Record({
    'managementFee' : IDL.Float64,
    'ticker' : IDL.Text,
    'isCommunity' : IDL.Bool,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'totalUnit' : IDL.Int,
    'summary' : IDL.Text,
    'lockPeriod' : IDL.Int,
    'availableUnit' : IDL.Int,
    'unitImage' : IDL.Opt(IDL.Text),
    'unitPrice' : IDL.Float64,
    'payoutFrequency' : IDL.Int,
    'maxValue' : IDL.Float64,
  });
  const Result = IDL.Variant({ 'ok' : IDL.Principal, 'err' : IDL.Text });
  const CoopRecord = IDL.Record({
    'isCommunity' : IDL.Bool,
    'name' : IDL.Text,
    'createdAt' : Time,
    'canisterId' : IDL.Principal,
  });
  const MembershipRecordId = IDL.Text;
  return IDL.Service({
    'addMembershipRecord' : IDL.Func([MembershipRecord], [IDL.Bool], []),
    'createCoOpCanister' : IDL.Func([CoopRequest], [Result], []),
    'getAllMemberships' : IDL.Func([], [IDL.Vec(MembershipRecord)], []),
    'getCommunityCoops' : IDL.Func([], [IDL.Vec(CoopRecord)], []),
    'getCreatedCanisters' : IDL.Func([], [IDL.Vec(CoopRecord)], ['query']),
    'getDaoCoops' : IDL.Func([], [IDL.Vec(CoopRecord)], []),
    'getMembership' : IDL.Func([MembershipRecordId], [MembershipRecord], []),
    'getMembershipByCaller' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(MembershipRecord)],
        [],
      ),
    'getMembershipsByCoopId' : IDL.Func(
        [IDL.Principal],
        [IDL.Vec(MembershipRecord)],
        ['query'],
      ),
    'updateMembershipRecord' : IDL.Func(
        [MembershipRecordId],
        [MembershipRecord],
        [],
      ),
  });
};
export const init = ({ IDL }) => { return []; };
