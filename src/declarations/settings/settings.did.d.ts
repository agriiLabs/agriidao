import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AcCategory {
  'id' : string,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'acTypeId' : string,
  'isDelete' : boolean,
}
export interface AcCategoryRequest { 'name' : string, 'acTypeId' : string }
export interface AcType {
  'id' : string,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'isDelete' : boolean,
}
export interface AcTypeRequest { 'name' : string }
export interface Country {
  'region' : string,
  'code' : string,
  'name' : string,
  'callingCode' : string,
  'currency' : string,
}
export type Result = { 'ok' : Role } |
  { 'err' : string };
export type Result_1 = { 'ok' : Country } |
  { 'err' : string };
export type Result_2 = { 'ok' : AcType } |
  { 'err' : string };
export type Result_3 = { 'ok' : AcCategory } |
  { 'err' : string };
export type Role = { 'admin' : null } |
  { 'owner' : null } |
  { 'staff' : null };
export interface Settings {
  'addAcCategory' : ActorMethod<[AcCategoryRequest], undefined>,
  'addAcType' : ActorMethod<[AcTypeRequest], undefined>,
  'assign_role' : ActorMethod<[Principal, [] | [Role]], undefined>,
  'deleteAcCategory' : ActorMethod<[AcCategory], undefined>,
  'deleteAcType' : ActorMethod<[AcType], undefined>,
  'getAcCategoryLatest' : ActorMethod<[string], Result_3>,
  'getAcCategoryVersions' : ActorMethod<[string], Array<AcCategory>>,
  'getAcTypeLatest' : ActorMethod<[string], Result_2>,
  'getAcTypeVersions' : ActorMethod<[string], Array<AcType>>,
  'getAllCountries' : ActorMethod<[], Array<Country>>,
  'getAllLatestAcCategories' : ActorMethod<[], Array<AcCategory>>,
  'getAllLatestAcTypeCategories' : ActorMethod<[string], Array<AcCategory>>,
  'getAllLatestAcTypeCategoriesByName' : ActorMethod<
    [string],
    Array<AcCategory>
  >,
  'getAllLatestAcTypes' : ActorMethod<[], Array<AcType>>,
  'getCategoryByName' : ActorMethod<[string], string>,
  'getCountryByCode' : ActorMethod<[string], Result_1>,
  'getCountryByName' : ActorMethod<[string], Result_1>,
  'getCountryByRegion' : ActorMethod<[string], Array<Country>>,
  'isAdmin' : ActorMethod<[Principal], boolean>,
  'isAuthorized' : ActorMethod<[Principal], boolean>,
  'my_role' : ActorMethod<[], Result>,
  'updateAcCategory' : ActorMethod<[AcCategory], undefined>,
  'updateAcType' : ActorMethod<[AcType], undefined>,
}
export type Time = bigint;
export interface _SERVICE extends Settings {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
