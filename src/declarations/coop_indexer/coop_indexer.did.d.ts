import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AddControllerArgs {
  'controller' : Principal,
  'canister' : Principal,
}
export interface CanisterStatusResult {
  'status' : { 'stopped' : null } |
    { 'stopping' : null } |
    { 'running' : null },
  'memory_size' : bigint,
  'cycles' : bigint,
  'settings' : DefiniteCanisterSettings,
  'query_stats' : {
    'response_payload_bytes_total' : bigint,
    'num_instructions_total' : bigint,
    'num_calls_total' : bigint,
    'request_payload_bytes_total' : bigint,
  },
  'idle_cycles_burned_per_day' : bigint,
  'module_hash' : [] | [Uint8Array | number[]],
  'reserved_cycles' : bigint,
}
export interface CoopRecord {
  'isCommunity' : boolean,
  'name' : string,
  'createdAt' : Time,
  'canisterId' : Principal,
}
export interface CoopRequest {
  'managementFee' : bigint,
  'ticker' : string,
  'isCommunity' : boolean,
  'name' : string,
  'description' : string,
  'totalUnit' : bigint,
  'summary' : string,
  'lockPeriod' : bigint,
  'availableUnit' : bigint,
  'unitImage' : [] | [string],
  'unitPrice' : bigint,
  'payoutFrequency' : bigint,
  'maxValue' : bigint,
}
export interface DefiniteCanisterSettings {
  'freezing_threshold' : bigint,
  'controllers' : Array<Principal>,
  'reserved_cycles_limit' : bigint,
  'log_visibility' : LogVisibility,
  'wasm_memory_limit' : bigint,
  'memory_allocation' : bigint,
  'compute_allocation' : bigint,
}
export type LogVisibility = { 'controllers' : null } |
  { 'public' : null } |
  { 'allowed_viewers' : Array<Principal> };
export interface MembershipRecord {
  'id' : string,
  'userId' : Principal,
  'isActive' : boolean,
  'timestamp' : Time,
  'coopId' : Principal,
}
export type MembershipRecordId = string;
export type Result = { 'ok' : CanisterStatusResult } |
  { 'err' : string };
export type Result_1 = { 'ok' : Principal } |
  { 'err' : string };
export type Result_2 = { 'ok' : null } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addContoller' : ActorMethod<[AddControllerArgs], Result_2>,
  'addMembershipRecord' : ActorMethod<[MembershipRecord], boolean>,
  'createCoOpCanister' : ActorMethod<[CoopRequest], Result_1>,
  'getAllMemberships' : ActorMethod<[], Array<MembershipRecord>>,
  'getCommunityCoops' : ActorMethod<[], Array<CoopRecord>>,
  'getCoopCanisterStatus' : ActorMethod<[Principal], Result>,
  'getCreatedCanisters' : ActorMethod<[], Array<CoopRecord>>,
  'getDaoCoops' : ActorMethod<[], Array<CoopRecord>>,
  'getMembership' : ActorMethod<[MembershipRecordId], MembershipRecord>,
  'getMembershipByCaller' : ActorMethod<[], Array<MembershipRecord>>,
  'getMembershipsByCoopId' : ActorMethod<[Principal], Array<MembershipRecord>>,
  'updateMembershipRecord' : ActorMethod<
    [MembershipRecordId],
    MembershipRecord
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
