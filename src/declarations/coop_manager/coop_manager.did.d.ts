import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface Coop {
  'id' : Principal,
  'managementFee' : number,
  'ticker' : string,
  'isCommunity' : boolean,
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
  'unitPrice' : number,
  'payoutFrequency' : bigint,
  'maxValue' : number,
}
export interface CoopInitArgs {
  'initTicker' : string,
  'initTimestamp' : Time,
  'initPayoutFrequency' : bigint,
  'initUnitImage' : [] | [string],
  'initSummary' : string,
  'initIsCommunity' : boolean,
  'initUnitPrice' : number,
  'initName' : string,
  'initDescription' : string,
  'initAvailableUnit' : bigint,
  'initMaxValue' : number,
  'initLockPeriod' : bigint,
  'initCreatedBy' : string,
  'initTotalUnit' : bigint,
  'initManagementFee' : number,
}
export interface CoopManager {
  'getAllMembers' : ActorMethod<[], Array<CoopMember>>,
  'getDetails' : ActorMethod<[], Coop>,
  'getFeeHistory' : ActorMethod<[], Array<PlatformFees>>,
  'getMemberById' : ActorMethod<[CoopMemberId], CoopMember>,
  'getMemberVersionById' : ActorMethod<[CoopMemberId], Array<CoopMember>>,
  'getMemberbyUserId' : ActorMethod<[Principal], CoopMember>,
  'getTransactionById' : ActorMethod<[TransactionId], Transaction>,
  'getTransactions' : ActorMethod<[], Array<Transaction>>,
  'mintUnits' : ActorMethod<[MintUnitsArgs], boolean>,
  'redeemUnits' : ActorMethod<[number, string], boolean>,
}
export interface CoopMember {
  'id' : string,
  'balance' : number,
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
  'unitAmount' : number,
}
export interface PlatformFees {
  'transactionFee' : number,
  'depositFee' : number,
  'royaltyFee' : number,
  'timestamp' : Time,
  'proposalId' : [] | [string],
}
export type Time = bigint;
export interface Transaction {
  'managementFee' : number,
  'linkedTx' : [] | [string],
  'ticker' : [] | [string],
  'platformFee' : number,
  'tokenTxHash' : [] | [string],
  'tokenStandard' : [] | [string],
  'userId' : Principal,
  'txId' : string,
  'tokenSymbol' : [] | [string],
  'timestamp' : Time,
  'txType' : string,
  'amount' : number,
}
export type TransactionId = string;
export interface _SERVICE extends CoopManager {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
