import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface CoopLedger {
  'addTransaction' : ActorMethod<[CoopTransaction], undefined>,
  'getAllTransactions' : ActorMethod<[], Array<CoopTransaction>>,
  'getTransactionByTxId' : ActorMethod<[string], CoopTransaction>,
  'getTransactionsByCoopId' : ActorMethod<[Principal], Array<CoopTransaction>>,
  'getTransactionsByUserId' : ActorMethod<[Principal], Array<CoopTransaction>>,
  'getTransactionsByUserIdAndCoopId' : ActorMethod<
    [Principal, Principal],
    Array<CoopTransaction>
  >,
}
export interface CoopTransaction {
  'ticker' : [] | [string],
  'userId' : Principal,
  'txId' : string,
  'tokenSymbol' : [] | [string],
  'timestamp' : Time,
  'txType' : string,
  'coopId' : Principal,
  'amount' : bigint,
}
export type Time = bigint;
export interface _SERVICE extends CoopLedger {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
