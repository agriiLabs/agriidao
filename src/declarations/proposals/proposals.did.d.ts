import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CanisterInitArgs { 'env' : EnvType }
export type CoopId = Principal;
export type EnvType = { 'staging' : null } |
  { 'production' : null } |
  { 'local' : null };
export type ProjectId = string;
export interface Proposal {
  'id' : string,
  'status' : ProposalStatus,
  'coop' : [] | [Principal],
  'voteStart' : Time,
  'description' : string,
  'voteDuration' : bigint,
  'projectId' : [] | [string],
  'voteEnd' : Time,
  'timestamp' : Time,
  'proposer' : Principal,
  'submissionDeposit' : bigint,
}
export type ProposalId = string;
export interface ProposalRequest {
  'coop' : [] | [Principal],
  'description' : string,
  'projectId' : [] | [string],
  'submissionDeposit' : bigint,
}
export type ProposalStatus = { 'Open' : null } |
  { 'Rejected' : null } |
  { 'Accepted' : null };
export interface Proposals {
  'addProposal' : ActorMethod<[ProposalRequest], undefined>,
  'addVote' : ActorMethod<[Vote], undefined>,
  'getProposalById' : ActorMethod<[ProposalId], Proposal>,
  'getProposalsByCoopId' : ActorMethod<[CoopId], Array<Proposal>>,
  'getProposalsByProjectId' : ActorMethod<[ProjectId], Array<Proposal>>,
  'getRemainingTime' : ActorMethod<[ProposalId], bigint>,
  'getVoteById' : ActorMethod<[string], Vote>,
  'getVotesByProposalId' : ActorMethod<[ProposalId], Array<Vote>>,
  'getVotesByUserId' : ActorMethod<[Principal], Array<Vote>>,
  'updateProposalStatus' : ActorMethod<[Proposal], undefined>,
}
export type Time = bigint;
export interface Vote {
  'userId' : Principal,
  'isAccept' : boolean,
  'timestamp' : Time,
  'proposalId' : string,
}
export interface _SERVICE extends Proposals {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
