import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface ChartStatsData { 'month' : bigint, 'count' : bigint }
export interface Commodity {
  'id' : string,
  'ticker' : string,
  'commodityPic' : string,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'acCategoryId' : string,
  'isDelete' : boolean,
}
export interface CommodityRequest {
  'ticker' : string,
  'commodityPic' : string,
  'name' : string,
  'acCategoryId' : string,
}
export interface InvAdmin {
  'addCommodity' : ActorMethod<[CommodityRequest], undefined>,
  'addMarketLocation' : ActorMethod<[MarketLocationRequest], undefined>,
  'addMarketLocationAgent' : ActorMethod<
    [MarketLocationAgentRequest],
    undefined
  >,
  'addMarketLocationCommodity' : ActorMethod<
    [MarketLocationCommodity],
    undefined
  >,
  'addMarketPrice' : ActorMethod<[MarketPriceRequest], undefined>,
  'addStaffMember' : ActorMethod<[Staff], undefined>,
  'assign_role' : ActorMethod<[Principal, [] | [Role__1]], undefined>,
  'deleteCommodity' : ActorMethod<[Commodity], undefined>,
  'deleteMarketLocation' : ActorMethod<[MarketLocation], undefined>,
  'deleteMarketLocationAgent' : ActorMethod<[MarketLocationAgent], undefined>,
  'deleteMarketLocationCommodity' : ActorMethod<
    [MarketLocationCommodity],
    undefined
  >,
  'deleteMarketPrice' : ActorMethod<[MarketPrice], undefined>,
  'deleteStaffMember' : ActorMethod<[Principal], boolean>,
  'getAllAdmins' : ActorMethod<[], Array<[Principal, Role__1]>>,
  'getAllLatestCommodities' : ActorMethod<[], Array<Commodity>>,
  'getAllLatestMarketCommoditiesByMarketId' : ActorMethod<
    [string],
    Array<MarketLocationCommodity>
  >,
  'getAllLatestMarketLocationAgents' : ActorMethod<
    [],
    Array<MarketLocationAgent>
  >,
  'getAllLatestMarketLocationCommodities' : ActorMethod<
    [],
    Array<MarketLocationCommodity>
  >,
  'getAllLatestMarketLocationsByCommodityName' : ActorMethod<
    [string],
    Array<MarketLocationCommodity>
  >,
  'getAllLatestMarketPrices' : ActorMethod<[], Array<MarketPrice>>,
  'getAllMarketLocationAgentsByMarketId' : ActorMethod<
    [string],
    Array<MarketLocationAgent>
  >,
  'getAllMarketLocationsLatest' : ActorMethod<[], Array<MarketLocation>>,
  'getAllStaffMembers' : ActorMethod<[], Array<Staff>>,
  'getApprovedStaff' : ActorMethod<[], Array<Staff>>,
  'getCommodityByCategory' : ActorMethod<[string], Array<Commodity>>,
  'getCommodityLatest' : ActorMethod<[string], Result_4>,
  'getCommodityStats' : ActorMethod<[], Stats>,
  'getLatestMarketLocationAgentbyId' : ActorMethod<[string], Result_3>,
  'getLatestMarketPriceById' : ActorMethod<[string], Result_2>,
  'getLatestMarketPriceByMarketLocationId' : ActorMethod<
    [string],
    Array<MarketPrice>
  >,
  'getLatestPriceByMarketLocationId' : ActorMethod<
    [string],
    Array<MarketPrice>
  >,
  'getMarketLocationAgentByAgentId' : ActorMethod<
    [string],
    Array<MarketLocationAgent>
  >,
  'getMarketLocationByAgentId' : ActorMethod<
    [string],
    Array<MarketLocationAgent>
  >,
  'getMarketLocationByCountryId' : ActorMethod<[string], Array<MarketLocation>>,
  'getMarketLocationCommodityByCommodityId' : ActorMethod<
    [string],
    Array<MarketLocationCommodity>
  >,
  'getMarketLocationCommodityById' : ActorMethod<[string], Result_2>,
  'getMarketLocationLatest' : ActorMethod<[string], Result__1>,
  'getMarketPriceByMarketCommodityId' : ActorMethod<
    [string],
    Array<MarketPrice>
  >,
  'getMarketStats' : ActorMethod<[], Array<ChartStatsData>>,
  'getStaffMember' : ActorMethod<[Principal], Result_1>,
  'getUnapprovedStaff' : ActorMethod<[], Array<Staff>>,
  'get_total_market_locations' : ActorMethod<[], bigint>,
  'get_total_market_prices' : ActorMethod<[], bigint>,
  'my_role' : ActorMethod<[], Result>,
  'updateCommodity' : ActorMethod<[Commodity], undefined>,
  'updateMarkeLocation' : ActorMethod<[MarketLocation], undefined>,
  'updateMarketLocationAgent' : ActorMethod<[MarketLocationAgent], undefined>,
  'updateMarketLocationCommodity' : ActorMethod<
    [MarketLocationCommodity],
    undefined
  >,
  'updateMarketPrice' : ActorMethod<[MarketPrice], undefined>,
  'updateStaffMember' : ActorMethod<[Staff], undefined>,
}
export interface MarketLocation {
  'id' : string,
  'timeStamp' : Time,
  'name' : string,
  'createdBy' : string,
  'countryId' : string,
  'isDelete' : boolean,
}
export interface MarketLocationAgent {
  'id' : string,
  'timeStamp' : Time,
  'userId' : string,
  'createdBy' : string,
  'isDelete' : boolean,
  'marketLocationId' : string,
}
export interface MarketLocationAgentRequest {
  'userId' : string,
  'marketLocationId' : string,
}
export interface MarketLocationCommodity {
  'id' : string,
  'commodityId' : string,
  'timeStamp' : Time,
  'createdBy' : string,
  'isDelete' : boolean,
  'marketLocationId' : string,
}
export interface MarketLocationRequest { 'name' : string, 'countryId' : string }
export interface MarketPrice {
  'id' : string,
  'status' : {
    'pending' : boolean,
    'rejected' : boolean,
    'accepted' : boolean,
  },
  'marketLocationCommodityId' : string,
  'timeStamp' : Time,
  'userId' : string,
  'createdBy' : string,
  'pricePerKg' : number,
  'unitKg' : bigint,
  'isPaid' : boolean,
  'currency' : string,
  'isDelete' : boolean,
  'price' : number,
  'marketLocationId' : string,
}
export interface MarketPriceRequest {
  'status' : {
    'pending' : boolean,
    'rejected' : boolean,
    'accepted' : boolean,
  },
  'marketLocationCommodityId' : string,
  'userId' : string,
  'pricePerKg' : number,
  'unitKg' : bigint,
  'currency' : string,
  'price' : number,
  'marketLocationId' : string,
}
export type Result = { 'ok' : Role__1 } |
  { 'err' : string };
export type Result_1 = { 'ok' : Staff } |
  { 'err' : string };
export type Result_2 = { 'ok' : MarketLocationCommodity } |
  { 'err' : string };
export type Result_3 = { 'ok' : MarketLocationAgent } |
  { 'err' : string };
export type Result_4 = { 'ok' : Commodity } |
  { 'err' : string };
export type Result__1 = { 'ok' : MarketLocation } |
  { 'err' : string };
export type Role = { 'admin' : null } |
  { 'owner' : null } |
  { 'staff' : null };
export type Role__1 = { 'admin' : null } |
  { 'owner' : null } |
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
export interface Stats {
  'total_market_location_commodities' : bigint,
  'total_market_locations' : bigint,
  'total_market_location_agents' : bigint,
  'total_market_prices' : bigint,
  'total_commodities' : bigint,
}
export type Time = bigint;
export interface _SERVICE extends InvAdmin {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
