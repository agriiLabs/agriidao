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
export type Result_1 = { 'ok' : SettingsData } |
  { 'err' : string };
export type Result_2 = { 'ok' : Country } |
  { 'err' : string };
export type Result_3 = { 'ok' : AcType } |
  { 'err' : string };
export type Result_4 = { 'ok' : AcCategory } |
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
  'getAcCategoryLatest' : ActorMethod<[string], Result_4>,
  'getAcCategoryVersions' : ActorMethod<[string], Array<AcCategory>>,
  'getAcTypeLatest' : ActorMethod<[string], Result_3>,
  'getAcTypeVersions' : ActorMethod<[string], Array<AcType>>,
  'getAllCategories' : ActorMethod<[], Array<SettingsData>>,
  'getAllCategoriesByType' : ActorMethod<[string], Array<SettingsData>>,
  'getAllCountries' : ActorMethod<[], Array<Country>>,
  'getAllLatestAcCategories' : ActorMethod<[], Array<AcCategory>>,
  'getAllLatestAcTypeCategories' : ActorMethod<[string], Array<AcCategory>>,
  'getAllLatestAcTypeCategoriesByName' : ActorMethod<
    [string],
    Array<AcCategory>
  >,
  'getAllLatestAcTypes' : ActorMethod<[], Array<AcType>>,
  'getAllTypes' : ActorMethod<[], Array<SettingsData>>,
  'getCategoryByCName' : ActorMethod<[string], Result_1>,
  'getCategoryById' : ActorMethod<[string], Result_1>,
  'getCategoryByName' : ActorMethod<[string], string>,
  'getCategoryByType' : ActorMethod<[string], Array<SettingsData>>,
  'getCountryByCode' : ActorMethod<[string], Result_2>,
  'getCountryByName' : ActorMethod<[string], Result_2>,
  'getCountryByRegion' : ActorMethod<[string], Array<Country>>,
  'getTypeById' : ActorMethod<[string], Result_1>,
  'getTypeByName' : ActorMethod<[string], Result_1>,
  'isAdmin' : ActorMethod<[Principal], boolean>,
  'isAuthorized' : ActorMethod<[Principal], boolean>,
  'my_role' : ActorMethod<[], Result>,
  'updateAcCategory' : ActorMethod<[AcCategory], undefined>,
  'updateAcType' : ActorMethod<[AcType], undefined>,
}
export interface SettingsData {
  'id' : string,
  'apType' : string,
  'category' : string,
}
export type Time = bigint;
export interface _SERVICE extends Settings {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
