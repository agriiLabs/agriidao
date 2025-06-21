export const idlFactory = ({ IDL }) => {
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
  const Time = IDL.Int;
  const MarketLocationCommodity = IDL.Record({
    'id' : IDL.Text,
    'commodityId' : IDL.Text,
    'timeStamp' : Time,
    'createdBy' : IDL.Text,
    'isDelete' : IDL.Bool,
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
  const Role = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'staff' : IDL.Null,
  });
  const Staff = IDL.Record({
    'created' : IDL.Int,
    'principal' : IDL.Principal,
    'role' : IDL.Opt(Role),
    'fullName' : IDL.Text,
    'email' : IDL.Text,
    'approved' : IDL.Bool,
    'phone' : IDL.Text,
    'suspended' : IDL.Bool,
  });
  const Role__1 = IDL.Variant({
    'admin' : IDL.Null,
    'owner' : IDL.Null,
    'staff' : IDL.Null,
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
  const Result_2 = IDL.Variant({
    'ok' : MarketLocationCommodity,
    'err' : IDL.Text,
  });
  const GetAllRecordsArgs = IDL.Record({
    'page' : IDL.Nat64,
    'size' : IDL.Nat64,
  });
  const MarketPriceCommodity = IDL.Record({
    'market_price' : MarketPrice,
    'commodity' : IDL.Opt(Commodity),
  });
  const MarketPriceRecordsPaginated = IDL.Record({
    'total' : IDL.Nat64,
    'records' : IDL.Vec(MarketPriceCommodity),
    'page' : IDL.Nat64,
    'total_pages' : IDL.Nat64,
    'offset' : IDL.Nat64,
    'limit' : IDL.Nat64,
  });
  const Result__1 = IDL.Variant({ 'ok' : MarketLocation, 'err' : IDL.Text });
  const ChartStatsData = IDL.Record({ 'month' : IDL.Nat, 'count' : IDL.Nat });
  const Result_1 = IDL.Variant({ 'ok' : Staff, 'err' : IDL.Text });
  const Result = IDL.Variant({ 'ok' : Role__1, 'err' : IDL.Text });
  const InvAdmin = IDL.Service({
    'addCommodity' : IDL.Func([CommodityRequest], [], []),
    'addMarketLocation' : IDL.Func([MarketLocationRequest], [], []),
    'addMarketLocationAgent' : IDL.Func([MarketLocationAgentRequest], [], []),
    'addMarketLocationCommodity' : IDL.Func([MarketLocationCommodity], [], []),
    'addMarketPrice' : IDL.Func([MarketPriceRequest], [], []),
    'addStaffMember' : IDL.Func([Staff], [], []),
    'assign_role' : IDL.Func([IDL.Principal, IDL.Opt(Role__1)], [], []),
    'deleteCommodity' : IDL.Func([Commodity], [], []),
    'deleteMarketLocation' : IDL.Func([MarketLocation], [], []),
    'deleteMarketLocationAgent' : IDL.Func([MarketLocationAgent], [], []),
    'deleteMarketLocationCommodity' : IDL.Func(
        [MarketLocationCommodity],
        [],
        [],
      ),
    'deleteMarketPrice' : IDL.Func([MarketPrice], [], []),
    'deleteStaffMember' : IDL.Func([IDL.Principal], [IDL.Bool], []),
    'getAllAdmins' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(IDL.Principal, Role__1))],
        [],
      ),
    'getAllLatestCommodities' : IDL.Func([], [IDL.Vec(Commodity)], []),
    'getAllLatestMarketCommoditiesByMarketId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationCommodity)],
        [],
      ),
    'getAllLatestMarketLocationAgents' : IDL.Func(
        [],
        [IDL.Vec(MarketLocationAgent)],
        [],
      ),
    'getAllLatestMarketLocationCommodities' : IDL.Func(
        [],
        [IDL.Vec(MarketLocationCommodity)],
        [],
      ),
    'getAllLatestMarketLocationsByCommodityName' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationCommodity)],
        [],
      ),
    'getAllLatestMarketPrices' : IDL.Func([], [IDL.Vec(MarketPrice)], []),
    'getAllMarketLocationAgentsByMarketId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationAgent)],
        [],
      ),
    'getAllMarketLocationsLatest' : IDL.Func([], [IDL.Vec(MarketLocation)], []),
    'getAllStaffMembers' : IDL.Func([], [IDL.Vec(Staff)], ['query']),
    'getApprovedStaff' : IDL.Func([], [IDL.Vec(Staff)], ['query']),
    'getCommodityByCategory' : IDL.Func([IDL.Text], [IDL.Vec(Commodity)], []),
    'getCommodityLatest' : IDL.Func([IDL.Text], [Result_4], []),
    'getCommodityStats' : IDL.Func([], [Stats], []),
    'getLatestMarketLocationAgentbyId' : IDL.Func([IDL.Text], [Result_3], []),
    'getLatestMarketPriceById' : IDL.Func([IDL.Text], [Result_2], []),
    'getLatestMarketPriceByMarketLocationId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketPrice)],
        [],
      ),
    'getLatestMarketPriceByMarketLocationIdPaginated' : IDL.Func(
        [IDL.Text, GetAllRecordsArgs],
        [MarketPriceRecordsPaginated],
        [],
      ),
    'getLatestPriceByMarketLocationId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketPrice)],
        [],
      ),
    'getMarketLocationAgentByAgentId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationAgent)],
        [],
      ),
    'getMarketLocationByAgentId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationAgent)],
        [],
      ),
    'getMarketLocationByCountryId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocation)],
        [],
      ),
    'getMarketLocationCommodityByCommodityId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketLocationCommodity)],
        [],
      ),
    'getMarketLocationCommodityById' : IDL.Func([IDL.Text], [Result_2], []),
    'getMarketLocationLatest' : IDL.Func([IDL.Text], [Result__1], []),
    'getMarketPriceByMarketCommodityId' : IDL.Func(
        [IDL.Text],
        [IDL.Vec(MarketPrice)],
        [],
      ),
    'getMarketStats' : IDL.Func([], [IDL.Vec(ChartStatsData)], []),
    'getStaffMember' : IDL.Func([IDL.Principal], [Result_1], ['query']),
    'getUnapprovedStaff' : IDL.Func([], [IDL.Vec(Staff)], ['query']),
    'get_total_market_locations' : IDL.Func([], [IDL.Nat], []),
    'get_total_market_prices' : IDL.Func([], [IDL.Nat], []),
    'my_role' : IDL.Func([], [Result], ['query']),
    'updateCommodity' : IDL.Func([Commodity], [], []),
    'updateMarkeLocation' : IDL.Func([MarketLocation], [], []),
    'updateMarketLocationAgent' : IDL.Func([MarketLocationAgent], [], []),
    'updateMarketLocationCommodity' : IDL.Func(
        [MarketLocationCommodity],
        [],
        [],
      ),
    'updateMarketPrice' : IDL.Func([MarketPrice], [], []),
    'updateStaffMember' : IDL.Func([Staff], [], []),
  });
  return InvAdmin;
};
export const init = ({ IDL }) => { return []; };
