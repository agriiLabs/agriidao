import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export type AddressType = { 'BSC' : null } |
  { 'BTC' : null } |
  { 'ETH' : null } |
  { 'ICP' : null } |
  { 'POL' : null } |
  { 'SOL' : null };
export interface AgriiUser {
  'addProfile' : ActorMethod<[ProfileRequest], undefined>,
  'addUser' : ActorMethod<[User], undefined>,
  'addWalletAddress' : ActorMethod<[WalletAddressRequest], undefined>,
  'checkUsernameExists' : ActorMethod<[string], boolean>,
  'deactivateUser' : ActorMethod<[Profile], undefined>,
  'getAllLatestUsers' : ActorMethod<[], Array<User>>,
  'getProfileByCaller' : ActorMethod<[], Result_2>,
  'getProfileLatestByPrincipal' : ActorMethod<[ProfileId], Result_2>,
  'getUserByCaller' : ActorMethod<[], Result>,
  'getUserLatestByPrincipal' : ActorMethod<[Principal], Result>,
  'getUsers' : ActorMethod<[], Array<User>>,
  'getWalletAddressByCaller' : ActorMethod<[], Result_1>,
  'getWalletAddressLatestByPrincipal' : ActorMethod<
    [WalletAddressId],
    Result_1
  >,
  'updateProfile' : ActorMethod<[Profile], undefined>,
  'updateUser' : ActorMethod<[User], Result>,
  'updateUserType' : ActorMethod<[UserType, Principal], undefined>,
  'updateWalletAddress' : ActorMethod<[WalletAddress], undefined>,
  'validateReferralCode' : ActorMethod<[string], [] | [User]>,
}
export interface Profile {
  'id' : Principal,
  'dob' : string,
  'timeStamp' : Time,
  'isDeactivated' : boolean,
  'email' : [] | [string],
  'countryId' : [] | [string],
  'mobile' : [] | [string],
  'profilePic' : [] | [string],
  'lastName' : string,
  'firstName' : string,
}
export type ProfileId = Principal;
export interface ProfileRequest {
  'dob' : string,
  'email' : [] | [string],
  'countryId' : [] | [string],
  'mobile' : [] | [string],
  'profilePic' : [] | [string],
  'lastName' : string,
  'firstName' : string,
}
export type Result = { 'ok' : User } |
  { 'err' : string };
export type Result_1 = { 'ok' : WalletAddress } |
  { 'err' : string };
export type Result_2 = { 'ok' : Profile } |
  { 'err' : string };
export type Time = bigint;
export interface User {
  'id' : Principal,
  'userType' : UserType,
  'referralCode' : [] | [string],
  'referralLink' : [] | [string],
  'username' : [] | [string],
  'timeStamp' : Time,
  'dapp' : {
    'agriiprice' : { 'timeStamp' : [] | [Time] },
    'agriiclub' : { 'timeStamp' : [] | [Time] },
    'agriiMarket' : { 'timeStamp' : [] | [Time] },
  },
  'referredBy' : [] | [string],
  'isDelete' : boolean,
}
export interface UserType {
  'member' : boolean,
  'agent' : boolean,
  'trader' : boolean,
  'farmer' : boolean,
}
export interface WalletAddress {
  'id' : Principal,
  'timeStamp' : Time,
  'chain' : AddressType,
  'address' : string,
}
export type WalletAddressId = Principal;
export interface WalletAddressRequest {
  'chain' : AddressType,
  'address' : string,
}
export interface _SERVICE extends AgriiUser {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
