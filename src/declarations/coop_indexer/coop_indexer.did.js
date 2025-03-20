export const idlFactory = ({ IDL }) => {
  const AddControllerArgs = IDL.Record({
    'controller' : IDL.Principal,
    'canister' : IDL.Principal,
  });
  const Result_2 = IDL.Variant({ 'ok' : IDL.Null, 'err' : IDL.Text });
  const Time = IDL.Int;
  const MembershipRecord = IDL.Record({
    'id' : IDL.Text,
    'userId' : IDL.Principal,
    'isActive' : IDL.Bool,
    'timestamp' : Time,
    'coopId' : IDL.Principal,
  });
  const CoopRequest = IDL.Record({
    'managementFee' : IDL.Nat,
    'ticker' : IDL.Text,
    'isCommunity' : IDL.Bool,
    'name' : IDL.Text,
    'description' : IDL.Text,
    'totalUnit' : IDL.Nat,
    'summary' : IDL.Text,
    'lockPeriod' : IDL.Int,
    'availableUnit' : IDL.Nat,
    'unitImage' : IDL.Opt(IDL.Text),
    'unitPrice' : IDL.Nat,
    'payoutFrequency' : IDL.Int,
    'maxValue' : IDL.Nat,
  });
  const Result_1 = IDL.Variant({ 'ok' : IDL.Principal, 'err' : IDL.Text });
  const CoopRecord = IDL.Record({
    'isCommunity' : IDL.Bool,
    'name' : IDL.Text,
    'createdAt' : Time,
    'canisterId' : IDL.Principal,
  });
  const LogVisibility = IDL.Variant({
    'controllers' : IDL.Null,
    'public' : IDL.Null,
    'allowed_viewers' : IDL.Vec(IDL.Principal),
  });
  const DefiniteCanisterSettings = IDL.Record({
    'freezing_threshold' : IDL.Nat,
    'controllers' : IDL.Vec(IDL.Principal),
    'reserved_cycles_limit' : IDL.Nat,
    'log_visibility' : LogVisibility,
    'wasm_memory_limit' : IDL.Nat,
    'memory_allocation' : IDL.Nat,
    'compute_allocation' : IDL.Nat,
  });
  const CanisterStatusResult = IDL.Record({
    'status' : IDL.Variant({
      'stopped' : IDL.Null,
      'stopping' : IDL.Null,
      'running' : IDL.Null,
    }),
    'memory_size' : IDL.Nat,
    'cycles' : IDL.Nat,
    'settings' : DefiniteCanisterSettings,
    'query_stats' : IDL.Record({
      'response_payload_bytes_total' : IDL.Nat,
      'num_instructions_total' : IDL.Nat,
      'num_calls_total' : IDL.Nat,
      'request_payload_bytes_total' : IDL.Nat,
    }),
    'idle_cycles_burned_per_day' : IDL.Nat,
    'module_hash' : IDL.Opt(IDL.Vec(IDL.Nat8)),
    'reserved_cycles' : IDL.Nat,
  });
  const Result = IDL.Variant({ 'ok' : CanisterStatusResult, 'err' : IDL.Text });
  const MembershipRecordId = IDL.Text;
  return IDL.Service({
    'addContoller' : IDL.Func([AddControllerArgs], [Result_2], []),
    'addMembershipRecord' : IDL.Func([MembershipRecord], [IDL.Bool], []),
    'createCoOpCanister' : IDL.Func([CoopRequest], [Result_1], []),
    'getAllMemberships' : IDL.Func([], [IDL.Vec(MembershipRecord)], []),
    'getCommunityCoops' : IDL.Func([], [IDL.Vec(CoopRecord)], []),
    'getCoopById' : IDL.Func([IDL.Principal], [CoopRecord], []),
    'getCoopCanisterStatus' : IDL.Func([IDL.Principal], [Result], []),
    'getCreatedCanisters' : IDL.Func([], [IDL.Vec(CoopRecord)], ['query']),
    'getDaoCoops' : IDL.Func([], [IDL.Vec(CoopRecord)], []),
    'getMembership' : IDL.Func([MembershipRecordId], [MembershipRecord], []),
    'getMembershipByCaller' : IDL.Func([], [IDL.Vec(MembershipRecord)], []),
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
