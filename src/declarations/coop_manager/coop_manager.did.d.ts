import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Coop {
  'id' : Principal,
  'managementFee' : bigint,
  'ticker' : string,
  'isManagedCanister' : boolean,
  'name' : string,
  'createdBy' : string,
  'description' : string,
  'totalUnit' : bigint,
  'isActive' : boolean,
  'summary' : string,
  'lockPeriod' : bigint,
  'availableUnit' : bigint,
  'timestamp' : Time,
  'unitImage' : [] | [string],
  'unitPrice' : bigint,
  'payoutFrequency' : bigint,
  'maxValue' : bigint,
}
export interface CoopInitArgs {
  'initTicker' : string,
  'initTimestamp' : Time,
  'initPayoutFrequency' : bigint,
  'initUnitImage' : [] | [string],
  'initSummary' : string,
  'initUnitPrice' : bigint,
  'initName' : string,
  'initDescription' : string,
  'initAvailableUnit' : bigint,
  'initMaxValue' : bigint,
  'initIsManagedCanister' : boolean,
  'initLockPeriod' : bigint,
  'initCreatedBy' : Principal,
  'initTotalUnit' : bigint,
  'initManagementFee' : bigint,
}
export interface CoopManager {
  'getAllMembers' : ActorMethod<[], Array<CoopMember>>,
  'getDetails' : ActorMethod<[], Coop>,
  'getFeeHistory' : ActorMethod<[], Array<PlatformFees>>,
  'getFeesDetails' : ActorMethod<[bigint], MintingFees>,
  'getMemberById' : ActorMethod<[CoopMemberId], CoopMember>,
  'getMemberbyUserId' : ActorMethod<[Principal], Result_2>,
  'getTransactionById' : ActorMethod<[TransactionId], Transaction>,
  'getTransactions' : ActorMethod<[], Array<Transaction>>,
  'mintUnits' : ActorMethod<[MintUnitsArgs], boolean>,
  'newTransaction' : ActorMethod<[TransactionRequest], Result_1>,
  'redeemUnits' : ActorMethod<[bigint, string], boolean>,
  'updateLinkedTx' : ActorMethod<[string, string], Result>,
}
export interface CoopMember {
  'id' : string,
  'balance' : bigint,
  'coop' : Principal,
  'userId' : Principal,
  'isActive' : boolean,
  'timestamp' : Time,
}
export type CoopMemberId = string;
export interface MintUnitsArgs {
  'userId' : Principal,
  'tokenAmount' : bigint,
  'blockheight' : bigint,
  'unitAmount' : bigint,
}
export interface MintingFees {
  'managementFee' : bigint,
  'platformFee' : bigint,
  'subTotal' : bigint,
  'coopFee' : bigint,
  'totalPrice' : bigint,
}
export interface PlatformFees {
  'transactionFee' : bigint,
  'depositFee' : bigint,
  'royaltyFee' : bigint,
  'timestamp' : Time,
  'proposalId' : [] | [string],
}
export type Result = { 'ok' : null } |
  { 'err' : string };
export type Result_1 = { 'ok' : Transaction } |
  { 'err' : string };
export type Result_2 = { 'ok' : CoopMember } |
  { 'err' : string };
export type Time = bigint;
export interface Transaction {
  'managementFee' : bigint,
  'linkedTx' : [] | [string],
  'ticker' : [] | [string],
  'platformFee' : bigint,
  'tokenTxHash' : [] | [string],
  'tokenStandard' : [] | [string],
  'userId' : Principal,
  'txId' : string,
  'tokenSymbol' : [] | [string],
  'timestamp' : Time,
  'txType' : string,
  'amount' : bigint,
}
export type TransactionId = string;
export interface TransactionRequest {
  'managementFee' : bigint,
  'linkedTx' : [] | [string],
  'ticker' : [] | [string],
  'platformFee' : bigint,
  'tokenTxHash' : [] | [string],
  'tokenStandard' : [] | [string],
  'userId' : Principal,
  'txId' : string,
  'tokenSymbol' : [] | [string],
  'timestamp' : Time,
  'txType' : string,
  'amount' : bigint,
}
export interface _SERVICE extends CoopManager {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
