import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface InvAdmin {
  'addStaffMember' : ActorMethod<[Staff], undefined>,
  'assign_role' : ActorMethod<[Principal, [] | [Role__1]], undefined>,
  'deleteStaffMember' : ActorMethod<[Principal], boolean>,
  'getAllAdmins' : ActorMethod<[], Array<[Principal, Role__1]>>,
  'getAllStaffMembers' : ActorMethod<[], Array<Staff>>,
  'getApprovedStaff' : ActorMethod<[], Array<Staff>>,
  'getStaffMember' : ActorMethod<[Principal], Result>,
  'getUnapprovedStaff' : ActorMethod<[], Array<Staff>>,
  'my_role' : ActorMethod<[], string>,
  'updateStaffMember' : ActorMethod<[Staff], undefined>,
}
export type Result = { 'ok' : Staff } |
  { 'err' : string };
export type Role = { 'admin' : null } |
  { 'owner' : null } |
  { 'authorized' : null } |
  { 'staff' : null };
export type Role__1 = { 'admin' : null } |
  { 'owner' : null } |
  { 'authorized' : null } |
  { 'staff' : null };
export interface Staff {
  'created' : bigint,
  'principal' : Principal,
  'role' : [] | [Role],
  'fullName' : string,
  'email' : string,
  'approved' : boolean,
  'phone' : string,
  'suspended' : boolean,
}
export interface _SERVICE extends InvAdmin {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
