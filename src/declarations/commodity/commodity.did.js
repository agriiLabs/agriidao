export const idlFactory = ({ IDL }) => {
  const EnvType = IDL.Variant({
    'staging' : IDL.Null,
    'production' : IDL.Null,
    'local' : IDL.Null,
  });
  const CanisterInitArgs = IDL.Record({ 'env' : EnvType });
  const GetPagesArgs = IDL.Record({ 'page' : IDL.Nat, 'size' : IDL.Nat });
  const MarketPriceId = IDL.Text;
  const Time = IDL.Int;
  const MarketPrice = IDL.Record({
    'id' : IDL.Text,
    'status' : IDL.Record({
      'pending' : IDL.Bool,
      'rejected' : IDL.Bool,
      'accepted' : IDL.Bool,
    }),
    'marketLocationCommodityId' : IDL.Text,
    'timeStamp' : Time,
    'userId' : IDL.Text,
    'createdBy' : IDL.Text,
    'pricePerKg' : IDL.Float64,
    'unitKg' : IDL.Int,
    'isPaid' : IDL.Bool,
    'currency' : IDL.Text,
    'isDelete' : IDL.Bool,
    'price' : IDL.Float64,
    'marketLocationId' : IDL.Text,
  });
  const CommodityRequest = IDL.Record({
    'ticker' : IDL.Text,
    'commodityPic' : IDL.Text,
    'name' : IDL.Text,
    'acCategoryId' : IDL.Text,
  });
  const MarketLocationRequest = IDL.Record({
    'name' : IDL.Text,
    'countryId' : IDL.Text,
  });
  const MarketLocationAgentRequest = IDL.Record({
    'userId' : IDL.Text,
    'marketLocationId' : IDL.Text,
  });
  const MarketLocationCommodityRequest = IDL.Record({
    'commodityId' : IDL.Text,
    'marketLocationId' : IDL.Text,
  });
  const MarketPriceRequest = IDL.Record({
    'status' : IDL.Record({
      'pending' : IDL.Bool,
      'rejected' : IDL.Bool,
      'accepted' : IDL.Bool,
    }),
    'marketLocationCommodityId' : IDL.Text,
    'userId' : IDL.Text,
    'pricePerKg' : IDL.Float64,
    'unitKg' : IDL.Int,
    'currency' : IDL.Text,
    'price' : IDL.Float64,
    'marketLocationId' : IDL.Text,
  });
  const Commodity = IDL.Record({
    'id' : IDL.Text,
    'ticker' : IDL.Text,
    'commodityPic' : IDL.Text,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'acCategoryId' : IDL.Text,
    'isDelete' : IDL.Bool,
  });
  const MarketLocation = IDL.Record({
    'id' : IDL.Text,
    'timeStamp' : Time,
    'name' : IDL.Text,
    'createdBy' : IDL.Text,
    'countryId' : IDL.Text,
    'isDelete' : IDL.Bool,
  });
  const MarketLocationAgent = IDL.Record({
    'id' : IDL.Text,
    'timeStamp' : Time,
    'userId' : IDL.Text,
    'createdBy' : IDL.Text,
    'isDelete' : IDL.Bool,
    'marketLocationId' : IDL.Text,
  });
  const MarketLocationCommodity = IDL.Record({
    'id' : IDL.Text,
    'commodityId' : IDL.Text,
    'timeStamp' : Time,
    'createdBy' : IDL.Text,
    'isDelete' : IDL.Bool,
    'marketLocationId' : IDL.Text,
  });
  const Result_4 = IDL.Variant({ 'ok' : Commodity, 'err' : IDL.Text });
  const Stats = IDL.Record({
    'total_market_location_commodities' : IDL.Nat,
    'total_market_locations' : IDL.Nat,
    'total_market_location_agents' : IDL.Nat,
    'total_market_prices' : IDL.Nat,
    'total_commodities' : IDL.Nat,
  });
  const Result_3 = IDL.Variant({
    'ok' : MarketLocationAgent,
    'err' : IDL.Text,
  });
  const Result_2 = IDL.Variant({ 'ok' : MarketPrice, 'err' : IDL.Text });
  const Result_1 = IDL.Variant({
    'ok' : MarketLocationCommodity,
    'err' : IDL.Text,
  });
  const Result = IDL.Variant({ 'ok' : MarketLocation, 'err' : IDL.Text });
  const ChartStatsData = IDL.Record({ 'month' : IDL.Nat, 'count' : IDL.Nat });
  const CommodityActor = IDL.Service({
    'AgetAllMarketPricesPaginated' : IDL.Func(
        [GetPagesArgs],
        [IDL.Vec(IDL.Tuple(MarketPriceId, MarketPrice))],
        ['query'],
      ),
    'addCommodity' : IDL.Func([CommodityRequest], [], []),
    'addMarketLocation' : IDL.Func([MarketLocationRequest], [], []),
    'addMarketLocationAgent' : IDL.Func([MarketLocationAgentRequest], [], []),
    'addMarketLocationCommodity' : IDL.Func(
        [MarketLocationCommodityRequest],
        [],
        [],
      ),
    'addMarketPrice' : IDL.Func([MarketPriceRequest], [], []),
    'deleteCommodity' : IDL.Func([Commodity], [], []),
    'deleteMarketLocation' : IDL.Func([MarketLocation], [], []),
    'deleteMarketLocationAgent' : IDL.Func([MarketLocationAgent], [], []),
    'deleteMarketLocationCommodity' : IDL.Func(
        [MarketLocationCommodity],
        [],
        [],
      ),
    'deleteMarketPrice' : IDL.Func([MarketPrice], [], []),
    'getAllLatestCommodities' : IDL.Func([], [IDL.Vec(Commodity)], ['query']),
    'getAllLatestMarketCommoditiesByMarketId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationCommodity)],
        ['query'],
      ),
    'getAllLatestMarketLocationAgents' : IDL.Func(
        [],
        [IDL.Vec(MarketLocationAgent)],
        ['query'],
      ),
    'getAllLatestMarketLocationCommodities' : IDL.Func(
        [],
        [IDL.Vec(MarketLocationCommodity)],
        ['query'],
      ),
    'getAllLatestMarketLocationsByCommodityName' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationCommodity)],
        ['query'],
      ),
    'getAllLatestMarketPrices' : IDL.Func(
        [],
        [IDL.Vec(MarketPrice)],
        ['query'],
      ),
    'getAllMarketLocationAgentsByMarketId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationAgent)],
        ['query'],
      ),
    'getAllMarketLocationsLatest' : IDL.Func(
        [],
        [IDL.Vec(MarketLocation)],
        ['query'],
      ),
    'getCommodityByCategory' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(Commodity)],
        ['query'],
      ),
    'getCommodityLatest' : IDL.Func([IDL.Text], [Result_4], ['query']),
    'getCommodityStats' : IDL.Func([], [Stats], ['query']),
    'getLatestMarketLocationAgentbyId' : IDL.Func(
        [IDL.Text],
        [Result_3],
        ['query'],
      ),
    'getLatestMarketPriceById' : IDL.Func([IDL.Text], [Result_2], ['query']),
    'getLatestMarketPriceByMarketLocationId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketPrice)],
        ['query'],
      ),
    'getLatestPriceByMarketLocationId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketPrice)],
        ['query'],
      ),
    'getMarketLocationAgentByAgentId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationAgent)],
        ['query'],
      ),
    'getMarketLocationByAgentId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationAgent)],
        [],
      ),
    'getMarketLocationByCountryId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocation)],
        ['query'],
      ),
    'getMarketLocationCommodityByCommodityId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationCommodity)],
        ['query'],
      ),
    'getMarketLocationCommodityById' : IDL.Func(
        [IDL.Text],
        [Result_1],
        ['query'],
      ),
    'getMarketLocationLatest' : IDL.Func([IDL.Text], [Result], ['query']),
    'getMarketPriceByMarketCommodityId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketPrice)],
        ['query'],
      ),
    'getMarketStats' : IDL.Func([], [IDL.Vec(ChartStatsData)], ['query']),
    'get_total_market_locations' : IDL.Func([], [IDL.Nat], ['query']),
    'get_total_market_prices' : IDL.Func([], [IDL.Nat], ['query']),
    'updateCommodity' : IDL.Func([Commodity], [], []),
    'updateMarkeLocation' : IDL.Func([MarketLocation], [], []),
    'updateMarketLocationAgent' : IDL.Func([MarketLocationAgent], [], []),
    'updateMarketLocationCommodity' : IDL.Func(
        [MarketLocationCommodity],
        [],
        [],
      ),
    'updateMarketPrice' : IDL.Func([MarketPrice], [], []),
  });
  return CommodityActor;
};
export const init = ({ IDL }) => {
  const EnvType = IDL.Variant({
    'staging' : IDL.Null,
    'production' : IDL.Null,
    'local' : IDL.Null,
  });
  const CanisterInitArgs = IDL.Record({ 'env' : EnvType });
  return [CanisterInitArgs];
};
