import type { Principal } from '@dfinity/principal';
import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

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
export interface CommodityActor {
  'addCommodity' : ActorMethod<[CommodityRequest], undefined>,
  'addMarketLocation' : ActorMethod<[MarketLocationRequest], undefined>,
  'addMarketLocationAgent' : ActorMethod<
    [MarketLocationAgentRequest],
    undefined
  >,
  'addMarketLocationCommodity' : ActorMethod<
    [MarketLocationCommodityRequest],
    undefined
  >,
  'addMarketPrice' : ActorMethod<[MarketPriceRequest], undefined>,
  'deleteCommodity' : ActorMethod<[Commodity], undefined>,
  'deleteMarketLocation' : ActorMethod<[MarketLocation], undefined>,
  'deleteMarketLocationAgent' : ActorMethod<[MarketLocationAgent], undefined>,
  'deleteMarketLocationCommodity' : ActorMethod<
    [MarketLocationCommodity],
    undefined
  >,
  'deleteMarketPrice' : ActorMethod<[MarketPrice], undefined>,
  'getAllLatestCommodities' : ActorMethod<[], Array<Commodity>>,
  'getAllLatestCommoditiesByCategoryName' : ActorMethod<
    [string],
    Array<Commodity>
  >,
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
  'getAllMarketLocationVersions' : ActorMethod<[string], Array<MarketLocation>>,
  'getAllMarketLocationsLatest' : ActorMethod<[], Array<MarketLocation>>,
  'getCommodityByCategory' : ActorMethod<[string], Array<Commodity>>,
  'getCommodityLatest' : ActorMethod<[string], Result_4>,
  'getCommodityVersions' : ActorMethod<[string], Array<Commodity>>,
  'getLatestMarketLocationAgentVersions' : ActorMethod<
    [string],
    Array<MarketLocationAgent>
  >,
  'getLatestMarketLocationAgentbyId' : ActorMethod<[string], Result_3>,
  'getLatestMarketPriceById' : ActorMethod<[string], Result_2>,
  'getLatestMarketPriceByMarketLocationId' : ActorMethod<
    [string],
    Array<MarketPrice>
  >,
  'getLatestMarketPriceVersionsById' : ActorMethod<
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
  'getMarketLocationCommodityById' : ActorMethod<[string], Result_1>,
  'getMarketLocationCommodityVersions' : ActorMethod<
    [string],
    Array<MarketLocationCommodity>
  >,
  'getMarketLocationLatest' : ActorMethod<[string], Result>,
  'getMarketLocationsByCountryName' : ActorMethod<
    [string],
    Array<MarketLocation>
  >,
  'getMarketPriceByMarketCommodityId' : ActorMethod<
    [string],
    Array<MarketPrice>
  >,
  'getMarketPriceByMarketLocationId' : ActorMethod<
    [string],
    Array<MarketPrice>
  >,
  'updateCommodity' : ActorMethod<[Commodity], undefined>,
  'updateMarkeLocation' : ActorMethod<[MarketLocation], undefined>,
  'updateMarketLocationAgent' : ActorMethod<[MarketLocationAgent], undefined>,
  'updateMarketLocationCommodity' : ActorMethod<
    [MarketLocationCommodity],
    undefined
  >,
  'updateMarketPrice' : ActorMethod<[MarketPrice], undefined>,
}
export interface CommodityRequest {
  'ticker' : string,
  'commodityPic' : string,
  'name' : string,
  'acCategoryId' : string,
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
export interface MarketLocationCommodityRequest {
  'commodityId' : string,
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
export type Result = { 'ok' : MarketLocation } |
  { 'err' : string };
export type Result_1 = { 'ok' : MarketLocationCommodity } |
  { 'err' : string };
export type Result_2 = { 'ok' : MarketPrice } |
  { 'err' : string };
export type Result_3 = { 'ok' : MarketLocationAgent } |
  { 'err' : string };
export type Result_4 = { 'ok' : Commodity } |
  { 'err' : string };
export type Time = bigint;
export interface _SERVICE extends CommodityActor {}
export declare const idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
