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
export interface ChartData {
  'month' : bigint,
  'coop_count' : bigint,
  'projects_count' : bigint,
  'members_count' : bigint,
}
export interface CoOpIndexer {
  'addContoller' : ActorMethod<[AddControllerArgs], Result_3>,
  'addCoopRecord' : ActorMethod<[CoopRecord], undefined>,
  'addMembershipRecord' : ActorMethod<[MembershipRecord], boolean>,
  'createCoOpCanister' : ActorMethod<[CoopRequest], Result_2>,
  'getAllMemberships' : ActorMethod<[], Array<MembershipRecord>>,
  'getCoopByCaller' : ActorMethod<[], Array<CoopRecord>>,
  'getCoopById' : ActorMethod<[Principal], Result_1>,
  'getCoopCanisterStatus' : ActorMethod<[Principal], Result>,
  'getCreatedCanisters' : ActorMethod<[], Array<CoopRecord>>,
  'getMembership' : ActorMethod<[MembershipRecordId], MembershipRecord>,
  'getMembershipByCaller' : ActorMethod<[], Array<MembershipRecord>>,
  'get_coops_projects_stats' : ActorMethod<[], CoopsProjectsStats>,
  'updateMembershipRecord' : ActorMethod<
    [MembershipRecordId],
    MembershipRecord
  >,
}
export interface CoopRecord {
  'isManagedCanister' : boolean,
  'name' : string,
  'createdAt' : Time,
  'createdBy' : Principal,
  'canisterId' : Principal,
}
export interface CoopRequest {
  'managementFee' : bigint,
  'ticker' : string,
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
export interface CoopsProjectsStats {
  'chart_data' : Array<ChartData>,
  'total_members' : bigint,
  'total_projects' : bigint,
  'total_coops' : bigint,
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
export type Result_1 = { 'ok' : CoopRecord } |
  { 'err' : string };
export type Result_2 = { 'ok' : Principal } |
  { 'err' : string };
export type Result_3 = { 'ok' : null } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE extends CoOpIndexer {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
