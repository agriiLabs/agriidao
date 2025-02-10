import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CoopRecord {
  'isCommunity' : boolean,
  'name' : string,
  'createdAt' : Time,
  'canisterId' : Principal,
}
export interface CoopRequest {
  'managementFee' : number,
  'ticker' : string,
  'isCommunity' : boolean,
  'name' : string,
  'description' : string,
  'totalUnit' : bigint,
  'summary' : string,
  'lockPeriod' : bigint,
  'availableUnit' : bigint,
  'unitImage' : [] | [string],
  'unitPrice' : number,
  'payoutFrequency' : bigint,
  'maxValue' : number,
}
export interface MembershipRecord {
  'id' : string,
  'userId' : Principal,
  'isActive' : boolean,
  'timestamp' : Time,
  'coopId' : Principal,
}
export type MembershipRecordId = string;
export type Result = { 'ok' : Principal } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE {
  'addMembershipRecord' : ActorMethod<[MembershipRecord], boolean>,
  'createCoOpCanister' : ActorMethod<[CoopRequest], Result>,
  'getAllMemberships' : ActorMethod<[], Array<MembershipRecord>>,
  'getCommunityCoops' : ActorMethod<[], Array<CoopRecord>>,
  'getCreatedCanisters' : ActorMethod<[], Array<CoopRecord>>,
  'getDaoCoops' : ActorMethod<[], Array<CoopRecord>>,
  'getMembership' : ActorMethod<[MembershipRecordId], MembershipRecord>,
  'getMembershipByCaller' : ActorMethod<[Principal], Array<MembershipRecord>>,
  'getMembershipsByCoopId' : ActorMethod<[Principal], Array<MembershipRecord>>,
  'updateMembershipRecord' : ActorMethod<
    [MembershipRecordId],
    MembershipRecord
  >,
}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
